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

    const deadline = new Date('2021-08-25');
    
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

    

});