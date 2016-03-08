import config from 'config';
import livereload from 'connect-livereload';
import express from 'express';
import { connectLogger, getLogger, levels } from 'log4js';
import { join } from 'path';
import { generate } from '../utility/id';

const logger = getLogger('[APP]');

export const app = express();

app.use(connectLogger(logger, { level: levels.INFO }));

app.set('view engine', 'jade');

if (config.get('app.livereload')) {
    app.use(livereload());
}

app.use(express.static(join(__dirname, '../../dist')));
app.use('/css', express.static(
    join(__dirname, '../../node_modules/sanitize.css/lib')
));

app.get('/', (req, res) => res.redirect(generate(16)));

app.get('/:boardId([a-f0-9]{16})', (req, res) => {
    res.render('index', {
        ...req.params,
        config: config.get('browser'),
        ga: config.has('ga') &&
            `GA_CONFIG = ${JSON.stringify(config.get('ga'))};`,
    });
});
