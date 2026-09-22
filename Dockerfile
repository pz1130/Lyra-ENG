# ==========================================
# 第一阶段：构建阶段 (Build Stage)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# 优先拷贝依赖定义以利用 Docker 缓存层
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝源代码并执行生产环境编译打包
COPY . .
RUN npm run build

# ==========================================
# 第二阶段：生产运行阶段 (Nginx Production Stage)
# ==========================================
FROM nginx:alpine

# 拷贝构建产物到 Nginx 静态服务目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 替换默认 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 清理默认 entrypoint 脚本，彻底杜绝任何自检卡顿与异常退出
RUN rm -rf /docker-entrypoint.d /docker-entrypoint.sh

# 80：本地 Docker；7860：Hugging Face Spaces
EXPOSE 80 7860

# 纯净直接启动 Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
