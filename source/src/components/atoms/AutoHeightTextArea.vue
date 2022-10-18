
<template>
    <!-- 縦幅：rows="1" -->
    
    <label 
        :class="[$style['label']]" 
        :style="labelStyles">
        <textarea 
            rows="1" 
            :readonly="readOnly"
            :placeholder="placeholder" 
            :title="title"
            :class="$style['input-textarea']" 
            :value="value"
            @input="inputValue"
            :style="styles"
            ref="area"
        ></textarea>
    </label>

</template>

<script>
import _ from 'lodash'
export default {
    name: 'AutoHeightTextArea',
    data() { 
        return {
            height:10,/* 上下伸縮機能 */
        }
    },
    props:{
        value:{//受け取り窓口
            default:""
        },

        placeholder:{
            default:""
        },
        placeholderColor:{
            default:"#757575"
        },
        title:{
            default:""
        },
        backgroundColor:{
            default:"rgb(240, 240, 240)"
        },
        color:{
            default:"rgb(61, 61, 61)"
        },
        fontWeight:{
            default:500
        },
        fontSize:{
            default:17
        },
        readOnly:{
            default:false
        }
    },
    methods:{
        inputValue:_.debounce(function(val) {
            
            /* 上下伸縮機能 */
            this.height = 0;
            this.$nextTick(()=>{

                if(
                    this.height != null && 
                    this.height != undefined && 
                    this.$refs != null && 
                    this.$refs != undefined && 
                    this.$refs.area != null && 
                    this.$refs.area != undefined && 
                    this.$refs.area.scrollHeight != null && 
                    this.$refs.area.scrollHeight != undefined 
                    ){

                    this.height =  this.$refs.area.scrollHeight;
                }
            })
            
            this.$emit("input",val.target.value)
        }, 100)//データの更新が終わった0.1秒後に実行される Lodash.js
        
    },

    mounted(){
        /* 上下伸縮機能 */
        this.height = 0;
        this.$nextTick(()=>{
                if(
                    this.height != null && 
                    this.height != undefined && 
                    this.$refs != null && 
                    this.$refs != undefined && 
                    this.$refs.area != null && 
                    this.$refs.area != undefined && 
                    this.$refs.area.scrollHeight != null && 
                    this.$refs.area.scrollHeight != undefined 
                    ){
                    this.height =  this.$refs.area.scrollHeight;
                }

        })
    },



    computed: {
        styles(){
            return {
                "height": this.height+"px",/* 上下伸縮機能 */
                '--background-color': this.backgroundColor,
                '--color':this.color,
                '--font-weight':""+this.fontWeight,
                '--font-size':this.fontSize+'px',
                "--placeholder-color":this.placeholderColor
            }
        },
        labelStyles(){
            return {
                '--background-color':this.backgroundColor
            }
        }
        
    }
    
}
</script>

<style module="$style">
    .label{
        background-color: var(--background-color);
        display:grid;
        align-items: center;
        height:100%; /* セルの縦幅をフィットさせる */
        min-height:20px; /* セルの縦ライン調整用 */
        grid-template:
        "..... ................ " 6.5px
        "..... input-textarea   " auto
        "..... ................ " 6.5px
        /0.5vw auto            ;
    }
    .input-textarea{
        grid-area: input-textarea;
    }
    /* TextAreaの入力フォームのスタイル */
    /* 右下の「//」を消す */
    .input-textarea::-webkit-resizer {
        display: none;
    }

    .input-textarea{
        display: grid;
        color:rgb(79, 79, 79);
        resize: vertical;
        outline: none;
        font-size: var(--font-size);
        padding-left: 0px;
        padding-right: 0px;
    }
    /* スライドの幅を0pxにする */
    .input-textarea::-webkit-scrollbar{
        width: 0px;
    }

    .input-textarea{
        width: 100%;
        padding: 0px;
        margin: 0px;
        border: none;
    }
    .input-textarea{
        background-color: var(--background-color);
    }

    .input-textarea{
        color: var(--color);
    }
    .input-textarea{
        font-weight: var(--font-weight);
    }

    .input-textarea::placeholder {
        color: var(--placeholder-color);
    }
</style>
