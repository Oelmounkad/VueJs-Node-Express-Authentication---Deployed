import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        username:'',
        registerRedirect:{
        registerMsg:'',
        registeredEmail:''  
        }
      
    },
    mutations:{
        persistUsername(state,payload){
            state.username = payload
        },
        deleteUsername(state){
            state.username = ''
        },
        persistRegisterData(state,payload){
        state.registerRedirect.registerMsg = payload.msg
        state.registerRedirect.registeredEmail = payload.email
        }
    }
})