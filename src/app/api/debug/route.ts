import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  // 获取所有环境变量用于调试
  const allEnvVars: Record<string, string | undefined> = {};
  for (const key in process.env) {
    if (key.includes('OPENROUTER') || key.includes('VERCEL') || key.includes('NODE')) {
      allEnvVars[key] = process.env[key];
    }
  }
  
  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toLocaleString('zh-CN'),
    environment: {
      openRouterKeyConfigured: !!apiKey,
      openRouterKeyLength: apiKey?.length || 0,
      openRouterKeyPreview: apiKey ? 
        `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : 
        '未配置',
      nodeEnv: process.env.NODE_ENV || '未知',
      vercelEnv: process.env.VERCEL_ENV || '未知',
      isVercel: process.env.VERCEL === '1',
      allRelevantEnvVars: allEnvVars
    },
    deploymentInfo: {
      commitHash: process.env.VERCEL_GIT_COMMIT_SHA || '未知',
      branch: process.env.VERCEL_GIT_COMMIT_REF || '未知',
      repo: process.env.VERCEL_GIT_REPO_SLUG || '未知'
    },
    message: apiKey ? 
      (apiKey === 'your_openrouter_api_key_here' ? 
        '❌ 使用的是默认占位符密钥' : 
        '✅ OpenRouter API密钥已配置') : 
      '❌ OpenRouter API密钥未配置',
    
    diagnostic: {
      shouldUseRealAI: !!(apiKey && apiKey !== 'your_openrouter_api_key_here'),
      fallbackReason: !apiKey ? '未配置密钥' : 
                     apiKey === 'your_openrouter_api_key_here' ? '使用默认占位符' : '密钥有效',
      suggestion: !apiKey ? '请在Vercel中配置OPENROUTER_API_KEY' :
                  apiKey === 'your_openrouter_api_key_here' ? '请替换为真实API密钥' :
                  '检查OpenRouter账户额度和网络连接'
    }
  });
}