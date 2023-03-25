import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';

import Root from './root';
import DecodeRequestBodyPlugin, {
  RequestBodyEncryptionToken,
} from './plugins/requestBodyEncryptionPlugin';
import ApiPlugin from './plugins/apiPlugin';

const Main = () => {
  const app = new App(Root);
  app.register(Styletron);
  app.register(Router);
  app.register(RequestBodyEncryptionToken, DecodeRequestBodyPlugin);
  __NODE__ && app.register(ApiPlugin);
  return app;
};

export default Main;
