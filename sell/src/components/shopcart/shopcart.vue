<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logoWrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="des">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
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
          { price: 10, count: 1 },
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
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return '￥' + this.minPrice + '元起送'
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
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
          &.highlight
            background-color rgb(0, 160, 260)
            .icon-shopping_cart
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #ffffff
          background-color rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
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
        text-align center
        &.not-enough
          background-color #2b333b
        &.enough
          background-color #00b43c
          color #fff
</style>
