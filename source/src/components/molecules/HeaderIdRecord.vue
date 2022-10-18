
<template>
    <div :class="[$style['record-parts']]" 
        :style="recordPartsStyles">
    </div>
</template>

<script>
export default {
    name: 'HeaderIdRecord',
    props:{

        backgroundColor:{
            default:'rgb(25,25,25)'
        },
    },
    computed:{
        recordPartsStyles:function(){
            let backcolor = 'rgb(25,25,25)';
            if(this.backgroundColor != undefined){
                backcolor = this.backgroundColor;
            }else{
                alert("HeaderIdRecord.recordPartsStyles Error")
            }
            return { 'background-color':backcolor}
        }

    }
}
</script>

<style module="$style">
    .record-parts{
        display: grid;
        background-color: rgb(30, 30, 30);
        border-left: solid 1px rgba(51, 54, 53, 1);
    }


</style>
