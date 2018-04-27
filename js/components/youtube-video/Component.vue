<template lang="pug">
    section
        #youtube-player
</template>

<script>
    import loadScript from 'js/lib/loadScript';

    const YOUTUBE_API_URL                      = 'https://www.youtube.com/iframe_api';
    const UPDATE_CURRENT_TIME_INTERVAL_TIMEOUT = 50;
    const PLAYER_HEIGHT                        = 390;
    const PLAYER_WIDTH                         = 640;
    const PLAYER_ID                            = 'youtube-player';

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
                isLoadApiScript:           false,
                player:                    undefined,
                updateCurrentTimeInterval: undefined,
                currentTime:               0,
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
            url:             'showVideoPlayer',
            isLoadApiScript: 'showVideoPlayer',
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

            showVideoPlayer() {
                if (!this.isLoadApiScript || !this.videoId) {
                    return;
                }

                this.clearUpdateCurrentTimeInterval();
                this.destroyPlayer();
                this.currentTime = 0;

                this.initPlayer();
                this.setUpdateCurrentTimeInterval();
            },

            clearUpdateCurrentTimeInterval() {
                clearInterval(this.updateCurrentTimeInterval);
            },

            setUpdateCurrentTimeInterval() {
                this.updateCurrentTimeInterval = setInterval(() => {
                    if (this.player.getCurrentTime) {
                        this.currentTime = this.player.getCurrentTime();
                    }
                }, UPDATE_CURRENT_TIME_INTERVAL_TIMEOUT);
            },

            destroyPlayer() {
                if (this.player) {
                    this.player.destroy();
                }
            },

            initPlayer() {
                this.player = new YT.Player(PLAYER_ID, {
                    height:  PLAYER_HEIGHT,
                    width:   PLAYER_WIDTH,
                    videoId: this.videoId,
                });
            }
        },

        mounted() {
            this.loadYoutubeApiScript();
        },

        beforeDestroy() {
            this.clearUpdateCurrentTimeInterval();
        }
    }
</script>
