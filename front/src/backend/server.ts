import * as path from 'path';
import express, { Express } from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConf from '../../webpack.config';
import cors from 'cors';

(async function main(): Promise<void> {
    const app: Express = express();
    const port = 3000;

    app.use(express.json());
    app.use(cors());

    const compiler = webpack(webpackConf);
    app.use(webpackMiddleware(compiler));

    app.get('/', (req, res) => res.redirect('/app/'));

    app.get('/app/**', (req, res) =>
        res.sendFile(path.join(__dirname, '../../dist/app/index.html'))
    );

    app.post('/api/**/', (req, res) => res.sendStatus(200));

    app.use(
        '/assets/',
        express.static(path.join(__dirname, '../../dist/assets'), {
            setHeaders: (res) => {
                res.set('Access-Control-Allow-Origin', '*');
            },
        })
    );

    app.listen(port, () => console.log(`Wallboard running on port: ${port}!`));
})();
