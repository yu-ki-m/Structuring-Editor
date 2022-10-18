
<template>
    <div :class="[$style['record-parts']]" 
        :style="recordPartsStyles">

        <Infomation 
            :notes="notes"
            :width="647"/>
    </div>
</template>

<script>
import Infomation from '@/components/molecules/Infomation.vue'

export default {
    name: 'IdRecord',
    props:{
        commonParameter:{
            default:()=>{return {}}
        },
        backgroundColor:{
            default:'inherit'
        },
        notes:{
            default:[]
        }

    },
    components:{
        Infomation
    },
    computed:{
        recordPartsStyles:function(){
            let backcolor = 'inherit';
            if(this.backgroundColor != undefined){
                backcolor = this.backgroundColor;
            }else{
                alert("IdRecord.recordPartsStyles Error")
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
        border-top : solid 1px rgba(51, 54, 53, 1);
        border-left: solid 1px rgba(51, 54, 53, 1);

        align-items: center;
        justify-items: center;
    }

</style>
