
import axios from "axios";
const TEMPLATE_URL = "editor_template_json/"

var editTemplate = {
    namespaced: true,
    state:{
        editTemplateList:undefined
    },  
    getters: { 
        getValue(state) {
            return state.editTemplateList
        },
     },

    mutations:{  
        setValueMutation(state, val) {
            state.editTemplateList = val;
        },
    },

    actions: {
        setValueAction({ commit },urlName) {
            axios.get(TEMPLATE_URL+urlName)
            .then(function(response){
                commit("setValueMutation", response.data);
            }.bind(this))
            .catch(function(error){
                //エラーが発生した場合
                console.error(error)
            }.bind(this))
            .finally(function(){
                //
            }.bind(this))
        },
        setDefaultAction({ commit },data) {
            commit("setValueMutation", data );
        },
        init({ commit }) {
            commit("setValueMutation", undefined );
        },

    }
};

export default editTemplate;

