<template>
  <div class="game-server-list">
    <div class="game-server-list-wrapper">
      <div class="game-server-list-left">
        <!-- login -->
        <login-block :loginCls="1"></login-block>
        <!-- server -->
        <game-server></game-server>
      </div>
      <div class="game-server-list-right">
        <!-- slider -->
        <div class="slider-wrapper">
          <el-carousel height="317px">
            <el-carousel-item v-for="(item,index) in slider" :key="index">
              <div class="slider-img-wrapper">
                <img :src="item.image" alt="">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- select-server -->
        <div class="select-server" v-loading="servers.length === 0 && !loading">
          <div class="select-server-nav">
            <div class="desc-wrapper">
              <i class="icon unimpeded"></i>
              <span class="text">畅通</span>
              <i class="icon full"></i>
              <span class="text">爆满</span>
              <i class="icon crowd"></i>
              <span class="text">拥挤</span>
              <i class="icon maintain"></i>
              <span class="text">维护</span>
            </div>
            <div class="search-server-input-wrapper">
              快速进入 :
              <div class="search-input-wrapper">
                <input type="text" v-model="searchData" @keyup.13="searchServer">
              </div>
              区
              <div class="search-server-btn" @click="searchServer">搜索</div>
            </div>
          </div>
          <div class="select-server-list-wrapper">
            <ul>
              <!-- <router-link tag="li" v-for="(item,index) in servers" :key="index"
              class="server-list-item" :to="{path: `/game-hall/${item.gid}/${item.sid}`}"> -->
              <li v-for="(item,index) in servers" :key="index" class="server-list-item">
                <a :href="`/game-hall/${item.gid}/${item.sid}`" target="_blank">
                <span class="icon" :class="item.isRecommend"></span>
                <span class="server-name">{{item.serverName}}</span>
                <span class="server-time">{{item.startTime}}</span>
                </a>
              </li>
              <!-- </router-link> -->
              <!-- <li v-for="(item,index) in servers" :key="index" class="server-list-item">

              </li> -->
            </ul>
          </div>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="headers.totalCount"
              :page-size="15"
              :current-page="headers.currentPage"
              @current-change="controlChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import LoginBlock from 'base/login/login'
  import GameServer from 'base/game-server/game-server'
  import { Loading } from 'element-ui'

  import * as ad from 'api/ad'
  import * as server from 'api/server'

  export default {
    created() {
      this.getSlider()
    },
    mounted () {
      this.$nextTick(() => {
        this.getServerList()
      })
      // console.log(this.loading)
    },
    data () {
      return {
        headers: {},
        slider: [],
        servers: [],
        searchData: '',
        loading: false
      }
    },
    methods: {
      getSlider() {
        ad.gameHallSingleSlide()
          .then(res => {
            this.slider = res
          })
      },
      getServerList() {
        this.servers = []
        this.loading = false
        let gid = this.$route.params.gid
        server.gameServerList(gid)
          .then(({data, headers}) => {
            this.servers = data
            this._pagination(headers)
          })
      },
      _pagination(headers) {
        this.headers.currentPage = parseInt(headers['x-pagination-current-page'])
        this.headers.pageCount = parseInt(headers['x-pagination-page-count'])
        // this.headers.perPage = parseInt(headers['x-pagination-per-page'])
        this.headers.totalCount = parseInt(headers['x-pagination-total-count'])
      },
      controlChange(val) {
        let gid = this.$route.params.gid
        let loadingInstance = Loading.service({target: '.select-server'})
        server.choicePagination(gid, val)
          .then(res => {
            this.servers = res
            this.$nextTick(() => {
              loadingInstance.close()
            })
          })
      },
      searchServer() {
        let serverName = this.searchData
        let gid = this.$route.params.gid
        let loadingInstance = Loading.service({target: '.select-server'})
        server.searchServer(gid, serverName)
          .then(res => {
            // console.log(res)
            this.$nextTick(() => {
              loadingInstance.close()
            })
            this.servers = res
            if (this.servers.length === 0) {
              this.loading = true
            }
          })
      }
    },
    components: {
      LoginBlock,
      GameServer
    },
    watch: {
      '$route': 'getServerList'
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable.styl"

  icon()
    display inline-block
    width 5px
    height 8px
    margin-right 3px
    &.unimpeded
      background-color #45d100
    &.full
      background-color $color-special
    &.crowd
      background-color $color-new
    &.maintain
      background-color #cdde64
  .game-server-list
    .game-server-list-wrapper
      wrapper()
      margin-top 71px
      margin-bottom 40px
      .game-server-list-left
        wrapper-left()
        .login-block
          border()
          border-top 2px solid $color-theme
          background-color #f7fafe
          // padding-top 17px
          padding-bottom 17px
          .input-wrapper
            padding 14px
          .input-wrapper.user
            margin-top 15px
          .remember-forget
            padding 0 10px 8px
          .login-btn
            margin-top 0
          .other-login
            padding-top 15px
        .game-server
          height 415px
          margin-top $height-block-top
          border()
      .game-server-list-right
        wrapper-right()
        .slider-img-wrapper
          width 100%
          height 100%
          img
            height 100%
            width 100%
        .select-server
          position relative
          box-sizing border-box
          margin-top $height-block-top
          height 415px
          border()
          padding 0 15px
          .select-server-nav
            margin-bottom 10px
            height 42px
            line-height 42px
            clear-fix()
            .desc-wrapper
              float left
              .icon
                icon()
              .text
                display inline-block
                color $color-text
                padding-right 20px
            .search-server-input-wrapper
              float right
              .search-input-wrapper
                box-sizing border-box
                display inline-block
                margin 0 5px
                line-height 14px
                vertical-align middle
                padding 5px
                width 65px
                border()
                input
                  vertical-align middle
                  width 50px
              .search-server-btn
                btn(66px,24px,3px,$color-theme,$font-size-small,#fff)
                display inline-block
                vertical-align middle
                margin-left 10px
          .select-server-list-wrapper
            clear-fix()
            .server-list-item
              float left
              margin 0 0 15px 12px
              box-sizing border-box
              btn(268px,46px,5px,#f7fafe,$font-size-medium-x,$color-text)
              border()
              height 46px
              width 268px
              &:nth-of-type(3n-2)
                margin-left 0
              &:hover
                background-color #e7f0fc
              .icon
                icon()
              .server-name,.server-time
                display inline-block
                padding-left 20px
                color $color-text
          .pagination
            position absolute
            left 0
            bottom 20px
            width 100%
            text-align center

</style>
