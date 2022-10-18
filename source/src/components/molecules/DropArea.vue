
<template>
    <div v-if="view">
        <div :class="[$style['overlay-area']]" >
        </div>
        <div :class="$style['main-area']" >
            <div :class="$style['close-button-area']" >
                <button  :class="$style['close-button']" @click="close">×</button>
            </div>
            <div 
                @dragover.prevent="drag = true"
                @dragleave.prevent="drag = false"
                @drop.prevent="onDrop($event,sheet,$set,close)" 
                :class="[$style['drop-area']]" 
                :style="styles"
                >
                <div v-if="!isloading">Please Drop JSON or HTML File</div>
                <div v-else >Now Loading...</div> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropArea',
    data(){
        return {
            view:false,
            drag:false,
            isloading:false
            }
    },
    props:{
        sheet:{
            default:undefined
        }
    },
    computed:{
        styles(){
            let tmp = {  }
            if( this.drag ){
                tmp =  
                    { 
                        'border' :'dotted 4px rgb(200, 200, 200)',
                        'background-color':'rgba(200, 200, 200,0.4)',
                    }
            }
            return tmp;
        }
    },
    methods:{
        open(){
            this.view=true
        },
        close(){
            this.view=false
        },
        onDrop(event,store,$set,close) {
            if (!event) {return}
            if (!event.dataTransfer) {return}
            if (event.dataTransfer.files.length === 0) {return}
            let file = event.dataTransfer.files[0]

            //ローディングを有効にする
            this.isloading = true
            
            if(file != undefined){
                let fr = new FileReader();
                fr.addEventListener('load',function(e){
                    
                    if(e != undefined && e.target != undefined){
                        let decodedString = ""
                        try{

                            //# 読み取り
                            let encodedString =  ''; 
                            let  uint8Arr = new Uint8Array(e.target.result)
                            let APPLY_MAX = 1024;// Base64変換を小分けにする
                            for(var i = 0; i < uint8Arr.length; i+=APPLY_MAX){
                                encodedString += String.fromCharCode.apply(
                                    null, uint8Arr.slice(i, i+APPLY_MAX)
                                );
                            }

                            decodedString = decodeURIComponent(escape(encodedString));

                            file = undefined;


                            try{
                                //JSONファイルパース
                                $set(store,"content",JSON.parse(decodedString))
                            }catch(e){

                                //htmlファイルパース
                                try{
                                    let t = decodedString
                                    let result = t.slice(t.search('<structuring>')+"<structuring>".length,t.search('</structuring>'))
                                    
                                    $set(store,"content",JSON.parse(result))
                                }catch(e){
                                    console.error(e)
                                    alert("パースエラー\r\n"+decodedString)
                                }
                            }


                            
                            
                        }catch(e){
                            console.error(e)
                            alert("読み込みエラー\r\n"+decodedString)
                        }finally{
                            //ローディングを無効にする
                            this.isloading = false
                        }
                        
                        //閉じる
                        close()
                    }
                }.bind(this));
                fr.readAsArrayBuffer(file);
            }
            
            this.drag = false
        }
    },

    
}
</script>

<style module="$style">

    .overlay-area{
        position:fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: black;
        opacity: 0.8;
        z-index: 1;
    }
    .main-area{
        position:fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        display: grid;
        grid-template:
        "...... ......    ......... ......... ................." auto
        "...... ......    ......... ......... ................." auto
        "...... ......    ......... ......... close-button-area" auto
        "...... drop-area drop-area drop-area ................." auto
        "...... ......    ......... ......... ................." auto
        "...... ......    ......... ......... ................." auto
        "...... ......    ......... ......... ................." auto
        /auto   auto      auto      auto      auto    ;
    }
        .drop-area{
            display: grid;
            align-items: center;
            justify-items: center;
            margin: 0;
            padding: 0;
            z-index: 100;
            color: white;
            border-radius: 20px;
            height: 500px;
            border:dotted 4px rgb(80, 80, 80);
            min-width: 230px;
        }
        .drop-area{
            grid-area: drop-area ;
        }
        .close-button-area{
            grid-area: close-button-area;
            justify-items: left;
        }
            .close-button{
                display: grid;
                align-items: center;
                height: 60px;
                width: 60px;
                border-radius: 30px;
                color: rgb(45, 45, 45);
                background-color:rgb(241, 241, 241);
                border: none;
                cursor: pointer;
                font-size: 50px;
            }

</style>
