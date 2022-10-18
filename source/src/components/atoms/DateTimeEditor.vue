
<template>
  <div :class="[$style['date-time-value']]" 
    :style="{'background-color':backgroundColor}"
    >
    <Datetime 
      type="datetime" 
      :value="value" 
      :input-class="styleClass"
      :placeholder="value==''?placeholder:toHTMLPlaceholder"
      :disabled="readOnly"
      @input="inputValue" 
      format="yyyy-MM-dd HH:mm:ss"
      :inputStyle="styles">
    </Datetime>
  </div>

</template>
<script>
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
    name: "DateTimeEditor",
    components: { 
        Datetime
    },
    data(){
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
      title:{//一応受け取るが使用しない
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
    computed:{
      styles(){
        return {
          
          'background-color':this.backgroundColor,
          'color':this.color,
          'font-weight':this.fontWeight,
          'border':'none',
          'outline':'none',
          'font-size':this.fontSize+'px',
          'display':'grid',
          'justify-content': 'center',
          'align-items': 'center',
          'width':'100%',
          'height':'100%',
          'padding-left':'7px'
          
        }
      },
      styleClass(){
        let c = 'vdatetime-input-datetime-placeholder'
        if(this.value==''){
          c = {}
        }
        return c
      },
      toHTMLPlaceholder(){
        return new Date(this.value).toLocaleString()
      }
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

.date-time-value{
    display: grid;
    height: 100%;
}

</style>
<style>
.vdatetime-calendar__month__day--selected > span > span, .vdatetime-calendar__month__day--selected:hover > span > span {
    color: #fff;
    background: #222222;
}
.vdatetime-calendar__month__day--selected > span > span, .vdatetime-calendar__month__day--selected:hover > span > span {
    color: #fff;
    background: #525252;
}
.vdatetime{
  height: 100%;
}
.vdatetime>.vdatetime-input{
  height: 100%;
  margin: 0;
  padding: 0;
}
.vdatetime-popup__header {
    background: #525252;
}
.vdatetime-time-picker__item--selected {
    color: #860101;
}
.vdatetime-popup__actions__button {
    color: #525252;
}
.vdatetime-input-datetime-placeholder::placeholder {
  color: rgb(241, 241, 241);
}
</style>
