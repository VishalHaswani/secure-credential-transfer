import {createPlugin, type Context} from 'fusion-core';
import {RequestBodyEncryptionToken} from './requestBodyEncryptionPlugin';

export default createPlugin<any, any>({
  deps: {
    encryption: RequestBodyEncryptionToken,
  },
  middleware(): any {
    return (ctx: Context, next: () => Promise<void>) => {
      const apiPathRegexp = new RegExp('^/apiv1/.*');
      if (apiPathRegexp.test(ctx.path)) {
        console.log(
          'apiPlugin: This is a middleware, Body: ' + JSON.stringify(ctx.body)
        );
        ctx.status = 200;
        ctx.body = {greeting: 'hello'};
      }
      return next();
    };
  },
});
