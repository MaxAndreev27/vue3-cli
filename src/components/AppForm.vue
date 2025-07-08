<template>
    <div class="container">
        <form class="card" @submit.prevent="submitHandler">
            <h1>Анкета на Vue разработчика!</h1>
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

            <button type="submit" class="btn primary">Отправить</button>
        </form>
    </div>
</template>

<script>
import AppInput from '@/components/AppInput.vue';

export default {
    components: { AppInput },
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
        submitHandler(event) {
            if (this.formIsValid()) {
                console.log('Form Data');
                console.log(this.name);
                console.log(this.age);
                console.log(this.city);
                console.log(this.relocate);
                console.log(this.skills);
            }
        },
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
