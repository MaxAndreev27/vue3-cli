<template>
    <div class="container">
        <form class="card" @submit.prevent="addUser">
            <h1>Анкета на Vue разработчика! + Google Firebase DB</h1>
            <!--            <div class="form-control" v-bind:class="{ invalid: errors.name }">-->
            <!--                <label for="name">Как тебя зовут?</label>-->
            <!--                <input type="text" id="name" placeholder="Введи имя" v-model.trim="name" />-->
            <!--                <small v-if="errors.name">{{ errors.name }}</small>-->
            <!--            </div>-->

            <AppInput
                label="Как тебя зовут?"
                :error="errors.name"
                placeholder="Введи имя"
                v-model.trim="name"
            />

            <div class="form-control">
                <label for="age">Выбери возраст</label>
                <input type="number" id="age" value="20" v-model.number="age" />
            </div>

            <div class="form-control">
                <label for="city">Твой город</label>
                <select id="city" v-model="city">
                    <option selected value="kharkiv">Харків</option>
                    <option value="dnipro">Дніпропетровськ</option>
                    <option value="donetsk">Донецьк</option>
                    <option value="lugansk">Луганськ</option>
                </select>
            </div>

            <div class="form-checkbox">
                <span class="label">Готов к переезду в Токио?</span>
                <div class="checkbox">
                    <label>
                        <input type="radio" name="trip" v-model="relocate" value="yes" />Да
                    </label>
                </div>

                <div class="checkbox">
                    <label>
                        <input type="radio" name="trip" v-model="relocate" value="no" />Нет
                    </label>
                </div>
            </div>

            <div class="form-checkbox">
                <span class="label">Что знаешь во Vue?</span>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="skills" v-model="skills" value="vuex" />Vuex
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="skills" v-model="skills" value="cli" />Vue CLI
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="skills" v-model="skills" value="router" />Vue
                        Router
                    </label>
                </div>
            </div>

            <button type="submit" :disabled="name.length === 0" class="btn primary">
                Отправить
            </button>
        </form>
    </div>

    <AppLoader v-if="loading" />

    <AppUsersList v-else @remove="removePerson" :users="users" />
</template>

<script>
import AppInput from '@/components/AppInput.vue';
import AppUsersList from '@/components/AppUsersList.vue';
import axios from 'axios';
import AppLoader from '@/components/AppLoader.vue';

// https://vue3-human-backend-default-rtdb.europe-west1.firebasedatabase.app/
// https://vue3-human-backend-default-rtdb.europe-west1.firebasedatabase.app/users.json
const backendBaseUrl =
    'https://vue3-human-backend-default-rtdb.europe-west1.firebasedatabase.app/users';

export default {
    components: { AppInput, AppUsersList, AppLoader },
    data() {
        return {
            name: '',
            age: 23,
            city: 'kharkiv',
            relocate: null,
            skills: [],
            errors: {
                name: null,
            },
            users: [],
            loading: false,
        };
    },
    methods: {
        formIsValid() {
            let isValid = true;
            if (this.name.length === 0) {
                isValid = false;
                this.errors.name = "Введіть ім'я";
            } else {
                this.errors.name = null;
            }

            return isValid;
        },

        async addUser(event) {
            if (this.formIsValid()) {
                // console.log('Form Data');
                // console.log(this.name);
                // console.log(this.age);
                // console.log(this.city);
                // console.log(this.relocate);
                // console.log(this.skills);

                const response = await fetch(`${backendBaseUrl}.json`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: this.name,
                        age: this.age,
                        city: this.city,
                        relocate: this.relocate,
                        skills: this.skills,
                    }),
                });

                const firebaseData = await response.json();
                if (firebaseData) {
                    this.users.push({
                        id: firebaseData.name,
                        name: this.name,
                        age: this.age,
                        city: this.city,
                        relocate: this.relocate,
                        skills: this.skills,
                    });
                }

                console.log(firebaseData);
            }
        },
        async loadUsers() {
            try {
                this.loading = true;
                const { data } = await axios.get(`${backendBaseUrl}.json`);
                if (!data) {
                    this.users = [];
                    throw new Error('Data Users not found');
                } else {
                    this.users = Object.keys(data).map((key) => {
                        return {
                            id: key, // The key from the Firebase object becomes the 'id'
                            ...data[key], // Spread the rest of the data from the original object
                        };
                    });
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.log(error.message);
            }
        },
        async removePerson(userId) {
            await axios.delete(`${backendBaseUrl}/${userId}.json`);
            this.users = this.users.filter((user) => user.id !== userId);
            console.log(`User removed: ${userId}`);
        },
    },
    mounted() {
        this.loadUsers();
    },
};
</script>

<style scoped>
.form-control small {
    color: darkred;
}
.form-control.invalid input {
    border-color: darkred;
}
</style>
