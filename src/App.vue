<template>
  <div class="app">
    <k-header></k-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <k-footer></k-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import KHeader from 'components/k-header/k-header'
import KFooter from 'components/k-footer/k-footer'
import {mapActions} from 'vuex'

export default {
  created () {
    // console.log(localStorage.access_token)
    if (localStorage.access_token) {
      this.setUser()
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['setUser'])
  },
  components: {
    KHeader,
    KFooter
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>

