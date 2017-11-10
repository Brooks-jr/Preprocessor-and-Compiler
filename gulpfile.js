var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minify_css = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

// HANDLEBARS
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');
// ==========================================

// IMAGE COMPRESSION
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// FILE PATHS
var scripts_path = 'public/scripts/**/*.js';
var css_path = 'public/css/**/*.css';
var dist_path = 'public/dist';
var templates_path = 'templates/**/*.hbs';
var images_path = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';
// ==========================================

// STYLES
// === FOR CSS ===
// gulp.task('styles', function () {
//     console.log('starting styles task');
//     return gulp.src(['public/css/reset.css', css_path])
//     .pipe(plumber(function(err) {
//         console.log('styles task error');
//         console.log(err)
//         this.emit('end');
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer())
//     .pipe(concat('styles.css'))
//     .pipe(minify_css())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(dist_path))
//     .pipe(livereload());
    
// });

 // === FOR SCSS ===
gulp.task('styles', function () {
    console.log('starting styles task');
    return gulp.src('public/scss/styles.scss')
    .pipe(plumber(function(err) {
        console.log('styles task error');
        console.log(err)
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist_path))
    .pipe(livereload());
});
// ==========================================

// SCRIPTS
gulp.task('scripts', function () {
    console.log('starting scripts task');

    return gulp.src(scripts_path)
        .pipe(plumber(function(err) {
            console.log('scripts task error');
            console.log(err)
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist_path))
        .pipe(livereload());
});
// ==========================================

// IMAGES
gulp.task('images', function () {
    return gulp.src(images_path)
    .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress()
    ]))
    .pipe(gulp.dest(dist_path + '/images'));
});
// ==========================================

gulp.task('templates', function() {
    return gulp.src(templates_path)
    .pipe(handlebars({
        handlebars: handlebarsLib
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
        namespace: 'templates',
        noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(dist_path))
    .pipe(livereload());
});

gulp.task('default', ['images', 'templates', 'styles', 'scripts'], function() {
    console.log('starting default task');
});

gulp.task('watch', ['default'], function() {
    console.log('starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(scripts_path, ['scripts']);
    // gulp.watch(css_path, ['styles']);
    gulp.watch('public/scss/**/*.scss', ['styles']);
    gulp.watch(templates_path, ['templates']);
});