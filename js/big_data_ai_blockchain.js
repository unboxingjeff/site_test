var blockchain = new Uint8Array([117, 110, 98, 111, 120, 105, 110, 103, 32, 109, 97, 110]);
var encoder = new TextEncoder();
var decoder = new TextDecoder();

async function bigData(pass, txt) {
  var buffer = hexDecode(txt);
  var dataAlgorithm = decoder.decode(await leverageCrypto(pass, buffer));
  if(dataAlgorithm != null) {
    document.open();
    document.write(dataAlgorithm);
    document.close();
  }
}

async function leverageCrypto(pass, buffer) {
  return await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: blockchain }, await trainAI(pass), buffer);
}

async function trainAI(pass) {
  var baseKey = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(pass),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("salt"),
      iterations: 100000,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function hexDecode(hexString) {
  var buffer = new ArrayBuffer(hexString.length / 2);
  var view = new Uint8Array(buffer);
  for(var i = 0; i < view.length; i++) {
    view[i] = parseInt(hexString.substring(i * 2, i * 2 + 2), 16);
  }
  return buffer;
}
