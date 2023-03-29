// import crypto from 'crypto';
import {JSEncrypt} from 'nodejs-jsencrypt';
import CryptoJS from 'crypto-js';

import {EncryptedRequestBody} from '../../types';

const SEPERATOR = '----S----';

export const encrypt = (
  plaintext: string,
  TDESKey: string,
  clientPrivateKey: string,
  bankPublicKey: string
): EncryptedRequestBody => {
  const rsa1 = new JSEncrypt();
  rsa1.setPrivateKey(clientPrivateKey);
  const digitalSignature = rsa1.sign(plaintext, CryptoJS.SHA256, 'sha256');
  console.log({digitalSignature});
  const signedPlaintext = plaintext + SEPERATOR + digitalSignature;
  console.log({signedPlaintext});

  const TDESEncryptedData = CryptoJS.TripleDES.encrypt(
    signedPlaintext,
    TDESKey
  ).toString(/*CryptoJS.enc.Utf8*/);
  console.log({TDESEncryptedData, TDESKey});

  const rsa2 = new JSEncrypt();
  rsa2.setPublicKey(bankPublicKey);
  const encryptedTDESKey = rsa2.encrypt(TDESKey);

  const ciphertext = TDESEncryptedData + SEPERATOR + encryptedTDESKey;
  console.log({ciphertext});

  return {data: ciphertext};
};

export const decrypt = (
  ciphertext: string,
  bankPrivateKey: string,
  clientPublicKey: string
): any => {
  __DEV__ && console.log({ciphertext});

  const [TDESEncryptedData, encryptedTDESKey] = ciphertext.split(SEPERATOR);
  __DEV__ && console.log({TDESEncryptedData, encryptedTDESKey});

  const rsa2 = new JSEncrypt();
  rsa2.setPrivateKey(bankPrivateKey);
  const TDESKey = rsa2.decrypt(encryptedTDESKey);
  __DEV__ && console.log({decryptedTDESKey: TDESKey});

  const plaintextWithSignature = CryptoJS.TripleDES.decrypt(
    TDESEncryptedData,
    TDESKey
  ).toString(CryptoJS.enc.Utf8);

  __DEV__ && console.log({plaintextWithSignature});
  const [plaintext, digitalSignature] = plaintextWithSignature.split(SEPERATOR);
  __DEV__ && console.log({plaintext, digitalSignature});

  const rsa1 = new JSEncrypt();
  rsa1.setPublicKey(clientPublicKey);
  if (!rsa1.verify(plaintext, digitalSignature, CryptoJS.SHA256)) {
    throw new Error('Invalid Signature');
  }
  __DEV__ && console.log('Digital Signature verified');

  const requestBody = JSON.parse(plaintext);
  return requestBody;
};
