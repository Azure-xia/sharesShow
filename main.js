import Vue from "vue";
import App from "./app.vue";
import Vuex from 'vuex';
import "./style.css";
import share_data from './share.js';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        shareList: [] //股票列表
    },
    mutations: {
        setShareList(state, data) {
            state.shareList = data;
        }
    },
    actions: {
        getShareList(context) {
            return new Promise((resolve, reject) => {
                context.commit('setShareList', share_data);
                resolve();
            });
        }
    }
})
new Vue({
    el: "#app",
    store: store,
    render: h => h(App)
})