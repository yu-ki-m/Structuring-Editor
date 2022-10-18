
<template>
    <button 
        tabindex="-1" 
        :class="[$style['panel']]" 
        @click="$emit('click')"
        :style="heightSytle"
        >
        {{ panelName }}
    </button >
</template>

<script>
export default {
    name: 'DarkPanel',

    props:{
        panelName:{
            default:''
        },
        height:{
            default:30
        }
    },
    computed:{
        heightSytle:function(){
            return {'height':this.height+"px"}
        }
    }

    
}
</script>

<style module="$style">
    .panel{
        transition: all 0.5s ;
        margin: 0;
        padding: 0;
        border:none;
        width: 100%;
        background-color: rgb(25,25,25);
        color: rgb(241,241,241);
        cursor: pointer;
        outline: none;
    }
    .panel:hover{
        background-color: rgb(45,45,45);
    }
    .panel:active{
        background-color: rgb(124, 124, 124);
    }
</style>
