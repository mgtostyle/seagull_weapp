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
        'pages/index/index',
        'pages/miniApp/update'
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
