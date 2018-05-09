<template lang="pug">
    section
        .subtitle-link
            label Youtube link:
            input(v-model="link")
        .content
            subtitles.subtitles(:link="link", :eventBus="eventBus")
            youtube-video.video(:url="link", :eventBus="eventBus")
</template>

<script>
    import Vue from 'vue';
    import YoutubeVideo from 'js/components/youtube-video/Component';
    import Subtitles from 'js/components/subtitles/Component';

    export default {
        name: 'App',

        data() {
            return {
                link:     '',
                eventBus: new Vue()
            };
        },

        components: {
            YoutubeVideo,
            Subtitles,
        }
    }
</script>

<style lang="less">
    body {
        margin: 0;
        font-family: Arial;
    }

    p {
        margin: 0;
        padding: 2px 50px 2px 50px;
    }

    .subtitle-link {
        padding: 15px 0;
        text-align: center;
        font-size: 18px;

        input {
            max-width: 500px;
            width: 300px;
        }
    }

    .content {
        display: flex;

        > div {
            min-width: 50%;
        }

        .subtitles {
            position: relative;
            max-height: 390px;
            overflow: hidden;
            overflow-y: auto;
        }
    }
</style>
