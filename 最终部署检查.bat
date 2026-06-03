@echo off
echo ============================================
echo Translation Coach AI 最终部署检查
echo ============================================
echo.
echo ✅ 环境变量配置完成！
echo.
echo 步骤1: 保存Vercel配置
echo.
echo 1. 确认已填写:
echo    名称: OPENROUTER_API_KEY
echo    值: ••••••••• (已隐藏)
echo    Sensitive: ✅ 已勾选
echo.
echo 2. ✅ 点击 "Save" 按钮
echo.
echo 步骤2: 重新部署
echo.
echo 1. 访问Vercel控制台:
echo    https://vercel.com/lt6210924-3040s-projects/translation-coach-ai-xhnh
echo.
echo 2. 点击 "Deployments"
echo.
echo 3. 找到最新部署
echo.
echo 4. 点击 "..." → "Redeploy"
echo.
echo 5. 选择 "Production" 环境
echo.
echo 6. 等待部署完成 (约1-2分钟)
echo.
echo 步骤3: 测试验证
echo.
echo 部署完成后测试:
echo.
echo 1. 环境变量测试:
echo    https://translation-coach-ai-xhnh.vercel.app/test
echo    应该显示: ✅ OpenRouter API密钥已配置
echo.
echo 2. API测试:
echo    https://translation-coach-ai-xhnh.vercel.app/api/test-env
echo    应该返回JSON: {"openRouterKeyConfigured": true}
echo.
echo 3. AI功能测试:
echo    https://translation-coach-ai-xhnh.vercel.app/study
echo    输入测试翻译，应该使用真实AI分析
echo.
echo 步骤4: 验证网络请求
echo.
echo 1. 访问学习页面
echo 2. 按F12打开开发者工具
echo 3. 点击 "Network" 标签
echo 4. 进行翻译分析
echo 5. 查看是否有请求发送到 openrouter.ai
echo.
echo ============================================
echo 常见问题解决
echo ============================================
echo.
echo ❌ 如果环境变量测试失败:
echo.
echo 1. 检查Vercel环境变量配置
echo 2. 确认选择了 Production 环境
echo 3. 重新部署
echo.
echo ❌ 如果AI仍然使用模拟数据:
echo.
echo 1. 检查OpenRouter账户额度:
echo    https://openrouter.ai/keys
echo 2. 确认API密钥状态为 "Active"
echo 3. 检查网络请求是否发送成功
echo.
echo ❌ 如果部署失败:
echo.
echo 1. 查看Vercel构建日志
echo 2. 检查是否有错误信息
echo 3. 尝试清除构建缓存
echo.
echo ============================================
echo 成功标志
echo ============================================
echo.
echo ✅ 环境变量测试通过
echo ✅ API端点返回已配置
echo ✅ AI使用真实分析 (非模拟数据)
echo ✅ 网络请求发送到 openrouter.ai
echo ✅ 网站功能完全正常
echo.
pause