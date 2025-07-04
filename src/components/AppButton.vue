<template>
    <button class="btn" :class="color" @click="$emit('action')"><slot /></button>
</template>

<script>
export default {
    name: 'AppButton',
    props: {
        color: {
            type: String,
            required: false,
            default: '',
            validator(value) {
                return ['', 'primary', 'danger'].includes(value);
            },
        },
    },
    emits: {
        action: null,
    },
};
</script>

<style lang="scss" scoped></style>
