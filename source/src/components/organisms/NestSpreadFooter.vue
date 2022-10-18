<template>
        <div >
            <div >
                <div 
                    :class="$style['footer-container']" 
                    >
                    <div style="display:none;">Copyright YUKI MORISHIMA.</div>
                </div>
            </div>
        </div>
        
</template>


<script>

export default {
    name: 'NestSpreadFooter',
    data() { 
        return {
        }
    },
    props:{
        headerItem:{
            default:()=>{ return undefined }
        },
    },


}
</script>

<style module="$style">

/* レイアウト */
.footer-container{
    display: grid;
    height:200px;
    background-color:rgb(25,25,25);
    border-top: solid 1px rgb(41,41,41);
    justify-items: center;
    align-items: center;
}


</style>
