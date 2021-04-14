# vue-mpa

## Project setup

```bash
npm install
```

### 本地开发

```bash
# 默认只编译 index 和 login 模块
npm run serve

# 编译全部模块
npm run serve:all
```

启动服务后，需手动输入正确的页面地址，比如启动 8080 端口，打开 index 页面，需在浏览器输入：  
<http://localhost:8080/index/index.html>

### 打包

```bash
# 默认打包全部模块

# 测试环境
npm run build:test

# 生产环境
npm run build:prod

# 只打包某一个模块可以在打包命令后加模块名，比如只打包生产环境的 index
npm run build:prod index
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
