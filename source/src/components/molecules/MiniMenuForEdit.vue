
<template>
        <div
            :class="[$style['mini-menu']]"
            >
            <button  tabindex="-1"  :class="[$style['title-option-button']]"
                :style="commonParameter.editMode.titleOptionNotAvailable?{cursor:'not-allowed'}:{}"
                v-on:click="quickChangeTitleOptionStaticPosition(true,$event)"
                >
                <svg x="20px" y="20px"  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; fill:rgb(70, 70, 70);" >
                    <g>
                        <path class="st0" d="M507.574,92.442l-88-88c-5.906-5.906-15.477-5.906-21.379,0L44.293,358.343L0.39,498.953
                            c-0.48,1.542-0.473,3.058-0.218,4.511c0,0.024,0,0.047,0.008,0.062c0.129,0.742,0.339,1.446,0.633,2.13
                            c0.011,0.027,0.027,0.062,0.038,0.09c0.383,0.875,0.969,1.637,1.566,2.375c0.043,0.054,0.066,0.117,0.11,0.168
                            c0.5,0.598,1.09,1.062,1.703,1.538c0.246,0.188,0.469,0.387,0.73,0.555c0.602,0.386,1.222,0.672,1.894,0.926
                            c0.359,0.133,0.715,0.23,1.086,0.324c0.656,0.164,1.297,0.293,1.988,0.317c0.086,0,0.164,0.039,0.25,0.039c0.004,0,0.004,0,0.004,0
                            c0.438,0,0.867-0.141,1.305-0.203c0.527-0.07,1.035,0.007,1.566-0.16l140.617-43.902l353.902-353.902
                            C513.475,107.914,513.475,98.344,507.574,92.442z M76.218,360.957l0.055-0.054l-0.039-0.032
                            c11.199,2.356,32.148,17.516,44.766,30.141c12.629,12.618,27.636,33.418,29.996,44.618l0.117,0.113l-9.961,9.957l-0.496,0.5
                            l-71.164,22.219l-25.894-25.894l5.492-17.598l17.114-53.954l9.038-9.038l0.981-0.969L76.218,360.957z"/>
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
                @mouseenter.exact="changeTitleOption(true);"
                @mouseleave.exact="changeTitleOption(false)"
                v-if="titleOption"
                :class="[$style['title-option-list']]" 
                :style="styles"
                >

                <button :class="[$style['title-option-list-button']]"
                    @click="optionClickEvent('change-view-note')">
                    <span :class="[$style['title-option-list-name']]">備考</span>
                    <span :class="[$style['title-option-list-short-key']]"></span>
                </button>

                <button :class="[$style['title-option-list-button']]" 
                    @click="optionClickEvent('change-view-change-history')">
                    <span :class="[$style['title-option-list-name']]">変更履歴</span>
                    <span :class="[$style['title-option-list-short-key']]"></span>
                </button>

                <button :class="[$style['title-option-list-button']]"
                    @click="optionClickEvent('change-view-comment')">
                    <span :class="[$style['title-option-list-name']]">コメント</span>
                    <span :class="[$style['title-option-list-short-key']]"></span>
                </button>

                <button :class="[$style['title-option-list-button']]"
                    @click="optionClickEvent('change-view-review')">
                    <span :class="[$style['title-option-list-name']]">レビュー</span>
                    <span :class="[$style['title-option-list-short-key']]"></span>
                </button>

                <button :class="[$style['title-option-list-button']]"
                    @click="optionClickEvent('change-view-mark-key')">
                    <span :class="[$style['title-option-list-name']]">付帯情報</span>
                    <span :class="[$style['title-option-list-short-key']]"></span>
                </button>

                <button 
                    v-if="(!commonParameter.editMode.itemJsonViewNotAvailable)"
                    :class="[$style['title-option-list-button']]" 
                    @click="optionClickEvent('to-json-from-item')" >
                    <span :class="[$style['title-option-list-name']]">レコードをJSONで表示</span>
                    <span :class="[$style['title-option-list-short-key']]"></span>
                </button>

                <button :class="[$style['title-option-list-button']]"
                    @click="optionClickEvent('title-cell-clear')">
                    <span :class="[$style['title-option-list-name']]">タイトル値のクリア</span>
                    <span :class="[$style['title-option-list-short-key']]"></span>
                </button>
            </div>
            
        </div>

</template>

<script>


import _ from 'lodash'
export default {
    name: 'MiniMenuForEdit',
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
