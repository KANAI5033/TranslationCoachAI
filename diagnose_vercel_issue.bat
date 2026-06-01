@echo off
echo ============================================
echo Vercel 404错误诊断工具
echo ============================================
echo.

echo 步骤1: 检查关键文件是否存在
echo.

echo 1. package.json:
if exist package.json (
    echo   ✅ 存在
) else (
    echo   ❌ 缺失 - 这是必需文件！
)

echo 2. next.config.js:
if exist next.config.js (
    echo   ✅ 存在
) else (
    echo   ❌ 缺失 - 这是必需文件！
)

echo 3. src/app/page.tsx:
if exist src\app\page.tsx (
    echo   ✅ 存在
) else (
    echo   ❌ 缺失 - 这是必需文件！
)

echo 4. src/app/layout.tsx:
if exist src\app\layout.tsx (
    echo   ✅ 存在
) else (
    echo   ❌ 缺失 - 这是必需文件！
)

echo 5. tsconfig.json:
if exist tsconfig.json (
    echo   ✅ 存在
) else (
    echo   ❌ 缺失 - 这是必需文件！
)

echo.
echo 步骤2: 检查package.json配置
echo.

for /f "tokens=*" %%i in ('type package.json ^| findstr "scripts"') do (
    echo  %%i
)

echo.
echo 步骤3: 检查Next.js版本
echo.

for /f "tokens=*" %%i in ('type package.json ^| findstr "next"') do (
    echo  %%i
)

echo.
echo 步骤4: 可能的解决方案
echo.
echo 1. 检查Vercel部署日志:
echo   访问 https://vercel.com/KANAI5033/TranslationCoachAI
echo   点击失败的部署，查看日志
echo.
echo 2. 常见问题:
echo   - 缺少依赖: 确保package.json正确
echo   - 构建错误: 检查next.config.js配置
echo   - 路由问题: 确保有page.tsx文件
echo.
echo 3. 重新部署:
echo   在Vercel中点击"Redeploy"
echo.
echo 4. 检查环境变量:
echo   确保没有缺少必要的环境变量
echo.
echo ============================================
echo 诊断完成
echo ============================================
pause