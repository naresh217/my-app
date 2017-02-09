/**
 * Created by Naresh Chakilam on 2/9/17.
 */

"use strict";

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
    filename: "master.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    //  entry: require.resolve("../scss/language.scss"),
    entry: path.resolve(__dirname, "./scss/master.scss"),
    output: {
        path: path.resolve(__dirname, "./output"),
        filename: "bundle.extractText.js"
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: [
                            path.resolve(__dirname, "./scss/master.scss")
                        ]
                    }
                }],
                fallbackLoader: "style-loader"
            })
        },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },
    plugins: [
        extractSass
    ],
    devServer:{
        port:"8085"
    }
};