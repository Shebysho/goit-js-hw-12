import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search query.' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;
  gallery.innerHTML = '';
  loadMoreButton.classList.add('hidden');

  await fetchAndRenderImages();
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  try {
    loader.classList.remove('hidden');
    const { hits, total } = await fetchImages(currentQuery, currentPage);
    totalHits = total;

    if (hits.length === 0) {
      iziToast.info({ title: 'Information', message: 'Sorry, no images match your search query. Please try again!' });
    } else {
      renderGallery(hits);
      lightbox.refresh();

      if (currentPage * 15 < totalHits) {
        loadMoreButton.classList.remove('hidden');
      } else {
        loadMoreButton.classList.add('hidden');
        iziToast.info({ title: 'Information', message: "We're sorry, but you've reached the end of search results." });
      }

      const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images. Please try again later.' });
  } finally {
    loader.classList.add('hidden');
  }
}
