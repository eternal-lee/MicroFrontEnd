<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <div class="logo">QIANKUN-EXAMPLE</div>
      <ul class="sub-apps">
        <li
          v-for="item in microApps"
          :class="{ active: item.activeRule === current }"
          :key="item.name"
          @click="goto(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="userinfo">主应用的state：{{ JSON.stringify(state) }}</div>
    </div>
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import microApps from './micro-app'
import store from './store/index'
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'
export default {
  name: 'App',
  setup() {
    const { proxy: _self } = getCurrentInstance()
    const isLoading = ref(true)
    const current = ref('')

    const state = computed(() => store.getGlobalState())

    onMounted(() => {
      bindCurrent()
      NProgress.start()
      listenRouterChange()
    })

    watch(isLoading, val => {
      if (val) {
        NProgress.start()
      } else {
        _self.$nextTick(_ => {
          NProgress.done()
        })
      }
    })

    const goto = item => {
      history.pushState(null, item.activeRule, item.activeRule)
    }
    const bindCurrent = () => {
      const path = window.location.pathname
      if (microApps.findIndex(item => item.activeRule === path) >= 0) {
        current.value = path
      }
    }
    const listenRouterChange = () => {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', bindCurrent)
      window.addEventListener('popstate', bindCurrent)
    }

    onUnmounted(() => {
      window.removeEventListener('pushState', bindCurrent)
      window.removeEventListener('popstate', bindCurrent)
    })

    return {
      isLoading,
      microApps,
      current,
      state,
      goto,
      bindCurrent,
      listenRouterChange
    }
  }
}
</script>

<style lang="less">
html,
body {
  margin: 0 !important;
  padding: 0;
}
.layout-wrapper {
  .layout-header {
    height: 50px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    line-height: 50px;
    position: relative;
    .logo {
      float: left;
      margin: 0 50px;
    }
    .sub-apps {
      list-style: none;
      margin: 0;
      li {
        list-style: none;
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;
        &.active {
          color: #42b983;
          text-decoration: underline;
        }
      }
    }
    .userinfo {
      position: absolute;
      right: 100px;
      top: 0;
    }
  }
}
</style>
