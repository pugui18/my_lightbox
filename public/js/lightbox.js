"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// al hacer clic en una imagen se abra su version grande
var getImages = function getImages(container) {
  return [].concat(_toConsumableArray(container.querySelectorAll('img')));
};

var getLargeImages = function getLargeImages(gallery) {
  return gallery.map(function (el) {
    return el.src;
  });
};

var getDescriptions = function getDescriptions(gallery) {
  return gallery.map(function (el) {
    return el.alt;
  });
};

var openLightBoxEvent = function openLightBoxEvent(container, gallery, larges, descriptions) {
  container.addEventListener('click', function (e) {
    var el = e.target,
        i = gallery.indexOf(el);

    if (el.tagName === 'IMG') {
      openLightBox(gallery, i, larges, descriptions); //end if
    }
  });
};

var openLightBox = function openLightBox(gallery, i, larges, descriptions) {
  //abrir el lighbox al pulsar 
  var lightBoxElement = document.createElement('div');
  lightBoxElement.innerHTML = "\n        <div class=\"lightbox-over\">\n            <figure class=\"lightbox-container\">\n            <div class=\"close-modal\"> X </div>\n                <img src=\"" + larges[i] + "\" class=\"lightbox-image\">\n                    <figcaption>\n                        <p class=\"lightbox-description\">\n                            " + descriptions[i] + "\n                        </p>\n                        <nav class=\"ligthbox-navigation\">\n                            <a href=\"#\" class=\"lightbox-navigation_button prev\">Atras</a>\n                            <span class=\"ligthbox-navigation_counter\"> Imagen " + (i + 1) + " de " + gallery.length + " </span>\n                            <a href=\"#\" class=\"lightbox-navigation_button next\">Adelante</a>\n                        </nav>\n                    </figcaption>     \n            </figure>\n\n        </div>\n        ";
  lightBoxElement.id = 'lightbox';
  document.body.appendChild(lightBoxElement);
  closeModal(lightBoxElement);
  navigatorLightBox(lightBoxElement, i, larges, descriptions);
};

var closeModal = function closeModal(modalElement) {
  var closeModal = modalElement.querySelector('.close-modal');
  closeModal.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.removeChild(modalElement);
  });
};

var navigatorLightBox = function navigatorLightBox(lightBoxElement, i, larges, descriptions) {
  var prevButton = lightBoxElement.querySelector('.prev'),
      nextButton = lightBoxElement.querySelector('.next'),
      image = lightBoxElement.querySelector('img'),
      description = lightBoxElement.querySelector('p'),
      counter = lightBoxElement.querySelector('span'),
      closeFrame = lightBoxElement.querySelector('.close-modal');
  window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') prevButton.click();
    if (e.key === 'Escape') closeFrame.click();
  });
  lightBoxElement.addEventListener('click', function (e) {
    e.preventDefault();
    var target = e.target;

    if (target === prevButton) {
      if (i > 0) {
        image.src = larges[i - 1];
        i--;
      } else {
        image.src = larges[larges.length - 1];
        i = larges.length - 1;
      }
    } else if (target === nextButton) {
      if (i < larges.length - 1) {
        image.src = larges[i + 1];
        i++;
      } else {
        image.src = larges[0];
        i = 0;
      }
    }

    description.textContent = descriptions[i];
    counter.textContent = "Imagen " + (i + 1) + " de " + larges.length;
  });
};

var lightbox = function lightbox(container) {
  var images = getImages(container),
      larges = getLargeImages(images),
      descriptions = getDescriptions(images);
  openLightBoxEvent(container, images, larges, descriptions);
};

lightbox(document.getElementById('gallery-container'));