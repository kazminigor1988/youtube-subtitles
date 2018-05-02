<template lang="pug">
    div
        spinner(v-if="isLoading")
        p(v-for="{ text } in subtitles") {{ text }}
</template>

<script>
    import Spinner from 'js/components/spinner/Component';
    import SubtitleParser from './services/SubtitleParser';

    const ERROR_MESSAGE = 'Can not load subtitles';

    export default {
        subtitleParser: new SubtitleParser(),

        name: 'Subtitles',

        props: {
            link: {
                required: false,
                type    : String
            }
        },

        data() {
            return {
                isLoading   : false,
                subtitles   : [],
                errorMessage: false,
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

                this.subtitles    = [];
                this.errorMessage = '';

                try {
                    this.isLoading = true;

                    const response = await fetch(this.subtitleLink);

                    const subtitles = await response.json();

                    this.subtitles = this.$options.subtitleParser.parse(subtitles);
                } catch (error) {
                    this.errorMessage = ERROR_MESSAGE;
                } finally {
                    this.isLoading = false;
                }
            },
        }
    }
</script>
