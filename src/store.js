import { createStore } from 'vuex';
export default createStore({
    state() {
        return {
            counter: 1,
        };
    },
    mutations: {
        increment(state, payload) {
            console.log(payload);
            if (typeof payload.value === 'number') {
                state.counter += payload.value;
            } else {
                state.counter++;
            }
        },
    },
    // Для асінхронного визову
    actions: {
        incrementAsync(context, payload) {
            setTimeout(async () => await context.commit('increment', payload.value), payload.delay);
        },
    },
    getters: {
        counterDouble(state) {
            return state.counter * 2;
        },
    },
});
