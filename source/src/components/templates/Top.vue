<template>
    <div >   
        <div>
            <NestSpreadHeader />
            <SelectTemplateContainer />
            <NestSpreadFooter />
        </div>


    </div>
</template>

<script>
import SelectTemplateContainer from '@/components/organisms/SelectTemplateContainer.vue'
import NestSpreadFooter from '@/components/organisms/NestSpreadFooter.vue'
import NestSpreadHeader from '@/components/organisms/NestSpreadHeader.vue'
export default {
    name: 'NestSpreadSheet',
    components: { 
        SelectTemplateContainer,
        NestSpreadFooter,
        NestSpreadHeader
    },

}
</script>
