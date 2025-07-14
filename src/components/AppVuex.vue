<template>
    <div class="container with-nav">
        <div class="card">
            <h1>{{ uppercaseTitle }}</h1>
            <h2>Счетчик {{ $store.state.count.counter }}</h2>
            <h2>Счетчик Double {{ counterDouble }}</h2>
            <button class="btn" @click="increment">Додати</button>
            <button class="btn primary" @click="increment5">Додати 5</button>
            <button class="btn danger" @click="incrementAsync({ value: 10, delay: 100 })">
                Додати 10 через Async
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'AppVuex',
    computed: {
        ...mapGetters(['counterDouble', 'uppercaseTitle']),
    },
    methods: {
        // increment() {
        //      this.$store.state.counter++;
        //      Визиваємо метод з store
        //      this.$store.commit('increment');
        // },
        // increment5() {
        //     // this.$store.state.counter++;
        //     // Визиваємо метод з store
        //     this.$store.commit('increment', 5);
        // },
        // increment10() {
        //     // Визов store з Actions
        //     this.$store.dispatch('incrementAsync');
        // },

        // Теж саме з використанням мапперів
        ...mapMutations(['increment']),
        increment5() {
            this.increment({ value: 5 });
        },
        ...mapActions(['incrementAsync']),
        // ...mapMutations({ add: 'count/increment' }),
        // ...mapActions('count', ['incrementAsync']),
    },
};
</script>

<style lang="scss" scoped></style>
