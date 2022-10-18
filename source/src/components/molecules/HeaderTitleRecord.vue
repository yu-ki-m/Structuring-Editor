
<template>
    <div :class="[$style['record-parts']]" 
    :style="recordPartsStyles">
        <div 
            :class="[$style['cell-value']]" 
            ref="headerTitleRecordInput"
            >
            <Cell
                :read-only="readOnly"
                :value="headerItem.values.title"
                @input="inputValue(headerItem,$event)"
                :placeholder="''" 
                :font-size="17"
                :title="'title'"
                :background-color="backgroundColor"
                :color="'rgb(241, 241, 241)'"
                :font-weight="'500'" 
                :edit-mode="'quill'"
            />
        </div>
    </div>
</template>

<script>
import Cell from '@/components/molecules/Cell.vue'
export default {
    name: 'HeaderTitleRecord.vue',
    components: { 
        Cell
    },
    props:{
        commonParameter:{
            default:()=>{return {}}
        },
        headerItem:{
            default:()=>{return undefined}
        },
        backgroundColor:{
            default:'rgb(25,25,25)'
        },
    },
    methods:{
        inputValue(headerItem,title){
            setTimeout(()=>{
                //入力されたものが反映された後の縦幅を入力させる
                headerItem.valuesStyles.title.height =  this.$refs.headerTitleRecordInput.clientHeight +(1/*微調整用*/)
            },500)

            //HeaderTitle固定モードの場合は処理をしない
            if(this.commonParameter.editMode.headerValueFixed){
                return 
            }

            headerItem.values.title=title
        }
    },
    computed:{
        readOnly:function(){
            return this.commonParameter.editMode.headerValueFixed
        },
        recordPartsStyles:function(){
            let backcolor = 'rgb(25,25,25)';
            if(this.backgroundColor != undefined){
                backcolor = this.backgroundColor;
            }else{
                alert("HeaderTitleRecord.recordPartsStyles Error")
            }
            return { 'background-color':backcolor}
        }
    }
}
</script>

<style module="$style">
.record-parts{
    display: grid;
    grid-template-columns:auto 30px ;
}
    .cell-value{
        display: grid;
    }

</style>
