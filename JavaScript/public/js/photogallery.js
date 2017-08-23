'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getImages = function getImages(container) {
  return [].concat(_toConsumableArray(container.querySelectorAll('img')));
},
    getLargeImages = function getLargeImages(gallery) {
  return gallery.map(function (element) {
    return element.src;
  }).map(function (element) {
    return element.replace('thumb', 'large');
  });
};

var getImagesDescriptions = function getImagesDescriptions(gallery) {
  return gallery.map(function (element) {
    return element.alt;
  });
};

var openPhotoGalleryEvent = function openPhotoGalleryEvent(container, gallery, largeImages, imageDescriptions) {
  container.addEventListener('click', function (e) {
    var element = e.target,
        index = gallery.indexOf(element);
    if (element.tagName === 'IMG') {
      openPhotoGallery(gallery, index, largeImages, imageDescriptions);
    }
  });
};

var openPhotoGallery = function openPhotoGallery(gallery, index, largeImages, imageDescriptions) {
  var photoGalleryElement = document.createElement('div');
  photoGalleryElement.innerHTML = '\n    <div class="photogallery-overlay">\n      <figure class="photogallery-container">\n        <div class="close-modal">&#128942</div>\n        <img src="' + largeImages[index] + '" class="photogallery-image">\n        <figcaption>\n          <p class="photogallery-description">' + imageDescriptions[index] + '</p>\n          <nav class="photogallery-navigation">\n            <a href="#" class="photogallery-navigation__button prev">&#9668</a>\n            <span class="photogallery-navigation__counter">Image ' + (index + 1) + ' of ' + gallery.length + '</span>\n            <a href="#" class="photogallery-navigation__button next">&#9658</a>\n          </nav>\n        </figcaption>\n      </figure>\n    </div>\n  ';

  photoGalleryElement.id = 'photoGallery';
  document.body.appendChild(photoGalleryElement);
  closeModal(photoGalleryElement);
  navigatePhotoGallery(photoGalleryElement, index, largeImages, imageDescriptions);
};

var navigatePhotoGallery = function navigatePhotoGallery(photoGalleryElement, index, largeImages, imageDescriptions) {
  var prevButton = photoGalleryElement.querySelector('.prev'),
      nextButton = photoGalleryElement.querySelector('.next'),
      image = photoGalleryElement.querySelector('img'),
      description = photoGalleryElement.querySelector('p'),
      counter = photoGalleryElement.querySelector('span'),
      closeButton = photoGalleryElement.querySelector('.close-modal'),
      prueba = photoGalleryElement.querySelector('.photogallery-overlay');

  window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') prevButton.click();
    if (e.key === 'Escape') closeButton.click();
  });

  photoGalleryElement.addEventListener('click', function (e) {
    e.preventDefault();
    var target = e.target;

    if (target === prueba) closeButton.click();
    if (target === prevButton) {
      if (index > 0) {
        image.src = largeImages[index - 1];
        index--;
      } else {
        image.src = largeImages[largeImages.length - 1];
        index = largeImages.length - 1;
      }
    } else if (target === nextButton) {
      if (index < largeImages.length - 1) {
        image.src = largeImages[index + 1];
        index++;
      } else {
        image.src = largeImages[0];
        index = 0;
      }
    }

    description.textContent = imageDescriptions[index];
    counter.textContent = 'Image ' + (index + 1) + ' of ' + largeImages.length;
  });
};

var closeModal = function closeModal(modalElement) {
  var closeModal = modalElement.querySelector('.close-modal');
  closeModal.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.removeChild(modalElement);
  });
};

var photoGallery = function photoGallery(container) {
  var images = getImages(container),
      largeImages = getLargeImages(images),
      imageDescriptions = getImagesDescriptions(images);

  openPhotoGalleryEvent(container, images, largeImages, imageDescriptions);
};