const { override, addLessLoader } = require('customize-cra')

// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@body-background': '#26264D', // Background color for `<body>`
      '@primary-color': '#fff', // 全局主色
      '@link-color': '#7064F0', // 链接色
      '@success-color': '#52c41a', // 成功色
      '@warning-color': '#faad14', // 警告色
      '@error-color': '#f5222d', // 错误色
      '@font-size-base': '14px', // 主字号
      '@heading-color': '#fff', // 标题色
      '@text-color': '#CACAEC', // 主文本色
      '@text-color-secondary': '#8080A9', // 次文本色
      '@disabled-color': '#63638E', // 失效色
      '@border-radius-base': '4px', // 组件/浮层圆角
      '@border-color-base': '#CACAEC', // 边框色
      '@box-shadow-base': '0 2px 8px rgba(55, 57, 118, 0.8)', // 浮层阴影
      '@btn-primary-bg': '#7064F0'
    }
  })
)
