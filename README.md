# Lodestone | Hearthstone toolbox

[![Netlify Status](https://api.netlify.com/api/v1/badges/b9df4c78-4791-48a1-bf35-6d389a1d0ef4/deploy-status)](https://app.netlify.com/sites/lodestone/deploys)

## Features

### Arena

Hearthstone arena cards compare helper. Data from [Lightforge](http://thelightforge.com/TierList), [Heartharena](https://www.heartharena.com/) and [旅法师营地](https://www.iyingdi.com/web/tools/hearthstone/arenaScore).

![lodestone](https://user-images.githubusercontent.com/12998118/46520549-fed47000-c8ae-11e8-9595-c1570d2eaed2.gif)

### Secrets

## Troubleshooting

### Custom Antd theme

使用 `react-scripts-rewired` 和 `customize-cra` 来自定义 `create-react-app` 的 webpack 配置，避免 eject。

`less-loader` 只能使用 5.0.0 的版本，使用最新的 6.x 的版本会报错：

```
Failed to compile.

./node_modules/antd/dist/antd.dark.less (./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/dist/antd.dark.less)
ValidationError: Invalid options object. Less Loader has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'source'. These properties are valid:
   object { lessOptions?, prependData?, appendData?, sourceMap?, implementation? }
```

## Thanks

- [HearthSim/hs-icons](https://github.com/HearthSim/hs-icons)
