<template>
    <div >
        <NestSpreadSheet />
    </div>
</template>

<script>
import NestSpreadSheet  from '@/components/templates/NestSpreadSheet.vue'

export default {
    name: 'Index',
    components: { 
        NestSpreadSheet 
    },
    data:()=>{
        return {
            }
    },
    beforeCreate:function(){

        window.onbeforeunload = function() {
                return '未保存のデータがあります。処理を実行しますか？';
        };
    },

}
</script>

<style >

</style>