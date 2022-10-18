
<template>
    <div :class="[$style['delete-cancel-area']]" :style="deleteButtonStyle">
        <button 
             tabindex="-1" 
            :title="title"
            @click="$emit('click')"
            :class="[$style['delete-cancel-button']]" 
            :style="deleteButtonStyle">
            ×
        </button >
    </div>
</template>

<script>
export default {
    name: 'RecordDeleteButton',

    props:{
        backgroundColor:{
            default:'inherit'
        },
        title:{
            default:()=>{ return ''}
        }
    },
    computed:{
        deleteButtonStyle(){
            return { 'background-color':this.backgroundColor };
        }
    },

    
}
</script>

<style module="$style">
    .delete-cancel-area{
        display: grid;
        align-items: center;
        justify-items: center;
        margin: 0;
        padding: 0;
        border-top : solid 1px rgba(51, 54, 53, 1);
    }

    .delete-cancel-button{
        transition: all 0.5s ;
        display: grid;
        align-items: center;
        justify-items: center;
        margin: 0;
        padding: 0;
        border:none;
        outline: none;
        cursor: pointer;
        color: white;
        width: 100%;
        height: 100%;
    }

    .delete-cancel-button:hover{
        box-shadow: inset 0 0 30px 1px rgb(97, 97, 97);
    }
</style>
