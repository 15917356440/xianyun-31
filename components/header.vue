<template>
    <header class="header">
        <!-- 中间内容 -->
        <el-row type="flex" justify="space-between" align="middle" class="main">
            <!-- logo -->
            <div class="logo">
                <nuxt-link to="/">
                    <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
                </nuxt-link>
                
            </div>
            <!-- 菜单栏 -->
            <el-row type="flex" class="navs">
                <nuxt-link to="/">首页</nuxt-link>
                <nuxt-link to="/post">旅游开发</nuxt-link>
                <nuxt-link to="/hotel">酒店</nuxt-link>
                <nuxt-link to="/air">国内机票</nuxt-link>
            </el-row>
            <!-- 登录/用户信息 -->
            <el-row class="user" >
                <!-- 下拉菜单 -->
                <el-dropdown v-if="$store.state.user.userInfo.token">
                    <el-row type="flex" align="middle" class="el-dropdown-link">
                        <!-- 头像 -->
                      <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt="">
                        <!-- 昵称    -->
                      <span>{{$store.state.user.userInfo.user.nickname}}</span>

                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-row>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人中心</el-dropdown-item>
                      <el-dropdown-item >
                          <span @click="handleLogOut">退出</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <div v-else class="login-link">
                    <nuxt-link to="/user/login">登录/注册</nuxt-link>
                </div>
            </el-row>
        </el-row>
        
    </header>
</template>

<script>
export default {
    mounted(){
        // console.log(this.$store.state);
    },
    methods:{
        handleLogOut(){
            this.$store.commit("user/clearUserInfo")
            // console.log(123);
        }
    }
}
</script>

<style lang="less" scoped>
    .header{
        .main{
            .logo{
                width: 156px;
                img{
                    width: 100%;
                }
            }

            .navs{
                flex: 1;
                height: 60px;
                line-height: 60px;
                a{
                    display: block;
                    padding: 0 20px;
                    color: black ;
                    &:hover{
                        border-bottom: 5px solid #409eff;
                        color: #409eff;
                    }
                }
                .nuxt-link-exact-active{
                    background-color: #409eff;
                    color: #fff;
                    &:hover{
                        color: #fff;
                    }
                }
            }

            .user{
                .el-dropdown-link{
                    
                    img{
                        width: 40px;
                        border-radius: 50%;
                        vertical-align: middle;
                        border: 3px solid #fff;
                        &:hover{
                            border: 3px solid #409eff;
                        }
                    }
                }
                
                .login-link{
                    a{
                        color: black;
                        &:hover{
                            color: #409eff;
                        }
                    }
                    
                }
            }
        }
    }
</style>
