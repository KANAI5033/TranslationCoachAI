# Vercel环境变量配置指南

## 为什么不需要上传.env.local文件？

### 安全原则
- **API密钥是敏感信息**，不应该公开在GitHub上
- **.env.local文件只在本地使用**，用于开发环境
- **生产环境使用Vercel控制台配置**，更安全

### 环境变量工作原理
```
开发环境（本地） → .env.local文件 → process.env.OPENROUTER_API_KEY
生产环境（Vercel） → Vercel控制台 → process.env.OPENROUTER_API_KEY
```

## 如何在Vercel中配置环境变量

### 第一步：获取OpenRouter API密钥
1. 访问：https://openrouter.ai/keys
2. 注册/登录账号
3. 创建新的API密钥
4. 复制你的API密钥

### 第二步：在Vercel控制台配置

#### 方法A：通过网页界面
1. **访问Vercel项目**：
   https://vercel.com/KANAI5033/TranslationCoachAI

2. **进入设置**：
   - 点击项目名称
   - 点击"Settings"（设置）
   - 点击"Environment Variables"（环境变量）

3. **添加环境变量**：
   ```
   变量名: OPENROUTER_API_KEY
   变量值: 你的OpenRouter API密钥
   环境: Production (生产环境)
   ```

4. **添加其他变量**（可选）：
   ```
   变量名: NEXT_PUBLIC_APP_NAME
   变量值: Translation Coach AI
   环境: Production
   ```

   ```
   变量名: NEXT_PUBLIC_APP_DESCRIPTION
   变量值: AI-powered translation learning platform
   环境: Production
   ```

#### 方法B：通过Vercel CLI（命令行）
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 链接项目
vercel link

# 添加环境变量
vercel env add OPENROUTER_API_KEY production
# 然后输入你的API密钥
```

### 第三步：触发重新部署
配置完成后：
1. Vercel会自动检测到环境变量变化
2. 开始重新部署
3. 部署完成后，AI功能就能正常工作了

## 验证配置是否成功

### 1. 检查Vercel部署日志
1. 访问：https://vercel.com/KANAI5033/TranslationCoachAI
2. 点击最新的部署
3. 查看"Build Logs"（构建日志）
4. 应该看到"Environment variables loaded successfully"

### 2. 测试AI功能
访问：https://translation-coach-ai.vercel.app
1. 输入中文原文和翻译
2. 点击"开始分析错误"
3. 应该看到真实的AI分析结果（而不是模拟数据）

### 3. 检查环境变量
在浏览器控制台检查：
```javascript
// 在浏览器控制台运行
console.log('API Key configured:', !!process.env.OPENROUTER_API_KEY);
```

## 常见问题解决

### 问题1：环境变量不生效
**解决方案**：
1. 确认变量名正确：`OPENROUTER_API_KEY`
2. 确认环境设置为：`Production`
3. 重新部署项目

### 问题2：API密钥无效
**解决方案**：
1. 检查OpenRouter账户是否有额度
2. 确认API密钥正确复制
3. 在OpenRouter控制台测试API密钥

### 问题3：部署失败
**解决方案**：
1. 检查构建日志中的错误信息
2. 确认环境变量格式正确
3. 尝试删除并重新添加环境变量

## 本地开发配置

### 1. 创建.env.local文件
```bash
# 复制示例文件
copy .env.example .env.local

# 编辑.env.local文件
OPENROUTER_API_KEY=你的实际API密钥
```

### 2. 重启开发服务器
```bash
npm run dev
```

### 3. 验证本地配置
访问：http://localhost:3000
- AI功能应该正常工作
- 使用真实的OpenRouter API

## 安全最佳实践

### ✅ 应该做的：
1. 使用Vercel控制台配置生产环境变量
2. 在本地使用.env.local文件
3. 定期轮换API密钥
4. 使用不同的密钥用于开发和生产

### ❌ 不应该做的：
1. **不要**将.env.local上传到GitHub
2. **不要**在代码中硬编码API密钥
3. **不要**使用相同的密钥用于多个环境
4. **不要**将API密钥分享给他人

## 总结

### 配置流程总结：
1. **获取API密钥**：从OpenRouter获取
2. **Vercel配置**：在控制台添加环境变量
3. **重新部署**：等待Vercel自动部署
4. **验证功能**：测试AI分析是否正常工作

### 关键点：
- **.env.local只在本地使用**，不上传到GitHub
- **Vercel控制台是生产环境配置的正确位置**
- **环境变量会自动注入到应用中**
- **代码通过process.env.XXX访问环境变量**

**完成这些步骤后，你的AI翻译分析功能就能在Vercel上正常工作了！**