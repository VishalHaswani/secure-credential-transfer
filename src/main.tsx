import App from 'fusion-react';
import {LoggerToken, FetchToken} from 'fusion-tokens';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events';
import UniversalLogger from 'fusion-plugin-universal-logger';

import Root from './root';
import RequestBodyEncryptionPlugin, {
  RequestBodyEncryptionToken,
} from './plugins/requestBodyEncryptionPlugin';
import ApiPlugin from './plugins/apiPlugin';

const Main = () => {
  const app = new App(Root);
  app.register(Styletron);
  app.register(Router);
  app.register(UniversalEventsToken, UniversalEvents);
  app.register(LoggerToken, UniversalLogger);
  if (__NODE__) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app.middleware(require('koa-bodyparser')());
    app.register(RequestBodyEncryptionToken, RequestBodyEncryptionPlugin); //todo
    app.register(ApiPlugin);
  }
  if (__BROWSER__) {
    app.register(FetchToken, fetch);
  }
  return app;
};

export default Main;
