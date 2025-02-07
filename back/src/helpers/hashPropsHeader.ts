import CryptoJS from 'crypto-js';
import { secretKey } from '../config/envs';

export const encrypt = (text: string): string => {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encrypted;
};

export const decrypt = (encryptedText: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
