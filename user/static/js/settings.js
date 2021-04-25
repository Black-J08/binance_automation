var akey = document.getElementById('binanceKey');
var skey = document.getElementById('binanceSecretKey');

var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
var pass = "";
for (var x = 0; x < 64; x++) {
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
}
akey.value = pass;
skey.value = pass;