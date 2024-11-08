export function renderImageCard(image) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
    return `
      <a href="${largeImageURL}" class="gallery__item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes</b>${likes}</p>
          <p class="info-item"><b>Views</b>${views}</p>
          <p class="info-item"><b>Comments</b>${comments}</p>
          <p class="info-item"><b>Downloads</b>${downloads}</p>
        </div>
      </a>
    `;
  }
  
  export function renderGallery(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(renderImageCard).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
  }
  