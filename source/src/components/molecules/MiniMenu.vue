
<template>
 
    <div
        :class="[$style['mini-menu']]" >
        <button  tabindex="-1"  :class="[$style['title-option-button']]"
            
            :style="commonParameter.editMode.titleOptionNotAvailable?{cursor:'not-allowed'}:{}"

            v-on:click="quickChangeTitleOptionStaticPosition(true,$event)" >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="15px"  height="15px"
                viewBox="-0.5 -0.5 11 28">
                <g>
                    <ellipse cx="5" cy="14" rx="3" ry="3" fill="rgb(70, 70, 70)" stroke="none" />
                    <ellipse cx="5" cy="24" rx="3" ry="3" fill="rgb(70, 70, 70)" stroke="none" />
                    <ellipse cx="5" cy="5"  rx="3" ry="3" fill="rgb(70, 70, 70)" stroke="none" />
                </g>
            </svg>
        </button>

        <div :class="[$style['title-option-list-background']]" 
            v-if="titleOption"
            @click.exact="changeTitleOption(false)"
            >
            <!-- 透明な背景 -->
        </div>
        <!-- mouseenter,mouseleaveは同じ要素に指定したほうがいいかも？ -->
        <div 
            @mouseenter.exact="changeTitleOption(true);"
            @mouseleave.exact="changeTitleOption(false)"
            v-if="titleOption"  
            :class="[$style['title-option-list']]" 
            :style="styles"
            >
            <button :class="[$style['title-option-list-button']]" 
                :disabled="hideDataColumnDisabled.disabled"
                :style="hideDataColumnDisabled.style"
                @click="optionClickEvent('change-view-value-list');
                changeTitleOption(false);
                quickChangeTitleOption(false);">
                <span :class="[$style['title-option-list-name']]">{{ viewValueList? 'データ列を非表示にする':'データ列を表示にする'}}</span>
            </button>

            <button :class="[$style['title-option-list-button']]" 
                :disabled="hideItemDisabled.disabled"
                :style="hideItemDisabled.style"
                @click="optionClickEvent('hide-item')">
                <span :class="[$style['title-option-list-name']]">行の非表示</span>
                <span :class="[$style['title-option-list-short-key']]"></span>
            </button>

            <button :class="[$style['title-option-list-button']]" 
                @click="optionClickEvent('close-child-items')">
                <span :class="[$style['title-option-list-name']]">子要素の省略</span>
                <span :class="[$style['title-option-list-short-key']]"></span>
            </button>

            <button :class="[$style['title-option-list-button']]" 
                :disabled="addChildItemDisabled.disabled"
                :style="addChildItemDisabled.style"
                @click="optionClickEvent('add-child-item')" >
                <div :class="[$style['title-option-list-name']]">子要素を追加する</div>
                <div :class="[$style['title-option-list-short-key']]">Alt  + S</div>
            </button>
            
            <button :class="[$style['title-option-list-button']]" 
                :disabled="afterAddItemDisabled.disabled"
                :style="afterAddItemDisabled.style"
                @click="optionClickEvent('after-add-item')">
                <span :class="[$style['title-option-list-name']]">行を後ろに追加する</span>
                <span :class="[$style['title-option-list-short-key']]">Alt  + A</span>
            </button>

            <button :class="[$style['title-option-list-button']]" 
                :disabled="beforeAddItemDisabled.disabled"
                :style="beforeAddItemDisabled.style"
                @click="optionClickEvent('before-add-item')" >
                <span :class="[$style['title-option-list-name']]">行を前に追加する</span>
                <span :class="[$style['title-option-list-short-key']]">Alt  + W</span>
            </button>

            <button :class="[$style['title-option-list-button']]" 
                @click="optionClickEvent('item-copy')">
                <span :class="[$style['title-option-list-name']]">コピー</span>
                <span :class="[$style['title-option-list-short-key']]">Alt  + C</span>
            </button>

            <button :class="[$style['title-option-list-button']]" 
                :disabled="itemPasteDisabled.disabled"
                :style="itemPasteDisabled.style"
                @click="optionClickEvent('item-paste')" >
                <span :class="[$style['title-option-list-name']]">ペースト</span>
                <span :class="[$style['title-option-list-short-key']]">Alt  + V</span>
            </button>
        </div>
    </div>

</template>

<script>


