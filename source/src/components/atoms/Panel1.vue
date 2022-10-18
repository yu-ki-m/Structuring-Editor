<template>
    <div  @click="$emit('click')" :class="$style['panel']">
        <div :class="$style['panel-name']">{{panelName}}</div>
        <div :class="$style['panel-tags']">
            <div :class="$style['panel-tag-area']">
                <div :class="$style['panel-tag']"  v-for="tag in tags" :key="tag.tagName">
                    <div :class="$style['tag-name']" title="タグ">
                        {{tag.tagName}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Panel1',
    data() { 
        return {
        }
    },
    props:{
        panelName:{
            default:''
        },
        tags:{
            default:()=>{return []}
        }
    },
}
</script>

<style module="$style">
    .panel {
        display: grid;
        grid-template:
        ".............." 1fr
        ".............." 1fr
        ".............." 1fr
        "panel-name    " auto
        ".............." 1fr
        "panel-tags    " 1fr
        "panel-tags    " 1fr
        /auto          ;
        cursor: pointer;
        color: rgb(136, 136, 136);
        border: solid 1px rgb(136, 136, 136);
        width:300px;
        height:200px;
        border-radius: 5px;
        transition: color 0.5s,border 0.5s;
    }
    .panel:hover {
        color: rgb(255, 255, 255);
        border: solid 1px rgb(255, 255, 255);
    }
    .panel-name{
        display: grid;
        grid-area: panel-name;
        align-items: center;
        justify-items: center;
    }
    .panel-tags{
        display: grid;
        grid-area: panel-tags;
        align-items: flex-start;
    }
    .panel-tag-area{
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 5px;
        row-gap: 2.5px;
    }
    .panel-tag{
        display: grid;
        grid-template:
        ".... ......... ....." 4px
        ".... tag-name  ....."auto
        ".... ........  ....." 4px
        /9px  auto      9px     ;
        font-size: xx-small;
        color: rgb(136, 136, 136);
        background-color:rgb(51, 51, 51);
        border-radius: 10px;
    }
    .tag-name{
        display: grid;
        grid-area: tag-name;
        word-break:break-all;
    }
</style>