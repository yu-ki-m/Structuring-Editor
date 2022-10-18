
<template>
    <div :class="[$style['open-button-area']]" :style="openButtonStyle">
        <button 
             tabindex="-1" 
            @click="$emit('click')"
            :class="[$style['open-button']]" 
            :style="openButtonStyle">
            <svg viewBox="0 0 512 512" style="width: 18px; height: 8px; opacity: 1;">
                <g>
                    <polygon fill="#444444" points="440.189,92.085 256.019,276.255 71.83,92.085 0,163.915 256.019,419.915 512,163.915 	" ></polygon>
                </g>
            </svg>

        </button >
    </div>
</template>

<script>
export default {
    name: 'OpenButton',

    props:{
        backgroundColor:{
            default:'rgb(35 35 35)'
        }
    },
    computed:{
        openButtonStyle(){
            return { 'background-color':this.backgroundColor };
        }
    },

    
}
</script>

<style module="$style">
    .open-button-area{
        display: grid;
        align-items: center;
        justify-items: center;
        margin: 0;
        padding: 0;
        
    }

    .open-button{
        display: grid;
        align-items: center;
        justify-items: center;
        margin: 0;
        padding: 0;
        border:none;
        outline: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        font-size: 5px;
    }

    .open-button:hover{
        box-shadow: inset 0 0 30px 1px rgb(40 40 40);
    }
</style>
