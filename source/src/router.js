import VueRouter from 'vue-router';
import Vue from 'vue';
import SpreadEditor from './pages/SpreadEditor.vue';
import Index from './pages/Index.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode:"hash",

    routes:[
        {
            name:"top",
            path:"/",
            component: Index,
        },
        {
            name:"editor",
            path:"/editor",
            component: SpreadEditor,
        },
    ]
});
