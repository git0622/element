<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
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
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key=index>
          <transition name="drop" @before-enter="beforeDrop" @enter="droping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopList" v-show="listShow">
          <div class="listHeader border-1px">
            <span class="title">购物车</span>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="listContent" ref="listContent">
            <ul>
              <li v-for="(food,index) in selectFoods" class="food" :key=index>
                <div class="name">{{food.name}}</div>
                <div class="price">￥{{food.price}}</div>
                <div class="cartControlWrapper">
                  <cartControl @add="addFood" :food="food"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="listMask">
      <div class="listMask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>
<script>
import cartControl from '@/components/cartControl/cartControl'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      balls: [
        {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
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
  components: {
    cartControl
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
    },
    listShow() {
      if (this.selectFoods.length) {
        if (!this.fold) { // 不折叠购物车列表
          this.$nextTick(() => { // 目的是页面dom渲染完成,再获取dom元素
            if (!this.scroll) { // 防止重复生成scroll滚动，如果不做判断，重复生成this.scroll的话，点击一次会派发好多点击事件，导致每次商品数量计算多次
              this.scroll = new BScroll(this.$refs.listContent, { click: true })
            } else {
              this.scroll.refresh()
            }
          })
          return true
        }
      }
    }
  },
  methods: {
    addFood(target) {
      this.drop(target)
    },
    drop(target) { // 作用是生成抛物小球
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.target = target // 将添加购物车的加号dom元素赋值
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) { // 定位抛物小球初始位置
      let count = this.balls.length
      while (count--) {
        // console.log('beforeDrop')
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.target.getBoundingClientRect()
          let x = rect.x - 32
          let y = -(window.innerHeight - rect.top - 22)
          // console.log(getComputedStyle(el, false)['display']) // none
          el.style.display = ''
          // console.log(getComputedStyle(el, false)['display']) // none
          el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)'
          el.style.transform = 'translate3d(0,' + y + 'px,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    droping(el, done) { // 定位小球下落后最终位置
      let rf = el.offsetHeight
      this.$nextTick(() => {
        // console.log('droping')
        // console.log(getComputedStyle(el, false)['display']) // block
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) { // 小球下落结束后，隐藏小球
      // console.log(getComputedStyle(el, false)['display']) // block
      // console.log(el.style.display) // 只能获取行内样式，不能获取css样式，所以输出为空
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
        // console.log(getComputedStyle(el, false)['display']) // none
      }
    },
    toggleList() {
      if (!this.selectFoods.length) {
        this.fold = true
        return
      }
      this.fold = !this.fold
    },
    hideList() { // 隐藏购物车列表
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minPrice) { // 价钱总数小于起送价，不执行结算弹框
        return
      }
      alert(`支付${this.totalPrice}元`)
    },
    empty() { // 清空购物车
      // this.selectFoods = []
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
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
  z-index 50
  // background-color #141d27
  .content
    width 100%
    display flex
    height 48px
    font-size 0
    background-color #141d27
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
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background-color #0f0
        transition all 0.4s linear
  .shopList
    position absolute
    left 0
    top 0
    width 100%
    transform translate3d(0, -100%, 0) // 相对于自身原来的位置向上偏移自身高度的位置
    z-index -1
    &.fold-enter-active, &.fold-leave-active
      transition all 1s
    &.fold-enter, &.fold-leave-to
      transform translate3d(0, 0, 0) // 相对于自身原来的位置向上偏移自身高度的位置
    .listHeader
      line-height 40px
      background-color #f3f5f7
      padding 0 18px
      display flex
      border-1px(rgba(7, 17, 27, 0.1))
      .title
        color rgb(7, 17, 27)
        font-size 14px
        flex 1
      .empty
        color rgb(0, 160, 220)
        font-size 12px
        flex 1
        text-align right
    .listContent
      background-color #fff
      max-height 217px
      padding 0 18px
      overflow hidden
      .food
        padding 12px 0
        display flex
        position relative
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          flex 1
          font-size 14px
          color rgb(7, 17, 27)
        .price
          flex 0 0 110px
          font-size 14px
          color rgb(240, 20, 20)
        .cartControlWrapper
          position absolute
          right -6px
          top 2px
.listMask
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  background-color rgba(7, 17, 27, 0.6)
  z-index 40
  opacity 1
  backdrop-filter blur(10px)
  &.listMask-enter-active, &.listMask-leave-active
    transition all 0.4s
  &.listMask-enter, &.listMask-leave-to
    opacity 0
    background-color rgba(7, 17, 27, 0)
</style>
