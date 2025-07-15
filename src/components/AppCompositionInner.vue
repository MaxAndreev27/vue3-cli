<template>
    <h1>AppCompositionInner</h1>
    <p>
        Название: <strong>{{ name }}</strong>
    </p>
    <p>
        Версия: <strong>{{ version }} ({{ doubleVersion }})</strong>
    </p>
    <button class="btn danger" @click="changeToThree">Змінити не 3 версію</button>
</template>

<script>
import { computed } from 'vue';
export default {
    props: ['name', 'version'],
    emits: ['change-version'],

    setup(props, context) {
        console.log(props);

        function changeToThree() {
            context.emit('change-version', 3);
        }
        return {
            doubleVersion: computed(() => props.version * 2),
            changeToThree,
        };
    },
};
</script>