import _ from 'lodash'
export default {
    name: 'MiniMenu',
    data() { 
        return {
            titleOption: false,

            styles:{
                left:'0px'
            }
        }
    },
    props:{
        viewValueList:{
            default:false
        },
        commonParameter:{
            default:()=>{return {}}
        },

    },
    computed:{
        itemPasteDisabled(){
            let isDisabled = false
            let disabled = false
            let style = {}

            if(this.commonParameter.editMode.valuesHideModeFixed){
                isDisabled = true
            }else if(this.commonParameter.editMode.recordFixed){
                isDisabled = true
            }else if(this.commonParameter.editMode.titleValueFixed){
                isDisabled = true
            }else if(this.commonParameter.editMode.valuesValueFixed){
                isDisabled = true
            }


            if(isDisabled){
                disabled = true
                style = {'color':'gray','cursor':'not-allowed'}
            }else{
                disabled = false
                style = {}
            }


            return {disabled,style}
        },
        hideDataColumnDisabled(){
            let disabled = this.commonParameter.editMode.valuesHideModeFixed
            let style = (this.commonParameter.editMode.valuesHideModeFixed)?{'color':'gray','cursor':'not-allowed'}:{}
            return {disabled,style}
        },
        addChildItemDisabled(){
            let disabled = this.commonParameter.editMode.recordFixed
            let style = (this.commonParameter.editMode.recordFixed)?{'color':'gray','cursor':'not-allowed'}:{}
            return {disabled,style}
        },
        afterAddItemDisabled(){
            let disabled = this.commonParameter.editMode.recordFixed
            let style = (this.commonParameter.editMode.recordFixed)?{'color':'gray','cursor':'not-allowed'}:{}
            return {disabled,style}
        },
        beforeAddItemDisabled(){
            let disabled = this.commonParameter.editMode.recordFixed
            let style = (this.commonParameter.editMode.recordFixed)?{'color':'gray','cursor':'not-allowed'}:{}
            return {disabled,style}
        },

        hideItemDisabled(){
            let disabled = this.commonParameter.editMode.recordHideModeFixed
            let style = (this.commonParameter.editMode.recordHideModeFixed)?{'color':'gray','cursor':'not-allowed'}:{}
            return {disabled,style}
        },

    },
    methods:{
        chageTitleOptionDebounce:_.debounce(function(flag) {
            this.titleOption = flag
        }, 300),
        changeTitleOption:function(flag){
            this.chageTitleOptionDebounce(flag);
        },
        quickChangeTitleOptionStaticPosition:function(flag,event){
            //Titleオプション表示無効化
            if(this.commonParameter.editMode.titleOptionNotAvailable){
                this.titleOption  = false //一応非表示を設定
                return 
            }

            this.styles.left = ''+event.pageX+'px';
            this.titleOption = flag
        },
        quickChangeTitleOption:function(flag){
            this.titleOption = flag
        },
        optionClickEvent:function(key){
            let notCloseKeys = ['add-child-item','after-add-item','before-add-item']
            let isNotClose =  notCloseKeys.find((k)=>{  return key == k})
            if(!isNotClose){
                this.titleOption=false;
            }

            //jsonView無効化モード
            if( key == 'to-json-from-item'){
                if(this.commonParameter.editMode.itemJsonViewNotAvailable){
                    return 
                }
            }
            //Values列の非表示有無変更無効化モード
            if( key == 'change-view-value-list'){
                if(this.commonParameter.editMode.valuesHideModeFixed){
                    return 
                }
            }
            

            this.$emit('option-click-event',key)
        }
    }
    
}
</script>

<style module="$style">
.mini-menu{
    display: grid;
}

.title-option-list-background{
    position: fixed;
    width: 100%;
    height:100%;
    background: rgb(0, 0, 0);
    opacity: 0;
    left:0;
    top:0;
    z-index: 40;
}


.title-option-list{
    z-index: 50;
    display: grid;
    grid-template:
    ".............." auto
    ".............." auto
    ".............." auto
    ".............." auto
    ".............." auto
    ".............." auto
    ".............." auto
    /auto          ;
}

.title-option-list-button{
    display: grid;
    grid-template:
    "title-option-list-name title-option-list-short-key" auto
    /auto                   100px     ;
}

.title-option-list-name{
    display: grid;
    grid-area: title-option-list-name;
}

.title-option-list-short-key{
    display: grid;
    grid-area: title-option-list-short-key;
}

.title-option-button{
    display: grid;
    outline: none;
    border:none;
    margin:0px;
    padding:0px;

    justify-items: center;/*左右中央*/
    align-items: center;/*上下中央*/
    
    width:15px;
    height:15px;
    cursor: pointer;
    background-color: inherit;
    color: rgb(241, 241, 241);
}

.title-option-list{
    position: absolute;
    border-radius: 4px;
    transform: translateX(-160px) translateY(-10px);
    background-color: rgb(49, 49, 49);
    
}

.title-option-list-button{
    transition: all 0.5s ;
    display: grid;
    outline: none;
    border:none;
    color: rgb(241, 241, 241);
    width:300px;
    margin:0px;
    padding:0px;
    align-items: center;/*上下中央*/
    cursor: pointer;
    height:35px;
    background-color: rgb(49, 49, 49);
    padding-left: 20px;
    padding-right: 20px;
}

.title-option-list-button:hover{
    background-color: rgb(97, 96, 96);
}

.title-option-list-name{
    display: grid;
    justify-items: center;/*左右中央*/
    align-items: center;/*上下中央*/
}


.title-option-list-short-key{
    display: grid;
    justify-items: right;
    color: gray;
    font-size: 5px;
}

</style>
