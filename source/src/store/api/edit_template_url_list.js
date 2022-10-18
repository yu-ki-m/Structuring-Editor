
import axios from "axios";
const TEMPLATE_URL = "data/"

var editTemplate = {
    namespaced: true,
    state:{
        editTemplateList:{ data:{ list:[] } },
    },  
    
    getters: { 
        getValue(state) {
            return state.editTemplateList
        },
     },
    mutations:{  
        setValueMutation(state, val) {
            state.editTemplateList.data = val;
        },
      },
    actions: {
        setValueAction({ commit }) {
            axios.get(TEMPLATE_URL+'edit_template_info_list.json')
            .then(function(response){
                commit("setValueMutation", response.data);
            }.bind(this))
            .catch(function(error){
                console.error(error)
            }.bind(this))
            .finally(function(){
                //
            }.bind(this))
        },

    }
};

export default editTemplate;

