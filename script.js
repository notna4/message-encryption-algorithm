const btn = document.getElementById("btn");
btn.onclick = function () {
  getInput();
};

function getInput() {
  var text = document.getElementById("input");

  var initial = document.getElementById("initial");
  initial.textContent = "Your message: " + text.value;
  encrypt(text, key);
}

var key = [];

const random = generateRandomInt(2, 5);
console.log(random);
generateKey(random);

function generateKey(random) {
  var k = 0;
  for (let i = 1; i <= random; i++) {
    key[k] = i;
    k++;
  }
  console.log(key);
}

function generateRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
  //The maximum is exclusive and the minimum is inclusive
}

function encrypt(text, key) {
  var string = text.value.toString();
  var newString = [];
  var k = 0;
  for (var i = 0; i < string.length; i++) {
    if (k < random) {
      console.log(string.charCodeAt(i));
      if (string.charCodeAt(i) < 123) {
        newString[i] = string.charCodeAt(i) + key[k];
      }
      k++;
    } else {
      k = 0;
      if (string.charCodeAt(i) < 123) {
        newString[i] = string.charCodeAt(i) + key[k];
      }
      k++;
    }
  }
  console.log(newString);

  var crypted = "";
  for (var j = 0; j < string.length; j++) {
    crypted = crypted + String.fromCharCode(newString[j]);
  }
  console.log("crypt " + crypted);

  var encryptedM = document.getElementById("ecrypted-m");
  encryptedM.textContent = "Your message encrypted: " + crypted;

  var body = document.querySelector("body");
  var btnCopy = document.createElement("button");
  btnCopy.textContent = "Copy encrypted message";
  btnCopy.id = "copyBtn";

  btnCopy.onclick = function () {
    copyData(crypted, key);
  };

  body.appendChild(btnCopy);
}

function copyData(text, key) {
  var data = [];
  data[0] = text;
  data[1] = key;

  //var copyText = data;
  var el = document.createElement("textarea");
  el.value = data;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px",
  };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  var btnCopy = document.getElementById("copyBtn");
  btnCopy.textContent = "Copied encrypted message";
  btnCopy.style.backgroundColor = "grey";
}

function decrypt(data) {
  var text = "";
  var z = 0;
  var key = [];
  var isText = 0;
  for (let i = 0; i < data.length; i++) {
    if (isText == 0) {
      if (data[i] != ",") {
        text = text + data[i];
      } else {
        isText = 1;
      }
    } else {
      key = key + data[i];
    }
  }

  var random = key.length;

  console.log("text " + text + " " + key + " " + random);

  var string = text.toString();
  console.log(string);
  var newString = [];
  var k = 0;
  for (var i = 0; i < string.length; i++) {
    if (k < random) {
      console.log(string.charCodeAt(i));
      newString[i] = string.charCodeAt(i) - key[k];
      k = k + 2;
    } else {
      k = 0;
      console.log(string.charCodeAt(i));
      newString[i] = string.charCodeAt(i) - key[k];
      k = k + 2;
    }
  }

  console.log(newString);

  var decrypted = "";
  for (var j = 0; j < string.length; j++) {
    decrypted = decrypted + String.fromCharCode(newString[j]);
  }
  console.log(decrypted);

  var decry = document.getElementById("decrypted");
  decry.textContent = "Your message decrypted: " + decrypted;
}

function getEncryptedData() {
  var encrMsg = document.getElementById("encrypted-msg");
  console.log(encrMsg.value);
  decrypt(encrMsg.value);
}
