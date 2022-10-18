<template>
        
    <!-- 初回のみ動作するオブジェクト  -->
    <div v-if="root != null" id="export-html">
        
        <div :style="rootItemStyles"  :class="$style['root-container']"  >
            <NestSpreadSheetInfo 
                :sheet-info="root.sheetInfo"
                :common-parameter="root.commonParameter"
                
            />
            <div   >
                <NestSpreadHeaderItem 
                    :headerItem="root.headerItem"
                    :common-parameter="root.commonParameter"
                />
                <transition-group name="fade">
                    <div
                        v-for="(childItem,childIndex) in rootChildItems" :key="childItem[childItem.symVueId]"> 
                        <NestSpreadItem 
                            :depth-count="1" 
                            :item="childItem" 
                            :parent-item="root" 
                            :item-index="childIndex" 
                            :common-parameter="root.commonParameter"/>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
    <div v-else >

        <div v-if="item == null || depthCount > maxDepthCount">
            <!-- 渡されたオブジェクトがnullであれば、何もしない -->
        </div>
        <div v-else-if="item.attribute.hideDate != ''">
        <!-- 渡されたオブジェクトに非表示日付が入っていた場合、何も表示しない -->
        </div>
        <div v-else-if="item.attribute.hasOwnProperty('deleteRecordDate') &&  item.attribute.deleteRecordDate != ''">
            <!-- 渡されたオブジェクトに削除日付が入っていた場合、何も表示しない -->
            <!-- 上記は現状Trueになることはないが、今後適用する -->
        </div>
        <div v-else >
            
            <!-- 渡されたオブジェクトがnullでなければ  -->
            <!-- ここから実表示 -->
            <!-- 表示モードテキストエリアの場合(表示のみ) -->
            <div v-if="viewMode.value == 'textarea'" >
                <NestSpreadItemTextArea 
                    :view-mode="viewMode"
                    :parent-item="parentItem"
                    :item-index="itemIndex"
                />

            </div >
            <!-- 表示モードテキストエリア以外の場合 -->
            <div v-else
                :class="$style['record-container']" 
                >
                <div :class="$style['record-id']" :style="recordBackColorStyle" >
                    <IdRecord :notes="item.values.note" 
                    :common-parameter="commonParameter"/>
                </div>
                <div  :class="$style['record-title-container']" 
                    @keyup.alt.65.exact="afterAddItem(parentItem,itemIndex)"
                    @keyup.alt.87.exact="beforeAddItem(parentItem,itemIndex)"
                    @keyup.alt.83.exact="addChildItem(item)"
                    @keyup.alt.67.exact="execCopy()"
                    @keyup.alt.86.exact="execPaste()"
                    :style="recordBackColorStyle" 
                    >

                    <TitleRecord
                        :item="item" 
                        :common-parameter="commonParameter" 
                        @option-click-event="miniMenuOptionEvent"
                    />
                </div>
                <div :class="$style['record-value-container']" 
                    @keyup.alt.65.exact="afterAddItem(parentItem,itemIndex)"
                    @keyup.alt.87.exact="beforeAddItem(parentItem,itemIndex)"
                    @keyup.alt.83.exact="addChildItem(item)"
                    >
                    <div style="display:grid">
                        <ValueRecord 
                            v-if="item.attribute.viewValueList"
                            :value-list="item.values.valueList" 
                            :values-styles="item.valuesStyles"
                            :common-parameter="commonParameter" 
                            :background-color="'rgba(44,44,44,1)'"
                             @option-click-event="valueOptionEvent"/>
                    </div>
                    <RecordDeleteButton 
                        :title="titleText+(titleText==''?'削除':'を削除')"
                        :background-color="recordDeleteButtonColor"
                        @click="deleteItem(parentItem,itemIndex)"
                    />
                </div>
                
                <div :class="$style['record-left']" 
                    :style="recordBackColorStyle" 
                    >
                    <LeftRecord :item="item" @after-add-item-click="afterAddItem(parentItem,itemIndex)"/>
                </div>
                <div :class="$style['record-child-container']" >   
                    <div >
                        <div  v-if="item.attribute.viewChildItems">
                            <transition-group name="fade">
                            <div 
                                v-for="(childItem,childIndex) in childItems"  
                                :key="childItem[childItem.symVueId]"> 
                                <NestSpreadItem 
                                    :depth-count="depthCount+1" 
                                    :item="childItem" 
                                    :parent-item="item" 
                                    :item-index="childIndex" 
                                    :common-parameter="commonParameter" />
                            </div>
                            </transition-group>
                        </div>
                        <div v-else>
                                <OpenButton @click="openChildItems" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <transition name="fade-opacity">
            <NoteListModal 
                v-if="viewNote"
                :text-list-title="'備考'" 
                :input-value-list="item.values.note"
                @close-event="viewNote = $event"
                :mode="'note'"
            />
        </transition>
        
        <transition name="fade-opacity">
            <TextListModal 
                v-if="viewComment"
                :text-list-title="'コメント'" 
                :input-value-list="item.attribute.comment"
                @close-event="viewComment = $event"
                :mode="'comment'"
            />
        </transition>
        <transition name="fade-opacity">
            <ReviewListModal 
                v-if="viewReview"
                :text-list-title="'レビュー'" 
                :input-value-list="item.attribute.review"
                @close-event="viewReview= $event"
                :mode="'review'"
            />
        </transition>

        <transition name="fade-opacity">
            <TextListModal 
                v-if="viewChangeHistory"
                :text-list-title="'変更履歴'" 
                :input-value-list="item.attribute.changeHistory"
                @close-event="viewChangeHistory = $event"
                :mode="'change-history'"
            />
        </transition>
        <transition name="fade-opacity">
            <InputListModal
                v-if="viewMarkKey"
                @close-event="viewMarkKey = $event"
                :input-value-list="item.attribute.metaInfo"
            />
        </transition>


    </div>
