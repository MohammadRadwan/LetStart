var gulp        = require('gulp'),
    connect     = require('gulp-connect');
    concat      = require('gulp-concat'),
    prefix      = require('gulp-autoprefixer'),
    sass        = require('gulp-sass'),
    pug         = require('gulp-pug'),
    wait        = require('gulp-wait');
    sourcemaps  = require('gulp-sourcemaps'),
    htmlmin     = require('gulp-htmlmin'),
    csso        = require('gulp-csso'),
    //cleanCSS    = require('gulp-clean-css'),
    uglify      = require('gulp-uglify'),
    imagemin    = require('gulp-imagemin'),
    plumber     = require('gulp-plumber'),
    //clean       = require('gulp-clean'),
    notify      = require("gulp-notify"),
    zip         = require('gulp-zip');

// Connect Task
gulp.task('connect', function() {
    connect.server({
        port: 7000,
        root: 'dist',
        livereload: true
    });
});

// Logo Task
gulp.task('logo', function() {
    return gulp.src('src/favicon.png')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});
    
// HTML-Pug Task
gulp.task('html', function() {
    return gulp.src('src/*.pug')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(pug())
        //.pipe(pug({pretty: true}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// SCSS Task
gulp.task('stylesheets', function() {
    return gulp.src('src/stylesheets/sass/main.scss')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(sourcemaps.init()) // To start the map road before any plugin
        .pipe(wait(1000)) // For Sass import problem
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix('last 2 versions'))
        .pipe(concat('main.min.css')) // Name of the concatenated Sass files, and you can use it for external files
        .pipe(csso())
        //.pipe(cleanCSS())
        .pipe(sourcemaps.write('.')) // End before dist and after all the plugins, used . to save it beside the orginal file.
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// Css-vendors Task
gulp.task('css-vendors', function () {
    return gulp.src([
        'node_modules/font-awesome/css/font-awesome.min.css', 
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'src/stylesheets/vendors/*.css',
        ])
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(concat('vendors.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css/vendors'))
        .pipe(connect.reload());
});

// Fonts Task
gulp.task('fonts', function () {
    return gulp.src(['node_modules/font-awesome/fonts/*', 'src/fonts/*.*'])
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(gulp.dest('dist/css/fonts'))
        .pipe(connect.reload());
});

// Images Task
gulp.task('images', function () {
    return gulp.src('src/images/**/*.*')
    .pipe(plumber({ errorHandler: function(err) {
        notify.onError({
            title: "Gulp error in " + err.plugin,
            message:  err.toString()
        })(err);
    }}))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

// JavaScript Task
gulp.task('scripts', function() {
    return gulp.src('src/scripts/js/*.js')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

//JS Vendors
gulp.task('js-vendors', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'src/scripts/vendors/jquery.nicescroll.js',
        'src/scripts/vendors/swiper.min.js',
        'src/scripts/vendors/owl.carousel.min.js',
        'src/scripts/vendors/aos.js',
        ])
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/vendors'))
        .pipe(connect.reload());
});

// Compress Files
gulp.task('compress', function () {
    return gulp.src('dist/**/*.*')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(zip('website.zip'))
        .pipe(gulp.dest('.'))
        .pipe(connect.reload());
});

// Watch Task
gulp.task('watch', function () {
    gulp.watch('src/favicon.png', ['logo']);
    gulp.watch('src/*.pug', ['html']);
    gulp.watch([
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'src/stylesheets/vendors/*.css',
    ], ['css-vendors']); 
    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/stylesheets/sass/main.scss'
    ], ['stylesheets']);
    gulp.watch(['node_modules/font-awesome/fonts/*', 'src/fonts/*.*'], ['fonts']);
    gulp.watch([
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'src/scripts/vendors/jquery.nicescroll.js',
        'src/scripts/vendors/swiper.min.js',
        'src/scripts/vendors/owl.carousel.min.js',
        'src/scripts/vendors/aos.js',
    ], ['js-vendors']);
    gulp.watch('src/scripts/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch('dist/**/*.*', ['compress']);
});

// Default Task
gulp.task('default', ['connect', 'watch']);