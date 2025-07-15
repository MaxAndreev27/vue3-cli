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

        <AppBlock>
            <p>Дефолтний слот, задавати йому name не обов'язково</p>
            <template v-slot:header>
                <h3>Заголовок для слотів</h3>
            </template>
            <template #footer>
                <hr />
                <h3>Футер</h3>
            </template>
        </AppBlock>

        <div class="card">
            <h2>Динамические и асинхронные компоненты</h2>
            <AppButton ref="myBtn" :color="oneColor" @action="active = 'One'">One</AppButton>
            <AppButton :color="twoColor" @action="active = 'Two'">Two</AppButton>
        </div>
        <keep-alive>
            <component :is="componentName"></component>
        </keep-alive>
        <div class="card"><AsyncComponent /></div>
    </div>

    <AppForm />

    <TheNavbar :visible="isAuth" />
    <div class="container with-nav">
        <!--Елемент для відображення компонентів у роутері-->
        <router-view></router-view>
    </div>

    <AppVuex />

    <AppComposition />
</template>

<script>
import AppNews from '@/components/AppNews.vue';
import AppBlock from '@/components/AppBlock.vue';
import AppButton from '@/components/AppButton.vue';
import AppTextOne from '@/components/AppTextOne.vue';
import AppTextTwo from '@/components/AppTextTwo.vue';
import AppForm from '@/components/AppForm.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import AppLogin from '@/views/AppLogin.vue';
import AppVuex from '@/components/AppVuex.vue';
import AppComposition from '@/components/AppComposition.vue';

export default {
    name: 'App',
    components: {
        AppButton,
        AppNews,
        AppBlock,
        AppTextOne,
        AppTextTwo,
        AppForm,
        TheNavbar,
        AppLogin,
        AppVuex,
        AppComposition,
    },
    data() {
        return {
            now: new Date().toLocaleDateString(),
            openRate: 0,
            readRate: 0,
            news: [
                {
                    title: 'Джет Лоуренс переміг на 6 етапі AMA мотокросс Red Bud',
                    id: 1,
                    isOpen: false,
                },
                { title: 'У другому заїзді у Кайролі відмовила електрика', id: 2, isOpen: false },
                { title: 'У першому заїзді у томака задимів двигун', id: 3, isOpen: false },
            ],
            active: 'One', // Two
            isAuth: true,
        };
    },
    methods: {
        openNews(returnParam1, returnParam2) {
            this.openRate++;
            console.log(`Параметр returnParam1 з нижнього компонента вгору: ${returnParam1}`);
            console.log(`Параметр returnParam2 з нижнього компонента вгору: ${returnParam2}`);
        },
        login() {
            this.isAuth = true;
            if (this.$route.query.page) {
                this.$router.push(this.$route.query.page);
            } else {
                this.$router.push('/dashboard');
            }
        },
        logout() {
            this.isAuth = false;
            this.$router.push({
                path: '/login',
                query: {
                    page: this.$route.path,
                },
            });
        },
    },
    provide() {
        return {
            title: 'Заголовок',
            news: this.news,
            emails: [
                { id: '1', theme: 'Купил себе PlayStation 5' },
                { id: '2', theme: 'Выучил Vue Router' },
                { id: '3', theme: 'Хочу изучить весь Vue' },
                { id: '4', theme: 'А следующий блок про Vuex!' },
                { id: '5', theme: 'А что там на счет Vue Hooks?' },
            ],
            login: this.login,
            logout: this.logout,
        };
    },
    computed: {
        // componentName() {
        //     return 'AppText' + this.active;
        // },
        componentName: {
            get() {
                return 'app-text-' + this.active;
            },
            set(value) {
                console.log('componentName', value);
            },
        },
        oneColor() {
            return this.active === 'One' ? 'primary' : '';
        },
        twoColor() {
            return this.active === 'Two' ? 'primary' : '';
        },
    },
};
</script>

<style lang="scss"></style>
