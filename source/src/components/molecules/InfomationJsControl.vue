
<template>
    <div>
        <i 
            v-if ="notesCount > 0 " 
            :class="[$style['infomation']]"
            @mouseover="changeInfomationViewStaticPosition(true,$event)"
            @mouseleave="changeInfomationView(false)"
            >
            i
        </i>
 
        <div 
            @mouseleave="changeInfomationView(false)"
            @mouseover="changeInfomationView(true);"
            v-if="infomationView"  
            :class="[$style['infomation-container']]" 
            :style="styles"
            >
            <div :class="[$style['infomation-content']]" 
                :style="contentWidth">
                <div v-for="note in notesWithId" :key="note[note.symVueId]">


                    <QuillEditor 
                        :read-only="true"
                        :placeholder="''" 
                        :value="note.value" 
                        :title="''"   
                        :font-size="17"
                        :background-color="'rgb(20, 20, 20)'"
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
            styles:{
                left:'0px'
            },
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
    methods:{
        
        changeInfomationView:function(flag){
            this.chageInfomationViewDebounce(flag);
        },
        changeInfomationViewStaticPosition:function(flag,event){
            this.styles.left = ''+event.pageX+'px';
            this.chageInfomationViewDebounce(flag);
        },
    }
    
}
</script>

<style module="$style">

.infomation-container{
    position: absolute;
    border-radius: 4px;
    transform: translateX(-10px) translateY(5px);
    display: grid;
    grid-template:
    ".................. " auto
    "infomation-content " auto
    ".................. " auto
    /auto                  auto       ;
    z-index: 100;
    width: auto;
    max-width:90%;
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


</style>
