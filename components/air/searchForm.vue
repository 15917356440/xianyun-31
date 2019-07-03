<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- el-autocomplete远程搜索框-->
                <!-- fetch-suggestions 设置下拉菜单的数据 -->
                <!-- select选中下拉菜单中的值时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate"
                ></el-date-picker>
            </el-form-item>

            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>

            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from "moment";
export default {
data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            form:{
                departCity: "", // 出发城市
                departCode: "", // 出发城市代码
                destCity: "",  // 到达城市
                destCode: "",  // 到达城市代码
                departDate: "", // 日期字符串
            }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            
        },
        
        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收一个数组，数组中的值是一个个对象，对象中的属性有value
        queryDepartSearch(value,cd){
            if(!value){
              return
            }
            this.$axios({
                url:"http://157.122.54.189:9095/airs/city?name="+value,
                method:"GET",
                /* params:{
                  name:value
                } */
            }).then(res=>{
              // console.log(res.data);
              const {data}=res.data
              const newdata=data.map(v=>{
                return{
                  ...v,
                  value:v.name.replace("市","")
                }
              })
              cd(newdata)
            })
        },
      

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
            if(!value){
              return
            }
            this.$axios({
                url:"http://157.122.54.189:9095/airs/city?name="+value,
                method:"GET",
            }).then(res=>{
              const {data}=res.data
              const newdata=data.map(v=>{
                return{
                  ...v,
                  value:v.name.replace("市","")
                }
              })
              cb(newdata)
            })
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            // console.log(item);
            this.form.departCity=item.value
            this.form.departCode=item.sort
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity=item.value
            this.form.destCode=item.sort
        },

        // 确认选择日期时触发
        handleDate(value){
          //  console.log(value);//时间格式不对，需要转换
          this.form.departDate=moment(value).format("YYYY-MM-DD")
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            
        },

        // 提交表单是触发
        handleSubmit(){
          // 自定义规则验证表单输入情况
          const rules={
            depart:{
              value:this.form.departCity,
              message:"请输入出发城市"
            },
            dest:{
              value:this.form.destCity,
              message:"请输入到达城市"
            },
            departDate:{
              value:this.form.departDate,
              message:"请输入出发时间"
            }
          }

          //设置一个验证开关，如果是false代表不通过
          let valid=true

          Object.keys(rules).forEach(v=>{
            // 只要有一个不满足就不执行
            if(!valid) return;

            if(!rules[v].value){
              this.$message.warning(rules[v].message)
              valid=false
            }

            
          })

          // 如果表单验证不通过，就不跳转页面
          if(!valid) return;

            // 跳转列表页
           this.$router.push({
             path:"/air/flights",
             query:this.form
           })


          /* const newrules= Object.keys(rules).map(v=>{
            if(!v.value){
              this.$message.warning(v.message)
            }
          }) */

          // console.log(Object.keys(rules));//[depart,dest,departDate]
          //这么写的话,遍历到的v是depart,dest,departDate，所以v.value取不到值


          
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
