@echo off
echo ============================================
echo Translation Coach AI - GitHub上传脚本
echo ============================================
echo.

echo 步骤1: 检查Git是否安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git未安装，请先安装Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git已安装
echo.

echo 步骤2: 清理不需要的文件（非常重要！）
echo 正在删除.next文件夹（143GB，文件太多）...
if exist .next rmdir /s /q .next
echo 正在删除node_modules文件夹（143GB，304个目录）...
if exist node_modules rmdir /s /q node_modules
echo ✅ 清理完成 - 这两个文件夹都不需要上传！
echo.

echo 步骤3: 添加所有文件到Git
echo 正在添加文件...
git add .
echo ✅ 文件添加完成
echo.

echo 步骤4: 提交更改
echo 正在提交更改...
git commit -m "上传完整Translation Coach AI项目"
echo ✅ 提交完成
echo.

echo 步骤5: 推送到GitHub
echo 正在推送到GitHub...
git push origin main
echo.

if %errorlevel% equ 0 (
    echo ============================================
    echo ✅ 上传成功！
    echo ============================================
    echo.
    echo 下一步：
    echo 1. 访问 https://github.com/KANAI5033/TranslationCoachAI 查看文件
    echo 2. 等待Vercel自动部署（约1-2分钟）
    echo 3. 访问 https://translation-coach-ai.vercel.app 测试网站
    echo.
) else (
    echo ============================================
    echo ❌ 上传失败！
    echo ============================================
    echo.
    echo 可能的原因：
    echo 1. 网络连接问题
    echo 2. GitHub仓库不存在
    echo 3. 权限问题
    echo.
    echo 解决方案：
    echo 1. 检查网络连接
    echo 2. 确保GitHub仓库存在
    echo 3. 手动执行命令查看错误信息
    echo.
)

pause