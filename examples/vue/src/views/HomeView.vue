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
import { getCurrentInstance, ref } from 'vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const initState = ref('')
    const changeUsername = () => {
      initState.value = {
        user: { name: '李四' + Math.round(Math.random() * 100) }
      }
      proxy.$setGlobalState && proxy.$setGlobalState(initState.value)
    }

    return {
      initState,
      changeUsername
    }
  }
}
</script>
