import {createPlugin, type Context} from 'fusion-core';
import {RequestBodyEncryptionToken} from './requestBodyEncryptionPlugin';

export default createPlugin<any, any>({
  deps: {
    encryption: RequestBodyEncryptionToken,
  },
  middleware(): any {
    console.log('This is a middleware');
    return (ctx: Context, next: () => Promise<void>) => {
      const apiPathRegexp = new RegExp('^/apiv1/.*');
      if (apiPathRegexp.test(ctx.path)) {
        ctx.body = {greeting: 'hello'};
      }
      return next();
    };
  },
});
