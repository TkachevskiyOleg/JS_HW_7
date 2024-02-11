const newsContainer = document.getElementById('newsContainer');
const additionalNewsContainer = document.getElementById('additionalNews');

let currentNewsIndex = 0;

function loadMoreNews() {
    const batchSize = 3;
    for (let i = 0; i < batchSize; i++) {
        if (currentNewsIndex < additionalNewsArray.length) {
            const additionalNewsItem = document.createElement('div');
            additionalNewsItem.className = 'newsItem';
            additionalNewsItem.textContent = additionalNewsArray[currentNewsIndex];
            additionalNewsContainer.appendChild(additionalNewsItem);
            currentNewsIndex++;
        } else {

            document.getElementById('loadMoreButton').style.display = 'none';
            break;
        }
    }
}
window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreNews();
    }
});