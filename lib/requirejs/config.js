var lib='../lib/';//引用库目录
requirejs.config({
    baseUrl: './script',//页面逻辑js目录
    paths: {

        main: 'main',
        zepto:lib+ './zepto.min',
        sm:  lib+ './sm',
        sme:lib+  './sm-extend',
        template: lib+  './template/3.0.0/template'
    }
});