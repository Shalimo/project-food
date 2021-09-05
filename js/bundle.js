/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calculator() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio = 1.375;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activity) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activity);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activity);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activity);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcResult() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.innerHTML = '___';
            return;
        }

        if (sex === 'female') {
            result.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio));
        } else {
            result.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio));
        }
    }

    calcResult();

    function getStatisInformation (selector, activity) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target && e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio = +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex = e.target.getAttribute('id'));
                }
                console.log(sex, ratio);

                elements.forEach(elem => {
                    elem.classList.remove(activity);
                });
                e.target.classList.add(activity);

                calcResult();
            });
        });

        
    }
    getStatisInformation('#gender div', 'calculating__choose-item_active');
    getStatisInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none'; 
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                
                case 'weight':
                    weight = +input.value;
                    break;

                case 'age':
                    age = +input.value;
                    break;
            }

            calcResult();
        });

        
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
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

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
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
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
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
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
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

    const slider = document.querySelector('.offer__slider');
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

    slider.style.position = 'relative'; 

    const indicators = document.createElement('ol'); 
    const dots = []; 
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);


    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); 
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) { 
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot); 
    }

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // длинна одного слайда умноженного на 3 последующие
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

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = 1; 

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

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; 
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesInner.style.transform = `translateX(-${offset}px)`; 

            if (slides.length < 10) {
                currentSlide.innerHTML = `0${slideIndex}`;
            } else {
                currentSlide.innerHTML = slideIndex;
            }

            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dots[slideIndex - 1].style.opacity = 1; 
            
            
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {

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
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
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
}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded' , () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calculator();
    forms();
    slider();

});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map