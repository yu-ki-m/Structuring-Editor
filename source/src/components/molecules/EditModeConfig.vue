<template>
    <div :class="$style['left-container']" >
        <div>
            <DarkPanel :panel-name="'閉じる'" @click="$emit('close-column-config')"/>
        </div>
        <hr>
        <div>
            <TogglePanel :label="'編集モードの設定を固定化する'" :value="editModeConfigFixed" @input="editModeConfigFixed = $event" />
        </div>
        
        <hr  v-if="!editModeConfigFixed">

        <div v-if="!editModeConfigFixed">
            <TogglePanel :label="'作成モード'" :value="editCreator" @input="editCreator = $event" />
        </div>
        <div v-if="!editModeConfigFixed">
            <TogglePanel :label="'自由記入モード'" :value="editFreeWriter" @input="editFreeWriter = $event" />
        </div>
        <div v-if="!editModeConfigFixed">
            <TogglePanel :label="'記入モード'" :value="editWriter" @input="editWriter = $event" />
        </div>
        <div v-if="!editModeConfigFixed">
            <TogglePanel :label="'読み取りモード'" :value="editReader" @input="editReader = $event" />
        </div>

        <hr  v-if="!editModeConfigFixed">

        <div  v-if="!editModeConfigFixed">
            <DarkPanel :panel-name="viewDetails?'詳細を閉じる':'詳細を開く'" @click="viewDetails = !viewDetails"/>
        </div>


        <template v-if="viewDetails">
            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'ヘッダーの値を固定化する'" :value="headerValueFixed" @input="headerValueFixed = $event" />
            </div>
            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'タイトルの値を固定化する'" :value="titleValueFixed" @input="titleValueFixed = $event" />
            </div>
            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'データ部の値を固定化する'" :value="valuesValueFixed" @input="valuesValueFixed = $event" />
            </div>
            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'シートIDの値を固定化する'" :value="sheetIdFixed" @input="sheetIdFixed = $event" />
            </div>
                
            <hr  v-if="!editModeConfigFixed"> 

            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'列を固定化する'" :value="columnsFixed" @input="columnsFixed = $event" />
            </div>
            
            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'行を固定化する'" :value="recordFixed" @input="recordFixed = $event" />
            </div>

            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'データ部の表示有無を固定化する'" :value="valuesHideModeFixed" @input="valuesHideModeFixed = $event" />
            </div>

            <hr  v-if="!editModeConfigFixed">
            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'レコードの非表示操作を固定化する'" :value="recordHideModeFixed" @input="recordHideModeFixed = $event" />
            </div>
            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'タイトル部のオプション表示を利用不可にする'" :value="titleOptionNotAvailable" @input="titleOptionNotAvailable = $event" />
            </div>
            <div v-if="!editModeConfigFixed">
                <TogglePanel :label="'データ部のオプション表示を利用不可にする'" :value="valuesOptionNotAvailable" @input="valuesOptionNotAvailable = $event" />
            </div>
            <hr  v-if="!editModeConfigFixed && !itemJsonViewNotAvailable" >
            <div v-if="!editModeConfigFixed && !itemJsonViewNotAvailable" >
                <TogglePanel :label="'レコードのJSON表示を利用不可にする'" :value="itemJsonViewNotAvailable" @input="itemJsonViewNotAvailable = $event" />
            </div>
        
        </template>
    </div>
</template>
<script>
//import {commonUtilities} from '@/modules/utilities/common.js'
import DarkPanel from '@/components/atoms/DarkPanel.vue'
import TogglePanel from '@/components/molecules/TogglePanel.vue'

