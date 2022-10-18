
<template>
    <div :class="[$style['record-parts']]" 
    :style="recordPartsStyles">
        <div 
            :class="[$style['cell-value']]" 
            ref="titleRecordInput"
            >
            <Cell
                :value="item.values.title"
                @input="inputValue(item,$event)"
                :placeholder="''" 
                :font-size="17"
                :title="'title'"
                :background-color="backgroundColor"
                :color="'rgb(241, 241, 241)'"
                :font-weight="'500'" 
                :edit-mode="'quill'"
                :read-only="readOnly"
                
            />
        </div>

        
        <div :class="[$style['cell-option-area']]" >
            <div :class="[$style['cell-icons']]" >
                <div title="コメント有り" v-if="existComment" class="not-export-html">
                    <svg width="8px" height="8px" viewBox="-0.5 -0.5 31 31" >    
                        <g>
                            <path d="M 0 0 L 30 0 L 30 20 L 25 20 L 15 30 L 15 20 L 0 20 Z" fill="rgba(30, 30,30,0)" stroke="rgb(255, 255, 255)"
                                stroke-miterlimit="10" pointer-events="all" />
                        </g>
                    </svg>
                </div>
                <div title="レビュー有り" v-if="existReview" class="not-export-html">
                    <svg width="8px" height="8px" viewBox="-0.5 -0.5 31 32">
                        <g>
                            <path d="M 0 0 L 30 0 L 30 20 L 25 20 L 15 30 L 15 20 L 0 20 Z" fill="rgba(30, 30,30,0)" stroke="rgb(255, 255, 255)"
                                stroke-miterlimit="10" pointer-events="all" />
                            <path d="M 12 0 L 18 0 L 18 0 L 12 0 L 12 14 L 12 14 Z" fill="rgb(255, 255, 255)" stroke="rgb(255, 255, 255)" stroke-miterlimit="10"
                                transform="rotate(-137,15,7)" pointer-events="all" />
                        </g>
                    </svg>
                </div>
            </div>
            <div :class="[$style['cell-option']]" >
                <MiniMenuForEdit
                    :common-parameter="commonParameter"
                    :viewValueList="item.attribute.viewValueList"
                    @option-click-event="miniMenuOptionEvent"
                />
            </div>
            <div :class="[$style['cell-option2']]" >
                <MiniMenu 
                    :common-parameter="commonParameter"
                    :viewValueList="item.attribute.viewValueList"
                    @option-click-event="miniMenuOptionEvent"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Cell from '@/components/molecules/Cell.vue'
import MiniMenu from '@/components/molecules/MiniMenu.vue'
import MiniMenuForEdit from '@/components/molecules/MiniMenuForEdit.vue'
export default {
    name: 'TitleRecord',
    components: { 
        Cell,
        MiniMenu,
        MiniMenuForEdit
    },
    props:{
        item:{
            default:()=>{return undefined}
        },
        backgroundColor:{
            default:'inherit'
        },
        commonParameter:{
            default:()=>{return {}}
        },

    },
    methods:{
        miniMenuOptionEvent(key){
            this.$emit('option-click-event',key)
        },
        inputValue(item,title){
            setTimeout(()=>{
                //入力されたものが反映された後の縦幅を入力させる
                if(this.$refs.titleRecordInput != undefined){
                    item.valuesStyles.title.height =  this.$refs.titleRecordInput.clientHeight +(1/*微調整用*/)
                }
            },500)

            //タイトル固定モードの場合は処理をしない
            if(this.commonParameter.editMode.titleValueFixed){
                return 
            }
            item.values.title=title
        }
    },
    computed:{
        readOnly:function(){
            return this.commonParameter.editMode.titleValueFixed
        },
        recordPartsStyles:function(){
            let backcolor = 'rgb(30, 30, 30)';
            if(this.backgroundColor != undefined){
                backcolor = this.backgroundColor;
            }else{
                alert("TitleRecord.recordPartsStyles Error")
            }
            return { 'background-color':backcolor}
        },
        existComment(){
            if(this.item != undefined&& this.item.attribute != undefined && this.item.attribute.comment != undefined){
                 return this.item.attribute.comment.length > 0
            }else{
                return false
            }
        },
        existReview(){
            if(this.item != undefined&& this.item.attribute != undefined && this.item.attribute.review != undefined){
                 return this.item.attribute.review.length > 0
            }else{
                return false
            }
        }
    }
}
</script>
<style module="$style">
    .record-parts{
        display: grid;
        grid-template-columns:auto 75px ;
        border-top : solid 1px rgba(51, 54, 53, 1);
    }
    .cell-value{
        display: grid;
    }
    .cell-option-area{
        display: grid;
        grid-template:
            "cell-icons .... ........... .... ............" 6px
            "cell-icons .... cell-option .... cell-option2" auto
            "cell-icons .... ........... .... ............" auto
            /20px       5px  auto        10px   auto    ;
    }
        .cell-icons{
            display: grid;
            grid-area: cell-icons;
            grid-template-rows:10px 10px ;
            justify-items: center;

        }
        .cell-option{
            display: grid;
            grid-area: cell-option;
        }
        .cell-option2{
            display: grid;
            grid-area: cell-option2;
        }

</style>
