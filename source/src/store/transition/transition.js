var moduleA = {
    namespaced: true,
    state:{
        value:"",
        stateHistory:[ ]
    },  
    
    getters: { 
        getValue(state) {
            return state.value 
        },
        stateHistory(state) {
            //
            return (key)=>{ return state.stateHistory.find((valueInfo)=>{ return valueInfo.key === key })}
        },

     },

    mutations:{  
        setValueMutation(state, val) {
            state.value = val;
        },
        addStateHistory(state) {
            return state.stateHistory.push(
                {
                    key:window.history.state.key,
                    value:state.value
                })
        },
      },
    actions: {
        setValueAction({ commit }, val) {
            commit("setValueMutation", val);
        },
        addStateHistory({ commit } ) {
            commit("addStateHistory");
        },

    }
};

export default moduleA;

