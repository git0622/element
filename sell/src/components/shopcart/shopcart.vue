<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logoWrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="des">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay">￥{{minPrice}}元起送</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          { price: 10, count: 1 }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      console.log(this.selectFoods)
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      console.log(total)
      return total
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.shopcart
  position fixed
  left 0
  bottom 0
  width 100%
  height 48px
  background-color #141d27
  .content
    width 100%
    display flex
    height 48px
    font-size 0
    .content-left
      flex 1
      .logoWrapper
        width 56px
        height 56px
        border-radius 50%
        background-color #141d27
        display inline-block
        vertical-align top
        position relative
        top -10px
        margin 0 12px
        .logo
          position absolute
          left 6px
          top 6px
          width 44px
          height 44px
          border-radius 50%
          background-color #2b343c
          text-align center
          .icon-shopping_cart
            color #80858a
            font-size 24px
            line-height 44px
      .price
        display inline-block
        vertical-align top
        margin-top 12px
        padding-right 12px
        line-height 24px
        color rgba(255, 255, 255, 0.4)
        font-size 16px
        font-weight 700
        border-right 1px solid rgba(255, 255, 255, 0.1)
      .des
        display inline-block
        vertical-align top
        margin-left 12px
        font-size 10px
        color rgba(255, 255, 255, 0.4)
        line-height 48px
    .content-right
      flex 0 0 105px
      width 105px
      line-height 48px
      .pay
        font-size 12px
        color rgba(255, 255, 255, 0.4)
        font-weight 700
        background-color #2b333b
        text-align center
</style>
