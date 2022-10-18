
<template>
 
    <div
        :class="[$style['mini-menu']]"
        >
        <button  tabindex="-1"  :class="[$style['title-option-button']]"
            :style="commonParameter.editMode.valuesValueFixed || commonParameter.editMode.valuesOptionNotAvailable?{cursor:'not-allowed'}:{}"
            v-on:click="quickChangeTitleOptionStaticPosition(true,$event)"
            >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="15px"  height="15px"
                viewBox="-0.5 -0.5 11 28">
                <g>
                    <ellipse cx="5" cy="14" rx="3" ry="3" fill="rgb(110, 110, 110)" stroke="none" />
                    <ellipse cx="5" cy="24" rx="3" ry="3" fill="rgb(110, 110, 110)" stroke="none" />
                    <ellipse cx="5" cy="5"  rx="3" ry="3" fill="rgb(110, 110, 110)" stroke="none" />
                </g>
            </svg>
        </button>
        <div :class="[$style['title-option-list-background']]" 
            v-if="titleOption"
            @click.exact="changeTitleOption(false)"
            >
            <!-- 透明な背景 -->
        </div>
        <div 
            @mouseenter="changeTitleOption(true);"
            @mouseleave="changeTitleOption(false)"
            v-if="titleOption"  
            :class="[$style['title-option-list']]" 
            :style="styles"
            >

            <button
                :style="valueItem.type=='quill'||commonParameter.editMode.valuesValueFixed?{'color':'gray','cursor':'not-allowed'}:{}"
                :disabled="valueItem.type=='quill'||commonParameter.editMode.valuesValueFixed"
                :class="[$style['title-option-list-button']]" 
                @click="optionClickEvent('value-cell-mode-free');
                changeTitleOption(false);
                quickChangeTitleOption(false);">
                <span :class="[$style['title-option-list-name']]">Quillエディタモード</span>
            </button>
            <button 
                :style="valueItem.type=='datetime'||commonParameter.editMode.valuesValueFixed?{'color':'gray','cursor':'not-allowed'}:{}"
                :disabled="valueItem.type=='datetime'||commonParameter.editMode.valuesValueFixed"
                :class="[$style['title-option-list-button']]" 
                @click="optionClickEvent('value-cell-mode-datetime');
                changeTitleOption(false);
                quickChangeTitleOption(false);">
                <span :class="[$style['title-option-list-name']]">日付編集モード</span>
                <div :class="[$style['title-option-list-short-key']]">Alt  + T</div>
            </button>
            <button 
                :style="valueItem.type=='plain'||commonParameter.editMode.valuesValueFixed?{'color':'gray','cursor':'not-allowed'}:{}"
                :disabled="valueItem.type=='plain'||commonParameter.editMode.valuesValueFixed"
                :class="[$style['title-option-list-button']]" 
                @click="optionClickEvent('value-cell-mode-textarea');
                changeTitleOption(false);
                quickChangeTitleOption(false);">
                <span :class="[$style['title-option-list-name']]">テキストモード</span>
                <div :class="[$style['title-option-list-short-key']]">Alt  + G</div>
            </button>

            <button :class="[$style['title-option-list-button']]" 
                :style="commonParameter.editMode.valuesValueFixed?{'color':'gray','cursor':'not-allowed'}:{}"
                :disabled="commonParameter.editMode.valuesValueFixed"
                @click="optionClickEvent('value-cell-clear');
                changeTitleOption(false);
                quickChangeTitleOption(false);">
                <span :class="[$style['title-option-list-name']]">値をクリア</span>
            </button>
        </div>
    </div>

</template>

<script>


import _ from 'lodash'
export default {
    name: 'ValueRecordOption',
    data() { 
        return {
            titleOption: false,

            styles:{
                left:'0px'
            }
        }
    },
    props:{
        commonParameter:{
            default:()=>{return {}}
        },
        valueItem:{
            default:()=>{return {}}
        }

    },
    computed:{
        
    },
    methods:{
        chageTitleOptionDebounce:_.debounce(function(flag) {
            this.titleOption = flag
        }, 300),
        changeTitleOption:function(flag){
            this.chageTitleOptionDebounce(flag);
        },
        quickChangeTitleOptionStaticPosition:function(flag,event){
            if(this.commonParameter != undefined && this.commonParameter.editMode != undefined){
                if(this.commonParameter.editMode.valuesValueFixed){
                    //データ列が固定モードであればミニメニューボタンを押下しても反応させない
                    return 
                }
                if(this.commonParameter.editMode.valuesOptionNotAvailable){
                    //データ列のオプションが利用不可モードであればミニメニューボタンを押下しても反応させない
                    return 
                }
            }


            this.styles.left = ''+event.pageX+'px';
            this.titleOption = flag
        },
        quickChangeTitleOption:function(flag){
            this.titleOption = flag
        },
        optionClickEvent:function(key){
            let notCloseKeys = ['']
            let isNotClose =  notCloseKeys.find((k)=>{  return key == k})
            if(!isNotClose){
                this.titleOption=false;
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
    z-index: 100;
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
    background-color:inherit;
    color: rgb(241, 241, 241);
}

.title-option-list{
    position: absolute;
    border-radius: 4px;
    transform: translateX(-160px) translateY(-10px);
    background-color: rgb(49, 49, 49);
    
}

.title-option-list-button{
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
