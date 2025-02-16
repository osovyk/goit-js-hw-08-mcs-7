const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.js-gallery');

gallery.innerHTML = images.map(({ preview, original, description }, index) =>
  `<li class="gallery-item">
      <a class="gallery-link" href="#">
        <img class="gallery-image"
          src="${preview}"
          data-source="${original}"
          data-index="${index}"
          alt="${description}"
        />
      </a>
    </li>`,
).join('');

let currentIndex = 0;
let instance;

function createModal() {
  instance = basicLightbox.create(`
    <button class="modal-btn prev"></button>
    <button class="modal-btn next"></button>
    <div class="modal-overlay">
      <div class="modal-container">
        <img class="modal-image" src="" alt="">
        <p class="modal-description"></p>
      </div>      
    </div>
  `, {
    onShow: () => {
      document.addEventListener('keydown', onKeyPress);
      addEventListeners();
    },
    onClose: () => {
      document.removeEventListener('keydown', onKeyPress);
    },
  });
}

function openModal(index) {
  currentIndex = index;
  const { original, description } = images[currentIndex];

  if (!instance) createModal();

  const modalImage = instance.element().querySelector('.modal-image');
  const modalDescription = instance.element().querySelector('.modal-description');

  modalImage.classList.add('fade-out');

  setTimeout(() => {
    modalImage.src = original;
    modalDescription.textContent = description;
    modalImage.classList.remove('fade-out');
    modalImage.classList.add('fade-in');
  }, 300);

  instance.show();
}

function addEventListeners() {
  const modalElement = instance.element();
  modalElement.querySelector('.prev').addEventListener('click', prevImage);
  modalElement.querySelector('.next').addEventListener('click', nextImage);
}

gallery.addEventListener('click', (event) => {
  event.preventDefault();
  const clickedImage = event.target;

  if (clickedImage.classList.contains('gallery-image')) {
    const index = Number(clickedImage.dataset.index);
    openModal(index);
  }
});

function prevImage() {
  if (currentIndex > 0) {
    openModal(currentIndex - 1);
  } else {
    openModal(images.length - 1);
  }
}

function nextImage() {
  if (currentIndex < images.length - 1) {
    openModal(currentIndex + 1);
  } else {
    openModal(0);
  }
}

function onKeyPress(event) {
  if (event.key === 'ArrowLeft') prevImage();
  if (event.key === 'ArrowRight') nextImage();
  if (event.key === 'Escape') instance.close();
}
