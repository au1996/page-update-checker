# PageUpdateChecker

一个页面更新检测器

## 模块化使用

```js
import PageUpdateChecker from 'page-update-checker'

const pageUpdateChecker = new PageUpdateChecker()
pageUpdateChecker.init({
  duration: 1000 * 6, // 检测间隔时间: 6秒
  path: location.origin, // 页面路径
})
```

## init 参数

```js
/**
 * 页面更新检测器
 * @param {Object} option
 * @param {Number} option.duration 检测间隔时间（毫秒）：默认 10秒
 * @param {String} option.path 要检测的页面路径：默认 /
 * @param {RegExp} option.scriptReg script标签正则：默认 /<script.*src="([^"]+)"/gm
 * @param {Boolean} option.test 是否开启测试模式，true会每隔duration秒调用函数 on 一次：默认 false
 * @param {Function} option.on 页面更新时的回调：默认调用 window.confirm('页面已更新，是否刷新？')
 */
```

## html 使用示例

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <script src="https://unpkg.com/page-update-checker@0.0.3/dist/page-update-checker.umd.js"></script>
    <script>
      const pageUpdateChecker = new PageUpdateChecker()
      pageUpdateChecker.init({
        duration: 1000 * 2, // 2秒
        path: `${location.origin}${location.pathname}`, // 要检测的页面路径
        test: true, // 开启测试模式 会每隔duration秒调用函数 on 一次
        on: () => {
          console.log('页面有更新')
        }, // 页面更新时的回调
      })
    </script>
  </body>
</html>
```
