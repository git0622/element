<template>
  <div class="goods">
    <div class="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key=index class="menuItem">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key=index class="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="foodItem" v-for="(food,index2) in item.foods" :key=index2>
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="description">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">￥{{food.price}}</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>
<script>
import shopcart from '@/components/shopcart/shopcart'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  data() {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  components: {
    shopcart
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      console.log(response.body)
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        console.log(this.goods)
      } else {
        alert('请求出错')
      }
    })
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'
// @import '../../common/stylus/mixin.styl'
.goods
  display flex
  position absolute
  top 174px
  bottom 48px
  overflow hidden
  width 100%
  .menuWrapper
    flex 0 0 80px
    width 80px // 再次设置宽度是为了防止安卓不兼容的问题
    background #f3f5f7
    .menuItem
      display table
      height 54px
      line-height 14px
      padding 0 12px
      .text
        display table-cell
        vertical-align middle
        width 56px
        color #07111b
        font-size 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display inline-block
          width 12px
          height 12px
          background-repeat no-repeat
          background-size 12px 12px
          vertical-align top
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.special
            bg-image('special_3')
          &.invoice
            bg-image('invoice_3')
          &.guarantee
            bg-image('guarantee_3')
  .foodsWrapper
    flex 1
    .foodList
      margin-bottom 18px
      .title
        color rgb(147, 153, 159)
        font-size 12px
        height 26px
        line-height 26px
        background #f3f5f7
        border-left 2px solid #d9dde1
        padding-left 14px
      .foodItem
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .icon
          flex 0 0 57px
          width 57px
          margin-right 10px
          vertical-align top
        .content
          flex 1
          vertical-align top
          .name
            font-size 14px
            color rgb(77, 85, 93)
            line-height 14px
            margin-bottom 6px
          .description, .extra
            font-size 10px
            color rgb(143, 157, 159)
            line-height 10px
          .description
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            color #f01414
            font-size 14px
            font-weight 700
            line-height 24px
</style>
