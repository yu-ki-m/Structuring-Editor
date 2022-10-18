
<template>
    <div>
        <i 
            v-if ="notesCount > 0 " 
            :class="[$style['infomation']]"
            >
            i
        </i>
 
        <div 
            :class="[$style['infomation-container']]" 
            >
            <div :class="[$style['infomation-content']]" :style="contentWidth">
                <div v-for="note in notesWithId" :key="note[note.symVueId]">
                    <QuillEditor 
                        :read-only="true"
                        :placeholder="''" 
                        :value="note.value" 
                        :title="''"   
                        :font-size="17"
                        :background-color="'rgb(45, 45, 45)'"
                        :color="'rgb(200, 200, 200)'"
                        :font-weight="'500'" 
                    />
                </div>
            </div>
        </div>

    </div>

</template>

<script>


import QuillEditor from '@/components/atoms/QuillEditor.vue'
import {commonUtilities} from '@/modules/utilities/common.js'
import _ from 'lodash'
export default {
    name: 'Infomation',
    components:{
        QuillEditor
    },
    data() { 
        return {
            infomationView: false,
            chageInfomationViewDebounce:_.debounce(function(flag) {
                //メソッドだと同一コンポーネント別インスタンスからの影響を受けるため、dataに定義
                this.infomationView = flag
            }, 300),

        }
    },
    props:{
        width:{
            default:()=>{return 500}
        },
        notes:{
            default:[]
        }
    },
    computed:{
        contentWidth:function(){

            return {'width':this.width+"px"}
        },
        
        notesCount:function(){
            return this.notes.length
        },
        notesWithId:function(){
            return commonUtilities.attendVueIdToArray(this.notes,this.$set)
        }

    },
    
}
</script>

<style module="$style">

.infomation-container{
    position: absolute;
    border-radius: 4px;
    transform: translateX(-10px) translateY(5px);
    width: auto;
    max-width:90%;
    box-shadow:  0 0 20px 5px rgba(0, 0, 0, 0.5);

    /* フォーカス時の表示用 */
    left:50px;
    z-index: -1;
    opacity: 0;
    transition: all 0.5s;
}
.infomation-content{
    grid-area:infomation-content ;
    width: auto;
}

.infomation{
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: center;
    width: 15px;
    height: 15px;
    background-color: rgba(30,30,30,0);
    color: rgb(70, 70, 70);
    border-radius: 50%;
    border:solid 1px rgb(70, 70, 70);
    font-size: 2px;
    cursor:help;
    font-style:normal;
    padding: 0px;
    margin: 0px;
}

/* フォーカス時の表示用 */
.infomation:hover + .infomation-container{
    z-index: 50;
    opacity: 1;
}
.infomation-container:hover{
    z-index: 50;
    opacity: 1;
}

/* スライダー */
.infomation-container div::-webkit-scrollbar{
    width: 4px;
}
.infomation-container div::-webkit-scrollbar-track{
    background: rgb(44,44,44);
    border: none;
    border-radius: 4px;
    box-shadow: inset 0 0 2px rgb(56, 56, 56); 
}
.infomation-container div::-webkit-scrollbar-thumb{
    background: rgb(80, 80, 80);
    border-radius: 4px;
    box-shadow: none;
}
</style>
