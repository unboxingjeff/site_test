var encoder = new TextEncoder();
var decoder = new TextDecoder();
var iv = new Uint8Array([117, 110, 98, 111, 120, 105, 110, 103, 32, 109, 97, 110]);

async function replacePage(pass, txt) {
  var buffer = hexDecode(txt);
  var pageContent = decoder.decode(await decrypt(pass, buffer));
  if(pageContent != null) {
    document.open();
    document.write(pageContent);
    document.close();
  }
}

async function encrypt(pass, txt) {
  return await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, await getKey(pass), encoder.encode(txt));
}

async function decrypt(pass, buffer) {
  return await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, await getKey(pass), buffer);
}

async function getKey(pass) {
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

async function buttonEncrypt() {
  var pass = document.getElementById("password-input").value;
  var txt = document.getElementById("text-input").value;
  var ctxt = hexEncode(await encrypt(pass, txt));
  document.getElementById("text-output").value = ctxt;
}

async function buttonDecrypt() {
  var pass = document.getElementById("password-input").value;
  var txt = document.getElementById("text-input").value;
  var ctxt = await decrypt(pass, hexDecode(txt));
  document.getElementById("text-output").value = decoder.decode(ctxt);
}

function hexEncode(buffer) {
  var a = new Uint8Array(buffer);
  var hexString = [];
  for(var b of a) {
    var h = b.toString(16);
    hexString.push(h.length == 1 ? "0" + h : h);
  }
  return hexString.join('');
}

function hexDecode(hexString) {
  var buffer = new ArrayBuffer(hexString.length / 2);
  var view = new Uint8Array(buffer);
  for(var i = 0; i < view.length; i++) {
    view[i] = parseInt(hexString.substring(i * 2, i * 2 + 2), 16);
  }
  return buffer;
}
