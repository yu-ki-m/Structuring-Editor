
<template>
    <div :class="[$style['delete-cancel-area']]" :style="deleteButtonStyle">
        <div
            :class="[$style['delete-cancel-button']]" 
            :style="deleteButtonStyle">
        </div >
    </div>
</template>

<script>
export default {
    name: 'HeaderRecordDeleteArea',

    props:{
        backgroundColor:{
            default:'rgb(25, 25, 25)'
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
        border-left:none
        
    }

    .delete-cancel-button{
        display: grid;
        align-items: center;
        justify-items: center;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

</style>
