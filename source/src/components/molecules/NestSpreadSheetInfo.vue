<template>
        <div :class="$style['sheet-name-container']" >
            <div :class="$style['sheet-name']" >

                <InputChange
                    :value="sheetInfo.name"
                    :placeholder="nameTitle"
                    :title="nameTitle"
                    @input="inputName"
                />
            </div>
            <div :class="$style['sheet-version']"  >

                <InputChange
                    :placeholder="versionTitle"
                    :title="versionTitle"
                    :value="sheetInfo.sheetVersion"
                    @input="inputVersion"
                />
            </div>
            <div :class="$style['sheet-export-time-stamp']" @dbclick="sheetInfo.exportTimeStamp = new Date().toLocaleString()">
                <InputChange

                    :placeholder="exportTimeStampTitle"
                    :title="exportTimeStampTitle"
                    :value="sheetInfo.exportTimeStamp"
                    @input="inputExportTimeStamp"
                />
            </div>
            <div :class="$style['sheet-export-time-stamp-button']" >
                <button @click="sheetInfo.exportTimeStamp = new Date().toLocaleString()">
                    <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                        width="15px" height="15px" viewBox="-0.5 -0.5 93 90">
                        <g>
                            <path d="M 87 44 C 87 67.47 67.97 86.5 44.5 86.5 C 21.03 86.5 2 67.47 2 44 C 2 20.53 21.03 1.5 44.5 1.5"
                                fill="none" stroke="#636363" stroke-width="4" stroke-miterlimit="10"  />
                            <ellipse cx="44" cy="44" rx="30" ry="30" fill="none" stroke="#636363" stroke-width="4"  />
                            <path d="M 46.27 42.73 L 64.5 23" fill="none" stroke="#636363" stroke-width="3" stroke-miterlimit="10"/>
                            <path d="M 42.73 42.73 L 44 44" fill="none" stroke="#636363" stroke-width="3" stroke-miterlimit="10" />
                            <ellipse cx="44.5" cy="44.5" rx="2.5" ry="2.5" fill="#636363" stroke="#636363" />
                            <path d="M 24 34 L 42.27 43.37" fill="none" stroke="#636363" stroke-width="3" stroke-miterlimit="10" />
                            <path d="M 82 36 L 92 41 L 82 46 Z" fill="#636363" stroke="none" transform="rotate(-90,87,41)" />
                        </g>
                    </svg>
                </button>
            </div>
            <div :class="$style['sheet-id']" >
                <InputChange
                    :placeholder="idTitle"
                    :title="idTitle"
                    :value="sheetInfo.sheetId"
                    :disabled="commonParameter.editMode.sheetIdFixed"
                    @input="inputId"
                />
            </div>
        </div>
        
</template>


<script>


import InputChange from '@/components/atoms/InputChange.vue'
export default {
    name: "NestSpreadSheetInfo",
    components:{
        InputChange
    },
    data() { 
        return {
            isFocus:false,
        }
    },
    props:{
        sheetInfo:{
            default:()=>{ return undefined }
        },
        commonParameter:{
            default:()=>{ return undefined }
        },
        
        backgroundColor:{
            default:"rgb(20,20,20)"
        },
        color:{
            default:"rgb(241, 241, 241)"
        },
        nameTitle:{
            default:"sheet name"
        },
        versionTitle:{
            default:"sheet version"
        },
        exportTimeStampTitle:{
            default:"sheet time stamp"
        },
        idTitle:{
            default:"sheet id"
        },
    },
    created:function(){
        if(this.sheetInfo != undefined){
            this.sheetInfo.exportTimeStamp=new Date().toLocaleString()
        }
    },
    methods:{
        
        inputName:function($event) {
            this.sheetInfo.name = $event.target.value
        },
        inputVersion:function($event) {
            this.sheetInfo.sheetVersion = $event.target.value
        },
        inputExportTimeStamp:function($event) {
            this.sheetInfo.exportTimeStamp = $event.target.value
        },
        inputId:function($event) {
            this.sheetInfo.sheetId = $event.target.value
        },
    },



}
</script>

<style module="$style">
.sheet-name-container{
    display: grid;
    grid-template:
    " sheet-name sheet-version sheet-export-time-stamp sheet-export-time-stamp-button sheet-id" auto
    / 3fr       1fr            130px                   20px                           2fr;
    border-top:solid 1px rgba(51, 54, 53, 1);
}
.sheet-name{
    grid-area: sheet-name;
}
.sheet-id{
    grid-area: sheet-id;
}
.sheet-version{
    grid-area: sheet-version;
}
.sheet-export-time-stamp{
    grid-area: sheet-export-time-stamp;
}
.sheet-export-time-stamp-button{
    grid-area: sheet-export-time-stamp-button;
}

.sheet-name{

    border-left: solid 1px rgba(51, 54, 53, 1);
}
.sheet-id{
    border-left: solid 1px rgba(51, 54, 53, 1);

}
.sheet-version{
    border-left: solid 1px rgba(51, 54, 53, 1);
}
.sheet-export-time-stamp{
    border-left: solid 1px rgba(51, 54, 53, 1);
}
.sheet-export-time-stamp-button{
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: rgb(20, 20, 20);
    color: rgb(241, 241, 241);
    padding: 0px;
    margin: 0px;
}
.sheet-export-time-stamp-button>button{
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: rgb(20, 20, 20);
    color: rgb(241, 241, 241);
    border:none;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
}
</style>
