var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var compass =require('gulp-compass');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");

gulp.task('sass', function () {
    return gulp.src("./src/sass/*.scss")
        .pipe(compass({
            css: './assets/css',
            sass: './src/sass',
            sourcemap:true
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('js.vendor', function() {
    var vendorFiles = [
        'node_modules/underscore/underscore.js',
        'node_modules/backbone/backbone.js',
        'node_modules/backbone.marionette/lib/backbone.marionette.js',
        'node_modules/bootstrap/dist/js/bootstrap.js'
    ];
    return gulp.src(vendorFiles)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('js.bundle', function() {
    return gulp.src('./src/js/bundle/*.js')
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./assets/js'));
});
gulp.task('js.app', function() {
    var appFiles = [
        'src/js/app/app.js'
    ];
    return gulp.src(appFiles)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('default', ['sass', 'js.bundle','js.vendor', 'js.app']);