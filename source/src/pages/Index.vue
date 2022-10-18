<template>
    <div >
        <Top />
    </div>
</template>

<script>
import Top  from '@/components/templates/Top.vue'

export default {
    name: 'Index',
    components: { 
        Top
    },
    data:()=>{
        return {
            }
    },
    beforeCreate:function(){
        window.onbeforeunload = function() {
        };
    },
}
</script>

<style >

</style>