import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackModifyAssetSourcePlugin from './src/webpack-modify-asset-source-plugin';

module.exports = {
  mode: 'development',
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new WebpackModifyAssetSourcePlugin({
      enable: true,
      assetName: 'bundle.js',
      modify: (code: string) => {
        return code.replace('$$placeholder$$', 'Hello webpack plugin')
      }
    })
  ]
}
