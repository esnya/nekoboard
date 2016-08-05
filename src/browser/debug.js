import React from 'react';
import { whyDidYouUpdate } from 'why-did-you-update';

const localStorage = window.localStorage;

if (localStorage && localStorage.getItem('nekoboard:wdyu') === 'true') {
    whyDidYouUpdate(React);
}
