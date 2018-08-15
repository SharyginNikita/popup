'use strict';

import popup from "./popup";

document.querySelector('#open-button')
    .addEventListener('click', _ => {

        popup.open();

    })
