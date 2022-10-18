

<template>

    <button @click="linkToOtherWindow" :class="[$style['button']]" title="Manual">
        Manual
    </button>
</template>

<script>
export default {
    name: 'ToGuide',
    methods: {
        linkToOtherWindow() {
            window.open("https://yu-ki-m.github.io/Structuring-Editor/manual/", '_blank');
        }
    }
}
</script>

<style module="$style">
    .button{
        width:90px;
        height:25px;
        border: none;
        outline: none;
        background-color: rgb(32, 34, 33);
        cursor: pointer;
        color: rgb(241, 241, 241);
        border-radius: 0px 0px 10px 10px;
    }
</style>
