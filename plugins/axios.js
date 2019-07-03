import {Message} from "element-ui"
//错误拦截 
//只是axios的插件，用来做拦截

//nuxt.js中写插件只需要暴露一个函数
export default ({$axios})=>{
    // console.log(obj);
    //obj是nuxt.js环境的大对象

    //onError拦截所有的错误请求
    $axios.onError(res=>{
        console.log(res.response);//必须用res.response才能打印
        const{message,statusCode}=res.response.data
        if(statusCode===400){
            Message.warning(message)
        }
    })
}