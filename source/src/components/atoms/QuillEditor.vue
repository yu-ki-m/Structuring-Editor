
<template>
    <div :class="[$style['label']]" 
          :style="styles" >
        <VueEditor  
          ref="editor"
          :class="[$style['input']]" 
          :editorOptions="editorSettings" 
          :editor-toolbar="customToolbar"
          :placeholder="placeholder"
          :disabled="readOnly || isFocus"
          :value="value"
          :use-markdown-shortcuts="false"
          :use-custom-image-handler="false"
          @input="inputValue($event)"
          @focus="isFocus = false"
          /> 
    </div>
    
</template>
<script>
  import 'quill/dist/quill.bubble.css' // for bubble theme
  import { VueEditor } from 'vue2-editor'

  export default {
    name: "QuillEditor",
    components: {
      VueEditor
    },
    data(){
      return { 
        isFocus:false,
        editorSettings: {
          theme: 'bubble'//'snow'
        },
        customToolbar: [[{header: [false, 1, 2, 3, 4, 5, 6]}],["bold", "italic", "underline", "strike","link"], ["image", "video"],[{color: []}, {background: []}],
        [
          {
            align: ""
          }, {
            align: "center"
          }, {
            align: "right"
          }, {
            align: "justify"
          }], ["blockquote", "code-block","code"], [{
            list: "ordered"
          }, {
            list: "bullet"
          }, {
            list: "check"
          }], [{
            indent: "-1"
          }, {
            indent: "+1"
          }
        ],
          ["clean"]
        ]
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
          default:"inherit"
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
    },

      
    computed:{
        styles(){
            return {
                'background-color': this.backgroundColor,
                'color':this.color,
                'font-weight':""+this.fontWeight,
                'font-size':this.fontSize+'px',
            }
        },
    },
    methods:{
      inputValue:function($event){
        if($event == undefined){
          return 
        }
        this.$emit('input',$event)
      },
    }
  }
</script>

<style module="$style">
    .label{
        background-color: var(--background-color);
        display:grid;
        align-items: center;
        height:100%; 
        grid-template:
        "..... ..... " 4px
        "..... input " auto
        "..... ..... " 4px
        /0.4vw auto         ;
    }
    .input{
        grid-area: input;
        display: grid;
        align-items: center;
        height: 100%;
    }
  </style>
<style>
.ql-editor>iframe.ql-video{
  min-height:350px;
  height:auto;
  width:auto;
}
pre.ql-syntax{
  background-color: #364549 !important;
}
.ql-editor{
  min-height: 0px !important;
  padding-top:0px !important;
  padding-bottom:0px !important;
  padding-right:0px !important;
  padding-left:0px !important;
  word-break:break-all;
  height: 100%;
  display: flex;
  flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
}

.ql-tooltip{
  z-index: 1 ;
}

.quillWrapper .ql-editor ul[data-checked=false]>li::before, .quillWrapper .ql-editor ul[data-checked=true]>li::before{
  color: rgb(255, 255, 255)  !important;
}
.ql-tooltip-editor input{
  padding-left:30px !important;
  padding-right:30px !important;
  word-break:break-all;
}
.ql-tooltip-editor input::placeholder{
  color:#444;
}
.ql-container.ql-bubble:not(.ql-disabled) a{
  word-break:break-all;
  white-space:normal;
}
.ql-tooltip-editor::before{
  position: absolute;
  color:rgb(241, 241, 241);
  content: 'URL';
  transform: translateX(20px);
}
.ql-editor a{
  color:rgb(149, 194, 194);
}
.ql-container.ql-bubble:not(.ql-disabled) a::before {
  display: none;  /* リンクの吹き出しを消す */
}
.ql-container.ql-bubble:not(.ql-disabled) a::after {
  display: none; /* リンクの吹き出しを消す */
}
.ql-editor.ql-blank::before {
    color:rgb(99, 99, 99) !important;
}
.ql-bubble .ql-editor code {
    background-color: #364549;
    border-radius: 0px;
}
.ql-bubble .ql-editor pre {
    background-color: #364549 !important;
}

.ql-bubble .ql-editor hr{
  width:100%;
}
.ql-bubble .ql-toolbar button.ql-code{
  box-shadow: inset 0 0 10px 1px rgb(129, 129, 129);
  border-radius: 50%;
}
.ql-bubble .ql-toolbar{
  min-width:330px;
}

</style>