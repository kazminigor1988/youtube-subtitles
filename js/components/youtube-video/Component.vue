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
            },

            isLoadApiScript() {
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
                if (!this.isLoadApiScript || !this.url) {
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
