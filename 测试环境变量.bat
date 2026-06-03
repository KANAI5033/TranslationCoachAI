@echo off
echo ============================================
echo 环境变量测试指南
echo ============================================
echo.
echo 步骤1: 等待Vercel部署完成
echo.
echo 1. 访问: https://vercel.com/lt6210924-3040s-projects/translation-coach-ai-xhnh
echo 2. 查看部署状态
echo 3. 等待部署完成（显示✅）
echo.
echo 步骤2: 测试环境变量端点
echo.
echo 访问: https://translation-coach-ai-xhnh.vercel.app/api/test-env
echo.
echo 预期结果:
echo {
echo   "status": "success",
echo   "environment": {
echo     "openRouterKeyConfigured": true,
echo     "openRouterKeyLength": 51,
echo     "openRouterKeyPreview": "sk-or-v1-...abcd",
echo     "message": "✅ OpenRouter API密钥已配置"
echo   }
echo }
echo.
echo 如果显示"未配置":
echo 1. 重新检查Vercel环境变量
echo 2. 确保变量名: OPENROUTER_API_KEY
echo 3. 确保没有多余空格
echo 4. 重新部署
echo.
echo 步骤3: 测试AI功能
echo.
echo 1. 访问: https://translation-coach-ai-xhnh.vercel.app/study
echo 2. 输入测试文本:
echo    中文: "人工智能的快速发展"
echo    英文: "The rapid development of AI has bring"
echo 3. 点击"开始分析错误"
echo 4. 按F12打开开发者工具
echo 5. 查看Network标签的网络请求
echo.
echo 如果看到请求发送到openrouter.ai:
echo ✅ AI功能正常工作
echo.
echo 如果只看到模拟数据分析:
echo ❌ 环境变量可能未正确注入
echo.
echo 步骤4: 强制重新部署
echo.
echo 如果环境变量测试失败:
echo.
echo 1. 在Vercel中删除OPENROUTER_API_KEY
echo 2. 重新添加（仔细检查）
echo 3. 手动触发重新部署
echo 4. 等待部署完成
echo 5. 重新测试
echo.
echo ============================================
echo 常见问题解决
echo ============================================
echo.
echo 问题1: 环境变量显示已配置但AI不工作
echo 解决: 检查OpenRouter账户额度和API密钥有效性
echo.
echo 问题2: 部署日志没有环境变量加载信息
echo 解决: 可能需要清除Vercel缓存或重新连接GitHub仓库
echo.
echo 问题3: Git推送超时
echo 解决: 网络问题，稍后重试或使用Vercel网页界面
echo.
pause