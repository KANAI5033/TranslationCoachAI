@echo off
echo ============================================
echo AI功能诊断工具
echo ============================================
echo.
echo 步骤1: 检查环境变量配置
echo.
echo 请确认以下配置：
echo.
echo 1. ✅ Vercel环境变量已配置：
echo    访问: https://vercel.com/lt6210924-3040s-projects/translation-coach-ai-xhnh/settings/environment-variables
echo    确认: OPENROUTER_API_KEY 已设置
echo    环境: Production 和 Preview 都已配置
echo.
echo 2. ✅ OpenRouter API密钥有效：
echo    访问: https://openrouter.ai/keys
echo    确认: API密钥状态正常
echo    确认: 有足够的额度
echo.
echo 步骤2: 检查部署状态
echo.
echo 1. 访问Vercel部署页面：
echo    https://vercel.com/lt6210924-3040s-projects/translation-coach-ai-xhnh/deployments
echo.
echo 2. 查看最新的部署：
echo    - 点击最新的部署
echo    - 查看"Build Logs"
echo    - 检查是否有错误信息
echo.
echo 3. 检查环境变量是否注入：
echo    - 在构建日志中搜索 "Environment variables"
echo    - 应该看到 "Environment variables loaded successfully"
echo.
echo 步骤3: 测试AI功能
echo.
echo 1. 访问网站：
echo    https://translation-coach-ai-xhnh.vercel.app/study
echo.
echo 2. 打开浏览器开发者工具（F12）
echo.
echo 3. 点击"Network"标签
echo.
echo 4. 进行翻译分析
echo.
echo 5. 检查网络请求：
echo    - 是否有请求发送到 openrouter.ai
echo    - 检查请求头是否有 Authorization: Bearer <your-api-key>
echo.
echo 步骤4: 常见问题排查
echo.
echo ❌ 如果AI仍然使用模拟数据：
echo.
echo 1. 检查API密钥格式：
echo    - 确保没有多余的空格
echo    - 确保没有包含引号
echo.
echo 2. 检查OpenRouter账户：
echo    - 确认账户有足够的额度
echo    - 确认API密钥没有过期
echo.
echo 3. 检查Vercel配置：
echo    - 尝试删除并重新添加环境变量
echo    - 确保环境变量名称完全正确: OPENROUTER_API_KEY
echo.
echo 4. 强制重新部署：
echo    - 在Vercel中手动触发重新部署
echo    - 或者创建一个空提交: git commit --allow-empty -m "redeploy" && git push
echo.
echo 步骤5: 验证环境变量
echo.
echo 创建一个简单的测试页面来验证环境变量：
echo.
echo 1. 创建测试文件 pages/api/test-env.js
echo 2. 添加代码: export default function handler(req, res) {
echo        res.status(200).json({ 
echo          openRouterKey: process.env.OPENROUTER_API_KEY ? '配置了' : '未配置',
echo          keyLength: process.env.OPENROUTER_API_KEY?.length || 0
        })
echo    }
echo 3. 访问: https://translation-coach-ai-xhnh.vercel.app/api/test-env
echo.
echo ============================================
echo 立即操作
echo ============================================
echo.
echo 1. 首先运行环境变量测试：
echo    访问: https://translation-coach-ai-xhnh.vercel.app/api/test-env
echo.
echo 2. 如果显示"未配置"，说明环境变量没有正确注入
echo.
echo 3. 如果显示"配置了"，但keyLength为0，说明密钥为空
echo.
echo 4. 根据测试结果采取相应措施
echo.
pause