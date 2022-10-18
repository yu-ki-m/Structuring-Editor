import {commonUtilities} from '@/modules/utilities/common.js'

class Sheet{
    constructor (commonUtilities) {
        this.console = undefined
        this.commonUtilities = commonUtilities
        this.cellDefaultWidth = 300

        this.content = {
            toolVesion:"0.0.1",
            commonParameter:{  
                columnsCount:0,
                editMode:{
                    editModeConfigFixed:false,
                    columnsFixed:false,
                    recordFixed:false,
                    recordHideModeFixed:false,
                    headerValueFixed:false,
                    titleValueFixed:false,
                    valuesHideModeFixed:false,
                    valuesValueFixed:false,
                    itemJsonViewNotAvailable:true,
                    titleOptionNotAvailable:false,
                    valuesOptionNotAvailable:false,
                    sheetIdFixed:false,
                },
                titleStyles:{
                    width:1000
                },
            },
            scriptInfo:{
                scripts:[]
            },
            sheetInfo:{ 
                name:"",
                sheetVersion:"1.0.0",
                sheetId:"",
                exportTimeStamp:""
            },
            headerItem:{
                valuesStyles:{
                    title:{
                        height:29, //エクスポート出力する際のみ使用
                    },
                    valueList:[]
                },
                values:{
                    title:"",
                    valueList:[
                    // {
                    //     value:""
                    // }
                    ],
                },
            },
            childItems:[
                //item が入る
            ]
        }
    }
    changeValueType(index,valueList,type){

        //データ部の値固定化モードの場合は何もしない
        if(this.content.commonParameter.editMode.valuesValueFixed){
            return ;
        }
        //データ部のオプションが利用不可モードの場合は何もしない
        if(this.content.commonParameter.editMode.valuesOptionNotAvailable){
            return ;
        }
        if(valueList == undefined){
            alert("error")
            console.log("error")
        }else{
            if(valueList.length > index){
                if(valueList[index].type!=type){
                    valueList[index].type=type
                    valueList[index].value=''
                }
            
            
            }else{
                alert("error")
                console.log("error")
            }
        
        }



        
    }
    clearValuesTitle(values){
        
        //データ部の値固定化モードの場合は何もしない
        if(this.content.commonParameter.editMode.titleValueFixed){
            return ;
        }


        values.title = ""
    }
    getNewItemTemplate(){
        return {
            valuesStyles:{
                title:{
                    height:29 //エクスポート出力する際のみ使用
                },
                valueList:[]
            },
            values:{
                titleType:"",//現時点では未使用
                title:"",
                valueList:[],
                note:[],
            },
            attribute:{
                metaInfo:[],
                comment:[],
                review:[],
                changeHistory:[],
                hideDate:"",
                deleteRecordDate:"",
                viewValueList:true,
                viewChildItems:true
            },
            childItems:[],
        }
    }
    setConsole(console){
        this.console = console
    }
    getNewComment($set){
        let newItem = {title:"" ,value:""};
        newItem.title = new Date().toLocaleDateString()
        newItem = this.commonUtilities.attendVueIdToObject(newItem,$set,this.commonUtilities.getUniqueStr);
        return newItem;
    }
    beforeAddComment(commentArray,$set){
        commentArray.splice(0,0, this.getNewComment($set))
    }

    getNewReview($set){
        let newItem = {reviewDate:"" ,reviewContent:"",treatmentTime:"",treatment:""};
        newItem.title = new Date().toLocaleDateString()
        newItem = this.commonUtilities.attendVueIdToObject(newItem,$set,this.commonUtilities.getUniqueStr);
        return newItem;
    }
    beforeAddReview(reviewArray,$set){
        reviewArray.splice(0,0, this.getNewReview($set))
    }
    getNewChangeHistory($set){
        let newItem = {title:"" ,value:""};
        newItem.title = new Date().toLocaleDateString()
        newItem = this.commonUtilities.attendVueIdToObject(newItem,$set,this.commonUtilities.getUniqueStr);
        return newItem;
    }
    beforeAddChangeHistory(changeHistoryArray,$set){
        changeHistoryArray.splice(0,0, this.getNewChangeHistory($set))
    }
    getNewNote($set){
        let newItem = {value:""};
        newItem = this.commonUtilities.attendVueIdToObject(newItem,$set,this.commonUtilities.getUniqueStr);
        return newItem;
    }
    beforeAddNote(noteArray,$set){
        noteArray.splice(0,0, this.getNewNote($set))
    }
    afterAddNote(noteArray,$set){
        noteArray.push(this.getNewNote($set))
    }
    getNewMetaInfo($set){
        let newItem = { 
            key:"",
            value:"",
            description:""
        };
        newItem = this.commonUtilities.attendVueIdToObject(newItem,$set,this.commonUtilities.getUniqueStr);
        return newItem
    }
    beforeAddMetaInfo(metaInfoArray,$set){
        metaInfoArray.splice(0,0, this.getNewMetaInfo($set))
    }



