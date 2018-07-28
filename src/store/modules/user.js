const state = {
  username: '',
  nickname: '',
  avatar: '',
  token: '',
  points: 0
}
const getters = {
  username: state => state.username,
  nickname: state => state.nickname,
  avatar: state => state.avatar,
  token: state => state.token,
  points: state => state.points
}
const actions = {
  setUsername ({commit}, username) {
    commit('setUsername', username)
  },
  setNickname ({commit}, nickname) {
    commit('setNickname', nickname)
  },
  setAvatar ({commit}, avatar) {
    commit('setAvatar', avatar)
  },
  setToken ({commit}, token) {
    commit('setToken', token)
  },
  setPoints ({commit}, points) {
    commit('setPoints', points)
  },
  addPoints ({commit}, num) {
    commit('addPoints', num)
  },
  clearUserAll ({commit}) {
    commit('clearUserAll')
  }
}
const mutations = {
  setUsername (state, username) {
    state.username = username
  },
  setNickname (state, nickname) {
    state.nickname = nickname
  },
  setAvatar (state, avatar) {
    state.avatar = avatar
  },
  setToken (state, token) {
    state.token = token
  },
  setPoints (state, points) {
    state.points = points
  },
  addPoints (state, points) {
    state.points += points
  },
  clearUserAll (state) {
    window.localStorage.setItem("token", "")
    window.localStorage.setItem("username", "")
    state.username = ''
    state.nickname = ''
    state.avatar = ''
    state.token = ''
    state.points = 0
  }
}

module.exports = {
  state,
  getters,
  actions,
  mutations
}