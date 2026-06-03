// 环境变量调试脚本
console.log('=== 环境变量调试 ===');

// 检查所有相关的环境变量
const envVars = {
  'OPENROUTER_API_KEY': process.env.OPENROUTER_API_KEY,
  'NODE_ENV': process.env.NODE_ENV,
  'VERCEL_ENV': process.env.VERCEL_ENV,
  'VERCEL': process.env.VERCEL,
  'CI': process.env.CI
};

console.log('环境变量状态:');
for (const [key, value] of Object.entries(envVars)) {
  console.log(`${key}: ${value ? '✅ ' + (key.includes('KEY') ? value.substring(0, 10) + '...' + value.substring(value.length - 4) : value) : '❌ 未设置'}`);
}

console.log('\n=== 诊断信息 ===');
console.log('当前时间:', new Date().toLocaleString('zh-CN'));
console.log('运行环境:', process.env.NODE_ENV || '未知');
console.log('Vercel环境:', process.env.VERCEL_ENV || '未知');

// 检查是否在Vercel环境中
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
console.log('运行在Vercel:', isVercel ? '✅ 是' : '❌ 否');

// 检查OpenRouter密钥状态
const openRouterKey = process.env.OPENROUTER_API_KEY;
console.log('OpenRouter密钥状态:', 
  openRouterKey ? 
    (openRouterKey === 'your_openrouter_api_key_here' ? '❌ 默认值' : '✅ 已配置') : 
    '❌ 未配置'
);

if (openRouterKey && openRouterKey !== 'your_openrouter_api_key_here') {
  console.log('密钥长度:', openRouterKey.length);
  console.log('密钥前缀:', openRouterKey.substring(0, 10));
  console.log('密钥后缀:', openRouterKey.substring(openRouterKey.length - 4));
}

console.log('\n=== 建议操作 ===');
if (!openRouterKey || openRouterKey === 'your_openrouter_api_key_here') {
  console.log('1. ❌ 需要在Vercel中配置 OPENROUTER_API_KEY');
  console.log('2. 🔧 访问: https://vercel.com/lt6210924-3040s-projects/translation-coach-ai-xhnh/settings/environment-variables');
  console.log('3. ✅ 确保选择了 Production 环境');
} else {
  console.log('1. ✅ 环境变量已配置');
  console.log('2. 🔍 检查OpenRouter账户额度和密钥状态');
  console.log('3. 🌐 测试网络连接: https://openrouter.ai/api/v1/chat/completions');
}

module.exports = { envVars };