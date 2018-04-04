<template lang="pug">
    div
        spinner(v-if="isLoading")
        p(v-for="text in subtitles") {{ text }}
</template>

<script>
    import Spinner from 'js/components/spinner/Component';

    const ERROR_MESSAGE = 'Can not load subtitles';

    export default {
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

                    this.subtitles = await response.json();
                } catch (error) {
                    this.errorMessage = ERROR_MESSAGE;
                } finally {
                    this.isLoading = false;
                }
            },
        }
    }
</script>