</template>


<script>
import NestSpreadItem from './NestSpreadItem.vue'
import TitleRecord from '@/components/molecules/TitleRecord.vue'
import ValueRecord from '@/components/molecules/ValueRecord.vue'
import IdRecord from '@/components/molecules/IdRecord.vue'
import LeftRecord from '@/components/molecules/LeftRecord.vue'
import RecordDeleteButton from '@/components/atoms/RecordDeleteButton.vue'
import NestSpreadItemTextArea from '@/components/molecules/NestSpreadItemTextArea.vue'
import TextListModal from '@/components/molecules/TextListModal.vue'
import ReviewListModal from '@/components/molecules/ReviewListModal.vue'
import NoteListModal from '@/components/molecules/NoteListModal.vue'
import InputListModal from '@/components/molecules/InputListModal.vue'
import NestSpreadSheetInfo from '@/components/molecules/NestSpreadSheetInfo.vue'
import OpenButton from '@/components/atoms/OpenButton.vue'


import NestSpreadHeaderItem from '@/components/organisms/NestSpreadHeaderItem.vue'
import {sheet} from '@/modules/model/sheet.js'
import {commonUtilities} from '@/modules/utilities/common.js'
// import _ from 'lodash'


export default {
    name: 'NestSpreadItem',
    components:{
        ValueRecord,
        NestSpreadItem,
        TitleRecord,
        IdRecord,
        LeftRecord,
        RecordDeleteButton,
        NestSpreadItemTextArea,
        TextListModal,
        ReviewListModal,
        NoteListModal,
        InputListModal,
        NestSpreadHeaderItem,
        NestSpreadSheetInfo,
        OpenButton
    },
    data() { 
        return {
            viewMode:{
                value:"rich-dark"
            },
            viewNote:false,
            viewComment:false,
            viewReview:false,
            viewChangeHistory:false,
            viewMarkKey:false,
            maxDepthCount:9,
            deleteButtonWidth:25,
        }
    },
    props:{
        commonParameter:{
            default:()=>{return {}}
        },
        depthCount:{
            default:0
        },
        itemIndex:{
            default:0
        },
        item:{
            default:()=>{ return undefined }
        },
        parentItem:{
            default:()=>{ return undefined }
        },
        root:{
            default:()=>{ return undefined }
        },
    },
    computed:{

        titleText:function(){
            if(this.item != undefined && this.item.values != undefined  && this.item.values.title != undefined ){
                return commonUtilities.parseHtmlToText(this.item.values.title)
            }else{
                return  "";
            }
        },
        recordBackColorStyle:function(){
            let backcolor =   "rgba(34, 34, 34,1)"

            if(this.item != undefined &&
                this.item.childItems != undefined){
                if(this.item.childItems.length <= 0 ){
                    //if(this.depthCount > 1){
                    backcolor = "rgba(40, 40, 40, 1)" ;
                    //}   
                }else if(this.item.childItems.every((tempItem)=>{return tempItem.attribute.hideDate != '' })){
                    backcolor = "rgba(40, 40, 40, 1)" ;
                }
            }


            //}
            return {'background-color': backcolor };
        },
        recordDeleteButtonColor:function(){
            let color = 'rgba(44, 44, 44, 1)';

            if(!this.item.attribute.viewValueList){
                color = this.recordBackColorStyle['background-color'];
            }else if(this.item.values.valueList.length <= 0){
                color = this.recordBackColorStyle['background-color'];
            }else{
                color = 'rgba(44, 44, 44, 1)';
            }
            return color
        },
        childItems:function(){
            if(this.item != undefined && this.item.childItems != undefined){
                return commonUtilities.attendVueIdToArray(this.item.childItems,this.$set);
            }
            return []
        },
        rootChildItems:function(){
            if(this.root != undefined ){
                if(this.root.childItems!= undefined){
                    if(this.root.childItems.length <= 0){
                        this.beforeAddItem(this.root,0)
                    }
                    return commonUtilities.attendVueIdToArray(this.root.childItems,this.$set);
                }
            }
            //this.rootがundefinedになるケースは正常系で想定されているケースであるため、
            //ここでthis.rootがundefinedのときにthis.rootに対して代入処理をしないこと
            return []
        },
        rootItemStyles:function(){
            let styles = {}
            if(this.root != undefined ){
                let titleWidth = this.root.commonParameter.titleStyles.width
                let allWidth = this.root.headerItem.valuesStyles.valueList
                    .reduce((pre,style)=>{ return pre+style.width},titleWidth+this.deleteButtonWidth)

                styles = {width:allWidth+"px"}
            }
            return styles;
        }
    },
    
    methods:{
        //列を追加
        addValueList:function(){
            sheet.addValueList(this.$set)
        },
        //列を削除
        deleteValueList:function(){
            sheet.deleteValueList()
        },
        viewHideItem:function(){
            sheet.viewHideItem()
        },
        deleteHideItem:function(){
            sheet.deleteHideItem()
        },
        addChildItem:function(item){
            sheet.addChildItem(item,this.depthCount,this.maxDepthCount,this.$set,alert)
        },
        afterAddItem:function(parentItem,index){
            sheet.afterAddItem(parentItem,index,this.$set)
        },
        beforeAddItem:function(parentItem,index){
            sheet.beforeAddItem(parentItem,index,this.$set)
        },
        deleteItem:function(parentItem,index){
            sheet.deleteItem(parentItem,index,confirm)
            //sheet.tempDeleteItem(parentItem,index,this.$set)
        },
        hideItem:function(){
            sheet.hideItem(this.item)
        },
        changeViewValueList:function(){
            sheet.changeViewValueList(this.item)
        },
        closeChildItems(){
            sheet.closeChildItems(this.item)
        },
        openChildItems(){
            sheet.openChildItems(this.item)
        },
        valueOptionEvent(v){
            if(v != undefined){
                let index = v.i//valueListのインデックス
                let key = v.key//イベントキー名
                if(key == 'value-cell-clear'){
                    if(index != undefined){
                        sheet.clearValuesValueData(index,this.item.values.valueList)
                    }else{
                        alert("error")
                        console.log("error")
                    }
                }else if(key == 'value-cell-mode-free'){
                    if(index != undefined){
                        sheet.changeValueType(index,this.item.values.valueList,'quill')
                    }else{
                        alert("error")
                        console.log("error")
                    }
                }else if(key == 'value-cell-mode-datetime'){
                    if(index != undefined){
                        sheet.changeValueType(index,this.item.values.valueList,'datetime')
                    }else{
                        alert("error")
                        console.log("error")
                    }
                }else if(key == 'value-cell-mode-textarea'){
                    if(index != undefined){
                        sheet.changeValueType(index,this.item.values.valueList,'plain')
                    }else{
                        alert("error")
                        console.log("error")
                    }
                }else{
                    alert('未実装:'+key)
                }
            }else{
                alert("error")
                console.log("error")
            }
        },
        miniMenuOptionEvent(key){
            if(key == "add-child-item"){
                this.addChildItem(this.item)
            }else if(key == "after-add-item"){
                this.afterAddItem(this.parentItem,this.itemIndex)
            }else if(key == "before-add-item"){
                this.beforeAddItem(this.parentItem,this.itemIndex)
            }else if(key == "to-json-from-item"){
                this.viewMode.value = "textarea"
            }else if(key == 'change-view-note'){
                this.viewNote = true
            }else if(key == 'change-view-comment'){
                this.viewComment = true
            }else if(key == 'change-view-review'){
                this.viewReview = true
            }else if(key == 'change-view-change-history'){
                this.viewChangeHistory = true
            }else if(key == 'change-view-mark-key'){
                this.viewMarkKey = true
            }else if(key == 'hide-item'){
                this.hideItem()
            }else if(key == 'change-view-value-list'){
                this.changeViewValueList()
            }else if(key == 'close-child-items'){
                this.closeChildItems()
            }else if(key == 'title-cell-clear'){
                sheet.clearValuesTitle(this.item.values)
            }else if(key == 'item-copy'){
                this.execCopy()
            }else if(key == 'item-paste'){
                this.execPaste()
            }else{
                alert('未実装:'+key)
            }
        },
        execCopy(){
            sheet.execCopyItemSt(this.item)
        },
        execPaste(){
            sheet.execPasteItemSt(this.parentItem,this.itemIndex)
        }
    },
    watch:{
        'item.childItems':{
            handler:function() {
                //自身がmaxDepthCountである場合、持っている子要素を削除する
                if(this.depthCount >= this.maxDepthCount){
                    sheet.toEmptyChildItem(this.item)
                }
            }
        }

    }
}
</script>

