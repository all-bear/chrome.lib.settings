var gulp = require('gulp');
var babel = require('gulp-babel');
var minify = require('gulp-babel-minify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');

gulp.task('default', function () {
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify())
    .pipe(gulp.dest('dist'));
  gulp.src('src/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', () =>
    gulp.src('spec/*')
        .pipe(jasmine())
);