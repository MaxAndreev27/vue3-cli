import { createLogger, createStore } from 'vuex';
import counterModule from './modules/counter';
import mutations from './mutations';
import actions from './actions';
export default createStore({
    plugins: [createLogger()],
    modules: {
        count: counterModule,
    },
    state() {
        return {
            appTitle: 'Vuex Working!',
        };
    },
    getters: {
        uppercaseTitle(state) {
            return state.appTitle.toUpperCase();
        },
    },
    mutations: mutations,
    actions: actions,
});
