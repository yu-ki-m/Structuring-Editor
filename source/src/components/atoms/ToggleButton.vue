<template>
    <label>
        <div  :class="[
            $style['toggle-container'],
            value?$style['on-toggle-container']:$style['off-toggle-container']
            ]" >
                <div :class="value?[$style['on-circle'],$style['circle']]: [$style['off-circle'],$style['circle']]"></div>
                <input
                    :class="[$style['hide-toggle']]" 
                    type="checkbox"
                    :value="value"
                    @change="inputValue"
                />
        </div>
    </label>
</template>
<script>
export default {
    name: 'ToggleButton',
    data() {
        return {
        }
    },
    props:{
        value:{
            default:false
        }
    },
    methods:{
        inputValue(){
            this.$emit("input",!this.value)
        }
    },
    

};
</script>

<style module="$style">
    .toggle-container{
        display:grid;
        cursor: pointer;
        width:40px;
        height:20px;
        border-radius: 10px 10px;
        font-size: 10px;
        justify-items: left;
        align-items: center;
    }
    .on-toggle-container{
        background-color: rgb(62, 112, 112);
    }
    .off-toggle-container{
        background-color: rgb(109, 109, 109);
    }

    .hide-toggle{
        display: none;
    }
    .circle{
        height:20px;
        width:20px;
        border-radius: 12px 12px;
        transition: all 0.5s ;
    }
    .off-circle{
        background-color: rgb(204, 204, 204);
        transform: translateX(0px)  ;
    }
    .on-circle{
        background-color: rgb(175, 255, 255);
        transform: translateX(20px)  ;
    }
</style>
