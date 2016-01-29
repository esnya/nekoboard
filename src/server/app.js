import config from 'config';
import livereload from 'connect-livereload';
import express from 'express';
import { connectLogger, getLogger, levels } from 'log4js';
import { join } from 'path';

const logger = getLogger('[APP]');

export const app = express();

app.use(connectLogger(logger, { level: levels.INFO }));

app.set('view engine', 'jade');


if (config.get('app.livereload')) {
    app.use(livereload());
}

app.use(express.static(join(__dirname, '../../dist')));
app.use('/css', express.static(
    join(__dirname, '../../node_modules/sanitize.css/dist')
));

app.get('/', (req, res) => {
    res.render('index');
});