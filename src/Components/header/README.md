# 社交分享模块

社交分享存在分享页和到达页，由于客户端的能力和微信的开放能力，存在着多种分享关系 <a href="https://h5.133.cn/webapp/test/home">demo</a>。

| <div align="center">app 分享小程序</div>                      | <div align="center">app 分享 h5 链接</div>                    | <div align="center">微信分享 h5 链接</div>                   | <div align="center">小程序分享到小程序</div>                    |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| <img src="./images/appweixin.jpg" width="200px" alt="male" /> | <img src="./images/appweixin.jpg" width="200px" alt="male" /> | <img src="./images/weixinh5.jpg" width="200px" alt="male" /> | <img src="./images/xiaochengxu.jpg" width="200px" alt="male" /> |

## 参数说明

| 参数                                   | 必选  | 值             | 应用场景      | 说明                                                                 |
| -------------------------------------- | ----- | -------------- | ------------- | -------------------------------------------------------------------- |
| v-model:show                           | true  | boolean        | APP,H5,小程序 | 控制弹框的显示与隐藏                                                 |
| <a href="#options">options</a>         | false | array          | APP           | 配置的分享到哪些应用的配置                                           |
| <a href="#sharedata">shareData</a>     | true  | object         | APP,H5,小程序 | 分享的参数信息                                                       |
| <a href="#operations">operations</a>   | true  | array          | 小程序        | 分享朋友圈时携带的设置二维码的大小以及位置                           |
| <a href="#canvasdata">canvasData</a>   | true  | object         | 小程序        | 分享朋友圈时携带的分享参数主要为场景参数                             |
| shareHash                              | true  | boolean        | 小程序        | 分享小程序时是否监听分享成功                                         |
| shareType                              | false | 'weixin'、'h5' | APP           | 客户端分享时用于区分是分享 h5 链接还是分享小程序默认分享成微信小程序 |
| <a href="#getXcxCode">getXcxCode</a>   | false | Function       | App           | 生成小程序码                                                         |
| <a href="#getShareImg">getShareImg</a> | false | Function       | App           | 生成小程序分享图片贴图                                               |

- <h4 id=options>options</h4>

| 参数 | 必选 | 说明         |
| :--- | :--- | :----------- |
| name | true | 名称（唯一） |
| icon | true | 对应的图标   |
| text | true | 文字描述     |

```js
////案例
;[
  { name: 'weixin', icon: 'weixin', text: '微信好友' },
  { name: 'timeline', icon: 'timeline', text: '朋友圈' },
]
```

- <h4 id=sharedata>shareData</h4>

| 参数     | 必选 | 应用场景      | 说明                                                                                 | 案例                                                                      |
| :------- | :--- | :------------ | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| link     | true | APP,H5        | h5 跳转 url                                                                          | https://wtest.133.cn/webapp/test/home                                     |
| title    | true | APP,H5,小程序 | 分享标题 （14 字以内，建议使用朋友般亲切的口吻）                                     | '国庆出行 1 元购！'                                                       |
| desc     | true | H5            | 分享标题 (只针对分享成 h5，20 字以内，对标题的简要解读。)                            | '这里是活动描述~'                                                         |
| path     | true | 小程序        | 小程序分享链接                                                                       | 'projects/home/main?p=2021test'                                           |
| imgUrl   | true | 小程序        | 小程序分享好友图片 尺寸（648\*519） （宽高比例必须是 5:4，大小最好不要超过 32kb）    | 'https://cdn.133.cn/ticket/vue/promotion/2021nationalday/haoyou.jpg'      |
| shareBg  | true | 小程序        | 小程序分享朋友圈图片 (大小最好不要超过 10M)                                          | 'https://cdn.133.cn/ticket/vue/promotion/2021nationalday/pengyouquan.png' |
| xcxAppId | true | APP,小程序    | 小程序 AppID                                                                         | 'gh_4ec8fccb7b51'                                                         |
| icon     | true | H5            | h5 分享图标 （尺寸 120\*120，大小不超过 10K，不支持 GIF 格式。必须采用 https 协议 ） | 'https://cdn.rsscc.cn/ticket/images/hbgj_travel_icon_tejiajipiao.jpg'     |

```js
  {
      link:'https://wtest.133.cn/webapp/test/home', ///分享h5以及公众号分享的链接地址
      title: '国庆出行1元购！', ////分享标题
      path: 'projects/home/main?p=2021test', ////小程序的跳转路径
      imgUrl:
        'https://cdn.133.cn/ticket/vue/promotion/2021nationalday/haoyou.jpg', // 小程序背景图
      icon:
        'https://cdn.rsscc.cn/ticket/images/hbgj_travel_icon_tejiajipiao.jpg', ///（尺寸120*120，大小不超过10K，不支持GIF格式。必须采用https协议 ）
      xcxAppId: 'gh_4ec8fccb7b51', ////公众号的标识符
      shareBg: `https://cdn.133.cn/ticket/vue/promotion/2021nationalday/pengyouquan.png`, // 朋友圈背景图pengyouquan
    }
