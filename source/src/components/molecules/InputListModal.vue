

<template>
    <!-- 横幅：cols="20" 縦幅：rows="1" -->
    <div style="position:absolute;z-index:90;">
        <div :class="$style['text-list-modal-container']" >
            <div :class="$style['close-button-area']" >
                <button  :class="$style['close-button']" @click="$emit('close-event')">×</button></div>
            <div :class="$style['text-list-key-area']">
                {{textListTitle}}
            </div>
            <div :class="$style['text-list-modal']">
                <div :class="$style['add-input']">
                    <button :class="$style['add-text-button']" @click="beforeAddNewItem(inputValueList)">+</button>
                </div>
                <div :class="$style['text-list']">
                    <transition-group name="fade">
                        <div 
                        :class="$style['text-list-value-area']"
                        v-for=" (text,i ) in ivlc" 
                        :key="text[text.symVueId]">
                            <div :class="$style['input']">
                                <label :class="$style['input-label-key']">
                                    <input v-model="text.key" :placeholder="inputKeyplaceholder" :title="inputKeyplaceholder" />
                                </label>
                                <label :class="$style['input-label-value']">
                                    <input v-model="text.value" :placeholder="inputDataplaceholder" :title="inputDataplaceholder" />
                                </label>
                                <label :class="$style['input-label-description']">
                                    <input v-model="text.description" :placeholder="inputDescriptionPlaceholder" :title="inputDescriptionPlaceholder"/>
                                </label>
                                <button :class="$style['text-delete-button']" @click="inputValueList.splice(i,1)">×</button>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div >
        <div :class="$style['text-list-modal-background']"></div>
    </div >
</template>

<script>
import {commonUtilities} from '@/modules/utilities/common.js'
import {sheet} from '@/modules/model/sheet.js'

export default {
    name: 'InputListModal',

    data() { 
        return {
        }
    },
    props:{
        textListTitle:{
            default:"付帯情報一覧"
        },
        inputKeyplaceholder:{
            default:"キー名"
        },
        inputDataplaceholder:{
            default:"データ"
        },
        inputDescriptionPlaceholder:{
            default:"補足"
        },
        inputKeyDefaultValue:{
            default:""
        },
        inputValueList:{//受け取り窓口
            default:()=>{return [] }
        },

    },
    methods:{
        beforeAddNewItem(inputValueList){
            sheet.beforeAddNote(inputValueList,this.$set)
        },
    },
    computed:{
        ivlc:function(){
            let inputValueListTmp = this.inputValueList;
            if(inputValueListTmp != undefined || inputValueListTmp.length > 0){
                commonUtilities.attendVueIdToArray(inputValueListTmp,this.$set)
            }
            return inputValueListTmp
        },
    },


}
</script>

