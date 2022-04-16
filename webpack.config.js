const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  let isProduction
  if (env.production === true) {
    isProduction = true
  } else if (env.production === undefined) isProduction = false

  return {
    entry: ['./src/app.js'],
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    mode: isProduction ? 'production' : 'development',

    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/, // Check all extension, when run babel
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
    },
  }
}
