

$(function() {

    //var hallTitleData = {
    //    tuanTitle: '123'
    //}
    //var hallTitle = template('hallTitleTemp', hallTitleData);
    //
    //console.info(hallTitle);
    //$('#hallTitle').html(hallTitle);

    var loading=false;
    getData = function (currPage, pageSize) {
        $.ajax({
            type: 'GET',
            url: '../../mock/todoList.json',  //接口地址
            //context: $('tbody'),
            //data: {curPage: currPage, pageSize: pageSize},  //异步返回给data
            dataType: 'json',
            success: function (data) {

                if(data.status=='1'){
                    jQuery('#hallTitleTemp').tmpl(data).appendTo($('#hallTitle'));

                    var groupListData = data.data;
                    //var html = template('brandListTemp-include', groupListData);
                    // 添加新条目
                    //$('#pro-list').append(html);

                    jQuery('#brandListTemp-include').tmpl(groupListData).appendTo($('#pro-list'));
                    //jQuery(".card-newPro img").css("height", jQuery(".card-newPro img").width());

                    //console.log(jQuery(".page-list").data('pagenum2','60'));
                    jQuery(".page-list").data('totalpage', 6);
                }


            }
        });
    };

    setTimeout(function() {

    getData(1, 6);},300);

    jQuery(document).on('infinite', function () {
        // 如果正在加载，则退出
        if (loading) return;
        // 设置flag
        loading = true;
        // 模拟1s的加载过程
        setTimeout(function() {
            // 重置加载flag
            loading = false;
            var currpage =  jQuery(".page-list").data('pagenum');
            var totalpage = jQuery(".page-list").data('totalpage');
            if (currpage >= totalpage) {
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                jQuery.detachInfiniteScroll(jQuery('.infinite-scroll'));
                // 删除加载提示符
                jQuery('.infinite-scroll-preloader').remove();
                return;
            }

            getData(parseInt(currpage + 1), 6);
            //容器发生改变,如果是js滚动，需要刷新滚动
            jQuery.refreshScroller();
        },1000);

    });
    //jQuery.init();



});

