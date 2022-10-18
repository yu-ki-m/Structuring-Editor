

<template>
    <button @click="linkToOtherWindow" :class="[$style['button']]" title="新しいタブで開く">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="20px" height="20px" viewBox="-0.5 -0.5 41 41">
            <g>
                <rect x="10" y="1" width="30" height="30" fill="#1f1f1f" stroke="#a3a3a3" stroke-width="2"
                    pointer-events="all" />
                <rect x="0" y="8" width="2" height="32" fill="#a3a3a3" stroke="none"  />
                <rect x="0" y="38" width="32" height="2" fill="#a3a3a3" stroke="none" />
                <rect x="10" y="8" width="30" height="2" fill="#a3a3a3" stroke="none" />
            </g>
        </svg>
    </button>
</template>

<script>
export default {
    name: 'ToNewBrowserTab',
    methods: {
        linkToOtherWindow() {
        let resolvedRoute = this.$router.resolve({
            name: top,
        });
        window.open(resolvedRoute.href, '_blank');
        }
    }
}
</script>

<style module="$style">
    .button{
        display: grid;
        border: none;
        outline: none;
        background-color: rgba(0,0,0,0);
        cursor: pointer;
    }
</style>
