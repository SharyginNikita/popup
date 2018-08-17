'use strict';

import _ from '../scss/styles.scss';

class Popup {

    constructor() {

        let popup = this._createPopup();
        let closer = popup.querySelector('.closer');
        let body = document.body;

        this._element = popup;
        this._content = popup.querySelector('.content');
        this._status = 'closed';

        body.appendChild(popup);

        closer.addEventListener('click', (event) => {

            if (event.target === closer) this.close();

        });

        popup.addEventListener('click', (event) => {

            if (event.target === popup) this.close();

        });

        body.addEventListener('keydown', (event) => {

            if (event.keyCode == '27') this.close();

        });

    }

    _createPopup() {

        let tmp = document.createElement('div');

        let html = `
            <div class="popup-shadow closed">
                <div class="popup-window">
                    <div class="closer">x</div>
                    <div class="content"></div>
                </div>
            </div>
        `;

        tmp.innerHTML = html;
        let popup = tmp.children[0];

        return popup;

    }

    open() {

        let body = document.body;
        body.style.overflow = 'hidden';
        this._element.classList.remove('closed');
        this._element.classList.add('opened');
        this._status = 'opened';

    }

    close() {

        let body = document.body;
        body.style.overflow = '';
        this._element.classList.remove('opened');
        this._element.classList.add('closed');
        this._status = 'closed';

    }

    insertData(data) {

        this._content.innerHTML = data;

    }

    insertElement(elem) {

        this._content.innerHTML = '';
        this._content.appendChild(elem);

    }

    getData() {

        return this._content.innerHTML;

    }

    getContent() {

        return this._content;

    }

    getStatus() {

        return this._status;

    }

}

export default new Popup();
