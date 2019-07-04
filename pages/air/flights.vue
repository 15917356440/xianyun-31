<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <flightsFilters :data="flightsData"/>
                
                <!-- 航班头部布局 --> 
                <fightsListHead/>
                
                
                <!-- 航班信息 -->
                <flightsItem 
                v-for="(item,index) in dataList" 
                :key="index" 
                :data="item"
                />

                <!-- 分页栏 -->
                <div class="container">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import fightsListHead from "@/components/air/fightsListHead.vue"
import flightsItem from "@/components/air/flightsItem.vue"
import flightsFilters from "@/components/air/flightsFilters.vue"
export default {
    data(){
        return{
            //航班总数据
            flightsData:{
                flights:[],//默认机票列表
                info:[],
                options:[]
            },
            

            pageIndex:1,//默认显示多少页
            pageSize:5,//默认每页显示多少条
            total:0,//总条数
            dataList:[]//分业后的列表数据
        }
    },
    components:{
        fightsListHead,
        flightsItem,
        flightsFilters
    },
    mounted(){
        // console.log(this.$route.query);
        this.$axios({
            url:"/airs",
            params:this.$route.query
        }).then(res=>{
            console.log(res.data);//不能结构
            this.flightsData=res.data

            this.total=res.data.total

            this.dataList=this.flightsData.flights.slice(0,5)
        })
    },
    methods:{
        //切换条数时触发
        handleSizeChange(value) {   
        // console.log(`每页 ${value} 条`);
        
      },
      //切换页数时触发
      handleCurrentChange(value) {
          this.pageIndex=value
            // console.log(this.pageIndex);
            this.dataList=this.flightsData.flights.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
        // console.log(`当前页: ${value}`);
      }
    }
}
</script>


<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }
    
    .container{
        text-align: center;
    }

    .aside{
        width:240px;
    } 
</style>
