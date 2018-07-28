const state = {
  isPlanAddShow: false,
  addPlanId: null,
  upPlanId: null,
  isTestCloseShow: false,
  isKeyBoardShow: false,
  searchItem: '',
  isBookCreatorShow: false,
  isAvatarCropShow: false,
  isUpdatePlanShow: false,
  isUpdateBookShow: false,
  upBookId: null,
  isAddSeqShow: false,
  addSeqId: null,
  isDeleteBookShow: false,
  deleteBookId: null
}

const getters = {
  isPlanAddShow: state => state.isPlanAddShow,
  isTestCloseShow: state => state.isTestCloseShow,
  isKeyBoardShow: state => state.isKeyBoardShow,
  searchItem: state => state.searchItem,
  isBookCreatorShow: state => state.isBookCreatorShow,
  isAvatarCropShow: state => state.isAvatarCropShow,
  isUpdatePlanShow: state => state.isUpdatePlanShow,
  isUpdateBookShow: state => state.isUpdateBookShow,
  isDeleteBookShow: state => state.isDeleteBookShow,
  isAddSeqShow: state => state.isAddSeqShow
}

const actions = {
  switchPlanAddShow ({ commit }, {status, id}) {
    commit('switchPlanAddShow', {status, id})
  },
  switchBookCreatorShow ({ commit }, status) {
    commit('switchBookCreatorShow', status)
  },
  switchAvatarCropShow ({ commit }, status) {
    commit('switchAvatarCropShow', status)
  },
  switchUpdatePlanShow ({ commit }, status) {
    commit('switchUpdatePlanShow', status)
  },
  switchUpdateBookShow ({ commit }, status) {
    commit('switchUpdateBookShow', status)
  },
  clearPlanAdd ({commit}) {
    commit('clearPlanAdd')
  },
  switchTestCloseShow ({ commit }, status) {
    commit('switchTestCloseShow', status)
  },
  switchAddSeqShow ({ commit }, status) {
    commit('switchAddSeqShow', status)
  },
  switchKeyBoardShow ({ commit }, status) {
    commit('switchKeyBoardShow')
  },
  setSearchItem ({ commit }, item) {
    commit('setSearchItem', item)
  },
  addSearchItem ({ commit }, char) {
    commit('addSearchItem', char)
  }
}

const mutations = {
  switchPlanAddShow (state, {status, id}) {
    state.isPlanAddShow = status
    state.addPlanId = id
  },
  clearPlanAdd (state) {
    state.addPlanId = null
  },
  switchTestCloseShow (state, status) {
    state.isTestCloseShow = status
  },
  switchKeyBoardShow (state, status) {
    state.isKeyBoardShow = status
  },
  switchAvatarCropShow (state, status) {
    state.isAvatarCropShow = status
  },
  switchUpdatePlanShow (state, {status, id}) {
    state.isUpdatePlanShow = status
    if(status == false) {
      state.upPlanId = null
    } else {
      state.upPlanId = id
    }  
  },
  switchAddSeqShow (state, {status, id}) {
    state.isAddSeqShow = status
    if(status == false) {
      state.addSeqId = null
    } else {
      state.addSeqId = id
    }  
  },
  switchDeleteBookShow (state, {status, id}) {
    state.isDeleteBookShow = status
    if(status == false) {
      state.deleteBookId = null
    } else {
      state.deleteBookId = id
    }  
  },
  switchUpdateBookShow (state, {status, id}) {
    state.isUpdateBookShow = status
    if(status == false) {
      state.upBookId = null
    } else {
      state.upBookId = id
    }    
  },
  setSearchItem (state, item) {
    state.searchItem = item
  },
  addSearchItem(state, char) {
    state.searchItem += char
  },
  switchBookCreatorShow(state, status) {
    state.isBookCreatorShow = status
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}