    getValueObject($set){
        return this.commonUtilities.attendVueIdToObject(
            {
                value:"",
                type:"quill"
            },
            $set,this.commonUtilities.getUniqueStr);
    }
    getValueStylesObject($set,cellWidth=this.cellDefaultWidth){

        return this.commonUtilities.attendVueIdToObject(
            {
                width:cellWidth
            },
            $set,this.commonUtilities.getUniqueStr);
    }
    createNewItem($set){
        let newItem = this.getNewItemTemplate()
        
        let commonColumnsCount = this.content.commonParameter.columnsCount
        this.columnsAdjust(newItem,commonColumnsCount,$set)
        
        newItem = this.commonUtilities.attendVueIdToObject(newItem,$set,this.commonUtilities.getUniqueStr);
        return newItem
    }

    //一時削除
    //itemのみでも一時削除はできるが一応削除処理と同じ構成にしたいが、$setが必要なため追加
    tempDeleteItem(parentItem,index,$set){
        //行固定モードの場合は処理しない
        if(this.content.commonParameter.editMode.recordFixed){
            return 
        }
        let myItem = parentItem.childItems[index]
        $set(myItem.attribute ,"deleteRecordDate",new Date().toLocaleString())
    }

    deleteItem(parentItem,index,confirm){
        //行固定モードの場合は処理しない
        if(this.content.commonParameter.editMode.recordFixed){
            return 
        }
        let myItem = parentItem.childItems[index]
        let deleteFlag = false;

        if(myItem.values.title != "" 
            || myItem.values.valueList.some((valueItem)=>{ return valueItem.value != ""})
            || myItem.values.note.length > 0
            || myItem.attribute.metaInfo.length > 0
            || myItem.attribute.comment.length > 0
            || myItem.attribute.review.length > 0
            || myItem.attribute.changeHistory.length > 0
            || myItem.childItems.length > 0
            ){
            deleteFlag = confirm("子要素持っている或いは記載のあるレコードです。\nレコードを削除しますか\n　　Space:  確定\n　　Tab    :  選択変更")
        }else{
            deleteFlag = true;
        }
        if(deleteFlag){
            parentItem.childItems.splice(index,1)
        }

    }

    beforeAddItem(parentItem,index,$set){
        //行固定モードの場合は処理しない
        if(this.content.commonParameter.editMode.recordFixed){
            return 
        }
        parentItem.childItems.splice(index,0,this.createNewItem($set))
    }
    afterAddItem(parentItem,index,$set){
        //行固定モードの場合は処理しない
        if(this.content.commonParameter.editMode.recordFixed){
            return 
        }
        let newItem = this.createNewItem($set);
        parentItem.childItems.splice(index+1,0,newItem)
    }
    addChildItem(itemTmp,depthCount,maxDepthCount,$set,alert){
        //行固定モードの場合は処理しない
        if(this.content.commonParameter.editMode.recordFixed){
            return 
        }
        if(depthCount < maxDepthCount){
            let newItem = this.createNewItem($set);
            itemTmp.childItems.splice(0,0,newItem);
        }else{
            alert("これ以上子要素は追加できません")
        }
    }

    //子要素を空にする
    toEmptyChildItem(itemTemp){
        itemTemp.childItems.length = 0
    }

