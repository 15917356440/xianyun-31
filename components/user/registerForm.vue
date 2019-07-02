<template>
    <!-- 注册表单组件 -->
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item">
                <el-input 
                placeholder="用户名手机"
                v-model="form.username"
                >
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="验证码" 
                v-model="form.captcha">
                    <template slot="append">
                        <el-button >
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="你的昵称"
                v-model="form.nickname">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="form.password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="确认密码" 
                v-model="form.checkpassword"
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            >
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        return{
            form:{
                username:"",
                password:"",
                checkpassword:"",//确认密码
                nickname:"",//昵称
                captcha:"",//手机验证码
            },
            rules:{}
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
