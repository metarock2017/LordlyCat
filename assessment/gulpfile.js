var gulp = require('gulp');
var browsersync = require('browser-sync').create();//自动刷新
var imagemin = require('gulp-imagemin'); //图片压缩插件

//html
gulp.task('html', function() {
    gulp.src('public/*.html')
        .pipe(gulp.dest('dist/public/'))
        .pipe(browsersync.stream());
});

//js
gulp.task('js', function() {
    gulp.src('public/js/*.js')
        .pipe(gulp.dest('dist/public/js/'))
        .pipe(browsersync.stream());
});


//处理css文件

//less文件编译
var less = require('gulp-less');
gulp.task('less_css', function() {
    gulp.src('public/css/*.css')
        .pipe(less())
        .pipe(gulp.dest('dist/public/css/'))
        .pipe(browsersync.stream());
});
//编译sass文件
var sass = require('gulp-sass');
gulp.task('sass_css', function() {
    gulp.src('public/css/*.css')
        .pipe(sass())
        .pipe(gulp.dest('dist/public/css/'))
        .pipe(browsersync.stream());
});


//压缩图片
gulp.task('image', function() {
    gulp.src('public/img/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/public/img/'))
        .pipe(browsersync.stream());
});


//监控文件变化，自动更新
gulp.task('serve', function() {
    gulp.start('html', 'less_css', 'sass_css', 'image', 'js');
    browsersync.init({
        port: 3366,
        server: {
            baseDir: ['dist/public/']
        }
    });
    gulp.watch('./public/js/*.js', ['js']);
    gulp.watch('./public/css/*.css', ['less_css']);
    gulp.watch('./public/css/*.css', ['sass_css']);
    gulp.watch('./public/images/*.*', ['image']);
    gulp.watch('./public/*.html', ['html']);
});

gulp.task('default', ['serve']);