    columnsAdjustForArray(array,array2,commonColumnsCount,$set){
        for(let i=array.length;i>commonColumnsCount;i--){
            array.pop()
            array2.pop()
        }

        //ここで新しいスタイルのオブジェクトの幅計算
        for(let i = array.length;i<commonColumnsCount ;i++){
            
            let cellWidth = this.content.headerItem.valuesStyles.valueList[i].width
            array.push(this.getValueObject($set))
            array2.push(this.getValueStylesObject($set,cellWidth ) )
        }
        
        return array
    }
    columnsAdjust(item,commonColumnsCount,$set){
        this.columnsAdjustForArray(
            item.values.valueList,
            item.valuesStyles.valueList,
            commonColumnsCount,
            $set)
    }
    clearValuesValueData(index,valueList){
        //データ部の値固定化モードの場合は何もしない
        if(this.content.commonParameter.editMode.valuesValueFixed){
            return ;
        }

        if(valueList == undefined){
            alert("error")
            console.log("error")
        }else{
            if(valueList.length > index){
                valueList[index].value = "" //空値を設定
            }else{
                alert("error")
                console.log("error")
            }
        
        }
    }
    addValueList($set){
        //カラム固定モードの場合は処理しない
        if(this.content.commonParameter.editMode.columnsFixed){
            return 
        }
        this.content.commonParameter.columnsCount++;

        //ヘッダの列追加
        if(this.content.headerItem.values.valueList == undefined){
            alert("error")
            console.log("error")
        }else{
            let pushCount = this.content.commonParameter.columnsCount - this.content.headerItem.values.valueList.length
            for(let i = 0;i<pushCount ;i++){
                //パラメータの列を追加
                this.content.headerItem.values.valueList.push(this.getValueObject($set) )
                this.content.headerItem.valuesStyles.valueList.push(this.getValueStylesObject($set,this.cellDefaultWidth) )
            }
        }
        
        //パラメーターの列追加
        let addValueObject = function(childItems){
            if( childItems == undefined ){
                alert("error")
            }else if(childItems.length > 0){
                childItems.forEach(
                    function(item){
                        if(item.values.valueList == undefined){
                            alert("error")
                            console.log("error")
                        }else{
                            this.columnsAdjust(item,this.content.commonParameter.columnsCount,$set)
                        }
                        addValueObject(item.childItems)
                    }.bind(this)
                )
            }else{
                //何もしない
            }
        }.bind(this)
        addValueObject(this.content.childItems)



        
    }
    deleteValueList(){
        //カラム固定モードの場合は処理しない
        if(this.content.commonParameter.editMode.columnsFixed){
            return 
        }

        if(this.content.commonParameter.columnsCount > 0){
            this.content.commonParameter.columnsCount--;
            //パラメーターの列削除
            let deleteValueObject = function(childItems){
                if( childItems == undefined ){
                    alert("error")
                    console.log("error")
                }else if(childItems.length > 0){
                    childItems.forEach(
                        function(item){
                            if(item.values.valueList == undefined){
                                alert("error")
                                console.log("error")
                            }else{
                                if(item.values.valueList.length > 0){
                                    item.values.valueList.pop()
                                    item.valuesStyles.valueList.pop()
                                }
                            }
                            deleteValueObject(item.childItems)
                        }.bind(this)
                    )
                }else{
                    //何もしない
                }
            }.bind(this)
            deleteValueObject(this.content.childItems)


            //ヘッダの列削除
            if(this.content.headerItem.values.valueList == undefined){
                alert("error")
                console.log("error")
            }else{
                if(this.content.headerItem.values.valueList.length > 0){
                    this.content.headerItem.values.valueList.pop()
                    this.content.headerItem.valuesStyles.valueList.pop()
                }
            }  
        } 
    }

