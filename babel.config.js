module.exports = {
  'presets': ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
  'plugins': [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    [
      'babel-plugin-root-import',{
        rootPathSuffix: './src',
        rootPathPrefix: '@/'
      }
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanQRCodes','__scanOCR','__scanCodes']
      }
    ]
  ]
}
