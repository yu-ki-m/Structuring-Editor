
<template>
    <div :class="$style['input-container']" >
        <div :class="$style['input-inner-container']" >
            <input
                :class="[$style['input-style'],$style['position'],styleClass]"
                :style="styles"
                :placeholder="value==''?placeholder:value"
                :title="title"
                :value="value"
                :disabled="disabled"
                @input="inputValue"
            />
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'InputChange',
    data() { 
        return {
        }
    },
    props:{
        value:{//受け取り窓口
            default:""
        },

        placeholder:{
            default:""
        },
        title:{
            default:""
        },
        backgroundColor:{
            default:"rgb(20, 20, 20)"
        },
        color:{
            default:"rgb(241, 241, 241)"
        },
        fontSize:{
            default:14
        },
        disabled:{
            default:false
        }
    },
    methods:{
        inputValue:_.debounce(function($event) {
            this.$emit("input",$event)
        }, 100)//データの更新が終わった0.1秒後に実行される Lodash.js
        
    },

    mounted(){
    },



    computed: {
        styles(){
            return {
                'background-color': this.backgroundColor,
                'color':this.color,
                'font-size':this.fontSize+'px',
            }
        },
        styleClass(){
            let stylePlaceholder = ''
            if(this.value==""){
                stylePlaceholder =  ''
            }else{
                stylePlaceholder =  'input-style-placeholder'
            }
            return stylePlaceholder
        }        
    }
    
}
</script>

<style module="$style">
.input-container{
    display: grid;
    align-items: center;
    background-color: rgb(20, 20, 20);
}
.input-inner-container{
    display: grid;
    align-items: center;
    grid-template:
    "... input-style" auto
    /2px auto        ;

}
.input-style{
    grid-area: input-style;
    color:rgb(241, 241, 241);
    font-size: 14px;
    outline: none;
    height:20px;
    width:100%;
    display: grid;
    align-items: center;
    padding:0px;
    margin:0px;
    border:none;
}

</style>
<style scoped>
.input-style-placeholder::placeholder {
  color: rgb(241, 241, 241);
}
</style>
