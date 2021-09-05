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