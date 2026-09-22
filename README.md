---
title: Lyra-Reader
emoji: 🐰
colorFrom: pink
colorTo: yellow
sdk: static
app_file: index.html
pinned: false
fullWidth: true
short_description: Kids RSVP speed reader with themes and word libraries
tags:
  - rsvp
  - reading
  - education
  - kids
  - react
---

# 萌萌速读 (Lyra Reader) 🐰✨
### 专为儿童与青少儿设计的本地版 RSVP 视觉速读与词库进阶工具

**在线演示**：[Hugging Face Space · Lyra-Reader](https://huggingface.co/spaces/pz1130/Lyra-Reader)

基于 [AccelaReader](https://accelareader.com/) 核心 RSVP（Rapid Serial Visual Presentation）视觉速读原理研发，融入儿童认知心理学、动态伴读吉祥物、可爱萌系换肤与全本地离线词库导入功能。

---

## 🌟 核心特色

### 1. 科学儿童 RSVP 视线定焦引擎
- **ORP（Optimal Recognition Point）精确对齐**：每个单词的视线识别锚点字母以亮色居中高亮，孩子无需频繁左右扫视移动眼球，保护视力并大幅提升辨识速度。
- **智能标点停顿韵律**：遇逗号、句号、问号、叹号时自动增加停顿时间（1.5x ~ 2.5x），贴合自然阅读呼吸节奏。
- **阶梯式调速（50 ~ 400 WPM）**：预设龟龟速（60）、兔兔速（90）、小鹿速（120 推荐）、猎豹速（180）、火箭速（250），支持滑块无级调节。
- **真人语音发音 (TTS)**：内置 Web Speech 引擎，支持英式/美式自然发音，可开启暂停自动发音或连续逐词发音。

### 2. 六套治愈系可爱皮肤 & 伴读萌宠
- 🍬 **糖果乐园 (Candy Kingdom)**：草莓马卡龙甜美粉，伴读萌宠：**萌萌兔 (Pip)**。
- 🌟 **萤火花园 (Glow Garden)**：蜂蜜暖光配嫩叶绿，伴读萌宠：**萤萤 (Lumi)**。
- 🐯 **橙虎运动会 (Sunny Meet)**：暖阳橙配运动会活力，伴读萌宠：**橙橙虎 (Tango)**。
- 🌲 **森林探险 (Forest Friends)**：抹茶治愈原木绿，伴读萌宠：**布布熊 (Barnaby)**。
- 🚀 **星际漫游 (Cosmic Space)**：浩瀚静谧太空深蓝，伴读萌宠：**星际猫 (Astro Nova)**。
- 🌊 **深海奇遇 (Ocean Splash)**：清爽海浪珊瑚青，伴读萌宠：**波波豚 (Bubbles)**。
- 每一个萌宠在阅读时都会专注伴读，轻戳还有俏皮互动音效与动画！

### 3. 全能词库管理与自定义导入
- **开箱即用高频库**：
  - Dolch 幼小衔接高频词 (Pre-Primer 40词)
  - 剑桥少儿英语入门：奇趣动物世界
  - 经典双语寓言绘本：《龟兔赛跑 (The Hare and the Tortoise)》
  - 小学低段进阶高频词 (Grade 1-2)
- **多维度自定义导入**：
  - **绘本/故事粘贴**：直接复制粘贴任何童话故事段落，系统智能拆解分词并保留标点韵律。
  - **文件批量导入**：支持上传 `.txt`、`.csv`、`.json` 文件。
  - **中英对照支持**：支持 `word, 释义, 音标` 格式解析。
  - **离线安全持久化**：所有导入数据纯本地 LocalStorage 存储，保护隐私，断网可用，并支持一键导出备份。

---

## 📱 在 iPhone 和 iPad 上安装与使用指南

本项目为全功能 **Progressive Web App (PWA)**，适配 iOS/iPadOS 触控手势与视网膜高分屏，无需经过繁琐的 App Store 审核与证书签名即可成为独立全屏应用：

### 极速上手：
1. **电脑启动服务（局域网共享）**：
   ```bash
   npm run dev -- --host
   ```
   终端会输出形如 `http://192.168.x.x:5173` 的局域网地址。

2. **在 iPhone / iPad 上打开**：
   - 确保 iPhone/iPad 与电脑连接在同一个 Wi-Fi。
   - 打开自带的 **Safari 浏览器**，输入上述局域网地址访问。

3. **一键添加到主屏幕 (变为原生 App 体验)**：
   - 点击 Safari 底部的 **「分享」按钮**（📤 向上箭头的方框图标，iPad 在右上角）。
   - 在弹出的菜单中下滑，点击 **「添加到主屏幕」(Add to Home Screen)**。
   - 点击右上角「添加」。
   - 回到手机或平板桌面，点击 **「萌萌速读」** 图标，即可享受**无浏览器地址栏、全屏沉浸、离线可用**的 App 体验！

---

## 💻 本地运行与打包指令

```bash
# 安装依赖
npm install

# 启动本地开发热更新服务（带局域网监听）
npm run dev -- --host

# 编译打包生产版本
npm run build

# 本地预览编译后的静态资源
npm run preview
```

---

## 🛠️ 技术选型
- **前端框架**：React 19 + TypeScript + Vite 6
- **样式与排版**：Tailwind CSS + Lexend / Comic 专用少儿视读字体
- **动效与交互**：Lucide Icons + canvas-confetti (通关五彩礼花)
- **纯本地音效**：Web Audio API 自研合成音效（零外部音频加载延迟）
- **发音朗读**：原生 Web Speech API

---

## 📄 开源协议

本项目代码与原创伴读形象以 [MIT License](LICENSE) 开源。
