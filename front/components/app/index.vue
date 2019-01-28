<template lang="pug">
    section
        .subtitle-link
            label(for="link") Youtube link:
            input(
            id="link",
            v-model="link"
            )
        .content
            subtitles.subtitles(:link="link", :eventBus="eventBus")
            youtube-video.video(:url="link", :eventBus="eventBus")
</template>

<script>
    import Vue from 'vue';
    import YoutubeVideo from 'components/youtube-video';
    import Subtitles from 'components/subtitles';

    export default {
        name: 'App',
        // if we talk about application - need add youtube-video-with-subtitles component wrapper (as a page)
        // and that I could add new functionality for another useful things with navigation panel
        data() {
            return {
                // TODO take out input for link to component
                // add validation to link
                link:     '',
                // TODO remove event bus, think how we can make communication between subtitle and video component
                // try do that without eventBus and without store
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
