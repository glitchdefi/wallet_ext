var webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs-extra'),
  env = require('./utils/env'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/';

var alias = {
  'react-dom': '@hot-loader/react-dom',
  'utils/redux-injectors': path.join(
    __dirname,
    'src',
    'utils',
    'redux-injectors.ts'
  ),
  'utils/message': path.join(__dirname, 'src', 'utils', 'message.ts'),
  'utils/strings': path.join(__dirname, 'src', 'utils', 'strings.ts'),
  'utils/number': path.join(__dirname, 'src', 'utils', 'number.ts'),
  'theme/colors': path.join(__dirname, 'src', 'theme', 'colors.ts'),
  'constants/routes': path.join(__dirname, 'src', 'constants', 'routes.ts'),
  'app/layouts': path.join(__dirname, 'src', 'app', 'layouts', 'index.ts'),
  'locales/translations': path.join(
    __dirname,
    'src',
    'locales',
    'translations.ts'
  ),
  'app/components/Button': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Button',
    'index.tsx'
  ),
  'app/components/Text': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Text',
    'index.tsx'
  ),
  'app/components/Box': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Box',
    'index.ts'
  ),
  'app/components/Image': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Image',
    'index.tsx'
  ),
  'app/components/Svg': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Svg',
    'index.tsx'
  ),
  'app/components/Form': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Form',
    'index.tsx'
  ),
  'app/components/MessageBox': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'MessageBox',
    'index.tsx'
  ),
  'app/components/Footer': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Footer',
    'index.tsx'
  ),
  'app/components/StepProgressLayout': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'StepProgressLayout',
    'index.tsx'
  ),
  'app/components/Loading': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Loading',
    'index.tsx'
  ),
  'app/components/ScrollToTop': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'ScrollToTop',
    'index.tsx'
  ),
  'app/components/Modal': path.join(
    __dirname,
    'src',
    'app',
    'components',
    'Modal',
    'index.tsx'
  ),
  types: path.join(__dirname, 'src', 'types', 'index.ts'),
  'state/wallet/hooks': path.join(
    __dirname,
    'src',
    'state',
    'wallet',
    'hooks.ts'
  ),
  'state/application/hooks': path.join(
    __dirname,
    'src',
    'state',
    'application',
    'hooks.ts'
  ),
};

// load the secrets
var secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

var fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

var options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    popup: path.join(__dirname, 'src', 'index.tsx'),
    background: path.join(__dirname, 'src', 'scripts', 'background.ts'),
    contentScript: path.join(__dirname, 'src', 'scripts', 'content.ts'),
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['contentScript', 'devtools'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: false,
      util: false,
      http: false,
      https: false,
      os: false,
    },
  },
  plugins: [
    new NodePolyfillPlugin({
      excludeAliases: ['console'],
    }),
    new webpack.ProgressPlugin(),
    // clean the build folder
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: true,
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icon-128.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icon-34.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
