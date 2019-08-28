// Proxy代理页面，也叫 方法页面，没有实体，是一个服务程序
module.exports = {
    'haha':function (req, res, urlObj) { // 地址为haha,    执行该方法
        res.write("<h1>这是一个服务程序</h1>");
    }
}