<template>
  <div class="header">
    <div class="contentWrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supportCount" v-if="seller.supports" @click="showDetail=true">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletinWrapper" @click="showDetail=true">
      <span class="bulletin"></span>
      <span class="bulletinText">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- <div class="detail" v-if="showDetail" :class="{moduleBox:showDetail}"> -->
    <transition name="fade">
      <div class="detail" v-if="showDetail">
        <div class="detailWrapper clearfix">
          <div class="detailMain">
            <div class="name">{{seller.name}}</div>
            <div class="starWrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="supportItem" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detailClose" @click="showDetail=false">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import star from '@/components/star/star'
export default {
  data() {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      showDetail: false
    }
  },
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  mounted() {
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.header
  color rgb(255, 255, 255)
  position relative
  background rgba(7, 17, 27, 0.5)
  overflow hidden
  .contentWrapper
    padding 24px 12px 18px 24px
    position relative
    font-size 0
    .avatar
      display inline-block
      vertical-align top
      &>img
        border-radius 2px
    .content
      display inline-block
      margin 2px 0 2px 16px
      .title
        font-size 0
        .brand
          display inline-block
          width 30px
          height 18px
          bg-image('brand')
          background-repeat no-repeat
          background-size cover
          vertical-align top
        .name
          font-size 16px
          line-height 18px
          font-weight bold
          margin-left 6px
      .description
        font-size 12px
        font-weight 100
        line-height 12px
        margin 8px 0 10px 0
      .supports
        font-size 0
        .icon
          display inline-block
          width 12px
          height 12px
          background-repeat no-repeat
          background-size cover
          vertical-align top
          margin-right 4px
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.special
            bg-image('special_1')
          &.invoice
            bg-image('invoice_1')
          &.guarantee
            bg-image('guarantee_1')
        .text
          font-size 10px
          font-weight 100
          line-height 12px
    .supportCount
      position absolute
      right 24px
      bottom 18px
      height 24px
      border-radius 14px
      background rgba(0, 0, 0, 0.2)
      padding 0px 8px
      line-height 24px
      font-size 0
      .count
        font-size 10px
        margin-right 2px
      .icon-keyboard_arrow_right
        font-size 10px
  .bulletinWrapper
    position relative
    padding 0 21px 0 12px
    height 28px
    line-height 28px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    background rgba(7, 17, 27, 0.2)
    // font-size 0
    .bulletin
      display inline-block
      width 22px
      height 12px
      bg-image('bulletin')
      background-repeat no-repeat
      background-size 22px 12px
      vertical-align top
      margin-top 9px
    .bulletinText
      font-size 10px
      line-height 28px
      margin-left 4px
    .icon-keyboard_arrow_right
      position absolute
      right 12px
      bottom 9px
      font-size 10px
      vertical-align top
  .background
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index -1
    filter blur(10px)
  .detail
    width 100%
    height 100%
    position fixed
    top 0
    left 0
    z-index 100
    overflow auto
    background rgba(7, 17, 27, 0.8)
    opacity 1
    backdrop-filter blur(10px)
    &.fade-enter-active, &.fade-leave-active
      transition opacity 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
    // &.moduleBox
    // animation-name opacityChange
    // animation-duration 2s
    // opacity 1
    // @keyframes opacityChange
    // 0%
    // opacity 0
    // 50%
    // opacity 0.5
    // 80%
    // opacity 0.8
    // 100%
    // opacity 1
    .detailWrapper
      width 100%
      min-height 100%
      .detailMain
        padding-bottom 64px
        margin-top 64px
        .name
          font-size 16px
          line-height 16px
          font-weight 700
          text-align center
        .starWrapper
          margin-top 16px
          text-align center
        .title
          width 80%
          margin 28px auto 24px auto
          display flex
          .line
            flex 1
            border-bottom 1px solid rgba(255, 255, 255, 0.2)
            position relative
            top -6px
          .text
            padding 0 12px
            font-weight 700
            font-size 14px
        .supports
          line-height 12px
          margin-left 36px
          .supportItem
            margin-bottom 12px
            font-size 0
            .icon
              display inline-block
              width 16px
              height 16px
              vertical-align top
              background-repeat no-repeat
              background-size cover
              margin-right 6px
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.special
                bg-image('special_2')
              &.invoice
                bg-image('invoice_2')
              &.guarantee
                bg-image('guarantee_2')
            .text
              font-size 12px
        .bulletin
          margin 0 48px
          .content
            font-size 12px
            line-height 24px
    .detailClose
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px
      &>i
        font-size 32px
        color rgba(255, 255, 255, 0.5)
</style>
