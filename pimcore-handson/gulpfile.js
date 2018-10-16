/* eslint-env node*/
'use strict';

var
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    del = require('del'),
    svgMin      = require('gulp-svgmin'),
    flatten = require('gulp-flatten'),
    replace = require('gulp-replace'),
    concatCss = require('gulp-concat-css'),
    // source and distribution folder
    config = {
        source: './public/app/Resources/static/',
        dist: './public/web/static/',
        nodePath: './node_modules/',
        toolboxSrc: './public/web/bundles/toolbox/js/frontend',
        formbuilderSrc: './public/web/bundles/formbuilder/js/frontend',
        autoprefixer: {
            browsers: [
                '> 1%',
                'last 2 versions',
                'IE >= 11',
                'Android >= 4.1'
            ]
        }
    },

    sass = {
        files: [
            config.source + 'scss/style.scss',
            config.source + 'scss/email.scss',
            config.source + 'scss/debug.scss',
            config.source + 'scss/editmode.scss'
        ]
    },

    js = {
        header: [
            config.nodePath + 'jquery/dist/jquery.js',
            config.nodePath + 'picturefill/dist/picturefill.js',
            config.dist + 'build/modernizr.js'
        ], footer: [
            config.nodePath + 'popper.js/dist/umd/popper.js',
            config.nodePath + 'bootstrap/dist/js/bootstrap.js',
            config.nodePath + 'jquery-doubletaptogo/dist/jquery.dcd.doubletaptogo.js',
            config.nodePath + 'jquery-match-height/dist/jquery.matchHeight.js',
            config.nodePath + 'stapes/stapes.js',
            config.nodePath + 'lightgallery/dist/js/lightgallery-all.js',
            config.nodePath + 'slick-carousel/slick/slick.js',
            config.nodePath + 'sidr/dist/jquery.sidr.js',
            config.toolboxSrc + '/plugins/*.js',
            config.toolboxSrc + '/vendor/**/*.js',
            config.formbuilderSrc + '/plugins/*.js',
            config.formbuilderSrc + '/vendor/**/*.js',
            config.source + 'js/vendor/**/*.js',
            config.source + 'js/core/**/*.js',
            config.source + 'js/application/module/_abstract.js',
            config.source + 'js/application/helper/**/*.js',
            config.source + 'js/application/module/app/**/*.js'
        ]
    };

// --- [DEV TASKS] ---

// compile scss
gulp.task('sass', function () {
    return gulp
        .src(sass.files, {base: config.source + 'scss/'})
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            precision: 10, includePaths: [config.nodePath]
        }).on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(config.dist + 'css/'))
        .pipe(plugins.livereload());
});

gulp.task('js', function(callback) {
    runSequence('modernizr', ['js:header', 'js:footer', 'eslint'], callback);
});

// copy required file to dest
gulp.task('js:header', function () {
    return gulp
        .src(js.header, {base: config.source + 'js/'})
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('main-header-bundle.js'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(config.dist + 'js/'));

});

// copy required file to dest
gulp.task('js:footer', function () {

    return gulp
        .src(js.footer, {base: config.source + 'js/'})
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('main-footer-bundle.js'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(config.dist + 'js/'));

});

// check app for eslint errors
gulp.task('eslint', function () {

    return gulp
        .src([
            'gulpfile.js',
            config.source + 'js/**/*.js'
        ])
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format());

});

// watch task
gulp.task('watch', ['build-dev'], function () {

    plugins.livereload.listen();
    gulp.watch([config.source + 'scss/**/*'], ['sass']);
    gulp.watch([config.source + 'fonts/**/*'], ['fonts']);
    gulp.watch([config.source + 'images/**/*'], ['images']);
    gulp.watch([config.source + 'images/**/*'], ['svg']);
    gulp.watch([config.source + 'config/**/*'], ['config']);
    gulp.watch([config.source + 'js/**/*'], ['js']);

    gulp.watch([
        'public/app/Resources/views/**/*',
        config.source + 'fonts/**/*',
        config.source + 'images/**/*',
        config.source + 'js/**/*'
    ]).on('change', plugins.livereload.changed);

});

gulp.task('build-dev', ['clean'], function () {
    runSequence(['sass', 'fonts', 'images', 'svg', 'config', 'js']);
});

// default task
gulp.task('default', ['watch']);

gulp.task('clean', function () {
    return del([config.dist], {dot: true});
});

// --- [BUILD TASKS] ---

// Make the CSS as small and optimized as possible:
gulp.task('build-css', function () {
    return gulp
        .src(sass.files, {base: config.source + 'scss/'})
        .pipe(plugins.sass({
            precision: 10,
            includePaths: [config.nodePath]
        }))
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.combineMq())
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(config.dist + 'css/'));
});

gulp.task('build-js', function(callback) {
    runSequence('modernizr', ['build-js:header', 'build-js:footer'], callback);
});

// copy required file to dest
gulp.task('build-js:header', function () {
    return gulp
        .src(js.header, {base: config.source + 'js/'})
        .pipe(plugins.concat('main-header-bundle.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.dist + 'js/'));

});

// copy required file to dest
gulp.task('build-js:footer', function () {

    return gulp
        .src(js.footer, {base: config.source + 'js/'})
        .pipe(plugins.concat('main-footer-bundle.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.dist + 'js/'));

});

// Setup the build:
gulp.task('build', ['clean'], function (cb) {
    runSequence('fonts', 'build-css', 'images', 'svg', 'config', 'build-js', cb);
});

// --- [GLOBAL TASKS] ---

// building customized Modernizr
gulp.task('modernizr', function () {

    return gulp
        .src([
            config.source + 'js/**/*.js'
        ])
        .pipe(plugins.modernizr({
            'options': [
                'setClasses',
                'mq'
            ],
            'tests': [
                'svg',
                'touchevents'
            ]
        }))
        .pipe(gulp.dest(config.dist + 'build/'));
});

// copy required fonts to dist
gulp.task('fonts', ['fonts_css'], function () {
    return gulp
        .src([
            // config.nodePath + 'bootstrap-sass/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
            // config.nodePath + 'lightgallery/dist/fonts/**/*.{eot,svg,ttf,woff,woff2}',
            // config.nodePath + 'slick-carousel/slick/fonts/**/*.{eot,svg,ttf,woff,woff2}',
            config.source + 'fonts/**/*.{eot,svg,ttf,woff,woff2}'
        ])
        .pipe(flatten())
        .pipe(gulp.dest(config.dist + 'fonts/'));

});
gulp.task('fonts_css', function () {
    return gulp.src(config.source + 'fonts/**/*.css')
        .pipe(concatCss('auto_fonts.css'))
        .pipe(replace(/url\(["'](?!http|\/).*?\/([^/]+?\..+?)['"]\)+/mg, function(match, p1) {
            return 'url("../fonts/' + p1 + '")';
        }))
        .pipe(gulp.dest(config.dist + 'css/'));
});
// copy required images to dist
gulp.task('images', function () {
    return gulp
        .src([
            config.source + 'images/**/*', '!' + config.source + 'images/**/*.svg'
        ])
        .pipe(gulp.dest(config.dist + 'images/'));
});

// copy optimized svg to dist
gulp.task('svg', function () {
    return gulp
        .src([
            config.source + 'images/**/*.svg'
        ])
        .pipe(svgMin({
            plugins: []
        }))
        .pipe(gulp.dest(config.dist + 'images/'));

});

// copy required config files to dist
gulp.task('config', function () {
    return gulp
        .src([
            config.source + 'config/**/*'
        ])
        .pipe(gulp.dest(config.dist + 'config/'));
});
