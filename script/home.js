
define(['main'], function (main) {

/*require(["zepto","sm","sme"], function() {
    var zepto = require("zepto");
    var sm = require("sm");
    var sme = require("sme");*/
//var getQueryString=main.getQueryString;

    var homelistapi=main.homelistapi;
    var template=main.template;


$(function() {
    $('.page').show();
    $('.title').html('')
    $('.media-list').html('');
    var datas;

    $.ajax({
        type: 'GET',
        url: homelistapi,
        dataType: 'json',
        //timeout: 3000,
        success: function(data) {
            var datas=data.subjects;

            setTimeout(function(){

                $('.title').html(
                    template(titleTemplate, data.title)
                );

                var html = '';
                for (var i =  0; i <= 8; i++) {
                    html += '<li class="item-content pb-standalone">'+
                    '<div class="item-content">'+
                        '<div class="item-media"><img src="'+datas[i].images.medium+'" width="60"></div>'+
                        '<div class="item-inner">'+
                            '<div class="item-title">'+Number(i+1)+'.'+datas[i].title+'</div>'+
                            '<div class="item-subtitle">'+'导演：'+datas[i].directors[0].name+'</div>'+
                        '</div>'+
                    '</div>'+
                    '</li>';
                    }
                    clickthepic(datas);

                // 添加新条目
                $('.media-list').append(html);

            },300);
            getlist(datas);
        }
    });



    $(document).on('click','.photo-browser-close-link',function(){
        $('.photo-browser').remove();
    })

    //点击时打开图片浏览器
    function  clickthepic(datas){

        $(document).on('click','.pb-standalone',function () {

                var narr=[];
                var n=$(this).index();

                for(var i in datas[n].casts){
                    var photoInfo={};
                    photoInfo.url=datas[n].casts[i].avatars.large;
                    photoInfo.caption=datas[n].casts[i].name;
                    narr.push(photoInfo);
                }
                var myPhotoBrowserStandalone = $.photoBrowser({
                    photos : narr,
                    theme: 'dark',/*light,dark*/
                    type: 'popup'/*standalone*/
                });
                myPhotoBrowserStandalone.open();
        });
    }

    function getlist(datas){

        $(document).on("pageInit",  function(e, id, page) {

            //多个标签页下的无限滚动
            var loading = false;
            // 每次加载添加多少条目
            var itemsPerLoad = 6;
            // 最多可加载的条目
            var maxItems = 20;
            var lastIndex = $('.list-container li').length-1;
            function addItems(number, lastIndex) {

                // 生成新条目的HTML
                var html = '';
                if($('#tab2 li.item-content').length<datas.length){
                    for (var i = lastIndex ; i < lastIndex + number; i++) {

                        if(!$.isEmptyObject(datas[i])){
                            html += '<li class="item-content pb-standalone">'+
                                        '<div class="item-content">'+
                                            '<div class="item-media"><img src="'+datas[i].images.medium+'" width="60"></div>'+
                                            '<div class="item-inner">'+
                                                '<div class="item-title">'+Number(i+1)+'.'+datas[i].title+'</div>'+
                                                '<div class="item-subtitle">'+'导演：'+datas[i].directors[0].name+'</div>'+
                                            '</div>'+
                                        '</div>'+
                                     '</li>';
                        }
                    }
                    // 添加新条目
                    $('.media-list').append(html);

                    if($('.media-list li').length>=datas.length-1){
                        $('#d2').hide();
                    }
                }

            }
            $(page).on('infinite', function() {

                 // 如果正在加载，则退出
                if (loading) return;
                // 设置flag
                loading = true;
                var tabIndex = 0;
                if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){
                    tabIndex = 0;
                }
                if($(this).find('.infinite-scroll.active').attr('id') == "tab3"){
                    tabIndex = 1;
                }
                lastIndex = $('.list-container').eq(tabIndex).find('li').length;

                // 模拟1s的加载过程
                setTimeout(function() {
                    // 重置加载flag
                    loading = false;
                    if (lastIndex >= maxItems-1) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        //$.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').eq(tabIndex).hide();
                        return;
                    }
                    addItems(itemsPerLoad,lastIndex);
                    // 更新最后加载的序号
                    lastIndex =  $('.list-container').eq(tabIndex).find('li').length;
                    $.refreshScroller();
                }, 600);
            });
        });
        $.init();

    }

});


});