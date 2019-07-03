<template>
    <!-- 注册表单组件 -->
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                placeholder="用户名手机"
                v-model="form.username"
                >
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                placeholder="验证码" 
                v-model="form.captcha">
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                placeholder="你的昵称"
                v-model="form.nickname">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="form.password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkpassword">
                <el-input 
                placeholder="确认密码" 
                v-model="form.checkpassword"
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit"
            >
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        const validatePass=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请再次输入密码"))
            }
            else if(value!==this.form.password){
                callback(new Error("两次输入密码不一致"))
            }
            else{
                callback()
            }
        }

        
        return{
            form:{
                username:"",
                password:"",
                checkpassword:"",//确认密码
                nickname:"",//昵称
                captcha:"",//手机验证码
            },
            rules:{
                username:[
                    {required:true,message:"请输入用户名手机",trigger:"blur"}
                ],
                password:[
                    {required:true,message:"请输入密码",trigger:"blur"}
                ],
                checkpassword:[
                    //自定义验证规则，validator自定义验证的函数
                    {validator:validatePass,trigger:"blur"}
                ],
                nickname:[
                    {required:true,message:"请输入昵称",trigger:"blur"}
                ],
                 captcha: [{ 
                required: true, 
                message: '请输入验证码', 
                trigger: 'blur' 
            }],
            }
        }
    },
    methods:{
        //发送验证码
        handleSendCaptcha(){
            if(this.form.username===""){
                this.$confirm('手机号码不能为空', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })

              return
            }
            //请求验证码接口
            this.$axios({
                url:"/captchas",
                method:"POST",
                data:{
                    tel:this.form.username
                }
            }).then(res=>{
                // console.log(res);
                const {code} =res.data
                alert("验证码是"+code)
            })
        },

        //注册
        handleRegSubmit(){
            // console.log(this.form);
            this.$refs.form.validate(valid=>{
                if(valid){
                    const {checkpassword,...props}=this.form
                    // console.log(props);
                    this.$axios({
                        url:`/accounts/register`,
                        method:"POST",
                        data:props
                    }).then(res=>{
                        // console.log(res.data);
                        this.$store.commit("user/setUserInfo",res.data)
                            this.$message.success("注册并登陆成功，正在跳转页面...")
                            setTimeout(()=>{
                                this.$router.push("/")
                            },1000) 
                        
                    })


                    
                }
            })
        }
    }

}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
