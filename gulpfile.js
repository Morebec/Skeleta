const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

/**
 * Builds the dev version of skeleta
 **/
function buildDev() {
  return gulp
    .src('./src/skeleta.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('./dist'))
}

function buildDocs() {
  return gulp
  .src('./docs/docs.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist'))
}

/**
 * Builds the prod version of skeleta
 **/
function buildProd() {
  return gulp
    .src('./src/skeleta.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'))
}

function watch() {
  gulp.watch('./src/**/*.scss', gulp.parallel(buildProd, buildDev))
  gulp.watch('./docs/**/*.scss', gulp.parallel(buildDocs))
}


exports.watch = watch
exports.build = gulp.parallel(buildDocs, buildProd, buildDev)
exports.default = exports.build