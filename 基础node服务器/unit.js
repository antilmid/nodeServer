module.exports = {
    // url地址解析，cf参数是指当主机时解析的参数
    urlParse:function (url, cf = {path:'index', ext:'.html'}) {
        let temp = url.split("?");;
        let urlObj = {};
        if(temp[0]){
            let jx = temp[0];
            // 获取后缀名
            let ext = jx.match(/\.[^\.]*$/g);
            jx = jx.replace(/\.[^\.]*$/g, "");
            if(ext && ext[0]){
                urlObj.ext = ext[0];
            }else{
                urlObj.ext = "";
            }
            // 获取地址
            urlObj.path = jx;
            if(jx == "/"){
                urlObj.path = cf.path;
                urlObj.ext = cf.ext;
            }
        }
        if(temp[1]){
            urlObj.get = temp[1];
        }
        return urlObj;
    },
    // 是否可访问该扩展名
    extAble:function (ext, arr=['.html']) {
        for(let i = 0; i < arr.length; i++){
            if(ext == arr[i]){
                return true;
            }
        }
        return false;
    },
    // proxy页面是否存在
    proxyAble: function (path, py){
        for(let i in py){
            for(let name in py[i]){
                if('/'+name == path){
                    return py[i][name];
                }
            }
        }
        return false;
    }
}