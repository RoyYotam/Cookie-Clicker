admin_btn = document.getElementById("admin");
var fileSelector = document.getElementById('admin_file')

var code = "";
var data = "";


fileSelector.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      data = event.target.result;
    });
    reader.readAsText(event.target.files [0]);
  });

admin_btn.addEventListener("click", function () {
    // check why it doesnt work
    var node = document.getElementById('admin_file')
    var visibility = node.style.visibility;
    node.style.visibility = visibility == "visible" ? 'hidden' : "visible"

    code = prompt(); // get the code
 });

function admin(cookies = 80) {
    result = CryptoJS.AES.decrypt(data, CryptoJS.enc.Hex.parse(code), {iv: iv}).toString(CryptoJS.enc.Utf8);
    if (result = "im the admin bro!") {
        console.log("Welcome...");
    } else {
        console.log("Sorry.");
    }

    localStorage.setItem("cookies", my_encryption_for_numbers(cookies));
}

function adminf(func) {
    result = CryptoJS.AES.decrypt(data, CryptoJS.enc.Hex.parse(code), {iv: iv}).toString(CryptoJS.enc.Utf8);
    if (result = "im the admin bro!") {
        console.log("sure " + func);
    } else {
        console.log("Sorry.");
    }
}

//CryptoJS.AES.decrypt("message", "code", {iv: iv}).toString(CryptoJS.enc.Utf8);
var code = CryptoJS.enc.Hex.parse("12345");
var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
x = CryptoJS.AES.encrypt("message", code, {iv: iv}).toString()
console.log(x);
key1 = CryptoJS.enc.Hex.parse("12345");
key2 = CryptoJS.enc.Hex.parse("54321");
console.log(CryptoJS.AES.decrypt(x, key1, {iv: iv}).toString(CryptoJS.enc.Utf8));
console.log(CryptoJS.AES.decrypt(x, key2, {iv: iv}).toString(CryptoJS.enc.Utf8));

