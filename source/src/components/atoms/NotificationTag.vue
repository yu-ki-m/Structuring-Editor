
<template>
    <transition name="fade" >
        <div v-if="isNotice" :class="$style['main-content']" :key="time">
            <div :class="$style['notice']">
                <button :class="$style['x-button']" @click="isNotice = false;">
                    ×
                </button>
                <div :class="$style['notice-title']">
                    {{ notificationTitle }}
                </div>
                <div :class="$style['notice-content']">
                    {{ notificationValue }}
                </div>
                <div :class="$style['notice-time']">
                    {{ time }}
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'NotificationTag',
    data(){
        return {
            isNotice:false,
            time:undefined,
            notificationTitle:"",
            notificationValue:"",
        }
    },
    methods:{
        notice(title,content){
            this.time = new Date().toLocaleTimeString()
            this.notificationTitle = title
            this.notificationValue = content
            this.isNotice = true
        }
    },
    watch:{
        'time':_.debounce(function(){
            if(this.isNotice == true){
                this.isNotice = false
                this.notificationTitle = ""
                this.notificationValue = ""
            }
        },5000)
    }

    
}
</script>

<style module="$style">
.main-content{
    position:fixed;
    right:0;
}
.notice{
    background-color:rgb(61, 61, 61);
    z-index: 999;
    width:300px;
    color:white;
}
.notice{
    display: grid;
    grid-template:
    ".... .............. .............. ........ ........" 10px
    ".... notice-title   notice-title   x-button ........" auto
    ".... notice-content notice-content ........ ........" auto
    ".... notice-content notice-content ........ ........" auto
    ".... .............. notice-time    ........ ........" 10px
    /10px 200px          60px           20px     10px;
}

.notice-title{
    display: grid;
    grid-area: notice-title;
    word-break:break-all;
    font-weight: 700;
}
.notice-content{
    display: grid;
    grid-area: notice-content;
    word-break:break-all;
}
.notice-time{
    grid-area: notice-time;
    display: grid;
    font-size: 4px;
    color: rgb(139, 139, 139);
}
.x-button{
    display: grid;
    grid-area:x-button;
    border-radius: 50%;
    background-color: rgb(99, 99, 99);
    border:none;
    outline: none;
    color:rgb(200, 200, 200);
    cursor: pointer;
    width:20px;
    height:20px;
    align-items: center;
    justify-items: center;
}
</style>
<style scoped>
.fade-enter{
    /* 現れるときの最初の状態 */
    opacity: 0;
}
.fade-enter-active{
    /* 現れるときのトランジションの状態 */
    transition: opacity 0.5s;
    animation: fade-in 0.5s;

}
.fade-enter-to{
    /* 現れるときの最後の状態 */
    opacity: 1;
}
.fade-leave{
    /* 消えるときの最初の状態 */
    opacity: 1;
}
.fade-leave-active{
    /* 消えるときのトランジションの状態 */
    transition:opacity 0.5s;
    animation: fade-in 0.5s reverse;
}
.fade-leave-to{
    /* 消えるときのの最後の状態 */
    opacity: 0;
}

@keyframes fade-in {
    from{
        transform: translateY(-300px)  ;
    }
    to{
        transform: translateY(0) ;
    }
}
</style>