```

- <h4 id=operations>operations</h4>

| 参数   | 必选 | 说明       |
| :----- | :--- | :--------- |
| x      | true | x 轴的坐标 |
| y      | true | y 轴的坐标 |
| width  | true | 宽度       |
| height | true | 高度       |

```js
;[
  {
    x: 270, // 贴图位置
    y: 573,
    width: 180,
    height: 180,
  },
]
```

- <h4 id=canvasdata>canvasData</h4>

| 参数     | 必选 | 说明     | 值                                    |
| :------- | :--- | :------- | :------------------------------------ |
| codeData | true | 场景参数 | {scene: '?p=2021test',codeWidth: 125} |

```js
  {
    codeData: {
      scene: '?p=2021test',///场景参数用来做路由跳转的,（最大32个可见字符）
      codeWidth: 125, // 默认值，不用理会含义
    },
  }
```

- <h4 id=getXcxCode>getXcxCode</h4>

```js
// 生成小程序码
export function getXcxCode(opts: any) {
  return request.gateway({
    auth: 'no',
    url: '/gateway/api/user',
    method: 'GET',
    sidFields: ['uid', 'pid'],
    data: {
      pid: 102002,
      wxclient: opts.wxclient,
      scene: opts.scene,
      page: opts.page,
      width: opts.width,
      autoColor: opts.autoColor,
      lineColor: opts.lineColor,
      isHyaline: opts.isHyaline,
    },
  })
}
```

- <h4 id=getShareImg>getShareImg</h4>

```js
// 生成小程序分享图片贴图
export function getShareImg(opts: any) {
  opts = Object.assign({ pid: 331201 }, opts)
  return request.gateway({
    auth: 'no',
    url: '/gateway/gtgj/qp',
    method: 'GET',
    sidFields: ['uid', 'pid'],
    data: opts,
  })
}
```

## Events

| 事件名                 | 说明           | 返回参数  |
| :--------------------- | :------------- | :-------- |
| cancel                 | 取消           | 无        |
| share-wechat-success   | 分享好友成功   | shareData |
| share-timeline-success | 分享朋友圈成功 | shareData |
| update:show            | 关闭弹框       | 无        |

## 客户端内

<div id=appshareh5>1. app => H5(消息, 朋友圈)</div>
<div>
  <img src="./images/appweixin.jpg" width="200px" alt="male" />
  <img src="./images/shareh5.jpg" width="200px" alt="male" />
</div>

```js
////分享携带的基础信息
let shareData = {
  link: 'https://wtest.133.cn/webapp/test/home', ///h5跳转url
  title: '国庆出行1元购！', ////分享标题
  desc: '活动描述', ///描述
  icon: 'https://cdn.rsscc.cn/ticket/images/hbgj_travel_icon_tejiajipiao.jpg', ///（尺寸120*120，大小不超过10K，不支持GIF格式。必须采用https协议 ）
}
let shareType = 'h5'
```

<div id="appsharexiaochengxu">2. app => 小程序</div>
<div>
  <img src="./images/appweixin.jpg" width="200px" alt="male" />
  <img src="./images/sharexiaochengxu.jpg" width="200px" alt="male" />
</div>

```js
////分享携带的基础信息
let shareData = {
  title: '国庆出行1元购！', ////分享标题
  path: 'projects/home/main?p=2021test', ////小程序的跳转路径
  imgUrl: 'https://cdn.133.cn/ticket/vue/promotion/2021nationalday/haoyou.jpg', // 小程序背景图
  xcxAppId: 'gh_4ec8fccb7b51', ////公众号的标识符
  shareBg: `https://cdn.133.cn/ticket/vue/promotion/2021nationalday/pengyouquan.png`, // 朋友圈背景图
}
////分享成小程序
let shareType = 'weixin'
///二维码的大小以及位置
let operations = [
  {
    x: 270, // 贴图位置
    y: 573,
    width: 180,
    height: 180,
  },
]
///分享到朋友圈时
let canvasData = {
  codeData: {
    scene: '?p=2021test',
    codeWidth: 125, // 默认值，不用理会含义
  },
}
///分享成功之后知否调用回调函数
let shareHash = true
```

## 微信内 H5

<div id=weixinshareh5>1. H5 => H5</div>
<div>
  <img src="./images/weixinh5.jpg" width="200px" alt="male" />
  <img src="./images/shareh5.jpg" width="200px" alt="male" />
</div>

```js
let shareH5Data = {
  link: 'https://wtest.133.cn/webapp/test/home', ///分享h5以及公众号分享的链接地址
  title: '国庆出行1元购！', ////分享标题
  desc: '活动描述',
  icon: 'https://cdn.rsscc.cn/ticket/images/hbgj_travel_icon_tejiajipiao.jpg', ///（尺寸120*120，大小不超过10K，不支持GIF格式。必须采用https协议 ）
}
```

## 小程序内

<div id=xiaochengxusharexiaochengxu>1. 小程序 => 小程序</div>
<div>
  <img src="./images/xiaochengxu.jpg" width="200px" alt="male" />
   <img src="./images/sharexiaochengxu.jpg" width="200px" alt="male" />
</div>

```js
////需要在小程序配置
stats.minpgmSource = '2021test'
this.$router.push({
  path: '/pages/web-view/index',
  query: {
    url: 'https://wtest.133.cn/webapp/test/home',
  },
})
```