<style module="$style">
.root-container{
    border-bottom : solid 1px rgba(51, 54, 53, 1);
    border-right : solid 1px rgba(51, 54, 53, 1);
}

/* レイアウト */
.record-container{
    display: grid;
    grid-template:
    "record-id   record-title-container record-title-container record-value-container" auto
    "record-left record-child-container record-child-container record-child-container" auto
    /28px        1fr                    0.5vw                  auto          ;
    transition: background-color 0.5s;
}
    .record-id{
        grid-area:record-id ;
    }
    .record-title-container{
        grid-area:record-title-container ;
    }
    .record-value-container{
        grid-area:record-value-container ;
    }
    .record-left{
        grid-area: record-left;
    }
    .record-child-container{
        grid-area:record-child-container;
    }
    .record-id{
        display: grid;
    }
    .record-title-container{
        display: grid;
    }
    .record-value-container{
        display: grid;
        grid-template-columns:auto 25px;
    }
    .record-left{
        display: grid;
    }
    .record-child-container{
        display: grid;
    }


</style>
<style scoped>
 
/* .fade-move{
    transition: transform 0.5s;
} */
.fade-enter{  /* 現れるときの最初の状態 */ }
.fade-enter-active{
    /* 現れるときのトランジションの状態 */
    animation: add-record 0.25s;
}
.fade-enter-to{ /* 現れるときの最後の状態 */}

 .fade-leave{ /* 消えるときの最初の状態 */ }
