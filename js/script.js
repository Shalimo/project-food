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

    const deadline = new Date('2021-09-31');
    
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
        constructor(src, alt, title, descr, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
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
                            <img src=${this.src} alt=${this.alt}>
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

    const getData = async (url) => {
        const result = await fetch(url);

        return await result.json();
    };

    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').structureOfCard();
            });
        });

        // second option
    // getData('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             const element = document.createElement('div');
    //             element.classList.add('menu__item');
    //             element.innerHTML = `
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                 </div>    
    //             `;

    //             document.querySelector('.menu .container').append(element);
    //         });
    //     });

    // formsWithRequests

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Информация принята',
        failture: 'Что-то пошло не так...'
    };

    const inputForms = document.querySelectorAll('form');

    inputForms.forEach(item => {
        bindData(item);
    });

    const sendData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: data
        });

        return await result.json();
    };

    function bindData(form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const spinner = document.createElement('img');
            spinner.src = message.loading;
            spinner.style = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', spinner);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            sendData('http://localhost:3000/requests', json)
            .then(data => {
                spinner.remove();
                addThanksModal(message.success);
                console.log(data);
            })
            .catch(() => {
                addThanksModal(message.failture);
            })
            .finally(() => {
                form.reset();
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

    // slider 1st 

    // const slides = document.querySelectorAll('.offer__slide');
    // const prev = document.querySelector('.offer__slider-prev');
    // const next = document.querySelector('.offer__slider-next');
    // const totalSlide = document.querySelector('#total');
    // const currentSlide = document.querySelector('#current'); 
    // let slideIndex = 1; // индекс слайда

    // showSlide(slideIndex);

    // if (slides.length < 10) {
    //     totalSlide.innerHTML = `0${slides.length}`;
    // } else {
    //     totalSlide.innerHTML = slides.length;
    // }

    // function showSlide(n) { 
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     slides[slideIndex -1].style.display = 'block'; // с помощью такой конструкции говорим, что отображение картинки исходит из индекса

    //     if (slides.length < 10) {
    //         currentSlide.innerHTML = `0${slideIndex}`;
    //     } else {
    //         currentSlide.innerHTML = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlide(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // slider 2nd

    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const totalSlide = document.querySelector('#total');
    const currentSlide = document.querySelector('#current'); 
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesInner = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width; 
    let slideIndex = 1; 
    let offset = 0; 

    // инициализация счетчика
    if (slides.length < 10) {
        totalSlide.innerHTML = `0${slides.length}`;
        currentSlide.innerHTML = `0${slideIndex}`;
    } else {
        totalSlide.innerHTML = slides.length;
        currentSlide.innerHTML = slideIndex;
    }
    
    slidesInner.style.width = 100 * slides.length +'%'; 
    slidesInner.style.display = 'flex'; 
    slidesInner.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden'; 
    slides.forEach(slide => {
        slide.style.width = width; 
    });

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { 
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }
        
        slidesInner.style.transform = `translateX(-${offset}px)`; 

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            currentSlide.innerHTML = `0${slideIndex}`;
        } else {
            currentSlide.innerHTML = slideIndex;
        }

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {  
            offset = +width.slice(0, width.length - 2) * (slides.length - 1); 
        } else {
            offset -= +width.slice(0, width.length - 2); 
        }
        
        slidesInner.style.transform = `translateX(-${offset}px)`; 

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            currentSlide.innerHTML = `0${slideIndex}`;
        } else {
            currentSlide.innerHTML = slideIndex;
        }
    });

});