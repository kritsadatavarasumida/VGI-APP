/**
 * Created by doi on 9/11/2016 AD.
 */
document.addEventListener('ImgCacheReady', function () {
    console.log("cached ready");
    var target = $('.cached-img');
    console.log(target);

    Imgcache.isCached(target.attr('src'), function (path, success) {
        if (success) {
            Imgcache.useCachedFile(target);
            console.log('use cached');
        } else {
            Imgcache.cacheFile(target.attr('src'), function () {
                ImgCache.useCachedFile(target);
                console.log('new cache');
            });
        }
    });

}, false);

