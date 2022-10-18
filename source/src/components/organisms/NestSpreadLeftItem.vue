<template>
    <div :class="$style['left-container']" >
        <DarkPanel :panel-name="'Export JSON '" @click="$emit('json-download')"/>
        <DarkPanel :panel-name="'Export HTML '" @click="$emit('html-download')"/>
        <DarkPanel :panel-name="'Import'" @click="$emit('json-import-open')"/>
        <hr v-if="!recordHideModeFixed" >
        <DarkPanel v-if="!recordHideModeFixed" :panel-name="'行の非表示を解除'" @click="$emit('view-hide-item')"/>
        <DarkPanel v-if="!recordHideModeFixed" :panel-name="'非表示行を削除'" @click="$emit('delete-hide-item')"/>
        <hr v-if="!columnConfigDisabled || !editModeConfigDisabled ">
        <DarkPanel v-if="!columnConfigDisabled" :panel-name="'列の設定'" @click="$emit('column-config')"/>
        <DarkPanel v-if="!editModeConfigDisabled"  :panel-name="'編集モードの設定'" @click="$emit('edit-mode-config')"/>
    </div>
</template>
<script>

import DarkPanel from '@/components/atoms/DarkPanel.vue'
export default {
    name: 'NestSpreadLeftItem',
    data() { 
        return {
        }
    },
    props:{
        commonParameter:{
            default:()=>{return {}}
        },
    },
    components:{
        DarkPanel
    },
    computed:{
        recordHideModeFixed(){
            let disabled = this.commonParameter.editMode.recordHideModeFixed
            return disabled
        },
        columnConfigDisabled(){
            let disabled = this.commonParameter.editMode.columnsFixed
            return disabled
        },
        editModeConfigDisabled(){
            let disabled = this.commonParameter.editMode.editModeConfigFixed
            return disabled
        }
    },
    methods:{
    }

}
</script>

<style module="$style">

/* レイアウト */
.left-container{
    overflow-y: scroll;
    overflow-x: hidden;
    background-color:rgb(25,25,25);
    height: 100%;
    width:100%;
    color:rgb(241,241,241);
}
.left-container::-webkit-scrollbar{
    width: 8px;
}
.left-container::-webkit-scrollbar-track{
    background: rgb(59, 59, 59);
    border: none;
    border-radius: 10px;
    box-shadow: inset 0 0 2px rgb(56, 56, 56); 
}
.left-container::-webkit-scrollbar-thumb{
    background: rgb(80, 80, 80);
    border-radius: 4px;
    box-shadow: none;
}

.panel{
    width:100%;
    height:auto;
    display: grid;
}

</style>
