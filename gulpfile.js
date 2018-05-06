const gulp = require('gulp'),
    {gutil, del, filter, compile, ftp, sass, tinify, rollup, watch, browserSync} = require('../../../heikuai/gulp-project'),
    reload = browserSync.reload;

// scss编译后的css将注入到浏览器里实现更新
gulp.task('build-sass', function (done) {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(reload({stream: true}))
        .on('finish', done);
});
gulp.task('build-js', function (done) {
    return gulp.src('src/page-js/*.js')
        .pipe(rollup())
        .pipe(gulp.dest('js'))
        .pipe(reload({stream: true}))
        .on('finish', done);
});
gulp.task('build', gulp.series('build-js', 'build-sass'));
gulp.task('js-watch', gulp.parallel('build-js'));
gulp.task('sass-watch', gulp.parallel('build-sass'));

gulp.task('clean', function (done) {
    del.sync(['js', 'css', 'temp']);
    done();
});
gulp.task('init.js', function (done) {
    return gulp.src([])
        .pipe(gulp.dest('js'))
        .on('finish', done);
});
gulp.task('init.css', function (done) {
    return gulp.src([])
        .pipe(gulp.dest('css'))
        .on('finish', done);
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', function () {
    browserSync.init({
        server: "./"
    });
    watch("pages/*.html").on('change', reload);
    watch("css/*.css").on('change', reload);
    watch('src/page-js/*.js', gulp.parallel('js-watch', reload));
    watch('scss/*.scss', gulp.parallel('sass-watch', reload));
});

//开发
gulp.task('dev', gulp.series('clean','build', 'serve'));

//压缩图片资源
gulp.task('compression', function (done) {
    return gulp.src('images/**/*.{jpg,png}')
        .pipe(tinify())
        .pipe(gutil.noop())
        .on('finish', done);
});

// 压缩
gulp.task('release', function (done) {
    gulp.src('**')
        .pipe(filter(['src/**']))
        .pipe(compile({
            push: 1,
            env: 3,
            release: 3,
            uri: {
                '{css,images,js}/**': `/app/$0`
            }
        }, null, false))
        .pipe(gulp.dest('dist'))
        .on('finish', done);
});
