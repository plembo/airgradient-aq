
// kit get more info information
const moreKitInfoButton = document.querySelectorAll('[data-id="toggle-kit-btn"]');
const moreKitInfoBox = document.querySelector('#more_kit_info');
const kitDescription = document.querySelector('#kit_description');
moreKitInfoButton.forEach((button) => {
    button.addEventListener('click', () => {
        console.log('kit description')
        if (moreKitInfoBox.classList.contains('hidden')) {
            moreKitInfoBox.classList.remove('hidden');
            kitDescription.classList.add('hidden');
        } else {
            kitDescription.classList.remove('hidden');
            kitDescription.classList.add('visible');
            moreKitInfoBox.classList.add('hidden');
        }
    })
    }
);

