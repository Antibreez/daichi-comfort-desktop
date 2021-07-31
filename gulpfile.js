const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");
const del = require("del");
const csso = require("postcss-csso");
const newer = require(`gulp-newer`);

const webpack = require('webpack-stream');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

// Scripts

// const scripts = () => {
//   return gulp.src("source/js/script.js")
//     .pipe(terser())
//     .pipe(rename("script.min.js"))
//     .pipe(gulp.dest("build/js"))
//     .pipe(sync.stream());
// }

const scripts = (isProd) => {
  return () => {
    return gulp.src('source/js/main.js')
    .pipe(plumber())
    .pipe(webpack({
      mode: isProd ? 'production' : 'development',
      output: {
        filename: '[name].min.js',
      },
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      plugins: [
        new CircularDependencyPlugin(),
        new DuplicatePackageCheckerPlugin()
      ]
    }))
    .pipe(gulp.dest('build/js'))
  }
}

// Images

const optimizeImages = () => {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(newer("build/img"))
    .pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff,eot,ttf}",
    "source/*.ico",
    "source/img/**/*.svg",
    "!source/img/icons/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/**/*.js", gulp.series(scripts(false), reload));
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/img/*.{png,jpg,svg}", gulp.series(copyImages, createWebp, reload));
  gulp.watch("source/img/icons/*.svg", gulp.series(sprite, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  sprite,
  gulp.parallel(
    styles,
    html,
    scripts(true),
    createWebp
  ),
);

exports.build = build;

// Default


exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  sprite,
  gulp.parallel(
    styles,
    html,
    scripts(false),
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
