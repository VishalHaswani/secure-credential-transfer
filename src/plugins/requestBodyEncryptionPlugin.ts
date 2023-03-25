import {createPlugin, createToken} from 'fusion-core';
import type {Context} from 'fusion-core';

export const RequestBodyEncryptionToken = createToken('EncryptionToken');

interface EncryptedRequestBody {
  data: string;
}

interface Service {
  isEncryptedRequestBody: (body: any) => body is EncryptedRequestBody;
}

export default createPlugin<any, Service>({
  provides: () => {
    const isEncryptedRequestBody = (
      body: any
    ): body is EncryptedRequestBody => {
      return typeof body?.data === 'string';
    };
    return {isEncryptedRequestBody};
  },
  middleware(deps, {isEncryptedRequestBody}): any {
    console.log('This is a middleware');
    return (ctx: Context, next: () => Promise<void>) => {
      const apiPathRegexp = new RegExp('^/apiv1/.*');
      if (apiPathRegexp.test(ctx.path)) {
        if (__NODE__) {
          if (!isEncryptedRequestBody(ctx.body)) {
            ctx.status = 404;
            ctx.body = 'Invalid Request';
          } else {
            console.log(ctx.body.data);
          }
        }
      }
      return next();
    };
  },
});
