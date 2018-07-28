const state = {
    words: [],
    testWrong: [],
    review: [],
    reviewWrong: [],
    reviewIndex: 0,
    studyIndex: 0,
    testIndex: 0,
    answer: ''
}

const getters = {
  words: state => state.words,
  review: state => state.review,
  reviewIndex: state => state.reviewIndex,
  reviewWrong: state => state.reviewWrong,
  studyIndex: state => state.studyIndex,
  testIndex: state => state.testIndex,
  reviewLen: state => state.review.length,
  wordsLen: state => state.words.length,
  wrongLen: state => state.testWrong.length,
  rwrongLen: state => state.reviewWrong.length,
  answer: state => state.answer,
  testWrong: state => state.testWrong.length
}

const actions = {
  nextStudyIndex ({commit}) {
    commit('nextStudyIndex')
  },
  prevStudyIndex({commit}) {
    commit('prevStudyIndex')
  },
  nextTestIndex ({commit}) {
    commit('nextTestIndex')
  },
  prevTestIndex({commit}) {
    commit('prevTestIndex')
  },
  nextReviewIndex ({commit}) {
    commit('nextReviewIndex')
  },
  prevReviewIndex({commit}) {
    commit('prevReviewIndex')
  },
  setReviewIndex({commit}, index) {
    commit('setReviewIndex', index)
  },
  setStudyIndex({commit}, index) {
    commit('setStudyIndex', index)
  },
  setTestIndex({commit}, index) {
    commit('setTestIndex', index)
  },
  setWords ({commit}, words) {
    commit('setWords', words)
  },
  setReview ({commit}, review) {
    commit('setReview', review)
  },
  setAnswer ({commit}, answer) {
    commit('setAnswer', answer)
  },
  clearTestWrong ({commit}) {
    commit('clearTestWrong')
  },
  addTestWrong ({commit}, id) {
    commit('addTestWrong', id)
  },
  addReviewWrong ({commit}, id) {
    commit('addReviewWrong', id)
  },
  clearAllWord ({commit}) {
    commit('clearAllWord')
  }
}

const mutations = {
  nextStudyIndex (state) {
    console.log(state.words.length)
    if(state.studyIndex + 1 == state.words.length){
      return
    }
    state.studyIndex++
  },
  prevStudyIndex (state) {
    if(state.studyIndex == 0) {
      return
    }
    state.studyIndex--
  },
  nextTestIndex (state) {
    if(state.testIndex + 1 == state.words.length){
      return
    }
    state.testIndex++
  },
  prevTestIndex (state) {
    if(state.TestIndex == 0) {
      return
    }
    state.testIndex--
  },
  prevReviewIndex (state) {
    if(state.reviewIndex == 0) {
      return
    }
    state.reviewIndex--
  },
  nextReviewIndex (state) {
    if(state.reviewIndex + 1 == state.review.length) {
      return
    }
    state.reviewIndex++
  },
  setReviewIndex(state, index) {
    state.reviewIndex = index
  },
  setStudyIndex(state, index) {
    state.studyIndex = index
  },
  setWords (state, words) {
    state.words = words
  },
  setReview (state, review) {
    state.review = review
  },
  setTestIndex (state, index) {
    state.testIndex = index
  },
  setAnswer (state, answer) {
    state.answer = answer
  },
  clearTestWrong (state) {
    state.testWrong = []
  },
  addTestWrong (state, id) {
    state.testWrong.push(id)
  },
  addReviewWrong (state, id) {
    state.reviewWrong.push(id)
  },
  clearAllWord (state) {
    state.words = []
    state.testWrong = []
    state.reviewWrong = []
    state.reviewIndex = 0
    state.studyIndex = 0
    state.testIndex = 0
    state.answer = ''
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}