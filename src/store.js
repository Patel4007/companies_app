import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    headerColor: 'transparent'
  },
  mutations: {
    
    setHeaderColor(state, color) {
      state.headerColor = color;
    }
  }
});