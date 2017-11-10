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

// FILE PATHS
var scripts_path = 'public/scripts/**/*.js';
var css_path = 'public/css/**/*.css';
var dist_path = 'public/dist';
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
    console.log('starting images task');
});
// ==========================================

gulp.task('default', function() {
    console.log('starting default task');
});

gulp.task('watch', function() {
    console.log('starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(scripts_path, ['scripts']);
    // gulp.watch(css_path, ['styles']);
    gulp.watch('public/scss/**/*.scss', ['styles']);
});