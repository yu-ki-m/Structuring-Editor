<template>
    <div>
        <NotificationTag ref="notification"/>
        <DropArea :sheet="sheet"  ref="droparea"/>
        <div :class="$style['main-container']" >
            <div style="display:grid;">
                <ColumnConfig 
                    v-if="left=='column-config'"
                    :sheet="sheet"
                    @close-column-config="left= 'normal'"
                    @add-value-list="addValueList"
                    @delete-value-list="deleteValueList"
                />
                <EditModeConfig
                    v-else-if="left=='edit-mode-config'"
                    :sheet="sheet"
                    @close-column-config="left= 'normal'"
                />

                <NestSpreadLeftItem
                    v-else
                    :common-parameter="sheet.content.commonParameter"
                    @edit-mode-config="editModeConfig"
                    @column-config="columnConfig"
                    @add-value-list="addValueList"
                    @delete-value-list="deleteValueList"
                    @view-hide-item="viewHideItem"
                    @delete-hide-item="deleteHideItem"
                    @json-download="jsonDownload"
                    @json-import-open="jsonImportOpen"
                    @html-download="htmlDownload"
                />
            </div>
            <div  style="display:grid;" >
                <NestSpreadItems 
                    :sheet="sheet"
                ref="nestSpreadItems"/>
            </div>
        </div>
        <Loading :is-loading="isLoading"/>
    </div>
</template>
<script>
import NestSpreadLeftItem from '@/components/organisms/NestSpreadLeftItem.vue'
import NestSpreadItems from '@/components/organisms/NestSpreadItems.vue'
import DropArea from '@/components/molecules/DropArea.vue'
import NotificationTag from '@/components/atoms/NotificationTag.vue'
import {sheet} from '@/modules/model/sheet.js'
import {commonUtilities} from '@/modules/utilities/common.js'
import ColumnConfig from '@/components/molecules/ColumnConfig.vue'
import EditModeConfig from '@/components/molecules/EditModeConfig.vue'
import Loading from '@/components/atoms/Loading.vue'

import  {mapGetters} from 'vuex';

export default {
    name: 'NestSpreadItemContainer',
    components:{
        NestSpreadItems,
        NestSpreadLeftItem,
        DropArea,
        NotificationTag,
        ColumnConfig,
        EditModeConfig,
        Loading
    },
    data() { 
        return {
            sheet,
            left:"normal",
            isLoading:true
        }
    },
    computed:{
        ...mapGetters([
            'EditTemplate/getValue',//  -> this['EditTemplate/getValue']
        ])
    },
    beforeCreate:function(){
        sheet.setConsole(console)

    },
    created: function(){

        (()=>{
            //1.ローディング有効化
            this.isLoading = true//ローディング制御

            //2.遷移時の画面のtimeURLクエリを取得(後の画面遷移検知用)
            let nowTime = this.$route.query.time

            //3.場合によっては初期化処理を挿入する
            
            //4.カウントアップ用の変数
            let count = 0;
            //5.setTimeoutで特定回数まで関数をネスト呼び出し、取得できるまで続ける
            let getQuery = ()=>{
                setTimeout(()=>{
                    count++;
                    //5.1. この時点で画面がほかの画面に切り替えられていれば打ち切り
                    if(nowTime != this.$route.query.time){
                        return;
                    }
                    //5.2. 50回を超えたら処理を強制的に打ち切る （データ取得失敗、スーパーリロード、etc）
                    if(count > 50){
                        this.isLoading = false; //ローディング制御
                        alert("データの取得に失敗しました")
                        this.$router.push( { name: 'top' ,query:{ time: Date.now()}});
                        return ;
                    }     
                    //5.3. vuexから処理を取得
                    let contentTmp = this['EditTemplate/getValue']
                    if(contentTmp == undefined ){
                        //5.4. 取得したデータがundefinedであれば再度取得処理実行
                        getQuery()
                    }else {
                        //5.5. 取得したデータがundefinedでなければデータを反映し処理終了
                        this.sheet.content = contentTmp;
                        this.isLoading = false; //ローディング制御
                        setTimeout(()=>{//一番上にスクロール
                            if(nowTime != this.$route.query.time){ return; } //一応画面が切り替わっていれば無効化
                            scrollTo(0,0)
                        },200)
                        
                    }
                },100)
            }
            getQuery()
        })()
        //////////////////////////////////////////////////////////
    },
    beforeMount:function(){

    },
    mounted:async function(){

    },
    methods:{
        columnConfig:function(){
            this.left= 'column-config'
        },
        editModeConfig:function(){
            this.left= 'edit-mode-config'
        },
        addChildItem:function(item){
            this.$refs.nestSpreadItems["addChildItem"](item)
        },
        afterAddItem:function(parentItem,index){
            this.$refs.nestSpreadItems["afterAddItem"](parentItem,index)
        },
        beforeAddItem:function(parentItem,index){
            this.$refs.nestSpreadItems["beforeAddItem"](parentItem,index)
        },
        addValueList:function(){
            this.$refs.nestSpreadItems["addValueList"]()
        },
        deleteValueList:function(){
            this.$refs.nestSpreadItems["deleteValueList"]()
        },
        viewHideItem:function(){
            this.$refs.nestSpreadItems["viewHideItem"]()
        },
        deleteHideItem:function(){
            this.$refs.nestSpreadItems["deleteHideItem"]()
        },
        
        jsonDownload( ){
            commonUtilities.jsonDownload(sheet.content.sheetInfo.name,
            sheet.content.sheetInfo.sheetVersion,
            sheet.content.sheetInfo.exportTimeStamp,
            sheet.content,
             document )
        },
        htmlDownload( ){
            commonUtilities.htmlBodyDownload(
            sheet.content.sheetInfo.name,
            sheet.content.sheetInfo.sheetVersion,
            sheet.content.sheetInfo.exportTimeStamp,
            sheet.content,
            document )
        },
        jsonImportOpen(){
            this.$refs.droparea["open"]()
        },
        notification(title,content){
            this.$refs.notification['notice'](title,content)
        },
    }
}
</script>

<style module="$style">

.main-container{
    display: grid;
    grid-template-columns:150px auto ;
    min-height: 680px;
    
}
</style>