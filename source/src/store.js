import Vue from "vue";
import Vuex from "vuex"
import EditTemplate from "./store/api/edit_template.js"
import EditTemplateUrlList from "./store/api/edit_template_url_list.js"
Vue.use(Vuex);


var store = new Vuex.Store({
    modules:{
        EditTemplate,
        EditTemplateUrlList,
    },
});
export default store;