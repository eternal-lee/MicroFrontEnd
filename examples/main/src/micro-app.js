import store from '@/store'

const entryUrl = {
  vue: {
    production: window.location.origin + '/subapp/vue/'
  }
}

const microApps = [
  {
    name: 'vue',
    entry: process.env.VUE_APP_VUE,
    activeRule: '/sub-vue/'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    // 自定义判断入口地址 不用每次打包都更改
    entry: process.env.VUE_APP_VUE || entryUrl[item.name][process.env.NODE_ENV],
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
