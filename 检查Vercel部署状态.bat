@echo off
echo ============================================
echo 检查Vercel部署状态
echo ============================================
echo.
echo 步骤1: 检查GitHub最新提交
echo.
git log --oneline -3
echo.
echo ============================================
echo 步骤2: 检查Vercel项目状态
echo ============================================
echo.
echo 请手动访问以下链接检查Vercel部署状态：
echo.
echo 1. Vercel项目主页：
echo    https://vercel.com/lt6210924-3040s-projects/translation-coach-ai-xhnh
echo.
echo 2. 最新部署状态：
echo    https://vercel.com/lt6210924-3040s-projects/translation-coach-ai-xhnh/deployments
echo.
echo 3. 网站访问链接：
echo    https://translation-coach-ai-xhnh.vercel.app
echo.
echo ============================================
echo 步骤3: 常见问题排查
echo ============================================
echo.
echo 如果Vercel没有自动重新部署，请检查：
echo.
echo 1. ✅ GitHub Webhook配置
echo    访问: https://github.com/KANAI5033/TranslationCoachAI/settings/hooks
echo    检查是否有Vercel的Webhook
echo.
echo 2. ✅ Vercel项目连接状态
echo    访问: https://vercel.com/KANAI5033/TranslationCoachAI/settings/git
echo    检查GitHub连接是否正常
echo.
echo 3. ✅ 手动触发部署
echo    在Vercel控制台点击"Redeploy"按钮
echo.
echo 4. ✅ 检查环境变量配置
echo    访问: https://vercel.com/KANAI5033/TranslationCoachAI/settings/environment-variables
echo    确认OPENROUTER_API_KEY已正确配置
echo.
echo ============================================
echo 步骤4: 手动触发部署
echo ============================================
echo.
echo 如果需要手动触发部署，可以：
echo.
echo 1. 在Vercel控制台点击"Deployments"
echo 2. 找到最新的部署
echo 3. 点击"..."菜单
echo 4. 选择"Redeploy"
echo.
echo 或者创建一个新的提交：
echo git commit --allow-empty -m "触发Vercel重新部署" && git push origin main
echo.
pause