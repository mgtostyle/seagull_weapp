export default defineAppConfig({
  entryPagePath: 'authorize/pages/login/index',
  pages: [
    'pages/index/index'
  ],
  subPackages: [
    {
      root: 'authorize',
      pages: [
        'pages/login/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
    backgroundColor: '#f4f4f4'
  }
})
