<template>
    <div >   
        <div>
            <NestSpreadHeader />
            <NestSpreadItemContainer />
            <NestSpreadFooter />
        </div>


    </div>
</template>

<script>
import NestSpreadItemContainer from '@/components/organisms/NestSpreadItemContainer.vue'
import NestSpreadFooter from '@/components/organisms/NestSpreadFooter.vue'
import NestSpreadHeader from '@/components/organisms/NestSpreadHeader.vue'
export default {
    name: 'NestSpreadSheet',
    components: { 
        NestSpreadItemContainer,
        NestSpreadFooter,
        NestSpreadHeader
    },

}
</script>
