<template>
    <div class="container">
        <div class="card">
            <h2>Список Users з Google Firebase</h2>
            <h3 class="center" v-if="users.length === 0">Немає Users</h3>
        </div>

        <div class="card" v-for="user in users" :key="user.id">
            <div>
                <h3>{{ user.name }}</h3>
                <div>Вік: {{ user.age }}</div>
                <div>Місто: {{ user.city }}</div>
                <div>Релокація: {{ user.relocate }}</div>
                <div v-if="user.skills">
                    <h4>Скіли:</h4>
                    <ul>
                        <li v-for="skill in user.skills" :key="skill">
                            {{ skill }}
                        </li>
                    </ul>
                </div>
                <div style="text-align: right">
                    <button class="btn danger" @click="$emit('remove', user.id)">Видалити</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['remove'],
    props: { users: Array },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped></style>
