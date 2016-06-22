var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var angularFilesort = require('gulp-angular-filesort');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', function() {
    
    gulp.src('app/views/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache())
    .pipe(gulp.dest('app'));
    
    gulp.src(['app/**.*js', 'app/**/*.js'])
    .pipe(angularFilesort())
    .pipe(concat('app.js', { newLine: ';' }))
    .pipe(ngAnnotate({ add: true }))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
    
    gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
    
    gulp.src('css/style.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('public'));

    gulp.src('images/*')
    .pipe(gulp.dest('public/images'));
});
