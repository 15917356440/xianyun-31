<template>
    <!-- table栏切换练习 -->
    <!-- <div class="table">
        <div class="table-top">
            <span @click="handleClick(0)" :class="{active:currtonIndex==0}">table1</span>
            <span @click="handleClick(1)" :class="{active:currtonIndex==1}">table2</span>
            <span @click="handleClick(2)" :class="{active:currtonIndex==2}">table3</span>
        </div>
        <div class="table-bottom">
            <div v-if="currtonIndex==0">table1的内容</div>
            <div v-if="currtonIndex==1">table2的内容</div>
            <div v-if="currtonIndex==2">table3的内容</div>
        </div>
    </div> -->

    <!-- 优化 -->
    <div class="table">
        <div class="table-top">
            <span 
            v-for="(item,index) in [`table1`,`table2`,`table3`]"
            :key="index"
            @click="handleClick(index)" 
            :class="{active:currtonIndex==index}">{{item}}</span>
            <!-- <span @click="handleClick(1)" :class="{active:currtonIndex==1}">table2</span>
            <span @click="handleClick(2)" :class="{active:currtonIndex==2}">table3</span> -->
        </div>
        <div class="table-bottom">
            <div v-for="(item,index) in [`table1的内容`,`table2的内容`,`table3的内容`]"
            :key="index"
            >
            <span  v-if="currtonIndex==index"> {{item}}</span>
            </div>
            <!-- <div v-if="currtonIndex==1">table2的内容</div>
            <div v-if="currtonIndex==2">table3的内容</div> -->
        </div>
    </div>


</template>

<script>
export default {
    data(){
        return {
            currtonIndex:0
        }
    },
    methods:{
       handleClick(index){
           this.currtonIndex=index;
       }
    }
}
</script>

<style lang="less" scoped>
    .table{
        width: 800px;
        height: 400px;
        background-color: pink;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -400px;
        margin-top: -200px;
        .table-top{
            span{
                width: 100px;
                height: 50px;
                border: 1px solid #666;
                cursor: pointer;
                
            }
        }
        }
    .active{
                    color: red;
                }
</style>
