import Notiflix from 'notiflix';

const galleryEl = document.querySelector('.js-gallery');

export const renderGallery = (images) => {
  galleryEl.innerHTML = '';

  if (images.length === 0) {
    Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  const galleryMarkup = images
    .map((image) => {
      return `
        <div class="photo-card">
          <a class="gallery__link" href="${image.largeImageURL}">
            <img class="content-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${image.likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${image.views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${image.downloads}
            </p>
          </div>
        </div>
      `;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
};
