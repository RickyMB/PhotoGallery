'use strict';

const gulp = require('gulp'),
      babel = require('gulp-babel'),
      pug = require('gulp-pug'),
      browserSync = require('browser-sync'),
      wait = require('gulp-wait'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      cssnano = require('cssnano');

const server = browserSync.create();
const postCSSPlugins = [
        cssnano({
          autoprefixer: {
            add : true
          }
        })
      ];

gulp.task('es6', () => {
  gulp.src('./dev/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./public/js'))
});

gulp.task('sass', () => {
  gulp.src('./dev/scss/styles.scss')
    .pipe(sass())
    .pipe(postcss(postCSSPlugins))
    .pipe(gulp.dest('./public/css'))
    .pipe(server.stream({match: '**/(/css'}))
});

gulp.task('pug', () =>
  gulp.src('./dev/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public'))
);

gulp.task('default', () => {
  server.init({
    server : {
      baseDir : './public'
    }
  });
});

gulp.watch('./dev/js/*.js', ['es6', server.reload]);
gulp.watch('./dev/pug/**/*.pug', ['pug', server.reload]);
gulp.watch('./dev/scss/**/*.scss', ['sass']);