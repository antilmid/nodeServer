const http = require('http');
const fs = require('fs');
const unit = require('./unit');
const cf = require('./config');

let py = {}; // Proxy代理页面
let wts = fs.createWriteStream('./log.txt'); // 错误日志文件流
// 错误信息捕获
function err(func, res, msg){
    try {
        func.call(this);
    }catch(e){
        wts.write( '###:' + e.toString() + '\r\n');
        if( typeof msg == "string"){
            res.write(`<h1>${msg}</h1>`);
        }else if(typeof msg == "function"){
            res.write(msg.call(this));
        }else if(typeof msg == "number"){
            if(cf[`status_${msg}`]){
                let ms = fs.readFileSync( cf[`status_${msg}`] );
                res.write(ms);
            }else{
                res.write(`<h1>500 Server Error [Server Config Error in "status_${msg}"]</h1>`);
            }
        }
        else{
            if(cf[`status_500`]){
                let ms = fs.readFileSync( cf[`status_500`] );
                res.write(ms);
            }else{
                res.write(`<h1>500 Server Error</h1>`);
            }
            
        }
    }
}

// 初始化Proxy代理页面
if(cf.proxyPage){
    for(let i = 0; i < cf.proxyPage.length; i++){
        py[cf.proxyPage[i]] = require('./ProxyPage/' + cf.proxyPage[i]);
    }
}

// 开启监听并创建服务器
const server = http.createServer((req, res) => {
    let urlobj = unit.urlParse(req.url, cf.index);
    // 发送数据回去
    err.call(this, ()=>{
        let tx = "";
        let pyp = unit.proxyAble(urlobj.path + urlobj.ext, py);
        // console.log(urlobj.path + urlobj.ext)
        if( unit.extAble(urlobj.ext, cf.ableToGet) ){
            tx = fs.readFileSync(cf.serverPath + urlobj.path + urlobj.ext);
        }else if( pyp ){
            pyp.call(this, req, res, urlobj);
        }else{
            if(cf[`status_404`]){
                let ms = fs.readFileSync( cf[`status_404`] );
                res.write(ms);
            }else{
                res.write(`<h1>500 Server Error [Server Config Error in "status_404"]</h1>`);
            }
        }
        
        res.write(tx);
    }, res, 404);
    
  res.end();
});




server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(12306);