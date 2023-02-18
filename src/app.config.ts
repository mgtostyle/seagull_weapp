export default defineAppConfig({
  entryPagePath: 'pages/index/index',
  pages: [
    'pages/index/index',
    'pages/scane/index'
  ],
  subPackages: [
    {
      root: 'authorize',
      pages: [
        'pages/login/index'
      ]
    },
    {
      root: 'warehouse',
      pages: [
        'pages/entryManage/list',
        'pages/entryManage/update',
        'pages/putoutManage/list',
        'pages/putoutManage/update'
      ]
    },
    {
      root: 'product',
      pages: [
        'pages/goodsManage/list'
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
