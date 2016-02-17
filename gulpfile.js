var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var compass =require('gulp-compass');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var browserSync = require('browser-sync').create();

var sassFiles = './src/sass/**/*.scss';
gulp.task('sass', function () {
    return gulp.src(sassFiles)
        .pipe(compass({
            css: './assets/css',
            sass: './src/sass',
            sourcemap:true
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

var vendorFiles = [
    'node_modules/underscore/underscore.js',
    'node_modules/backbone/backbone.js',
    'node_modules/backbone.marionette/lib/backbone.marionette.js',
    'node_modules/tether/dist/js/tether.js',
    'node_modules/bootstrap/dist/js/bootstrap.js'
];
gulp.task('js.vendor', function() {
    return gulp.src(vendorFiles)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream());
});

var jsBundleFiles = './src/js/bundle/**/*.js';
gulp.task('js.bundle', function() {
    return gulp.src(jsBundleFiles)
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream());
});

var jsAppFiles = [
    'src/js/app/app.js'
];
gulp.task('js.app', function() {
    return gulp.src(jsAppFiles)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {

    browserSync.init({
        proxy: "narcissus.dev"
    });

    var templateFiles =[
        'index.php',
        'template-parts/**/*.php',
        'header.php',
        'footer.php',
        'search.php',
        'sidebar.php',
        'single.php',
        'page.php'
    ];
    watch(templateFiles).on('change', browserSync.reload);

    watch(sassFiles, batch(function (events, done) {
        gulp.start('sass', done);
    }));

    watch(jsAppFiles, batch(function (events, done) {
        gulp.start('js.app', done);
    }));

    watch(jsBundleFiles, batch(function (events, done) {
        gulp.start('js.bundle', done);
    }));

    watch(vendorFiles, batch(function (events, done) {
        gulp.start('js.bundle', done);
    }));
});

gulp.task('default', ['sass', 'js.bundle','js.vendor', 'js.app']);