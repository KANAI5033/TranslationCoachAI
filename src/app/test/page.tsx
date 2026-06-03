export default function TestPage() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">环境变量测试</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">OpenRouter API密钥状态</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>配置状态:</strong>
          </div>
          <div className={apiKey ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
            {apiKey ? '✅ 已配置' : '❌ 未配置'}
          </div>
          
          <div>
            <strong>密钥长度:</strong>
          </div>
          <div>
            {apiKey?.length || 0} 字符
          </div>
          
          <div>
            <strong>密钥预览:</strong>
          </div>
          <div className="font-mono text-sm">
            {apiKey ? 
              `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : 
              '无'
            }
          </div>
          
          <div>
            <strong>Node环境:</strong>
          </div>
          <div>
            {process.env.NODE_ENV || '未设置'}
          </div>
          
          <div>
            <strong>Vercel环境:</strong>
          </div>
          <div>
            {process.env.VERCEL_ENV || '未设置'}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold mb-2">下一步操作:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>如果显示"已配置"，AI功能应该正常工作</li>
            <li>如果显示"未配置"，需要在Vercel中配置环境变量</li>
            <li>配置后需要重新部署才能生效</li>
          </ul>
        </div>
      </div>
    </div>
  );
}