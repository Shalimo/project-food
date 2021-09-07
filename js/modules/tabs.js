function tabs(tabsContentSelector, buttonsSelector, tabsParentSelector, activeClass) {

    const tabContent = document.querySelectorAll(tabsContentSelector);
    const buttonsContent = document.querySelectorAll(buttonsSelector);
    const parentOfButtons = document.querySelector(tabsParentSelector);

    function hideContent() {
        tabContent.forEach(tabs => {
            tabs.style.display = 'none';
        });

        buttonsContent.forEach(buttons => {
            buttons.classList.remove(activeClass);
        });
    }

    function showContent(i = 0) {
        tabContent[i].style.display = 'block';
        buttonsContent[i].classList.add(activeClass);
    }

    hideContent();
    showContent();

    parentOfButtons.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(buttonsSelector.slice(1))) { // удаляем точку от селектора
            buttonsContent.forEach((item, i) => {
                if (e.target == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });
}

export default tabs;