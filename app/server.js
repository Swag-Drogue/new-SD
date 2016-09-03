/*eslint no-console: "off"*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import apiRouter from './api/api';
import db from './db/db';
import cookieParser from 'cookie-parser';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(express.static('./public'));

app.use('/api', apiRouter);

if (require.main === module) {
  app.listen(process.env.PORT || 3000, function () {
    db.connect((err) => {
      if (err) return console.error('db connection failed');
      console.log('Listening on 3000');
    });
  });
}
export default app;

