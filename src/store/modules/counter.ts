export default {
    namespace: true,
    state() {
        return {
            counter: 1,
        };
    },
    mutations: {
        increment(state: any, payload: any) {
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
        incrementAsync(context: any, payload: any) {
            setTimeout(async () => await context.commit('increment', { value: 10 }), payload.delay);
        },
    },
    getters: {
        counterDouble(state: any) {
            return state.counter * 2;
        },
    },
};
