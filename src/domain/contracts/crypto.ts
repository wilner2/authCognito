export interface Encrypt {
  createHmac(algorithm: string, key: string): string;
  updateHasher(data: string): string;
  digest(encode: string): string;
}
