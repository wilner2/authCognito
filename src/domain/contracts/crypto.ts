export interface Encrypt {
  createHmac(algorithm: string, key: string): string;
}
