export const base64EncodeUrl = (str: string) => {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const b2a = (a: string): string => {
  return btoa(a);
};

const a2b = (a: string): string => {
  return atob(a);
};

export const bufferToBase64 = (data: ArrayBuffer) => {
  let binary = "";
  const bytes = new Uint8Array(data);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  const base64 = b2a(binary);
  return base64EncodeUrl(base64);
};

export const base64ToBuffer = (data: string): ArrayBuffer => {
  data = data.replace(/-/g, "+").replace(/_/g, "/");
  const binary = a2b(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
};
