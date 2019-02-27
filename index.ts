import * as express from 'express';
import * as exphbs from 'express-handlebars';

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    repeat: (n, block) => {
      let result = '';
      for (var i = 0; i < n; ++i) {
        result += block.fn(i);
      }
      return result;
    },
  },
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(
  '/styles/bulma.min.css',
  express.static(`${__dirname}/node_modules/bulma/css/bulma.min.css`),
);

app.use('/assets/', express.static(`${__dirname}/assets/`));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:route', (req, res) => {
  res.render(req.params.route);
});

app.listen(8080, () => {
  console.log('Active on port 8080');
});
