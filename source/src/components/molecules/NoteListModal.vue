
<template>
    <!-- 横幅：cols="20" 縦幅：rows="1" -->
    <div style="position:absolute;z-index:90;">
        <div :class="$style['text-list-modal-background']"></div>
        <div :class="$style['text-list-modal-container']" >
            <div :class="$style['close-button-area']" >
                <button  :class="$style['close-button']" @click="$emit('close-event')">×</button></div>
            <div :class="$style['text-list-title-area']">
                {{textListTitle}}
            </div>
            <div :class="$style['text-list-modal']">
                <div :class="$style['add-text-area']">
                    <button :class="$style['add-text-button']" @click="beforeAddNewItem(inputValueList)">+</button>
                </div>
                <div :class="$style['text-list']">
                    <transition-group name="fade" tag="div">
                        <div 
                        :class="$style['text-list-value-area']"
                        v-for=" (text,i ) in ivlc" 
                        :key="text[text.symVueId]">
                            <div :class="$style['text-area']">

                                <div  :class="$style['text-area-label-value']">
                                    <QuillEditor 
                                        :read-only="false"
                                        :placeholder="textListTitle" 
                                        :value="text.value"
                                        @input="inputValueList[i].value = $event"
                                        :title="textListTitle"    
                                        :font-size="17"
                                        :background-color="'rgb(45, 45, 45)'"
                                        :color="'rgb(241, 241, 241)'"
                                        :font-weight="'500'" 
                                    />
                                </div >
                                <button :class="$style['text-delete-button']" @click="inputValueList.splice(i,1)">×</button>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
            
        </div >
    </div >
</template>

<script>
import QuillEditor from '@/components/atoms/QuillEditor.vue'
import {commonUtilities} from '@/modules/utilities/common.js'
import {sheet} from '@/modules/model/sheet.js'
export default {
    name: 'NoteListModal',
    components:{
        QuillEditor
    },
    data() { 
        return {
        }
    },
    props:{
        textListTitle:{
            default:""
        },
        inputValueList:{//受け取り窓口
            default:()=>{return [] }
        },

    },
    methods:{
        beforeAddNewItem(inputValueList){
            sheet.afterAddNote(inputValueList,this.$set)
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
    "........... ........... ...................... ...................... ...................... ................. ....." auto
    "........... ........... text-list-title-area  text-list-title-area   text-list-title-area    close-button-area ....." auto
    "........... ........... text-list-modal        text-list-modal        text-list-modal        ................. ....." auto
    "........... ........... ...................... ...................... ...................... ................. ....." auto
    "........... ........... ...................... ...................... ...................... ................. ....." auto
    /auto        auto        auto                   auto                   auto                    auto             auto      ;

}
.text-list-modal-container{
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
    height: 99%;
    width:100%;
}
.text-list-modal{
    grid-area: text-list-modal;
    display: grid;
    grid-template:
    ".... add-text-area ...." 60px
    ".... text-list     ...." auto
    ".... ............. ...." 40px
    /20px auto          20px      ;
}

.text-list-modal{
    width:70vw;
    height:600px;
    background-color: rgb(34, 34, 34);
    border-radius: 40px;
}
.text-list{
    grid-area: text-list;
    display: grid;
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

.add-text-area{
    grid-area: add-text-area;
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
.text-list-value-area{
    display: grid;
}
.close-button-area{
    grid-area: close-button-area
}
.text-list-title-area{
    grid-area: text-list-title-area;
}
.text-list-title-area{
    display: grid;
    justify-items: center;
    align-items: flex-end;
    color:rgb(241, 241, 241);
    font-size: 50px;

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
.text-list-modal-background{
    position: fixed;
    top:0;
    left:0;
    opacity: 0.8;
    background-color:black;
    z-index: 99;
    height: 100%;
    width:100%;
}

.text-area-label-value{
    min-height: 100px;
    background-color: rgb(45, 45, 45);
    border-top:solid 1px rgba(51, 54, 53, 1);
    border-left:solid 1px rgba(51, 54, 53, 1);
    border-bottom:solid 1px rgba(51, 54, 53, 1);
}

.text-area-label-value{
    grid-area:text-area-label-value ;
}
.text-area{
    display: grid;
    grid-template:
    "..... text-area-label-value text-delete-button  ....." auto
    /1fr   2.1fr                  20px               1fr;
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
    margin:0px;
    padding: 0px;
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
    z-index: 100;
}
.fade-enter-active{
    /* 現れるときのトランジションの状態 */
    transition: opacity 0.5s ,height 0.5s,z-index 0.1s;
}
.fade-enter-to{
    /* 現れるときの最後の状態 */
    opacity: 1;
    height: 100px;/*大きめに設定 */
    z-index: 100;
}
 .fade-leave{
    /* 消えるときの最初の状態 */
    opacity: 1;
    height: 100px;/*大きめに設定 */
    z-index: 100;
 }
.fade-leave-active{
    /* 消えるときのトランジションの状態 */
    transition: opacity 0.5s ,height 0.5s,z-index 0.1s;
 }
 .fade-leave-to{
    /* 消えるときのの最後の状態 */
    opacity: 0;
    height: 0px;
    z-index: 100;
 }
</style>