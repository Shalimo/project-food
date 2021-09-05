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