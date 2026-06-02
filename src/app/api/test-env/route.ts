import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  return NextResponse.json({
    status: 'success',
    environment: {
      openRouterKeyConfigured: !!apiKey,
      openRouterKeyLength: apiKey?.length || 0,
      openRouterKeyPreview: apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : '未配置',
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      allEnvVars: Object.keys(process.env).filter(key => 
        key.includes('OPENROUTER') || 
        key.includes('VERCEL') || 
        key.includes('NODE')
      )
    },
    message: apiKey ? 
      '✅ OpenRouter API密钥已配置' : 
      '❌ OpenRouter API密钥未配置',
    nextSteps: apiKey ? 
      '请检查OpenRouter账户额度和API密钥有效性' :
      '请在Vercel中配置OPENROUTER_API_KEY环境变量'
  });
}