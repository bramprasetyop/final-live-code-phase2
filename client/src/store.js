import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Router from './router'
import {
  stat
} from 'fs';



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    auth: false,
    modalAuth: false,
    users: '',
    postModal:false
  },
  mutations: {
    SET_ARTICLES(state, payload) {
      // console.log("msk mtate");

      state.articles = payload
    },
    SET_ARTICLE(state, payload) {
      state.article = payload
    },
    setAuth(state, payload) {
      state.auth = payload
    },
    setModalAuth(state, payload) {
      state.modalAuth = payload

    },
    setUser(state, payload) {
      state.users = payload
    },
    setPostModal(state,payload){
      state.postModal = payload
    }
  },
  actions: {
    getUser({
      commit
    }, payload) {

      axios({
          method: "get",
          url: "http://localhost:3000/members",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log("==============", data.users[0]._id);
          payload = data.users[0]
          commit("setUser", payload)
        })
        .catch(err => {
          console.log(err.message);
        })

    },
    logout({
      commit
    }, payload) {
      localStorage.removeItem('token')
      swal({
        text: 'Logout Success',
        icon: 'success'
      })
      // this.$store.commit('setAuth', false)
      commit('setAuth', false)
      Router.push('/')
    },
    close({
      commit
    }, payload) {
      commit('setModalAuth', false)
      commit('setPostModal', false)
      Router.push('/')

    },
    getAll({
      commit
    }, payload) {
      axios({
          method: "get",
          url: "http://localhost:3000/home/blogs"
        })
        .then(({
          data
        }) => {
          console.log("xxxxxxx", data.Articles[1]);
          payload = data.Articles
          commit("SET_ARTICLES", payload)
        })
        .catch(err => {
          console.log(err.message);
        })
    }
  }
})