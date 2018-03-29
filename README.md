# learn webpack

> Learn how to use webpack latest version

### 学习资料
#### 主要资料

- [掘金小册：使用 webpack 定制前端开发环境](https://juejin.im/book/5a6abad5518825733c144469)
- [Webpack 4 Tutorial: from 0 Conf to Production Mode](https://www.valentinog.com/blog/webpack-4-tutorial/)
- [Webpack 4 中文文档](https://doc.webpack-china.org)
- vue-cli 项目 build 目录
#### 辅助资料

- [Webpack 删除重复文件的一种优化思路](https://segmentfault.com/a/1190000012330683)

### 实现功能

- 构建我们发布需要的 HTML、CSS、JS 文件
- 使用 CSS 预处理器来编写样式
- 处理和压缩图片
- 使用 Babel 来支持 ES 新特性
- 本地提供静态服务以方便开发调试

### 注意事项

1. 在 `rule` 中书写配置的时候 `/.../` 之间的内容不能加 `"..."`
2. ~~使用 `MiniCssExtractPlugin` 代替教程中的 `ExtractTextWebpackPlugin`~~
3. MiniCssExtractPlugin 只支持 css，换回来
4. 配置 `less loader` 的时候，需要安装 `less` 模块、`less loader` 模块以及 `css loader` 和 `style loader`，而且解析的时候，`css loader` 应在 `less loader`  之前
5. loader 执行顺序：**前置 -> 行内 -> 普通 -> 后置**
6. 使用 `CleanWebpackPlugin` 清理打包文件，这个插件是在 compile 阶段进行 dist 文件的删除，还有优化的余地


### 打包优化

- 使用 `webpack.IgnorePlugin` 优化 `moment` 插件的打包

文件名    |使用前 | 使用后
---------|------|------
bundle.js|222KiB|51.3KiB

- 拆分配置文件