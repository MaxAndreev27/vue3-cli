<template>
    <div class="card">
        <h3>{{ title }}</h3>
        <AppButton class="btn" @action="open">
            {{ isOpenLocal ? 'Закрити' : 'Відкрити' }}
        </AppButton>
        <div v-if="isOpenLocal === true">
            <p>content</p>
            <AppButton v-if="!isReadLocal" class="btn" color="primary" @action="markRead"
                >Відмітити як прочитане</AppButton
            >
            <AppNewsList />
        </div>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import AppNewsList from '@/components/AppNewsList.vue';

export default {
    name: 'AppNews',
    components: { AppButton, AppNewsList },
    // props: ['title'],
    props: {
        title: { type: String, required: true },
        id: { type: Number, required: true },
        isOpen: {
            type: Boolean,
            required: false,
            default: false,
            validator(value) {
                return true;
            },
        },
    },
    // emits: ['open-news-inner'],
    emits: {
        // 'open-news-inner'(num) {
        //     if (num) {
        //         return true;
        //     }
        //     console.warn('No data in open-news-inner emit');
        //     return false;
        // },
        'open-news-inner': null,
        'mark-read-inner': null,
    },
    data() {
        return {
            isOpenLocal: this.isOpen,
            isReadLocal: false,
        };
    },
    methods: {
        open() {
            this.isOpenLocal = !this.isOpenLocal;
            if (this.isOpenLocal) {
                this.$emit('open-news-inner', 42, 146);
            }
        },
        markRead() {
            this.isReadLocal = true;
            this.isOpenLocal = false;
            this.$emit('mark-read-inner');
        },
    },
};
</script>

<style scoped>
h3 {
    color: darkcyan;
}
</style>
