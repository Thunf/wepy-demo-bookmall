// 示例:图片组
const funImages = [
  '/images/category/cate-da@2x.png',
  '/images/category/cate-ji@2x.png',
  '/images/category/cate-da@2x.png',
  '/images/category/cate-li@2x.png',
  '/images/category/cate-jin@2x.png',
  '/images/category/cate-wan@2x.png',
  '/images/category/cate-chi@2x.png',
  '/images/category/cate-jii@2x.png'
]

// 示例:套餐组
const packages = new Array(5).fill(0).map((x, i) => {
  const index = `${i + 1}`
  const pow = `${Math.pow(index, 2)}`
  const qtt = `${Math.floor(Math.pow(index, 1.5))}`
  const pri = `${8.88 + Math.floor(Math.pow(i, 5))}`
  return {
    id: index,
    period: pow,
    times: index,
    quantity: qtt,
    price: pri
  }
})

export {
  funImages,
  packages
}
