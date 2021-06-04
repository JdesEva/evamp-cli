# evamp-cli gulp 小程序 CLI

> 基于 gulp 的小程序工作流 CLI

## 功能

- 开发模式热更新 scss 自动转 wxss
- 生产环境构建代码压缩删除注释

## 目录结构

```
.
├── build        项目配置文件
├── cli          CLI文件
├── src          开发模式小程序目录
├── tests        自动化测试目录
├── node_modules node依赖包
├── dist         生产环境小程序目录
├── package.json 项目配置
├── gulpfile.js  gulp配置文件
└── nodemon.json nodemon配置文件
```

> !
> 注意 不要将 package.json 包安装在小程序目录！这样做是保证根目录一个 node_modules 可以被所有项目引用，节约空间。

## 小程序 npm 插件额外配置

> !
> 由于小程序的插件包必须依赖 package.json，并且 node_modules 必须和 package.json 同目录，因此我们需要配置小程序的 project.config.json 文件。
> 额外配置如下

```json
{
  "setting": {
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "../package.json",
        "miniprogramNpmDistDir": "./"
      }
    ]
  }
}
```

> !
> 以上配置的目的是为了开发、生产模式小程序都可以直接依赖根目录的 node_modules，同时小程序目录中不会出现额外的文件、文件夹，代码上传也无需做额外操作。

## 安装

```shell
npm i evamp-cli -g # 全局安装 CLI

evamp new project # 创建项目
```

## 使用

- 开发模式

> !
> 在开发模式下，请使用小程序开发工具打开 src 目录，此时，src 目录为小程序开发模式根目录。然后命令行执行 `npm run dev` 命令，此时，会动态监听项目中 `.scss`文件的变化，动态编译成 `.wxss`，并放在原来的目录。**注意**，千万不要去监听 `.wxss` 的变化，因为这样会触发 `nodemon` 死循环。因此，目前还不能处理 `.wxss` 的变化。

- 生产模式

> !
> 命令行执行 `npm run build` 。会自动打包到 `dist` 下，并且做代码压缩去注释。

## 插件构建

> !
> 在对应的小程序目录下，使用小程序开发工具直接构建 npm 即可。（请务必配置了 project.config.json 。并且保证已经在根目录执行了安装操作）

## 开发工具

> !
> 为了方便代码提示等，开发工具仍然使用微信小程序开发工具，只需要额外运行一个命令行做处理 `.scss` 的操作，其他均不变。
