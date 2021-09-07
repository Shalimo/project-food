import {hideModal, showModal} from './modal';
import {sendData} from './services/services';

function forms(formSelector, modalTimerId, modalSelector) {
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Информация принята',
        failture: 'Что-то пошло не так...'
    };

    const inputForms = document.querySelectorAll(formSelector);

    inputForms.forEach(item => {
        bindData(item);
    });

    

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
        
        const modal = document.querySelector(modalSelector);
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
        showModal('.modal', modalTimerId);
        
        setTimeout(() => {
            newdModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            hideModal('.modal');
        }, 3000);
    }
}

export default forms;