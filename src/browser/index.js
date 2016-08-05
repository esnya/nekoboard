import injectTouchTapEvent from 'react-tap-event-plugin';
import render from './render';
import './socket';

injectTouchTapEvent();
render();

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    require('./debug');
}
