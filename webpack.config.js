module.exports = {
    entry: {
        test: './test'
    },
    output: {
        filename: 'build/[name].js'
    },
    //devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
            'sinon': 'sinon/pkg/sinon'
        }
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /sinon/, loader: "imports?define=>false,require=>false" },
            { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ },
            { test: /\.ts$/, loader: "tslint-loader" }
        ]
    }
};
