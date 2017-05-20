/**
 *less编译 压缩 合并
 *js 压缩 合并 混淆
 */
//首先引入gulp  
var gulp = require('gulp');
//最后对页面实现监视 每次更改都会刷新到页面中 所写即所见
var browserSync = require('browser-sync').create();
// Static Server + watching scss/html files
gulp.task('serve', ['style', 'html', 'script', 'image'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/*.html", ['html']);
    gulp.watch("src/styles/*.less", ['style']);
    gulp.watch("src/scripts/*.js", ['script']);
    gulp.watch("src/images/*.*", ['image']);
    // gulp.watch("app/*.html").on('change', browserSync.reload);
});
//导入less
var less = require('gulp-less');
//导入gulp-mini-css
var cssmini = require('gulp-mini-css');
gulp.task('style', function() {
        return gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
            .pipe(less())
            .pipe(cssmini({ ext: '.css' }))
            .pipe(gulp.dest('dist/styles/'))
            .pipe(browserSync.stream());
    })
    //接下来进行js的处理
    //导入concat 
    //导入uglyfly  这个不知道什
var uglyfly = require('gulp-uglyfly');
var concat = require('gulp-concat');
gulp.task('script', function() {
        return gulp.src('src/scripts/*.js')
            .pipe(concat('all.js'))
            .pipe(uglyfly())
            .pipe(gulp.dest('dist/scripts'))
            .pipe(browserSync.stream());

    })
    //把图片复制过去就好
gulp.task('image', function() {
        gulp.src('src/images/*.*')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.stream());

    })
    //html 压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());

})
gulp.task('default', ['serve']);
