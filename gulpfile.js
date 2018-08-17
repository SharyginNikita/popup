const gulp = require('gulp');
const webpack = require('webpack-stream');
const named = require('vinyl-named');

gulp.task('build-prod', done => {
    gulp.src('./src/js/*.js')
        .pipe(named())
        .pipe(webpack({
            mode: "production",
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    },
                    {
                        test: /\.(svg|png|jpg|gif)$/i,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192
                                }
                            }
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            "style-loader", // creates style nodes from JS strings
                            "css-loader", // translates CSS into CommonJS
                            "sass-loader" // compiles Sass to CSS, using Node Sass by default
                        ]
                    }
                ]
            },
            output: {
                library: 'popup',
                libraryTarget: 'umd',
            },
        }))
        .pipe(gulp.dest('./dest'))

    done();
});

gulp.task('build', done => {
    gulp.src('./src/js/*.js')
        .pipe(named())
        .pipe(webpack({
            mode: "development",
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    },
                    {
                        test: /\.(svg|png|jpg|gif)$/i,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192
                                }
                            }
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            "style-loader", // creates style nodes from JS strings
                            "css-loader", // translates CSS into CommonJS
                            "sass-loader" // compiles Sass to CSS, using Node Sass by default
                        ]
                    }
                ]
            },
            output: {
                library: 'popup',
                libraryTarget: 'umd',
            },
        }))
        .pipe(gulp.dest('./dest'))

    done();
});

gulp.task('default', gulp.series('build'));
