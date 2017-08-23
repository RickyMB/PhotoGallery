'use strict'

const getImages = (container) => [...container.querySelectorAll('img')],
      getLargeImages = (gallery) => gallery
                                          .map( (element) => element.src )
                                          .map( (element) => element.replace('thumb', 'large') )


const getImagesDescriptions = (gallery => gallery.map( (element) => element.alt));

const openPhotoGalleryEvent = (container, gallery, largeImages, imageDescriptions) => {
  container.addEventListener('click', (e) => {
    let element = e.target,
        index = gallery.indexOf(element);
    if (element.tagName === 'IMG') {
      openPhotoGallery(gallery, index,largeImages,imageDescriptions);
    }
  });
}

let openPhotoGallery = (gallery, index, largeImages, imageDescriptions) => {
  let photoGalleryElement = document.createElement('div');
  photoGalleryElement.innerHTML = `
    <div class="photogallery-overlay">
      <figure class="photogallery-container">
        <div class="close-modal">&#128942</div>
        <img src="${largeImages[index]}" class="photogallery-image">
        <figcaption>
          <p class="photogallery-description">${imageDescriptions[index]}</p>
          <nav class="photogallery-navigation">
            <a href="#" class="photogallery-navigation__button prev">&#9668</a>
            <span class="photogallery-navigation__counter">Image ${index + 1} of ${gallery.length}</span>
            <a href="#" class="photogallery-navigation__button next">&#9658</a>
          </nav>
        </figcaption>
      </figure>
    </div>
  `;

  photoGalleryElement.id = 'photoGallery';
  document.body.appendChild(photoGalleryElement);
  closeModal(photoGalleryElement);
  navigatePhotoGallery(photoGalleryElement,index,largeImages,imageDescriptions);
}

const navigatePhotoGallery = (photoGalleryElement,index,largeImages,imageDescriptions) => {
  let prevButton = photoGalleryElement.querySelector('.prev'),
      nextButton = photoGalleryElement.querySelector('.next'),
      image = photoGalleryElement.querySelector('img'),
      description = photoGalleryElement.querySelector('p'),
      counter = photoGalleryElement.querySelector('span'),
      closeButton = photoGalleryElement.querySelector('.close-modal'),
      closeClickOutSide = photoGalleryElement.querySelector('.photogallery-overlay');

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') prevButton.click();
    if (e.key === 'Escape') closeButton.click();
  });

  photoGalleryElement.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;

    if ( target === closeClickOutSide ) closeButton.click();
    if ( target === prevButton ) {
      if ( index > 0) {
        image.src = largeImages[index - 1];
        index--;
      } else {
        image.src = largeImages[largeImages.length - 1];
        index = largeImages.length - 1;
      }
    } else if ( target === nextButton ) {
      if ( index < largeImages.length - 1) {
        image.src = largeImages[index + 1];
        index++;
      } else {
        image.src = largeImages[0];
        index = 0;
      }
    }

    description.textContent = imageDescriptions[index];
    counter.textContent = `Image ${index + 1} of ${largeImages.length}`;
  })
}

const closeModal = (modalElement) => {
  let closeModal = modalElement.querySelector('.close-modal');
  closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.removeChild(modalElement);
  })
}

const photoGallery = (container) => {
  let images = getImages(container),
      largeImages = getLargeImages(images),
      imageDescriptions = getImagesDescriptions(images);

  openPhotoGalleryEvent(container, images, largeImages, imageDescriptions);
}