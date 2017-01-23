
require(["zepto","sm","sme"], function() {

    var zepto = require("zepto");
    var sm = require("sm");
    var sme = require("sme");


$(function() {

    $('.page').show();

    $('.media-list').html('');

    var datas;
    var dataurl='https://api.getweapp.com/vendor/douban/top250';

    $.ajax({
        type: 'get',
        url: dataurl,
        dataType: 'json',
        //timeout: 3000,
        success: function(data) {
            var datas=data.subjects;

            setTimeout(function(){
                var html = '';
                for (var i =  0; i <= 6; i++) {
                    html += '<li class="item-content pb-standalone">'+
                    '<div class="item-content">'+
                        '<div class="item-media"><img src="'+datas[i].images.medium+'" width="44"></div>'+
                        '<div class="item-inner">'+
                            '<div class="item-title">'+Number(i+1)+'.'+datas[i].title+'</div>'+
                            '<div class="item-subtitle">'+datas[i].directors[0].name+'</div>'+
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

                for(var m=0;m<datas[n].casts.length;m++){
                    narr.push(datas[n].casts[m].avatars.large);
                }
                var myPhotoBrowserStandalone = $.photoBrowser({
                    photos : narr
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
                        //html += '<li class="item-content">'+datas[i].title+'</li>';
                        html += '<li class="item-content pb-standalone">'+
                            '<div class="item-content">'+
                            '<div class="item-media"><img src="'+datas[i].images.medium+'" width="44"></div>'+
                            '<div class="item-inner">'+
                            '<div class="item-title">'+Number(i+1)+'.'+datas[i].title+'</div>'+
                            '<div class="item-subtitle">'+datas[i].directors[0].name+'</div>'+
                            '</div>'+
                            '</div>'+
                            '</li>';
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