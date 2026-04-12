export function useFHE() {
  return {
    encryptValue: async (value: number) => {
      return Promise.resolve(value.toString());
    },
    decryptValue: async (ciphertext: string) => {
      return Promise.resolve(ciphertext);
    },
  };
}
