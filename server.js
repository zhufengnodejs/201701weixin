let express = require('express');
let app = express();
let {token} = require('./config');
let crypto = require('crypto');
app.get('/',function(req,res){
 let {signature,timestamp,nonce,echostr} = req.query;
 let str = [token,timestamp,nonce].sort().join('');
 //sh1是一个摘要算法，把任意长度的字符串变成固定长度的输出字符串
 let sign = crypto.createHash('sha1').update(str).digest('hex');
 console.log(sign , signature);
 if(sign === signature){
     res.send(echostr);
 }else{
     res.send('wrong');
 }
});
app.listen(8080);