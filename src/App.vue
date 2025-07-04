<template>
    <div class="container pt-1">
        <div class="card">
            <h2>Останні новини {{ now }}</h2>
            <span>
                Відкрито <strong> {{ openRate }}</strong> | Прочитано
                <strong>{{ readRate }}</strong>
            </span>
        </div>
        <AppNews
            v-for="item in news"
            :key="item"
            :title="item.title"
            :id="item.id"
            :is-open="item.isOpen"
            @open-news-inner="openNews"
            @mark-read-inner="readRate++"
        />
    </div>
</template>

<script>
import AppNews from '@/components/AppNews.vue';

export default {
    name: 'App',
    components: { AppNews },
    data() {
        return {
            now: new Date().toLocaleDateString(),
            openRate: 0,
            readRate: 0,
            news: [
                { title: 'News1', id: 1, isOpen: false },
                { title: 'News2', id: 2, isOpen: false },
            ],
        };
    },
    methods: {
        openNews(returnParam1, returnParam2) {
            this.openRate++;
            console.log(`Параметр returnParam1 з нижнього компонента вгору: ${returnParam1}`);
            console.log(`Параметр returnParam2 з нижнього компонента вгору: ${returnParam2}`);
        },
    },
};
</script>

<style lang="scss"></style>
