<template>
    <div  :class="[$style['toggle-panel-container']]" >
        <div :class="[$style['toggle-label']]">{{label}}</div>
        <div :class="[$style['toggle-button']]">
            <ToggleButton
                type="checkbox"
                :value="value"
                @input="inputValue"
            />
        </div>
    </div>
</template>
<script>
import ToggleButton from '@/components/atoms/ToggleButton.vue'
export default {
    name: 'TogglePanel',
    components:{
        ToggleButton
    },
    data() {
        return {
        }
    },
    props:{
        label:{
            default:""
        },
        value:{
            default:false
        }
    },
    methods:{
        inputValue($event){
            this.$emit("input",$event)
        }
    },
    

};
</script>

<style module="$style">
    .toggle-panel-container{
        display:grid;
        grid-template:
        "............ ............." 7.5px
        "toggle-label toggle-button" auto
        "............ ............." 7.5px
        / 95px        40px    ;
        align-items: center;
        min-height: 30px;
    }
    .toggle-label{
        display: grid;
        font-size:13px;
        align-items: center;
        grid-area: toggle-label;
    }
    .toggle-button{
        display: grid;
        align-items: center;
        grid-area: toggle-button;
    }
</style>