    viewHideItem(){
        //行の非表示コントロール固定化モードの場合は何もしない
        if(this.content.commonParameter.editMode.recordHideModeFixed){
            return ;
        }

        let viewItem = (childItems)=>{
            if( childItems == undefined || childItems.length <=0 ){
                return []
            }
            childItems.forEach((itemTmp)=>{
                itemTmp.attribute.hideDate = ""
                itemTmp.childItems = viewItem(itemTmp.childItems)
            })
            return childItems
        }
        this.content.childItems = viewItem(this.content.childItems)
    }
    deleteHideItem(){
        //行固定モードの場合は処理しない
        if(this.content.commonParameter.editMode.recordFixed){
            return 
        }
        //行の非表示コントロール固定化モードの場合は何もしない
        if(this.content.commonParameter.editMode.recordHideModeFixed){
            return ;
        }

        let clearItem = (childItems)=>{
            if( childItems == undefined || childItems.length <=0 ){
                return []
            }
            let childFilterItems = childItems.filter((item=>{return item.attribute.hideDate == "" }))
            childFilterItems.forEach((item)=>{
                item.childItems = clearItem(item.childItems)
            })
            return childFilterItems
        }
        this.content.childItems = clearItem(this.content.childItems)
    }
    hideItem(item){

        //行の非表示コントロール固定化モードの場合は何もしない
        if(this.content.commonParameter.editMode.recordHideModeFixed){
            return ;
        }

        item.attribute.hideDate = new Date().toLocaleString()
    }

    closeChildItems(item){
        if(item.childItems.length > 0){
            item.attribute.viewChildItems = false
        }
    }
    openChildItems(item){
        item.attribute.viewChildItems = true
    }
    changeViewValueList(item){
        item.attribute.viewValueList = !item.attribute.viewValueList
    }

    //item.attributeにdepthCountを追加した
    //itemListを取得する
    //※depthCountを埋め込んでしまうため使用する際は要注意
    toItemListInDepth(childItems){
        let list = []
        let toFlat = function(childItems,list,depthCount){
            depthCount++;

            childItems.reduce(function(list,item){
                this.$set(item.attribute,'depthCount',depthCount)
                list.push(item)
                if( item.childItems != undefined && item.childItems.length > 0 ){
                    toFlat(item.childItems,list,depthCount)
                }else{
                    //何もしない
                }
                return list
            }.bind(this),list)

            return list
        }.bind(this)
        toFlat(childItems,list,0)

        return list;
    }

    //itemRapperにdepthCountを追加した
    //itemRapperListを取得する
    toItemWrapperListWithDepth(childItems){
        let list = []
        let toFlat = function(childItems,list,depthCount){
            depthCount++;

            childItems.reduce((list,item)=>{
                list.push({item,depthCount});
                if( item.childItems != undefined && item.childItems.length > 0 ){
                    toFlat(item.childItems,list,depthCount)
                }else{
                    //何もしない
                }
                return list
            },list)

            return list
        }
        toFlat(childItems,list,0)

        return list;
    }
    
    //itemListを取得する
    toItemList(childItems){
        let list = []
        let toFlat = function(childItems,list){
            childItems.reduce((list,item)=>{
                list.push(item);
                if( item.childItems != undefined && item.childItems.length > 0 ){
                    toFlat(item.childItems,list)
                }else{
                    //何もしない
                }
                return list
            },list)
            return list
        }
        toFlat(childItems,list)
        return list;
    }

    //itemのvaluesListを取得する
    toValuesList(childItems){
        let list = []
        let toFlat = function(childItems,list){
            childItems.reduce((list,item)=>{
                list.push(item.values);
                if( item.childItems != undefined && item.childItems.length > 0 ){
                    toFlat(item.childItems,list)
                }else{
                    //何もしない
                }
                return list
            },list)
            return list
        }
        toFlat(childItems,list)
        return list;
    }

    //itemのvaluesListを取得する
    toStylesList(childItems){
        let list = []
        let toFlat = function(childItems,list){
            childItems.reduce((list,item)=>{
                list.push(item.valuesStyles);
                if( item.childItems != undefined && item.childItems.length > 0 ){
                    toFlat(item.childItems,list)
                }else{
                    //何もしない
                }
                return list
            },list)
            return list
        }
        toFlat(childItems,list)
        return list;
    }
    execCopyItemSt(item){
        sessionStorage.setItem('copy-paste',JSON.stringify(item))
    }
    execPasteItemSt(parentItem,itemIndex){
        let strJsonItem = sessionStorage.getItem('copy-paste')

        let itemTmp = undefined
        if(strJsonItem != null){
            try{
                itemTmp = JSON.parse(strJsonItem)
                parentItem.childItems.splice(itemIndex,1,itemTmp)
            }catch(e){
                console.log(e)
            }
        }else{
            console.log("ペースト失敗")
        }
        return itemTmp ;
    }
}

var sheet = new Sheet(commonUtilities)
export { sheet};