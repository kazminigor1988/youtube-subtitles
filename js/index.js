const searchInput      = document.querySelector('name=["search"]');
const subtitlesSection = document.querySelector('.subtitle');

let timer;

searchInput.addEventListener('change', () => {
    clearTimeout(timer);

    timer = setInterval(tryGetAndShowSubtitles, 200);
});

async function tryGetAndShowSubtitles() {
    const videoLink = searchInput.value;

    try {
        const subtitles = await getSubtitles(videoLink);

        showSubtitles(subtitles);
    } catch (error) {
        showError();
    }
}

function getSubtitles(videoLink) {
    fetch(`/get?link=${videoLink}`)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Something wrong');
            }

            return response.json();
        })
        .then((subtitles) => {
            alert(subtitles);
        })
        .catch(alert);
}

function showSubtitles(subtitles) {
    subtitlesSection.textContent = subtitles;
}

function showError() {
    subtitlesSection.textContent = 'Something wrong';
}
