
var dmk = new Danmaku();

var init = function(){
    console.log('begin init');
    dmk.destroy();
    var match = window.location.search.match(/v=(.*)/i)
    if (match.length==2) {
        console.log('player page, dmk started')
        video_container = document.querySelector('video');
        dmk.init({
            video:video_container,
            comments:[
                {text:'test',mode:'rtl',time:5},
                {text:'test',mode:'rtl',time:5},
                {text:'test',mode:'rtl',time:5},
                {text:'test',mode:'rtl',time:5},
                {text:'test',mode:'rtl',time:5},
                {text:'test',mode:'rtl',time:5},
                {text:'test',mode:'rtl',time:6},
                {text:'test',mode:'rtl',time:7},
                {text:'test',mode:'rtl',time:8},
                {text:'test',mode:'rtl',time:9}
            ]
        });
        dmk.start();
    }
};

window.onresize = function(){
    dmk.resize();
};

(function(){
    var url = window.location.href;
    setInterval(function(){
        var curl = window.location.href;
        if (url!=curl){
            url=curl;
            init();
        }
    },1000);
    init();
})();