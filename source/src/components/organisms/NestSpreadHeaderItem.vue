<template>
        <div >
            <div >
                <div 
                    :class="$style['record-container']" 
                    >
                    <div :class="$style['record-id']">
                        <HeaderIdRecord />
                    </div>
                    <div :class="$style['record-title-container']" >
                        <HeaderTitleRecord 
                            :header-item="headerItem" 
                            :common-parameter="commonParameter"
                        />
                    </div>
                    <div :class="$style['record-value-container']" >
                        <HeaderValueRecord 
                            :value-list="headerItem.values.valueList" 
                            :values-styles="headerItem.valuesStyles"
                            :common-parameter="commonParameter"/>
                        <HeaderRecordDeleteArea />
                    </div>
                </div>
            </div>
        </div>
        
</template>


<script>
import HeaderTitleRecord from '@/components/molecules/HeaderTitleRecord.vue'
import HeaderValueRecord from '@/components/molecules/HeaderValueRecord.vue'
import HeaderIdRecord from '@/components/molecules/HeaderIdRecord.vue'
import HeaderRecordDeleteArea from '@/components/atoms/HeaderRecordDeleteArea.vue'

export default {
    name: 'NestSpreadHeaderItem',
    components:{
        HeaderValueRecord,
        HeaderTitleRecord,
        HeaderIdRecord,
        HeaderRecordDeleteArea
    },
    data() { 
        return {
        }
    },
    props:{
        commonParameter:{
            default:()=>{return {}}
        },
        headerItem:{
            default:()=>{ return undefined }
        },
    },


}
</script>

<style module="$style">

/* レイアウト */
.record-container{
    display: grid;
    grid-template:
    "record-id   record-title-container  record-title-container  record-value-container" auto
    /1.5vw       1fr                     0.5vw                   auto          ;
    /* border-right: solid 1px rgb(99,99,99); */
    border-top : solid 1px rgba(51, 54, 53, 1);
}
    .record-id{
        grid-area:record-id ;
    }
    .record-title-container{
        grid-area:record-title-container ;
    }
    .record-value-container{
        grid-area:record-value-container ;
    }
    .record-title-w-resizer{
        grid-area:record-title-w-resizer;
    }
    .record-id{
        display: grid;
    }
    .record-title-container{
        display: grid;
    }
    .record-value-container{
        display: grid;
        grid-template-columns:auto 25px;
    }

</style>
