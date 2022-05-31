
# 部署

* 考虑到主应用和子应用共用域名时可能会存在路由冲突的问题，子应用可能会源源不断地添加进来，因此我们将子应用都放在xx.com/subapp/这个二级目录下，根路径/留给主应用。

## 步骤如下

* 1. 主应用main和所有子应用都打包出一份html,css,js,static，分目录上传到服务器，子应用统一放到subapp目录下，最终如：

`javasript
├── main
│   └── index.html
└── subapp
    ├── sub-react
    │   └── index.html
    └── sub-vue
        └── index.html

`

* 2. 配置nginx，预期是xx.com根路径指向主应用，xx.com/subapp指向子应用,子应用的配置只需写一份，以后新增子应用也不需要改nginx配置，以下应该是微应用部署的最简洁的一份nginx配置了

`javascript
server {
    listen       80;
    server_name qiankun.fengxianqi.com;
    location / {
      root   /data/web/qiankun/main;  # 主应用所在的目录
      index index.html;
      try_files $uri $uri/ /index.html;
    }
    location /subapp {
      alias /data/web/qiankun/subapp;
      try_files $uri $uri/ /index.html;
    }

}
`

* nginx -s reload后就可以了
