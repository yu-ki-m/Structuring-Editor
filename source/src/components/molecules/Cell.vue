
<template>
    <div  :class="[$style['container']]" >
      <div :class="[$style['inner-container']]" >


            <AutoHeightTextArea v-if="mode=='plain'"
              :read-only="readOnly"
              :value="value"
              @input="inputValue($event)"
              :placeholder="value"
              :placeholder-color="'rgb(241,241,241)'" 
              :font-size="17"
              :title="title"
              :background-color="backgroundColor"
              :color="color"
              :font-weight="fontWeight" 
            />
            <DateTimeEditor
              v-else-if="mode=='datetime'"
                :read-only="readOnly"
                :value="value"
                @input="inputValue($event)"
                :placeholder="'yyyy-mm-dd hh:mm:ss'" 
                :font-size="17"
                :title="title"
                :background-color="backgroundColor"
                :color="color"
                :font-weight="fontWeight" 
              
              />
            <QuillEditor v-else-if="mode=='quill'"
                :read-only="readOnly"
                :value="value"
                @input="inputValue($event)"
                :placeholder="placeholder" 
                :font-size="17"
                :title="title"
                :background-color="backgroundColor"
                :color="color"
                :font-weight="fontWeight" 
            />

            <AutoHeightTextArea v-else
              :read-only="readOnly"
              :value="value"
              @input="inputValue($event)"
              :placeholder="placeholder" 
              :font-size="17"
              :title="title"
              :background-color="backgroundColor"
              :color="color"
              :font-weight="fontWeight" 
            />
            

      </div>
    </div>
    
</template>
<script>
import AutoHeightTextArea from '@/components/atoms/AutoHeightTextArea.vue'
import QuillEditor from '@/components/atoms/QuillEditor.vue'
import  DateTimeEditor  from '@/components/atoms/DateTimeEditor.vue'
//import _ from 'lodash'

  export default {
    name: "Cell",
    components: { 
        AutoHeightTextArea,
        QuillEditor,
        DateTimeEditor
    },
    data(){
      return { 
        mode:"none"//初期表示描写速度向上策
      }
    },
    props:{
      editMode:{
        default:"plain"
      },

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
          default:"rgb(240, 240, 240)"
      },
      color:{
          default:"rgb(61, 61, 61)"
      },
      fontWeight:{
          default:500
      },
      fontSize:{
          default:20
      },
      readOnly:{
          default:false
      }
      
    },
    mounted(){
      //初期表示描写速度向上策
          this.mode=this.editMode;
    },
    methods:{
      inputValue($event){
        this.$emit('input',$event)
      }
    },
    watch:{
      'editMode':function(){
        this.mode=this.editMode;
      }
    }
  }
</script>

<style module="$style">
  .container{
      background-color: var(--background-color);
      display:grid;
      align-items: center;
      grid-template:
      "..... " auto
      /auto ;
  }
  .inner-container{
    height:100%
  }
</style>

  