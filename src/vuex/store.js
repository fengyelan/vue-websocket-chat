import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  msgInfos: [],
  allUserMsg: [],
  allUserCnt: 0,
  allMsgInfo: []

}

var getters = {

  allInitialLetters: (state) => {
    let s = new Set();
    state.allUserMsg.forEach(function(item) {
      s.add(item.initial);
    })
    return Array.from(s).sort();
  },

  sortedUserList: (state, getters) => {
    let res = {};
    getters.allInitialLetters.forEach(function(item) {
      res[item] = [];
      state.allUserMsg.forEach(function(user) {
        if(user.initial == item){
        	res[item].push(user.username);
        }
      })
    })
    return res;
  }

}

var mutations = {
  Change_All_User_Info: (state, users) => {
    state.allUserMsg = [];
    for (var key in users) {
      state.allUserMsg.unshift(users[key]);
    }
  },
  Change_User_Cnt: (state, cnt) => {
    state.allUserCnt = cnt;
  },
  Change_Msg_Info: (state, msg) => {
    state.allMsgInfo = msg;
  }

}

var actions = {

  changeAllUserInfo({ commit }, users) {
    commit('Change_All_User_Info', users)
  },
  changeUserCnt({ commit }, cnt) {
    commit('Change_User_Cnt', cnt)
  },
  changeMsgInfo({ commit }, msg) {
    commit('Change_Msg_Info', msg)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
