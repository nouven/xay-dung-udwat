import cryptoJs from 'crypto-js'
import crypto from 'crypto'

let cipherText = cryptoJs.AES.encrypt('ooouvnouven', 'qwe@123');
console.log(cipherText.toString())


let plainText = cryptoJs.AES.decrypt(cipherText, 'qwe@123');
console.log(plainText.toString(cryptoJs.enc.Utf8))
