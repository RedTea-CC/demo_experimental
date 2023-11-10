//图像装载器  
(function() {  
    var resourceCache = {};//缓存图片的数组  
    var loading = [];  
    var readyCallbacks = [];//保存所有回调函数的数组  
  
    // 从一个url或一个数组装载图像  
    function load(urlOrArr) {  
        if(urlOrArr instanceof Array) {  
            urlOrArr.forEach(function(url) {//遍历数组中的每一个url,装载图像  
                _load(url);  
            });  
        }  
        else {  
            _load(urlOrArr);  
        }  
    }  
  
    //从一个url装载图像  
    function _load(url) {  
        if(resourceCache[url]) {//缓存中有这个图片，直接返回它  
            return resourceCache[url];  
        }  
        else {  
            var img = new Image();  
            img.onload = function() {//图片加载完后  
                resourceCache[url] = img;//放入缓存  
                if(isReady()) {//全部图片加载后，执行全部回调函数  
                    readyCallbacks.forEach(function(func) { func(); });  
                }  
            };  
            resourceCache[url] = false;//标记这个图片还没加载  
            img.src = url;  
        }  
    }  
  
    function get(url) {//从缓存中取图片  
        return resourceCache[url];  
    }  
  
    function isReady() {//所有图片是否加载完毕  
        var ready = true;  
        for(var k in resourceCache) {//遍历缓存图片的数组  
            if(resourceCache.hasOwnProperty(k) &&  
               !resourceCache[k]) {//只要有一个图片没加载，返回false  
                ready = false;  
            }  
        }  
        return ready;//当全部图片加载到缓存中后，返回true，否则返回false;  
    }  
  
    function onReady(func) {//添加回调函数  
        readyCallbacks.push(func);  
    }  
  
    window.resources = { //定义一个对象  
        load: load,  
        get: get,  
        onReady: onReady,  
        isReady: isReady  
    };  
})();  
