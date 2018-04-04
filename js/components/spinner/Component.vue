<template lang="pug">
    .spinner-wrap
        orbit-spinner.spinner(
        :animation-duration="1200",
        :size="55",
        :color="'#ff1d5e'"
        )
</template>

<script>
    import { OrbitSpinner } from 'epic-spinners';

    export default {
        name: 'Spinner',

        components: {
            OrbitSpinner,
        }
    }
</script>

<style lang="less">
    .spinner-wrap {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;

        .spinner {
            background-color: aliceblue;
            display: flex;
            position: relative;
            top: 43%;
            left: 48%;
        }
    }
</style>
