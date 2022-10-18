<template>
        <div >
            <div >
                <div 
                    :class="$style['header-container']" 
                    >
                    <div :class="$style['header-home']" @click="home">
                        <div :class="$style['header-logo']">

                        <svg  width="50px" height="50px" viewBox="-0.5 -0.5 82 82">
                                <g>
                                    <path d="M 0 0 L 80 0 L 80 20 L 20 20 L 20 80 L 0 80 Z" fill="#1f1f1f" stroke="#a3a3a3" stroke-miterlimit="10" />
                                    <path d="M 25 25 L 80 25 L 80 45 L 44 45 L 44 80 L 25 80 Z" fill="#1f1f1f" stroke="#a3a3a3"
                                        stroke-miterlimit="10"  />
                                    <path d="M 49 50 L 80 50 L 80 70 L 69 70 L 69 80 L 49 80 Z" fill="#1f1f1f" stroke="#a3a3a3"
                                        stroke-miterlimit="10"  />
                                </g>
                            </svg>

                        </div>
                        <div :class="$style['header-title']">
                            Structuring <br/> Editor
                        </div>
                    </div>
                    <div :class="$style['header-to-guide']">
                        <ToGuide />
                    </div>
                    <div :class="$style['header-new-tab']">
                        <div :class="$style['header-new-tab-container']">
                            <ToNewBrowserTab />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
</template>


<script>

import ToNewBrowserTab from '@/components/atoms/ToNewBrowserTab.vue'
import ToGuide from '@/components/atoms/ToGuide.vue'
export default {
    name: 'NestSpreadHeader',
    components:{
        ToNewBrowserTab,
        ToGuide
    },
    data() { 
        return {
        }
    },
    props:{
        headerItem:{
            default:()=>{ return undefined }
        },
    },
    methods:{
        
        home:function(){
            this.$router.push( { name: 'top' ,query:{ time: Date.now()}});
        }
    }


}
</script>

<style module="$style">

/* レイアウト */
.header-container{
    display: grid;
    height:100px;
    background-color:rgb(25,25,25);
    border-bottom: solid 1px rgb(41, 41, 41);
    grid-template:
    ".... ........... ....... header-to-guide header-new-tab" auto
    ".... header-home ....... header-to-guide header-new-tab" auto
    ".... ........... ....... ............... .............." auto
    /20px auto          auto  150px           30px;
    align-items: center;
}
.header-to-guide{
    display: grid;
    grid-area:header-to-guide;
    align-self: start;
}
.header-new-tab{
    display: grid;
    grid-area:header-new-tab;
    justify-items: right;
    align-self: start;
}
.header-new-tab-container{
    display: grid;
    
}
.header-home{
    display: grid;
    grid-area:header-home;
    grid-template:
    "header-logo  header-title" auto
    /60px         auto        ;
    cursor: pointer;
    height:60px;
    width:170px;
    transition: all 1s;
}

.header-home:hover{
    box-shadow: 0px 0px 5px 1px rgb(54, 54, 54);
    border-radius: 4px;
}
.header-title{
    display: grid;
    grid-area:header-title;
    align-items: center;
    color: rgb(200,200,200);
    font-size: 20px;
    animation-name: textAnime;
    animation-duration: 100s;
    animation-iteration-count: infinite;
}

.header-logo{
    display: grid;
    grid-area:header-logo;
    align-items: center;
    justify-items: center;
}


@keyframes textAnime {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.99;
  }
}
</style>
