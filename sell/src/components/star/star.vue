<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" class="starItem" :class="itemClass" :key="index"></span>
  </div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  // data() {
  //   return {
  //     itemClasses: ['on', 'on', 'on', 'on', 'off']
  //   }
  // },
  props: {
    score: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let interger = Math.floor(score)
      for (let i = 0; i < interger; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.star
  width 100%
  font-size 0
  .starItem
    display inline-block
    background-repeat no-repeat
    background-size cover
  &.star-48
    .starItem
      width 20px
      height 20px
      margin-right 22px
      &:last-child
        margin-right 0
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
  &.star-36
    .starItem
      width 15px
      height 15px
      margin-right 6px
      &:last-child
        margin-right 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.star-36
    .starItem
      width 10px
      height 10px
      margin-right 3px
      &:last-child
        margin-right 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>
