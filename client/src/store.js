import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles:[]
  },
  mutations: {
    SET_ARTICLES(state,payload) {
      // console.log("msk mtate");
      
      state.articles = payload
    },
    SET_ARTICLE(state,payload){
      state.article = payload
    }
  },
  actions: {
    getAll({commit}, payload) {
      axios({
          method: "get",
          url: "http://localhost:3000/home/blogs" 
      })
      .then(({data})=>{
          // console.log("xxxxxxx",data.Article);
          payload = data.Article
          commit("SET_ARTICLES", payload)
      })
      .catch(err=>{
          console.log(err.message);        
      })
    }
  }
})
