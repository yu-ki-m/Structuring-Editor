<template>
        <div style="display:grid;">
            <textarea 
                    :class="$style['main-container']" 
                    @mouseleave="changeViewModeDebounce('rich-dark')"
                    @mouseenter="changeViewModeDebounce('textarea')"
                    :value="JSON.stringify(parentItem.childItems[itemIndex],null,'    ' )"
                    @change="parse"
            ></textarea>
        </div>
        
</template>


<script>
import {sheet} from '@/modules/model/sheet.js'
import _ from 'lodash'

export default {
    name: 'NestSpreadItemTextArea',
    data() { 
        return sheet
    },
    props:{
        viewMode:{
            default:()=>{return {}}
        },
        parentItem:{
            default:()=>{return {}}
        },
        itemIndex:{
            default:()=>{return 0}
        },
    },
    methods:{
        parse($event){
            if ($event.target.value != undefined && $event.target.value != ''){
                try{
                    this.parentItem.childItems.splice(this.itemIndex,1,JSON.parse($event.target.value))
                }catch(e){
                    //なにもしない
                }
            }else{
                this.parentItem.childItems.splice(this.itemIndex,1)
            }
            
        },
        changeViewModeDebounce:_.debounce(function(mode) {
                this.viewMode.value = mode
            }, 500),
    }

}
</script>

<style module="$style">

.main-container{
    display: grid;
    resize: none;
    height:300px;
    width:auto;
    background-color:rgb(45,45,45);
    color:white;
}

.main-container::-webkit-scrollbar{
    width: 10px;
}
.main-container::-webkit-scrollbar-track{
    background: rgb(45,45,45);
    border: none;
    border-radius: 10px;
    box-shadow: inset 0 0 2px rgb(56, 56, 56); 
}
.main-container::-webkit-scrollbar-thumb{
    background: rgb(80, 80, 80);
    border-radius: 4px;
    box-shadow: none;
}
</style>
