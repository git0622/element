<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cartDecrease" v-show="food.count>0" @click="decreaseCart">
        <i class=" inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="carCount" v-show="food.count>0">{{food.count}}</div>
    <div class="cartAdd" @click="addCart">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
        // this.food.count = 1
      } else {
        this.food.count++
      }
      this.$emit('add', event.target) // 点击添加购车事件时，触发父组件addFood函数，（最终目的是生成抛物小球）
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      this.food.count--
    }
  }
}
</script>

<style lang="stylus">
.cartControl
  font-size 0
  .cartAdd, .cartDecrease, .carCount
    display inline-block
    vertical-align top
  .cartAdd, .cartDecrease
    padding 6px
  .cartAdd .icon-add_circle
    display inline-block
    vertical-align top
    font-size 24px
    line-height 24px
    color rgb(0, 160, 260)
  .carCount
    font-size 10px
    line-height 24px
    color rgb(147, 153, 159)
    padding-top 6px
    width 12px
    text-align center
  .cartDecrease
    opacity 1
    transform translate3d(0, 0, 0)
    .inner
      display inline-block
      // vertical-align top
      font-size 24px
      line-height 24px
      color rgb(0, 160, 260)
      transform rotate(0)
      transition all 0.4s
    &.move-enter-active, &.move-leave-active
      transition all 0.4s linear
    &.move-enter, &.move-leave-to
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180deg)
</style>
