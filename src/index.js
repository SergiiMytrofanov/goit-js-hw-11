import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './fetch.js';

const searchForm = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-load-more');
let currentPage = 1;


const lightbox = new SimpleLightbox('.js-gallery a');


const showEndOfResultsMessage = () => {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
};


const createImageCardMarkup = (image) => {
  return `
    <div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
};


const displayImages = (images) => {
  const totalCount = images.length;
  console.dir(images)
  const imageCardsMarkup = images.map((image) => createImageCardMarkup(image)).join('');
  galleryEl.innerHTML += imageCardsMarkup;

  lightbox.refresh();

  const message = `Hooray! We found ${totalCount} images.`;
  Notiflix.Notify.success(message);

  scrollPage();
};


const handleSearch = async (event) => {
  event.preventDefault();

  const searchQuery = event.target.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    return;
  }

  currentPage = 1;
  galleryEl.innerHTML = '';

  try {
    const images = await searchImages(searchQuery, currentPage);
    if (images.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    displayImages(images);
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('Failed to fetch images. Please try again later.');
  }
};


const handleLoadMore = async () => {
  loadMoreBtn.disabled = true;
  currentPage++;

  try {
    const images = await searchImages(searchForm.elements.searchQuery.value.trim(), currentPage);
    if (images.length === 0) {
      showEndOfResultsMessage();
      loadMoreBtn.style.display = 'none';
      return;
    }

    displayImages(images);
    loadMoreBtn.disabled = false;
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('Failed to fetch images. Please try again later.');
    loadMoreBtn.disabled = false;
  }
};


searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);



const scrollPage = () => {
  const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};






