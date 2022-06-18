
# 部署

* 考虑到主应用和子应用共用域名时可能会存在路由冲突的问题，子应用可能会源源不断地添加进来，因此我们将子应用都放在xx.com/subapp/这个二级目录下，根路径/留给主应用。

## 步骤如下

* 1. 主应用main和所有子应用都打包出一份html,css,js,static，分目录上传到服务器，子应用统一放到subapp目录下，最终如：

`javasript <br />
├── main <br />
│   └── index.html <br />
└── subapp <br />
    ├── sub-react <br />
    │   └── index.html <br />
    └── sub-vue <br />
        └── index.html <br />

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

### NGINX 配置

`javascript
    # localhost 改为ip地址

server {
    listen      80;
    server_name localhost;
    #location / {
    #    root   html;
    #    index  index.html index.htm;
    #}

    # 80端口映射到8088端口
    location / {
        proxy_pass http://localhost:8088;
    }
}

server {
    listen       8088;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        root   html/www/main;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location ^~/subapp {
        alias html/www/subapp/;
        try_files $uri $uri/ /index.html;
    }

    # 配置跨域
    #允许跨域请求的域，* 代表所有
    add_header 'Access-Control-Allow-Origin' *;
    #允许带上cookie请求
    add_header 'Access-Control-Allow-Credentials' 'true';
    #允许请求的方法，比如 GET/POST/PUT/DELETE
    add_header 'Access-Control-Allow-Methods' *;
    #允许请求的header
    add_header 'Access-Control-Allow-Headers' *;
}
`
