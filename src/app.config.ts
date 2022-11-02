export default defineAppConfig({
  entryPagePath: 'pages/verify/login/index',
  pages: [
    'pages/verify/login/index',
    'pages/verify/register/index'
  ],
  subPackages: [
    {
      root: 'composite',
      pages: [
        'pages/index/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Composite Manage',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  }
})
