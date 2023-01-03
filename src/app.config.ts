export default defineAppConfig({
  entryPagePath: 'pages/verify/login/index',
  pages: [
    'pages/verify/login/index',
    'pages/verify/register/index',
    'pages/binds/index/index'
  ],
  subPackages: [
    {
      root: 'composite',
      pages: [
        'pages/index/index',
        'pages/miniApp/update',
        'pages/miniApp/detail',
        'pages/miniApp/adminAdds',
        'pages/accounts/detail',
        'pages/accounts/apply'
      ]
    },
    {
      root: 'wfood',
      pages: [
        'pages/index/index',
        'pages/navigateMent/index',
        'pages/navigateMent/update',
        'pages/gallery/index',
        'pages/catesMent/list',
        'pages/catesMent/update',
        'pages/goodsMent/list',
        'pages/goodsMent/publish',
        'pages/goodsMent/update'
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
