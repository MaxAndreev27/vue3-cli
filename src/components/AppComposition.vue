<template>
    <div class="container">
        <div class="card">
            <h1>Vue Composition Api</h1>
            <small>Data, Methods, Computed, Watch</small>
            <hr />
            <p>
                Название: <strong>{{ name }}</strong>
            </p>
            <p>
                Версия: <strong>{{ version }} ({{ doubleVersion }})</strong>
            </p>
            <div class="form-control">
                <input type="text" ref="textInput" v-model="inputValue" />
            </div>
            <button class="btn" @click="changeInfo">Изменить</button>
        </div>
    </div>

    <div class="container">
        <div class="card">
            <AppCompositionInner :name="name" :version="version" @change-version="changeVersion" />
        </div>
    </div>
</template>

<script>
import { ref, reactive, toRefs, isRef, isReactive, computed, watch } from 'vue';
import AppCompositionInner from '@/components/AppCompositionInner.vue';
export default {
    components: { AppCompositionInner },
    // data() {
    //     return {
    //         name: 'VueJS',
    //         version: 3,
    //     };
    // },
    // methods: {
    //     changeInfo() {
    //         this.name = 'Vue JS!';
    //         this.version = 4;
    //     },
    // },
    setup() {
        const name = ref('VueJS');
        const version = ref(3);
        const textInput = ref(null);
        const inputValue = ref('');

        const framework = reactive({
            name: 'VueJS',
            version: 3,
        });

        function changeInfo() {
            name.value = 'VueJS!!!';
            version.value = 42;

            framework.name = 'VueJS!!!';
            framework.version = 24;

            console.log(textInput.value.value);
        }

        function changeVersion(value) {
            console.log('changed version', value);
            version.value = value;
        }

        const doubleVersion = computed(() => {
            return version.value * 2;
        });

        watch(doubleVersion, (oldValue, newValue) => {
            // console.log(`oldValue: ${oldValue}, newValue: ${newValue}`);
        });

        watch(inputValue, (newValue, oldValue) => {
            // console.log('newValue:' + newValue);
        });

        return {
            name: name,
            version: version,
            // ...toRefs(framework),
            changeInfo,
            doubleVersion,
            textInput,
            inputValue,
            changeVersion,
        };
    },
};
</script>
