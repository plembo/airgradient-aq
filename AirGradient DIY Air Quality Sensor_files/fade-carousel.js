window.addEventListener("DOMContentLoaded", () => {
  const categories = ["Forum", "Webinar", "Meeting", "OS-Initiative", "Press"];

  // New function to set carousel height dynamically
  function setCarouselHeight(carouselInner) {
    const activeItem = carouselInner.querySelector('.video-carousel-item.active');
    if (activeItem) {
      const height = activeItem.offsetHeight;
      carouselInner.style.height = height + 'px';
    }
  }

  categories.forEach((category) => {
    const selector = `#video-carouselControls-${category}`;
    const multipleCardCarousel = document.querySelector(selector);

    if (multipleCardCarousel) {
      let carouselInner = document.querySelector(
        `${selector} .video-carousel-inner`
      );
      const items = Array.from(
        carouselInner.querySelectorAll(".video-carousel-item")
      );

      if (multipleCardCarousel.dataset.shuffle === "true") {
        shuffle(items);
        items.forEach((item, index) => {
          if (index === 0) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
          carouselInner.appendChild(item);
        });
        multipleCardCarousel.style.opacity = "1";
      }

      if (items.length === 1) {
        return;
      }

      const nextSelector = document.querySelector(`#next-${category}`);
      const prevSelector = document.querySelector(`#prev-${category}`);
      let currentSlideIndex = 0;
      
      if (window.matchMedia("(min-width: 500px)").matches) {
        let clicked = 0;
        let clickCount = items.length;
        prevSelector.setAttribute("disabled", true);
        nextSelector.addEventListener("click", function () {
          if (clicked < clickCount - 1) {
            prevSelector.removeAttribute("disabled");
            currentSlideIndex = (currentSlideIndex + 1) % items.length;
            showSlide(currentSlideIndex, items);

            clicked++;
            if (clicked === clickCount - 1) {
              nextSelector.setAttribute("disabled", true);
            }
          }
        });

        prevSelector.addEventListener("click", function () {
          if (clicked > 0) {
            if (clicked === 1) {
              prevSelector.setAttribute("disabled", true);
            }
            nextSelector.removeAttribute("disabled");
            currentSlideIndex =
              (currentSlideIndex - 1 + items.length) % items.length;
            showSlide(currentSlideIndex, items);

            clicked--;
          }
        });
      } else {        
        nextSelector.addEventListener("click", function () {
          currentSlideIndex = (currentSlideIndex + 1) % items.length;
          showSlide(currentSlideIndex, items);
        });

        prevSelector.addEventListener("click", function () {
          currentSlideIndex = (currentSlideIndex - 1 + items.length) % items.length;
          showSlide(currentSlideIndex, items);
        });

        // Add swipe functionality
        let startX = 0;
        let endX = 0;
        let touchMove = false;

        carouselInner.addEventListener(
          "touchstart", 
          (e) => startX = e.touches[0].clientX,
          { passive: true }
        );

        carouselInner.addEventListener(
          "touchmove", 
          (e) => {endX = e.touches[0].clientX; touchMove = true}, 
          { passive: true }
        );

        carouselInner.addEventListener("touchend", () => {
          const swipeThreshold = 50; // Minimum swipe distance in pixels
          if (!touchMove) {
            return;
          }
          if (startX - endX > swipeThreshold) {
            // Swiped left
            currentSlideIndex = (currentSlideIndex + 1) % items.length;
            showSlide(currentSlideIndex, items);
          } else if (endX - startX > swipeThreshold) {
            // Swiped right
            currentSlideIndex = (currentSlideIndex - 1 + items.length) % items.length;
            showSlide(currentSlideIndex, items);
          }
          startX = 0;
          endX = 0;
          touchMove = false;
        }, { passive: true });
      }

      // Initial slide display (for both desktop and mobile)
      showSlide(currentSlideIndex, items);
    }
  });

  function showSlide(index, items) {
    items.forEach((slide, i) => {
      slide.style.opacity = 0;
      slide.style.zIndex = i;
    });

    items[index].style.opacity = 1;
    items[index].style.zIndex = items.length;

    // Dynamically set height
    const carouselInner = items[index].closest('.video-carousel-inner');
    setCarouselHeight(carouselInner);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});
