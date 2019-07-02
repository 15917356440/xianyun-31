//导入插件
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        // 读取本地存储的数据到store
        //key就是保存到本地的时候的属性名
        createPersistedState({
            key: "store", 
        })(store)
    })
}