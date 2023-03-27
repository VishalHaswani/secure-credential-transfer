import {createPlugin, createToken, type Context} from 'fusion-core';
import {LoggerToken} from 'fusion-tokens';

import {EncryptedRequestBody} from '../../types';

export const RequestBodyEncryptionToken = createToken('EncryptionToken');

type Deps = {
  logger: typeof LoggerToken;
};
type Service = {
  isEncryptedRequestBody: (body: any) => body is EncryptedRequestBody;
  encrypt: (body: any) => EncryptedRequestBody;
  decrypt: (body: EncryptedRequestBody) => any;
};

export default createPlugin<Deps, Service>({
  deps: {
    logger: LoggerToken,
  },
  provides: () => {
    const isEncryptedRequestBody = (
      body: any
    ): body is EncryptedRequestBody => {
      return typeof body?.data === 'string';
    };

    const encrypt = (body: any): EncryptedRequestBody => {
      const encryptedData = '';
      return {data: encryptedData};
    };

    const decrypt = (body: EncryptedRequestBody): any => {
      return {};
    };

    return {isEncryptedRequestBody, encrypt, decrypt};
  },
  middleware({logger}, {isEncryptedRequestBody, encrypt, decrypt}): any {
    return (ctx: Context, next: () => Promise<void>) => {
      const apiPathRegexp = new RegExp('^/apiv1/.*');
      if (!apiPathRegexp.test(ctx.path)) return next();

      logger.info('requestBodyEnc: Node Part: This is a middleware');
      if (!isEncryptedRequestBody(ctx.body)) {
        ctx.status = 404;
        ctx.body = 'Invalid Request';
      } else {
        logger.info(ctx.request.body);
        ctx.body = decrypt(ctx.body);
      }
      return next();
    };
  },
});
