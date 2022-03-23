import { initGlobalState } from 'qiankun'

// 父应用初始化
const initState = {
  user: {
    name: 'admin'
  }
}

const actions = initGlobalState(initState)

actions.onGlobalStateChange((newState, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('main change', JSON.stringify(newState), JSON.stringify(prev))

  for (const key in newState) {
    initState[key] = newState[key]
  }
})

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = key => {
  return key ? initState[key] : initState
}

export default actions
