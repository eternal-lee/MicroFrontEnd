<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p>{{ initState }}</p>
    <button @click="changeUsername">改变全局的用户名称</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup() {
    const store = useStore()

    const initState = computed(() => store.state.global.user)
    const changeUsername = () => {
      const user = {
        user: { name: '李四' + Math.round(Math.random() * 100) }
      }
      store.dispatch('global/setGlobalState', user)
    }

    return {
      initState,
      changeUsername
    }
  }
}
</script>
