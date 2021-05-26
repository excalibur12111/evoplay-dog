const {src, dest, watch, series} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html(){
    return src('src/**.html')
        .pipe(dest('dist'))
}

function js(){
    return src('src/js/**.js')
        .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

function clear(){
    return del('dist')
}
function img(){
    return src('src/img/**')
        .pipe(dest('dist/img'))
}

function serve() {
    sync.init({
        server: './dist'
    })
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/js/**.js', series(js)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/img/**', series(img)).on('change', sync.reload)
}


exports.build = series(clear, js, scss, html)
exports.serve = series(clear, js, scss, html, img, serve)
exports.clear = clear