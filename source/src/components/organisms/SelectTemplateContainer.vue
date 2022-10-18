<template>
    <div :class="$style['menu-container']">
        <div :class="$style['menu-panel-area']">
            <div :class="$style['panel1']" >
                <Panel1 @click="next('empty')" :panel-name="'空のシート'"/>
            </div>
            <div 
            :class="$style['panel1']" 
            v-for=" editTemplate in editTemplateList.data.list" 
            :key="editTemplate.id">
                <Panel1 @click="next(editTemplate.id)" :panel-name="editTemplate.name" :tags="editTemplate.tags"/>
            </div>

            <!-- 通信失敗した時用  -->
            <template v-if=" editTemplateList.data.list.length<= 0"> 
            <div :class="$style['panel1']" v-for=" empty in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :key="empty">
                <Panel1 :style="{'cursor':'not-allowed'}" :panel-name="'     XXX    '"/>
            </div>
            </template>

            
        </div>
    </div>
</template>

<script>
import Panel1 from '@/components/atoms/Panel1.vue'
import  {mapActions,mapGetters} from 'vuex';
import standardJsonData from '@/assets/data/Standard_1.0.0.structuring.json'
export default {
    name: 'SelectTemplateContainer',
    data() { 
        return {
            editTemplateList:{ }
        }
    },
    props:{
    },

    components:{
        Panel1,
    },
    beforeCreate:function(){

    },
    created:function(){
        this['EditTemplate/init']()
        this['EditTemplateUrlList/setValueAction']()
        let editTmplateListTmp = this['EditTemplateUrlList/getValue']
        this.editTemplateList = editTmplateListTmp
    },

    mounted:function(){


    },
    computed:{
        ...mapGetters([
            'EditTemplate/getValue',
            'EditTemplateUrlList/getValue',
        ])
    },
    methods:{
        next(key){
            if(key=="empty"){
                let jsonData = JSON.parse(JSON.stringify(standardJsonData));
                this['EditTemplate/setDefaultAction'](jsonData)
            }else{
                let editTemplateInfo = this.editTemplateList.data.list.find((editTemplateInfoTmp)=>{ return editTemplateInfoTmp.id == key})
                this['EditTemplate/setValueAction'](editTemplateInfo.key)
            }
            this.$router.push( { name: 'editor' ,query:{ time: Date.now()}});
       },
        ...mapActions([
            'EditTemplate/setValueAction', 
            'EditTemplate/init', 
            'EditTemplate/setDefaultAction', 
            'EditTemplateUrlList/setValueAction', 
        ])

    }
}
</script>

<style module="$style">
    .menu-container{
        display: grid;
        justify-items: center;
    }
    .menu-panel-area{
        display: grid;
        grid-template-columns: 320px 320px 320px 320px ;
    }
    .panel1 {
        display: grid;
        height:250px;
        justify-items: center;
        align-items: center;
    }

</style>