export default {
    name: 'EditModeConfig',
    components:{
        DarkPanel,
        TogglePanel
    },
    data() { 
        return {
            viewDetails:false
        }
    },
    props:{
        sheet:{
            default:undefined
        },
    },
    computed:{
        editCreator:{
            get(){
                let isCreator = false
                if(
                    //this.sheet.content.commonParameter.editMode.editModeConfigFixed
                    this.sheet.content.commonParameter.editMode.columnsFixed == false &&
                    this.sheet.content.commonParameter.editMode.recordFixed == false &&
                    this.sheet.content.commonParameter.editMode.headerValueFixed == false &&
                    this.sheet.content.commonParameter.editMode.titleValueFixed == false &&
                    this.sheet.content.commonParameter.editMode.valuesHideModeFixed == false &&
                    this.sheet.content.commonParameter.editMode.valuesValueFixed == false &&
                    this.sheet.content.commonParameter.editMode.sheetIdFixed == false &&
                    this.sheet.content.commonParameter.editMode.recordHideModeFixed == false &&
                    //this.sheet.content.commonParameter.editMode.itemJsonViewNotAvailable == false &&
                    this.sheet.content.commonParameter.editMode.titleOptionNotAvailable == false &&
                    this.sheet.content.commonParameter.editMode.valuesOptionNotAvailable == false
                ){
                    isCreator = true;
                }else{
                    isCreator = false;
                }
                return isCreator;
            },
            set(flg){
                if(flg){
                    //this.$set(this.sheet.content.commonParameter.editMode,"editModeConfigFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"columnsFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"headerValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesHideModeFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"sheetIdFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordHideModeFixed",false)
                    //this.$set(this.sheet.content.commonParameter.editMode,"itemJsonViewNotAvailable",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleOptionNotAvailable",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesOptionNotAvailable",false)
                }
            }
        },
        editFreeWriter:{
            get(){
                let isWriter = false
                if(
                    //this.sheet.content.commonParameter.editMode.editModeConfigFixed
                    this.sheet.content.commonParameter.editMode.columnsFixed == true &&
                    this.sheet.content.commonParameter.editMode.recordFixed == true &&
                    this.sheet.content.commonParameter.editMode.headerValueFixed == true &&
                    this.sheet.content.commonParameter.editMode.titleValueFixed == true &&
                    this.sheet.content.commonParameter.editMode.valuesHideModeFixed == true &&
                    this.sheet.content.commonParameter.editMode.valuesValueFixed == false &&
                    this.sheet.content.commonParameter.editMode.sheetIdFixed == true &&
                    this.sheet.content.commonParameter.editMode.recordHideModeFixed == true &&
                    //this.sheet.content.commonParameter.editMode.itemJsonViewNotAvailable == false &&
                    this.sheet.content.commonParameter.editMode.titleOptionNotAvailable == true &&
                    this.sheet.content.commonParameter.editMode.valuesOptionNotAvailable == false
                ){
                    isWriter = true;
                }else{
                    isWriter = false;
                }
                return isWriter;
            },
            set(flg){
                if(flg){
                    this.$set(this.sheet.content.commonParameter.editMode,"columnsFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"headerValueFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleValueFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesHideModeFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"sheetIdFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordHideModeFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleOptionNotAvailable",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesOptionNotAvailable",false)
                }else{
                    this.$set(this.sheet.content.commonParameter.editMode,"columnsFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"headerValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesHideModeFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"sheetIdFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordHideModeFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleOptionNotAvailable",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesOptionNotAvailable",false)
                }
            }
        },
        editWriter:{
            get(){
                let isWriter = false
                if(
                    this.sheet.content.commonParameter.editMode.columnsFixed == true &&
                    this.sheet.content.commonParameter.editMode.recordFixed == true &&
                    this.sheet.content.commonParameter.editMode.headerValueFixed == true &&
                    this.sheet.content.commonParameter.editMode.titleValueFixed == true &&
                    this.sheet.content.commonParameter.editMode.valuesHideModeFixed == true &&
                    this.sheet.content.commonParameter.editMode.valuesValueFixed == false &&
                    this.sheet.content.commonParameter.editMode.sheetIdFixed == true &&
                    this.sheet.content.commonParameter.editMode.recordHideModeFixed == true &&
                    //this.sheet.content.commonParameter.editMode.itemJsonViewNotAvailable == false &&
                    this.sheet.content.commonParameter.editMode.titleOptionNotAvailable == true &&
                    this.sheet.content.commonParameter.editMode.valuesOptionNotAvailable == true
                ){
                    isWriter = true;
                }else{
                    isWriter = false;
                }
                return isWriter;
            },
            set(flg){
                if(flg){
                    this.$set(this.sheet.content.commonParameter.editMode,"columnsFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"headerValueFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleValueFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesHideModeFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"sheetIdFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordHideModeFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleOptionNotAvailable",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesOptionNotAvailable",true)
                }else{
                    this.$set(this.sheet.content.commonParameter.editMode,"columnsFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"headerValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesHideModeFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"sheetIdFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordHideModeFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleOptionNotAvailable",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesOptionNotAvailable",false)
                }
            }
        },
        editReader:{
            get(){
                let isWriter = false
                if(
                    this.sheet.content.commonParameter.editMode.columnsFixed == true &&
                    this.sheet.content.commonParameter.editMode.recordFixed == true &&
                    this.sheet.content.commonParameter.editMode.headerValueFixed == true &&
                    this.sheet.content.commonParameter.editMode.titleValueFixed == true &&
                    this.sheet.content.commonParameter.editMode.valuesHideModeFixed == true &&
                    this.sheet.content.commonParameter.editMode.valuesValueFixed == true &&
                    this.sheet.content.commonParameter.editMode.sheetIdFixed == true &&
                    this.sheet.content.commonParameter.editMode.recordHideModeFixed == true &&
                    this.sheet.content.commonParameter.editMode.titleOptionNotAvailable == true &&
                    this.sheet.content.commonParameter.editMode.valuesOptionNotAvailable == true
                ){
                    isWriter = true;
                }else{
                    isWriter = false;
                }
                return isWriter;
            },
            set(flg){
                if(flg){
                    this.$set(this.sheet.content.commonParameter.editMode,"columnsFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"headerValueFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleValueFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesHideModeFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesValueFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"sheetIdFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordHideModeFixed",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleOptionNotAvailable",true)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesOptionNotAvailable",true)
                }else{
                    this.$set(this.sheet.content.commonParameter.editMode,"columnsFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"headerValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesHideModeFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesValueFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"sheetIdFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"recordHideModeFixed",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"titleOptionNotAvailable",false)
                    this.$set(this.sheet.content.commonParameter.editMode,"valuesOptionNotAvailable",false)
                }
            }
        },

        editModeConfigFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.editModeConfigFixed
            },
            set(flg){
                if(flg){
                    if(confirm("編集モードが変更できなくなります。\r\n よろしいですか？")){
                        this.$set(this.sheet.content.commonParameter.editMode,"editModeConfigFixed",flg)
                    }
                }else{
                    if(this.sheet.content.commonParameter.editMode.editModeConfigFixed){
                        alert("編集モードが固定化されているため変更できません")
                    }else{
                        this.$set(this.sheet.content.commonParameter.editMode,"editModeConfigFixed",false)
                    }
                }
                
            }
        },


        columnsFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.columnsFixed
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"columnsFixed",flg)
            }
        },
        recordFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.recordFixed
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"recordFixed",flg)
            }
        },
        headerValueFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.headerValueFixed
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"headerValueFixed",flg)
            }
        },
        titleValueFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.titleValueFixed
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"titleValueFixed",flg)
            }
        },
        valuesHideModeFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.valuesHideModeFixed
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"valuesHideModeFixed",flg)
            }
        },
        valuesValueFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.valuesValueFixed
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"valuesValueFixed",flg)
            }
        },
        sheetIdFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.sheetIdFixed
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"sheetIdFixed",flg)
            }
        },
        
        itemJsonViewNotAvailable:{
            get(){
                return this.sheet.content.commonParameter.editMode.itemJsonViewNotAvailable
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"itemJsonViewNotAvailable",flg)
            }
        },
        recordHideModeFixed:{
            get(){
                return this.sheet.content.commonParameter.editMode.recordHideModeFixed
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"recordHideModeFixed",flg)
            }
        },
        titleOptionNotAvailable:{
            get(){
                return this.sheet.content.commonParameter.editMode.titleOptionNotAvailable
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"titleOptionNotAvailable",flg)
            }
        },
        valuesOptionNotAvailable:{
            get(){
                return this.sheet.content.commonParameter.editMode.valuesOptionNotAvailable
            },
            set(flg){
                this.$set(this.sheet.content.commonParameter.editMode,"valuesOptionNotAvailable",flg)
            }
        },
    },
    methods:{ },
    
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

</style>
