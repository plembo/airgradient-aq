window.addEventListener('DOMContentLoaded', () => {

const categories = [
    'Science',
    'Community',
    'User-voices',
    'Company',
    'All',
    'Reviews',
    'Testimonials',
    'Project',
    'Onboarding',
    'OnboardingOutdoor',
    'OnboardingIndoor',
    'OnboardingKit',
];
categories.forEach(category => {
    const selector = `#carouselControls-${category}`;
    const multipleCardCarousel = document.querySelector(selector);    
    if(multipleCardCarousel) {
        let carouselInner = document.querySelector(`${selector} .carousel-inner`);
        if (multipleCardCarousel.dataset.shuffle === 'true') {
            const items = Array.from(carouselInner.querySelectorAll('.carousel-item'));
            shuffle(items);
            items.forEach((item, index) => {
                if (index === 0) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
                carouselInner.appendChild(item);
            });
            multipleCardCarousel.style.opacity = '1';
        }

        if (Array.from(carouselInner.querySelectorAll('.carousel-item'))?.length === 1) {
            const nextSelector =  document.querySelector(`#next-${category}`);
            const prevSelector =  document.querySelector(`#prev-${category}`);
            prevSelector.style.display = 'none';
            nextSelector.style.display = 'none';
            return;
        }        

        if (window.matchMedia("(min-width: 500px)").matches) {            
            let clicked = 0;
            let scopeWidth =  window.innerWidth;

            if ( multipleCardCarousel.dataset.scope === 'container') {
               if (window.innerWidth >= 1200) {
                   scopeWidth = 1140;
               } else if (window.innerWidth >= 992) {
                   scopeWidth = 960;
               } else if (window.innerWidth >= 768) {
                   scopeWidth = 720;
               }
            }

            const carouselWidth = carouselInner.scrollWidth;

            const cardWidth = document.querySelector(`${selector} .carousel-item`).offsetWidth;
            let scrollPosition = 0;
            let clickCount =  0;
            if (['Testimonials'].includes(category)) {
                clickCount = Math.ceil(carouselWidth / cardWidth);
            } else {
                clickCount = Math.ceil((carouselWidth - scopeWidth) / cardWidth) + 1;
            }

            const nextSelector =  document.querySelector(`#next-${category}`);
            const prevSelector =  document.querySelector(`#prev-${category}`);
            if (scopeWidth >= carouselWidth) {
                prevSelector.style.display = 'none';
                nextSelector.style.display = 'none';
                carouselInner.style.justifyContent = 'center';
                carouselInner.style.marginLeft = '0';
                carouselInner.style.width = '100%';
                return;
            }

            prevSelector.setAttribute('disabled', true);
            nextSelector.addEventListener("click", function () {                
                if (clicked < clickCount - 1) {
                    prevSelector.removeAttribute('disabled');
                    scrollPosition += cardWidth;
                    carouselInner.scrollTo({
                        left: scrollPosition,
                        behavior: "smooth"
                    });

                    clicked++;
                    if (clicked === clickCount - 1) {
                        nextSelector.setAttribute('disabled', true);
                    }
                };
            });

            prevSelector.addEventListener("click", function () {
                if(clicked > 0) {
                    if (clicked === 1) {
                        prevSelector.setAttribute('disabled', true);
                    }
                    nextSelector.removeAttribute('disabled');
                    scrollPosition -= cardWidth;
                    carouselInner.scrollTo({
                        left: scrollPosition,
                        behavior: "smooth"
                    });

                    clicked--;
                }
            });
        } else {            
            const blockAutoScrollMobile = multipleCardCarousel
                .dataset.block_mobiles_autoscroll === 'true';
            if (blockAutoScrollMobile) {
                multipleCardCarousel.dataset.interval = 'false';
            }
            multipleCardCarousel.classList.add("slide");
        }
    }
});


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

})
