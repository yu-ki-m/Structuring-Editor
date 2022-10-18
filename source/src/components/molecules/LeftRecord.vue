
<template>
    <div :class="[$style['record-parts']]" 
        :style="recordPartsStyles">
        <div :class="[$style['inner']]" :title="title">
            <button @click="$emit('after-add-item-click')" :class="[$style['inner-button']]"></button>
        </div>
    </div>
</template>

<script>
import {commonUtilities} from '@/modules/utilities/common.js'
export default {
    name: 'LeftRecord',
    data(){
        return {show:false}
    },
    props:{
        item:{
            default:undefined
        },
        backgroundColor:{
            default:'inherit'
        },


    },
    computed:{
        recordPartsStyles:function(){
            let backcolor = 'inherit';
            if(this.backgroundColor != undefined){
                backcolor = this.backgroundColor;
            }else{
                alert("LeftRecord.recordPartsStyles Error")
            }
            return { 'background-color':backcolor}
        },
        title:function(){
            if(this.item != undefined && this.item.values != undefined  && this.item.values.title != undefined ){
                return commonUtilities.parseHtmlToText(this.item.values.title)
            }else{
                return  "";
            }
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
    .inner{
        transition: all 2s;
        border-right: solid 1px rgba(99, 99, 99,0);
    }

    .inner:hover{
        display: grid;
        border-right: solid 1px rgba(99, 99, 99,1);
    }

    .inner-button{
        display: grid;
        opacity: 0;
        border: none;
        outline: none;
        margin:0px;
        padding:0px;
        cursor: pointer;
    }

</style>
