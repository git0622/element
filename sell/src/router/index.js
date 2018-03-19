const goods = () => import('@/components/goods/goods')
const ratings = () => import('@/components/ratings/ratings')
const seller = () => import('@/components/seller/seller')
const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  name: 'goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}]
export default {
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
}
