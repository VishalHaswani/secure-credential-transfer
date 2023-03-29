import {createPlugin, createToken, type Context} from 'fusion-core';
import {LoggerToken} from 'fusion-tokens';

import {EncryptedRequestBody} from '../../types';
import {bankPrivateKey, clientPublicKey} from '../constants';
import {decrypt} from '../util/EncryptionAndDecryption';

export const RequestBodyEncryptionToken = createToken('EncryptionToken');

type Deps = {
  logger: typeof LoggerToken;
};
type Service = {
  isEncryptedRequestBody: (body: any) => body is EncryptedRequestBody;
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

    return {isEncryptedRequestBody};
  },
  middleware({logger}, {isEncryptedRequestBody}): any {
    return (ctx: Context, next: () => Promise<void>) => {
      const apiPathRegexp = new RegExp('^/apiv1/.*');
      if (!apiPathRegexp.test(ctx.path)) return next();

      // logger.info('requestBodyEnc: Node Part: This is a middleware');
      if (!isEncryptedRequestBody(ctx.request.body)) {
        ctx.status = 404;
        ctx.body = 'Invalid Request';
      } else {
        // logger.info(ctx.request.body);
        ctx.request.body = decrypt(
          ctx.request.body.data,
          bankPrivateKey,
          clientPublicKey
        );
      }
      return next();
    };
  },
});
