<template>
    <div class="card">
        <slot v-if="$slots.header" name="header"></slot>
        <slot name="default"></slot>
        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
    mounted() {
        // console.log(this.$slots);
    },
};
</script>

<style lang="scss" scoped></style>
