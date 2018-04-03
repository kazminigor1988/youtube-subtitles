<template lang="pug">
    section
        #youtube-player
</template>

<script>
    import loadScript from 'js/lib/loadScript';

    const YOUTUBE_API_URL = 'https://www.youtube.com/iframe_api';

    export default {
        loadScript,

        name: 'YoutubeVideo',

        props: {
            url: {
                required: false,
                type:     String,
            }
        },

        data() {
            return {
                isLoadApiScript: false,
                player:          undefined,
            };
        },

        computed: {
            /**
             * @returns {string|undefined}
             */
            videoId() {
                let videoId;

                if (this.url) {
                    const searchParams    = new URL(this.url).search;
                    const urlSearchParams = new URLSearchParams(searchParams);

                    videoId = urlSearchParams.has('v') && urlSearchParams.get('v');
                }

                return videoId;
            }
        },

        watch: {
            url() {
                // todo remove old listeners
                this.showVideo();
            }
        },

        methods: {
            async loadYoutubeApiScript() {
                try {
                    await this.$options.loadScript(YOUTUBE_API_URL);

                    this.isLoadApiScript = true;
                } catch (error) {
                    throw error;
                }
            },

            showVideo() {
                if (this.isLoadApiScript) {
                    alert('Try reload page');

                    return;
                }

                this.player = new YT.Player('youtube-player', {
                    height:  '390',
                    width:   '640',
                    videoId: this.videoId,
                });
                // todo add listeners
            }
        },

        mounted() {
            this.loadYoutubeApiScript();
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
