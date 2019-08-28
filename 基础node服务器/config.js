// 服务器配置文件
module.exports = {
    serverPath:__dirname+"/root", // 配置web根目录
    index:{path:'/haha', ext:''}, // 配置index页面地址（地址基于根目录）
    ableToGet:['.html', '.css', '.js', '.png', '.jpg', '.icon', '.webp', '.mp4'], // 配置可以解析的扩展名
    proxyPage:['test'], // 配置代理集合（代理集合样板写法在test.js有）
    status_404:__dirname+"/errorWeb/404.html", //配置404状态码页面
    status_500:__dirname+"/500.html" // 配置500状态吗页面
}