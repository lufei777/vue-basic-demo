#### 为了方便大家共同协作，共同规范项目，项目可以有一个长期良好的发展，不至于后期难以维护。所以在此声明一份文档来说明项目架构
***
文件目录
---
```bash
├── build                                       // webpack配置文件
|   ├── build.js
|   ├── check-versions.js
|   ├── utils.js
|   ├── vue-loader.conf.js                      // vue-loader，用于vue文件分割.vue文件的html，css，js结构
|   ├── webpack.base.conf.js                    // 主要配置使用的各种loader
|   ├── webpack.dev.conf.js                     // 配置devtool，devServer，hot，plugins等
|   └── webpack.prod.conf.js                    // 此处为开发者配置，构建时使用此配置
├── config                                      // 项目打包路径，主要为index.js，配置资源路径等
|   ├── dev.env.js                              // 开发环境变量
|   ├── index.js                                // 项目一些配置变量
|   └── prod.env.js                             // 生产环境变量
├── dist                                        // 构建完成的项目，目录可在@/config/index.js/build中修改
├── node_modules                                // npm 加载的项目依赖模块
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── util                                    // 公共抽取封装的js方法
|   ├── less                                    //公共less
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   ├── footer                              // 底部公共组件
│   │   └── header                              // 头部公共组件
│   ├── pages                                   // 页面存放目录
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   ├── router2                             // 路由配置
│   │   └── router1                             // 路由配置
│   ├── static                                  // 静态资源目录，如图片、字体等
│   │   ├── lib                                 // 引用外部静态库
│   │   ├── image                               // 图片
│   │   └── fonts                               // 字体
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── tempdata                            // 开发阶段的临时数据
│   ├── vuex                                    // vuex的状态管理
│   │   ├── modules                             // vuex的分组模块
│   │   └── store.js                            // 配置mutations
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── routes.js                                   // 路由入口文件
├── .babelrc                                    // babel配置文件
├── .postcssrc.js                               // postcss-load-config配置文件，配置自动添加样式前缀等
├── favicon.ico                                 // 图标
├── index.html                                  // 首页入口文件，你可以添加一些 meta 信息或统计代码等
├── package.json                                // 项目配置文件
└── README.md                                   // 项目的说明文档，markdown 格式
 
```