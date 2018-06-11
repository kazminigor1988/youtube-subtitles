<template lang="pug">
    div
        spinner(v-if="isLoading")
        template(v-for="{ text, watchType } in marked")
            p(:class="$options.watchTypeClassMap[watchType]") {{ text }}
</template>

<script>
    import Spinner from 'js/components/spinner/Component';
    import SubtitleParser from './services/SubtitleParser';
    import SubtitleWatchTypeMarker from './services/SubtitleWatchTypeMarker';
    import ScrollToWatchingSubtitle from './services/ScrollToWatchingSubtitle';
    import WATCH_TYPE from './WATCH_TYPE';

    const ERROR_MESSAGE = 'Can not load subtitles';

    const watchTypeClassMap = {
        [WATCH_TYPE.NOT_WATCHED]: 'not-watched',
        [WATCH_TYPE.WATCHING]   : 'watching',
        [WATCH_TYPE.WATCHED]    : 'watched',
    };

    export default {
        watchTypeClassMap,
        subtitleParser         : new SubtitleParser(),
        subtitleWatchTypeMarker: new SubtitleWatchTypeMarker(),

        name: 'Subtitles',

        props: {
            link    : {
                required: false,
                type    : String
            },
            eventBus: {
                required: true,
                type    : Object,
            }
        },

        data() {
            return {
                scrollToWatchingSubtitle: undefined,
                isLoading               : false,
                subtitles               : [],
                errorMessage            : false,
                videoCurrentTime        : 0,
            };
        },

        components: {
            Spinner
        },

        computed: {
            /**
             * @returns {string}
             */
            subtitleLink() {
                return `/get?link=${this.link}`;
            },

            /**
             * @returns {[]}
             */
            marked() {
                return this.$options.subtitleWatchTypeMarker.mark(this.subtitles, this.videoCurrentTime);
            }
        },

        watch: {
            link(link) {
                if (!link) {
                    return;
                }

                this.loadSubtitles();
            }
        },

        methods: {
            async loadSubtitles() {
                if (this.isLoading) {
                    return;
                }

                this.scrollToWatchingSubtitle.stop();

                this.subtitles    = [];
                this.errorMessage = '';

                try {
                    this.isLoading = true;

                    const response = await fetch(this.subtitleLink);

                    const subtitles = await response.json();

                    this.subtitles = this.$options.subtitleParser.parse(subtitles);

                    this.scrollToWatchingSubtitle.start();
                } catch (error) {
                    this.errorMessage = ERROR_MESSAGE;
                } finally {
                    this.isLoading = false;
                }
            },
        },

        created() {
            this.eventBus.$on(
                'video:current:time:updated',
                videoCurrentTime => this.videoCurrentTime = videoCurrentTime
            );
        },

        mounted() {
            this.scrollToWatchingSubtitle = new ScrollToWatchingSubtitle(
                this.$el, this.$options.watchTypeClassMap[WATCH_TYPE.WATCHING]
            );
        },

        beforeDestroy() {
            this.scrollToWatchingSubtitle.stop();
        }
    }
</script>

<style lang="less">
    .not-watched {
        opacity: .5;
    }

    .watching {
        font-weight: bold;
    }

    .watched {
        font-style: italic;
    }
</style>