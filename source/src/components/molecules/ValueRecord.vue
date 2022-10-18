
<template>
    <div :class="[$style['record']]"
        :style="recordStyle"
        ref="valueRecordInput"
        >

        <div 
            :class="[$style['cell']]" 
            v-for="(valueItem ,index) in valueListWithId" 
            :key="valueItem[valueItem.symVueId]" 
            :id="valueItem[valueItem.symVueId]"
            @keyup.alt.84.exact="miniMenuOptionEvent(index,'value-cell-mode-datetime')"
            @keyup.alt.71.exact="miniMenuOptionEvent(index,'value-cell-mode-textarea')"
            >
            
            <Cell 
                :read-only="readOnly"
                :value="valueItem.value"
                @input="inputValue(valueItem,$event)"
                :edit-mode='valueItem.type'
                :placeholder="''" 
                :font-size="17"
                :title="'value'"
                :background-color="backgroundColor"
                :color="'rgb(241, 241, 241)'"
                :font-weight="'500'" 
            />
            <div :class="[$style['cell-option-area']]" 
                :style="{'background-color':backgroundColor}"
                >
                <div :class="[$style['cell-option']]" >
                    <ValueRecordOption
                        :common-parameter="commonParameter"
                        :value-item="valueItem"
                        @option-click-event="miniMenuOptionEvent(index,$event)"/>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import {commonUtilities} from '@/modules/utilities/common.js'
import {sheet} from '@/modules/model/sheet.js'
import Cell from '@/components/molecules/Cell.vue'
import ValueRecordOption from '@/components/molecules/ValueRecordOption.vue'
export default {
    name: 'ValueRecord',
    components: { 
        //AutoHeightTextArea,
        ValueRecordOption,
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
            default:'inherit'
        }
    },
    methods:{

        miniMenuOptionEvent(i,key){
            this.$emit('option-click-event',{i,key})
        },
        inputValue(valueItem,$event){
            setTimeout(()=>{
                //入力されたものが反映された後の縦幅を入力させる
                if(this.$refs.valueRecordInput != undefined){
                    this.valuesStyles.title.height =  this.$refs.valueRecordInput.clientHeight
                }
            },500)
            //Values固定モードの場合は処理をしない
            if(this.commonParameter.editMode.valuesValueFixed){
                return 
            }
            valueItem.value = $event
        }
    },
    computed:{
        readOnly:function(){
            return this.commonParameter.editMode.valuesValueFixed
        },
        valueListWithId:function(){
            sheet.columnsAdjustForArray(this.valueList,this.valuesStyles.valueList,this.commonParameter.columnsCount,this.$set)
            return commonUtilities.attendVueIdToArray(this.valueList,this.$set)
        },
        recordStyle(){
            //以下のようなCSSを割り当てる
            //grid-template-columns:345px 345px 345px 345px;
            let gridTemplateColumns = this.valuesStyles.valueList.reduce((pre,valueItem)=>{
                return pre+" "+valueItem.width+"px ";
            },"");
            return { 'grid-template-columns':gridTemplateColumns };
        }
    },

    
}
</script>

<style module="$style">
    .record{
        display: grid;
    }
    .cell{
        display: grid;
        border-top : solid 1px rgba(51, 54, 53, 1);
        border-left: solid 1px rgba(51, 54, 53, 1);
        grid-template-columns:auto 20px
    }
    .cell-option-area{
        display: grid;
        grid-template:
            "..........." 6px
            "cell-option" auto
            "..........." auto
            /auto    ;
        
    }
        .cell-option{
            display: grid;
            grid-area: cell-option;
        }
</style>
