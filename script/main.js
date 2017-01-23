define(['zepto', 'sm', 'sme','template'], function (zepto, sm, sme,template) {

    function getQueryString(name, url) {
        var str = url || document.location.search || document.location.hash,
            result = null;
        if (!name || str === '') {
            return result || '';
        }
        result = str.match(
            new RegExp('(^|&|[\?#])' + name + '=([^&]*)(&|$)')
        );
        if (result === null) {
            return '';
        } else {
            ;
            return result[2] === 'null' ? '' : decodeURIComponent(result[2]);
        }
    }

    return {
        homelistapi: './mock/home.json',//https://api.getweapp.com/vendor/douban/top250
        getQueryString:getQueryString,
        template: template,
        //xhr: xhr,
    }
});
