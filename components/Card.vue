<template>
    <div :class="`cc`">
        <slot></slot>
    </div>
</template>
<script>
export default {
}
</script>

<style scoped lang="scss">
@import '~/assets/css/common';
.cc{
    @include box;
    padding: 20px;
    background: rgba(255, 255, 255, 0.363);
}
</style>