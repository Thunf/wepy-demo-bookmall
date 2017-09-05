import wepy from 'wepy'
import { service } from '../config.js'

export default class cartMixin extends wepy.mixin {
  /**
   * 提供购物车总列表
   * 框架耦合
   */
  getCartList(callback) {
    // 容错
    if (!this.$parent || !this.$parent.globalData) return false
    // 回调提供商品列表
    const list = this.getArray(this.$parent.$updateGlobalData('cart'))
    // 优先执行回调
    if (this.isFunction(callback)) {
      const result = callback(list)
      // 更新返回的列表
      this.isArray(result) && this.$parent.$updateGlobalData('cart', result)
    }
    return list
  }

  /**
   * 判断商品是否一致
   * 业务耦合
   */
  isGoodEqual(GA, GB) {
    return GA.id == GB.id
  }

  // 加入购物车
  addCart(item, callback) {
    const list = this.getCartList()

    // 根据用户套餐信息处理购物车数量问题
    this.$getUserInfo(({ packages }) => {      
      if (this.isDefined( packages )) {
        // 解构: 可借数量/次数
        const {quantity, times} = packages
        // 如果没有可借次数
        if (!+times) {
          return this.isFunction(callback) && callback({code: 4001, message: '您当前不可借阅图书，请购买订阅套餐'})
        }
        // 判断是否已超出
        if (list.length >= +quantity) {
          // 超出提示
          this.isFunction(callback) && callback({code: 1001, message: '您的订阅图书的数量已达到上限，请删除某本再借阅'})
        } else {
          // 真去加车
          try {
            this.realAddCart(item)
            this.isFunction(callback) && callback({code: 0, message: '借阅成功'})
          } catch (e) {
            this.isFunction(callback) && callback({code: 9001, message: '数据异常，请重新借阅'})
          }
        }
      } else {
        this.isFunction(callback) && callback({code: 9002, message: '您暂无可用套餐,请先购买套餐'})
      }
    })
  }

  realAddCart(item) {
    this.updateCart({
      arr: item,
      isRemove: false
    }, {
      getList: this.getCartList,
      isEqual: this.isGoodEqual
    })
  }

  // 从购物车移除
  removeCart(item, callback) {
    this.updateCart({
      arr: item,
      isRemove: true
    }, {
      getList: this.getCartList,
      isEqual: this.isGoodEqual,
      callback: callback
    })
    this.isFunction(callback) && callback({code: 0, message: '删除成功'})
  }

  /**
   * 更新购物车数据
   * 1、购物车维护总列表ARR与传入列表arr的关系
   * 2、对ARR只有增和减
   * 3、增减逻辑支持传入函数判断
   * 4、返回操作后的列表
   * 业务/框架无关
   */
  updateCart({arr, isRemove}, {getList, isEqual}) {
    // 整理数据
    const itemArr = this.isArray(arr) ? arr : [arr]

    // 循环处理
    itemArr.map((good) => {
      // 构造数据
      const tempData = {
        good: good,
        amount: 1
      }

      this.isFunction(getList) && getList.bind(this)((list) => {
        // 对比去重
        let existIndex = undefined
        if (this.isFunction(isEqual)) {
          for (var i = list.length - 1; i >= 0; i--) {
            if (isEqual(list[i].good, tempData.good)) {
              // 取出存在的序号
              existIndex = i
              break
            }
          }
        }

        // 存在时，add增加数量，remove直接删除
        // 不存在时，add直接增加
        if (isRemove) {
          // remove只在存在时操作删除
          this.isDefined(existIndex) && list.splice(existIndex, 1)
        } else {
          // add: 存在加数量，不存在push
          this.isDefined(existIndex) ? list[existIndex].amount++ : list.push(tempData)
        }
        return list
      })
    })
  }
}