<style module="$style">
.text-list-modal-container{
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template:
    "...................... ...................... ...................... ...................... ......................" auto
    "...................... text-list-key-area     text-list-key-area     text-list-key-area     close-button-area     " auto
    "...................... text-list-modal        text-list-modal        text-list-modal        ......................" auto
    "...................... ...................... ...................... ...................... ......................" auto
    "...................... ...................... ...................... ...................... ......................" auto
    /auto                   auto                   auto                   auto                    auto                   ;
}
.text-list-modal-container{
    position: fixed;
    top:0;
    left:0;
    z-index: 30;
    height: 100%;
    width:100%;
}
    .text-list-key-area{
        grid-area: text-list-key-area;
    }
    .text-list-key-area{
        display: grid;
        justify-items: center;
        align-items: flex-end;
        color:rgb(241, 241, 241);
        font-size: 50px;
    }
    .close-button-area{
        grid-area: close-button-area
    }
    .close-button-area{
        display: grid;
        justify-items: left;
        align-items: flex-end;
    }
        .close-button{
            display: grid;
            align-items: center;
            height: 60px;
            width: 60px;
            border-radius: 30px;
            color: rgb(45, 45, 45);
            background-color:rgb(241, 241, 241);
            border: none;
            cursor: pointer;
            font-size: 50px;
        }
    .text-list-modal{
        width:70vw;
        grid-area: text-list-modal;
        display: grid;
        min-width: 640px;
        grid-template:
        ".... add-input  ..... " 60px
        ".... text-list  ..... " auto
        ".... .......... ..... " 40px
         /20px auto      20px      ;
        
    }
    .text-list-modal{
        height:600px;
        background-color: rgb(34, 34, 34);
        border-radius: 40px;
    }

        .add-input{
            grid-area: add-input;
            display: grid;
            align-items: center;
            justify-items: center;
        }
            .add-text-button{
                display: grid;
                align-items: center;
                justify-items: center;
                border: none;
                border-radius: 18px;
                width: 35px;
                height: 35px;
                outline: none;
                cursor: pointer;
                color: rgb(241, 241, 241);
                background-color:rgb(77, 76, 76);
                font-size: 30px;
                padding: 0px;
                margin:0px;
            }
        .text-list{
            grid-area: text-list;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .text-list::-webkit-scrollbar{
            width: 20px;
        }
        .text-list::-webkit-scrollbar-track{
            background: rgb(45,45,45);
            border: none;
            border-radius: 10px;
            box-shadow: inset 0 0 2px rgb(56, 56, 56); 
        }
        .text-list::-webkit-scrollbar-thumb{
            background: rgb(80, 80, 80);
            border-radius: 4px;
            box-shadow: none;
        }
            .text-list-value-area{
                display: grid;
            }
                .input{
                    display: grid;
                    grid-template:
                    "....  input-label-key input-label-value input-label-description text-delete-button  ...." 30px
                    /auto  auto            auto              auto                    20px                auto;
                }
                    .input-label-key{
                        grid-area:input-label-key ;
                        display: grid;
                    }
                        .input-label-key>input{
                            display: grid;
                            background-color: rgb(45, 45, 45);
                            outline: none;
                            border: solid 1px rgba(51, 54, 53, 1);
                            color: rgb(241, 241, 241);
                        }
                    .input-label-value{
                        grid-area:input-label-value ;
                        display: grid;
                    }
                        .input-label-value>input{
                            display: grid;
                            background-color: rgb(45, 45, 45);
                            outline: none;
                            border: solid 1px rgba(51, 54, 53, 1);
                            color: rgb(241, 241, 241);
                        }
                    .input-label-description{
                        grid-area:input-label-description ;
                    }
                    .input-label-description{
                        display: grid;
                        background-color: rgb(45, 45, 45);
                    }
                        .input-label-description>input{
                            display: grid;
                            background-color: rgb(45, 45, 45);
                            outline: none;
                            border: solid 1px rgba(51, 54, 53, 1);
                            color: rgb(241, 241, 241);

                        }
                    .text-delete-button{
                        grid-area: text-delete-button;
                    }
                    .text-delete-button{
                        display: grid;
                        background-color: rgb(45, 45, 45);
                        color:rgb(241, 241, 241);
                        align-items: center;
                        justify-items: center;
                        border: solid 1px rgba(51, 54, 53, 1);
                        outline: none;
                        cursor: pointer;
                    }

        
.text-list-modal-background{
    position: fixed;
    top:0;
    left:0;
    opacity: 0.8;
    background-color:black;
    z-index: 10;
    height: 100%;
    width:100%;
}
</style>


<style scoped>
/* .fade-move{
    transition: all 0.5s;
} */
/* .fade-move{
    transition: transform 0.5s;
} */

.fade-enter{
    /* 現れるときの最初の状態 */
    opacity: 0;
    height: 0px;

}
.fade-enter-active{
    /* 現れるときのトランジションの状態 */
    transition: opacity 0.3s ,height 0.3s;
}
.fade-enter-to{
    /* 現れるときの最後の状態 */
    opacity: 1;
    height: 30px;/*大きめに設定 */
}
 .fade-leave{
    /* 消えるときの最初の状態 */
    opacity: 1;
    height: 30px;/*大きめに設定 */
 }
.fade-leave-active{
    /* 消えるときのトランジションの状態 */
    transition: opacity 0.3s ,height 0.3s;
 }
 .fade-leave-to{
    /* 消えるときのの最後の状態 */
    opacity: 0;
    height: 0px;
 }
</style>