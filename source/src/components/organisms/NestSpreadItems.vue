<template>
    <div>
        <NestSpreadItem 
            :root="sheet.content"
        ref="nestSpreadItem"/>
    </div>
</template>
<script>
import NestSpreadItem from '@/components/organisms/NestSpreadItem.vue'



export default {
    name: 'NestSpreadItems',
    components:{
        NestSpreadItem,
        //Loading
    },
    data() { 
        return {
        }
    },
    props:{
        sheet:{
            default:()=>{return {}}
        },
        isLoading:{
            default:()=>{return false}
        }
    },
    methods:{
        addChildItem:function(item){
            this.$refs.nestSpreadItem["addChildItem"](item)
        },
        afterAddItem:function(parentItem,index){
            this.$refs.nestSpreadItem["afterAddItem"](parentItem,index)
        },
        beforeAddItem:function(parentItem,index){
            this.$refs.nestSpreadItem["beforeAddItem"](parentItem,index)
        },
        addValueList:function(){
            this.$refs.nestSpreadItem["addValueList"]()
        },
        deleteValueList:function(){
            this.$refs.nestSpreadItem["deleteValueList"]()
        },
        viewHideItem:function(){
            this.$refs.nestSpreadItem["viewHideItem"]()
        },
        deleteHideItem:function(){
            this.$refs.nestSpreadItem["deleteHideItem"]()
        },
    }
}
</script>

<style module="$style">

</style>