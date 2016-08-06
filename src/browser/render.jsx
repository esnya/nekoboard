import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from '../components/App';
import store from './store';
import theme from './theme';

export default () => render((
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>
), document.getElementById('app'));
