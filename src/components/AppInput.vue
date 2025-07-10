<template>
    <div class="form-control" v-bind:class="{ invalid: error }">
        <label :for="id">{{ label }}</label>
        <input
            v-focus
            type="text"
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"
            @input="change"
        />
        <small v-if="error">{{ error }}</small>
    </div>
</template>

<script>
export default {
    directives: {
        focus: {
            mounted(el) {
                console.log(el);
                el.focus();
            },
        },
    },
    props: {
        modelValue: String,
        label: String,
        placeholder: String,
        error: String,
    },
    data() {
        return { id: 'input-' + Math.random() };
    },
    methods: {
        change(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
    emits: ['update:modelValue'],
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
