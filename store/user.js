//在nuxt中不需要创建store实例，每个js模块nuxt会自动创建
//需要关注state mutations actions
//mutations把数据存储到store上

//state不能修改，用于声明仓库的数据
export const state =()=>{
    return {
        userInfo:{
            token:"",
            user:{}
        }
    }
}

// export const state=()=>({})


//同步修改states
/* export const mutations={
    setUserInfo:(state,data)=>{
        // console.log(data);
        state.userInfo=data

        // console.log(state.userInfo);
    },
    clearUserInfo(state){
        state.userInfo={
            token:"",
            user:{}
        }
    }
} */

export const mutations=()=>{
    return{
        setUserInfo:(state,data)=>{
            // console.log(data);
            state.userInfo=data
    
            // console.log(state.userInfo);
        },
        clearUserInfo(state){
            state.userInfo={
                token:"",
                user:{}
            }
        }
    }
}

//异步修改states
export const actions={
    // 登录的异步操作
    login({commit},data){
        // console.log(store);
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
          }).then(res => {
            commit("setUserInfo", res.data);

            Promise.resolve()
            // 调用resolve执行外部调用时传入的回调函数，
          });
    }
    
}