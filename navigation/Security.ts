import { randomBytes, pbkdf2Sync, publicEncrypt } from "crypto";

//https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb

const PUBKEY =
  "-----BEGIN PUBLIC KEY-----\n" +
  "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApo8pWDEsqrqGwoZYswOl\n" +
  "w1oNM64KSazC6ZVC2voj55PZJ4mXqZ4d9IKV9AumonhF4D/zOnefVb8jTXkd+edV\n" +
  "hkseU7uMh4ZdFNTlOZmFnNiDQ2Phb/tiTOMBkV+YWGyRa8nw9jOCYHWRGMAw/cUA\n" +
  "Y0UGCFstFuZISJq7pP9ty9ITYOPVgJNVjmygim6hNJ3fMdrqj40DKU1eHxjWgPgs\n" +
  "a2od9a3fQhp3Xsme5tszl+k2gm55QIgJAr6W0UfrXa0Tee5lReQ4fWdLBuM34Gil\n" +
  "gDHQAOrgECbznBE+ElFtJeKCwa8BIMoBw9EMsqPw+NozZRawVUXjBDvLezMuithq\n" +
  "8aPaxFbSdDNSavV7x4pA95+sLoPYPhiFpDTUI+4pySHrOnyEUuezO7JFmRV43ZZT\n" +
  "BvGowDUBmgM4ITMPDPUgKefCNHUcaKN8PrBMTs20WCL/gmbJ4Nasm5uv3nq9vxWC\n" +
  "AqJtLZm4C2mCVXUZCGJlhtuSLzqZUQr9igZgRHK4IkIxdaUa4xd+aOTB6ZBBrx02\n" +
  "5Jk9UMVD1Rjp5mRZ+e4Y2qY4sskZzcdcjJ/QHoakBtNTDjhFr+3uAY3FlSiHJIyP\n" +
  "3jSRehnBxDb4Mi7xoCgauDOT0oUaOidLXs0fcV/5h1+4Uh10JQCbe1KAM0VDlrDE\n" +
  "DcL/BQRiZGJssZ/WpbdUXuECAwEAAQ==\n" +
  "-----END PUBLIC KEY-----\n ";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;
const PASS_LENGTH = 32;
const DIGEST = "sha512";
const ITERATIONS = 50000;

export function generatePayload(): string {
  console.time("payload");
  const salt = randomBytes(64);
  const iv = randomBytes(IV_LENGTH);
  //const pass = scryptSync(randomPass(), salt, 32);
  const pass = pbkdf2Sync(randomPass(), salt, ITERATIONS, PASS_LENGTH, DIGEST);
  console.timeEnd("payload");
  return iv.toString("hex") + ":" + pass.toString("hex");
}

export function encryptWithPublicKey(buffer) {
    return publicEncrypt(PUBKEY, buffer)
}

function randomPass() {
  return randomBytes(32).toString("hex");
}
