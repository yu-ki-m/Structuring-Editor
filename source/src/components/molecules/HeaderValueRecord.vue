
<template>
    <div :class="[$style['record']]"
        :style="recordStyle"
        ref="headerValueRecordInput"
        >
        <div 
            :class="[$style['cell']]" 
            v-for="valueItem in valueListWithId" 
            :key="valueItem[valueItem.symVueId]" 
            :id="valueItem[valueItem.symVueId]"
            >
            <Cell
                :read-only="readOnly"
                :value="valueItem.value"
                @input="inputValue(valueItem,$event)"
                :placeholder="''" 
                :font-size="17"
                :title="'value'"
                :background-color="backgroundColor"
                :color="'rgb(241, 241, 241)'"
                :font-weight="'500'" 
                :edit-mode="'quill'"
            />
            <div :style="recordRightStyle"></div>
            
        </div>
 
    </div>
</template>

<script>
import Cell from '@/components/molecules/Cell.vue'
import {commonUtilities} from '@/modules/utilities/common.js'
export default {
    name: 'HeaderValueRecord',
    components: { 
        Cell
    },
    props:{
        commonParameter:{
            default:()=>{return {}}
        },
        valueList:{
            default:()=>{ return [] }
        },
        valuesStyles:{
            default:()=>{ return {} }
        },
        backgroundColor:{
            default:'rgb(25,25,25)'
        }
    },
    computed:{
        readOnly:function(){
            return this.commonParameter.editMode.headerValueFixed
        },
        valueListWithId:function(){
            return commonUtilities.attendVueIdToArray(this.valueList,this.$set)
        },
        recordStyle(){
            //以下のようなCSSを割り当てる
            //grid-template-columns:345px 345px 345px 345px;
            let gridTemplateColumns = this.valuesStyles.valueList.reduce((pre,valueItem)=>{
                return pre+valueItem.width+"px ";
            },"");
            return { 'grid-template-columns':gridTemplateColumns };
        },
        recordRightStyle(){
            return { 'background-color':this.backgroundColor}
        }
    },
    methods:{
        
        inputValue(valueItem,$event){
            setTimeout(()=>{
                //入力されたものが反映された後の縦幅を入力させる
                this.valuesStyles.title.height =  this.$refs.headerValueRecordInput.clientHeight
            },500)
            //HeaderValue固定モードの場合は処理をしない
            if(this.commonParameter.editMode.headerValueFixed){
                return 
            }
            valueItem.value = $event
           
        }
    }

    
}
</script>

<style module="$style">
    .record{
        display: grid;
        /*grid-auto-flow: column;*/
    }
    .cell{
        display: grid;
        border-left: solid 1px rgba(51, 54, 53, 1);
        grid-template-columns:auto 20px
    }

</style>
