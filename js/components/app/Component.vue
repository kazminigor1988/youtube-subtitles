<template lang="pug">
    section
        orbit-spinner.spinner(
        v-if="isLoading",
        :animation-duration="1200",
        :size="55",
        :color="'#ff1d5e'"
        )
        .subtitle-link
            label Youtube link:
            input(v-model="link")
        .subtitles
            p(v-for="subtitle in subtitles")
                span {{ subtitle }}
        .video
            youtube-video(:url="link")
</template>

<script>
    import { OrbitSpinner } from 'epic-spinners';
    import YoutubeVideo from 'js/components/youtube-video/Component';

    export default {
        name: 'App',

        data() {
            return {
                link     : '',
                subtitles: {},
                isLoading: false,
            };
        },

        components: {
            OrbitSpinner,
            YoutubeVideo,
        },

        computed: {
            /**
             * @returns {string}
             */
            subtitleLink() {
                return `/get?link=${this.link}`;
            }
        },

        watch: {
            link(link) {
                if (!link) return;

                this.loadSubtitles();
            }
        },

        methods: {
            async loadSubtitles() {
                if (this.isLoading) {
                    return;
                }

                try {
                    this.isLoading = true;

                    const response = await fetch(this.subtitleLink);

                    this.subtitles = await response.json();
                } catch (error) {
                    // TODO process error
                    // show normal error for user
                    console.log(error);
                } finally {
                    this.isLoading = false;
                }
            },
        }
    }
</script>

<style lang="less">
    body {
        margin: 0;
    }

    p {
        margin: 0;
        padding: 2px 50px 2px 50px;
    }

    .subtitle-link {
        padding: 15px 0;
        text-align: center;
        font-size: 18px;
        font-family: Arial;

        input {
            max-width: 500px;
            width: 300px;
        }
    }

    .spinner {
        display: flex;
        position: absolute;
        top: 43%;
        left: 48%;
    }
</style>
