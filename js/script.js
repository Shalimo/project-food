window.addEventListener('DOMContentLoaded' , () => {
    
    // tabs

    const tabContent = document.querySelectorAll('.tabcontent');
    const buttonsContent = document.querySelectorAll('.tabheader__item');
    const parentOfButtons = document.querySelector('.tabheader__items');

    function hideContent() {
        tabContent.forEach(tabs => {
            tabs.style.display = 'none';
        });

        buttonsContent.forEach(buttons => {
            buttons.classList.remove('tabheader__item_active');
        });
    }

    function showContent(i = 0) {
        tabContent[i].style.display = 'block';
        buttonsContent[i].classList.add('tabheader__item_active');
    }

    hideContent();
    showContent();

    parentOfButtons.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            buttonsContent.forEach((item, i) => {
                if (e.target == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    // timer

    const deadline = new Date('2021-08-29');
    
    function getTime(endtime) {
        const time = Date.parse(endtime) - Date.parse(new Date()); 

        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((time / (1000 * 60) % 60));
        const seconds = Math.floor((time / 1000) % 60);

        return {
            'total' : time,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function getZero (num) {
        if (num < 10 && num >= 0) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTime(endtime, selector) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        updateTicks();

        const interval = setInterval(updateTicks, 1000);

            function updateTicks() {
                const objectTime = getTime(endtime);

                days.innerHTML = getZero(objectTime.days);
                hours.innerHTML = getZero(objectTime.hours);
                minutes.innerHTML = getZero(objectTime.minutes);
                seconds.innerHTML = getZero(objectTime.seconds);

                if (objectTime.total < 0) {
                    clearInterval(interval);
                }
            }
    }

    setTime(deadline, '.timer');
 
    // modal

    const modal = document.querySelector('.modal');
    const openButtons = document.querySelectorAll('[data-modal]');

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal();
        });
    });

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //clearTimeout(timeOut);
    }

    function hideModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal();
        }
    });

    const timeOut = setTimeout(showModal, 50000);

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);

        }
    }
    
     //clases

     class MenuCard {
        constructor(src, title, descr, price, parent, ...classes) {
            this.src = src;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.course = 27;
            this.parent = document.querySelector(parent);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.course;
        }

        structureOfCard() {
            const element = document.createElement('div');
            
            if (this.classes.length === 0) {
                this.class = 'menu__item';
                element.classList.add(this.class);
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className);
                });
            }

            element.innerHTML = `
                            <img src=${this.src} alt="vegy">
                            <h3 class="menu__item-subtitle">${this.title}</h3>
                            <div class="menu__item-descr">${this.descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                            </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/elite.jpg',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        22,
        '.menu .container'
    ).structureOfCard();

    new MenuCard(
        'img/tabs/elite.jpg',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        22,
        '.menu .container',
    ).structureOfCard();

    new MenuCard(
        'img/tabs/elite.jpg',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        22,
        '.menu .container',
    ).structureOfCard();

    // formsWithRequests

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Информация принята',
        failture: 'Что-то пошло не так...'
    };

    const inputForms = document.querySelectorAll('form');

    inputForms.forEach(item => {
        sendData(item);
    });

    function sendData(form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const spinner = document.createElement('img');
            spinner.src = message.loading;
            spinner.style = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', spinner);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);
            const data = {};

            formData.forEach((value, key) => {
                data[key] = value;
            });

            const json = JSON.stringify(data);

            //request.send(formData);
            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    form.reset();
                    spinner.remove();
                    addThanksModal(message.success);
                    console.log(request.response);
                } else {
                    addThanksModal(message.failture);
                }
            });
        });

    }

    function addThanksModal(message) {

        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');

        const newdModal = document.createElement('div');
        newdModal.classList.add('modal__dialog');
        newdModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        modal.append(newdModal);
        showModal();
        
        setTimeout(() => {
            newdModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            hideModal();
        }, 3000);
    }

});