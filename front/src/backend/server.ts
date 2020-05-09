import * as path from 'path';
import express, {Express} from 'express';

(async function main() : undefined {
    const app: Express = express();
    const port = 3000;

    app.use(express.json());

    app.use(
        '/app/',
        express.static(path.join(__dirname, '../../dist'), {
            setHeaders(res) {
                res.set('Access-Control-Allow-Origin', '*');
            }
        })
    );

    app.use(
        '/static/',
        express.static(path.join(__dirname, '../../static'), {
            setHeaders(res) {
                res.set('Access-Control-Allow-Origin', '*');
            }
        })
    );

    app.get('/', (req, res) => res.redirect('/app'));

    app.listen(port, () => console.log(`Wallboard running on port: ${port}!`));
}());

