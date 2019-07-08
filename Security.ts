import { Buffer } from "buffer/";
import * as crypto from "crypto-browserify";

import * as JsEncryptModule from "jsencrypt";

export function encryptStringWithRsaPublicKey(toEncrypt, publicKey) {
  let encrypt = new JsEncryptModule.JSEncrypt();
  encrypt.setPublicKey(publicKey);
  let encrypted = encrypt.encrypt(toEncrypt);
  return encrypted;
}
