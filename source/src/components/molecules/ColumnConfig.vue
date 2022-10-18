<template>
    <div :class="$style['left-container']" >
        <div>
            <DarkPanel :panel-name="'閉じる'" @click="$emit('close-column-config')"/>
        </div>
        <hr>
        <div>
            <DarkPanel :panel-name="'列の追加'" @click="$emit('add-value-list')"/>
        </div>
        <div>
            <DarkPanel :panel-name="'列の削除'" @click="$emit('delete-value-list')"/>
        </div>
        <hr>
        <div>
            <label  :class="$style['input-area']"
                @keyup.alt.38.exact="sheet.cellDefaultWidth = sheet.cellDefaultWidth+1"
                @keyup.alt.40.exact="sheet.cellDefaultWidth = sheet.cellDefaultWidth-1">
                <div style="font-size:12px">追加列の横幅</div>
                <input 
                    :class="$style['input']"
                    type="range"
                    max="4000"
                    min="85"
                    v-model.number="sheet.cellDefaultWidth"
                    />
                {{sheet.cellDefaultWidth}}px
            </label>
        </div>

        <hr style="border:solid 1px rgb(25,25,25);">
        <hr style="border:solid 1px rgb(25,25,25);">

        <div>
            <label :class="$style['input-area']"
                @keyup.alt.38.exact="titleStyles.width = titleStyles.width+1"
                @keyup.alt.40.exact="titleStyles.width = titleStyles.width-1">
                <div style="font-size:12px">タイトル部の列幅</div>
                <input 
                    :class="$style['input']"
                    type="range"
                    max="4000"
                    min="350"
                    v-model.number="titleStyles.width"
                    />
                {{titleStyles.width}}px
            </label>
        </div>

        <hr style="border:solid 1px rgb(25,25,25);">
        <hr style="border:solid 1px rgb(25,25,25);">

        <div style="font-size:12px">データ部の列幅</div>
        <div v-for="(valueStyleItem,index) in valueStylesValueList"
        :key="valueStyleItem[valueStyleItem.symVueId]" 
        >
            <label :class="$style['input-area']"
                @keyup.alt.38.exact="valueStyleItem.width = valueStyleItem.width+1"
                @keyup.alt.40.exact="valueStyleItem.width = valueStyleItem.width-1">
                <input 
                    :class="$style['input']"
                    type="range"
                    max="4000"
                    min="85"
                    :value="valueStyleItem.width"
                    @change="valuesValueWidth(index,valueStyleItem,$event.target.value)"
                    />
                {{valueStyleItem.width}}px
            </label>
        </div>


    </div>
</template>
<script>
import _ from 'lodash'
import {commonUtilities} from '@/modules/utilities/common.js'
import DarkPanel from '@/components/atoms/DarkPanel.vue'

export default {
    name: 'ColumnConfig',
    components:{
        DarkPanel
    },
    data() { 
        return {
        }
    },
    props:{
        sheet:{
            default:undefined
        },
    },
    computed:{
        titleStyles:{
            get:function(){
                return  this.sheet.content.commonParameter.titleStyles
            },
            set:function(newValue){
                this.sheet.content.commonParameter.titleStyles = newValue
            }
        },
        valueStylesValueList(){
            return commonUtilities.attendVueIdToArray( this.sheet.content.headerItem.valuesStyles.valueList,this.$set)
        }

    },
    methods:{
        titleWidth:_.debounce(function(changeWidth){
            if(changeWidth >= 350){
                this.titleStyles.width = changeWidth
            }else{
                this.titleStyles.width = 350
            }
        },10),
        baseValueWidth:_.debounce(function(changeWidth ){
            if(changeWidth >= 85){
                this.sheet.cellDefaultWidth = changeWidth
            }else{
                this.sheet.cellDefaultWidth = 85
            }
        },10),
        valuesValueWidth(index,valueStyleItem,changeWidthStr){
            let changeWidth =  Number(changeWidthStr)

            if(changeWidth >= 85){
                

                //value
                let itemList = this.sheet.toItemList(this.sheet.content.childItems)
                itemList.forEach((item)=>{
                    if( item.valuesStyles.valueList.length > index){
                        item.valuesStyles.valueList[index].width = changeWidth
                    }
                })
 
                //ヘッダ
                valueStyleItem.width = changeWidth
            }else{
                valueStyleItem.width = 85
            }
        }


        
    },
    
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
    background: rgb(45,45,45);
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

.input-area{
    display: grid;
    width:100%;
}
.input{
    display: grid;
    background-color: rgb(25,25,25);
    color:rgb(241,241,241)
}

</style>
