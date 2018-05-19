

/**
 * autor: cevin<cevin.github.io>
 */

(function(){
    var log = function(content){
        console.log(content);
    };
    var dmk = new Danmaku();
    var check_video_size_job=null;
    var last_video_size = null;
    var defaultStyle = {fontSize:'2rem',textShadow:'#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0'};
    var get_video = function(){
        var video_container = document.querySelector('video');
        if (video_container != null) {
            return video_container;
        } else {
            return null;
        }
    };
    var check_video_size = function(video) {
        if (!video && check_video_size_job) {
            last_video_size=null;
        } else {
            var video_size = video.offsetWidth;
            if (last_video_size===null) 
                last_video_size=video_size;
            if (video_size!=last_video_size) {
                last_video_size=video_size;
                log('video size changed');
                dmk.resize();
            }
        }
    };
    var emit=function(cfg){
        dmk.emit(cfg);
    };
    var start_dmk = function(video){
        log("danma: call start_dmk");
        dmk.destroy();
        if (video) {
            dmk.init({video:video,container:document.getElementById('movie_player')});
            fetch('https://api.prprpr.me/dplayer/v2/?id=9E2E3368B56CDBB4').then(function(data){
                return data.json().then(function(json){
                    var t=json.danmaku
                    for (i in t){
                        var style=defaultStyle;
                        style.color=t[i][2];
                        //emit({time:t[i][0],mode:'rtl',text:t[i][4],style:style});
                    }
                });
            });
        };
        return video;
    };

    var init = function(){
        console.log('danma:call init');
        dmk.destroy();
        var match = window.location.search.match(/v=(.*)/i)
        if (match.length==2) {
            log('danma: vid '+match[1]);
            video_container = get_video();
            start_dmk(video_container);
            check_video_size_job=setInterval(function(){check_video_size(video_container)},200);
        }
    };

    window.onresize = function(){
        dmk.resize();
    };

    log("begin danma");
    var url = window.location.href;
    setInterval(function(){
        var curl = window.location.href;
        if (url!=curl){
            log('url changed');
            url=curl;
            init();
        }
    },1000);
    init();
})();