.fade-leave-active{
    /* 消えるときのトランジションの状態 */
    animation: delete-record 0.25s;
   
 }
 .fade-leave-to{ /* 消えるときのの最後の状態 */ }

 @keyframes add-record {
  0% {
    opacity: 0;
    max-height: 0px;
  }
  
  60% {
    opacity: 0.01;
    max-height: 40px
  }
  70% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.99;
    max-height: 800px;
  }
}

 @keyframes delete-record {
  0% {
    opacity: 1;
    max-height: 40px;
  }
  
  50% {
    opacity: 0.1;
    max-height: 10px;
  }
  100% {
    opacity: 0;
    max-height: 0px;
  }
}


</style>



<style scoped>
.fade-opacity-enter{
    /* 現れるときの最初の状態 */
    opacity: 0;

}
.fade-opacity-enter-active{
    /* 現れるときのトランジションの状態 */
    transition: opacity 0.5s ;
}
.fade-opacity-enter-to{
    /* 現れるときの最後の状態 */
    opacity: 1;
}
 .fade-opacity-leave{
    /* 消えるときの最初の状態 */
   opacity: 1;
 }
.fade-opacity-leave-active{
    /* 消えるときのトランジションの状態 */
    transition: opacity 0.5s;
 }
 .fade-opacity-leave-to{
    /* 消えるときのの最後の状態 */
    opacity: 0;
 }
</style>