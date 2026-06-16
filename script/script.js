/* menu */

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

/* TOGGLE MENU */

menuIcon.addEventListener('click', () => {

  navbar.classList.toggle('active');

  /* CHANGE ICON */

  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-xmark');

});

/* CLOSE MENU WHEN LINK CLICKED */

document.querySelectorAll('.navbar a').forEach(link => {

  link.addEventListener('click', () => {

    navbar.classList.remove('active');

    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');

  });

});



/*----- Lightbox -----*/

const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentIndex = 0;


/* OPEN IMAGE */

galleryImages.forEach((image,index) => {
  image.addEventListener('click', () => {
    currentIndex = index;
    showImage();
    lightbox.classList.add('active');
  });
});


/* showImage function */

function showImage(){
  lightboxImage.src = galleryImages[currentIndex].src;
  lightboxImage.alt =  galleryImages[currentIndex].alt;
}


/* next image function */
function nextImage(){
  currentIndex++;
  if(currentIndex >= galleryImages.length){
    currentIndex = 0;
  }
  showImage();
}

/* previous image function */

function prevImage(){
  currentIndex--;
  if(currentIndex < 0){
    currentIndex = galleryImages.length - 1;
  }
  showImage();
}


/* add enentlistener to buttons */
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);


/* add enentlitner to close button */
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});


/* add eventlistner to close the image when clicking outside it  */
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox){
    lightbox.classList.remove('active');
  }
});


/* add enentlisteners to keyboard to move the images */
document.addEventListener('keydown', (e) => {
  if(!lightbox.classList.contains('active')) return;
  if(e.key === 'ArrowRight'){
    nextImage();
  }

  if(e.key === 'ArrowLeft'){
    prevImage();
  }

  if(e.key === 'Escape'){
    lightbox.classList.remove('active');
  }

});

/* add eventlistners to move images on mobile */
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart',(e)=>{
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend',(e)=>{
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe(){
  if(touchEndX < touchStartX - 50){
    nextImage();
  }

  if(touchEndX > touchStartX + 50){
    prevImage();
  }

}