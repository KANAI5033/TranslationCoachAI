export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TC</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Translation Coach AI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">Home</a>
            <a href="/study" className="text-gray-600 hover:text-blue-600 transition">Study</a>
            <a href="/profile" className="text-gray-600 hover:text-blue-600 transition">Profile</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">About</a>
          </div>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Translation Coach AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            发现翻译错误，而不仅仅是获得答案
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            专为大学英语翻译学习者设计的AI辅助平台，通过智能分析帮助您理解翻译错误的原因，提升翻译能力。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/study"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              开始学习
            </a>
            <a
              href="/profile"
              className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-4 px-8 rounded-xl text-lg border-2 border-blue-600 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              查看学习画像
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">用户满意度</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">翻译练习</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600">平均进步率</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">AI辅导</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            为什么选择 Translation Coach AI？
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">智能错误分析</h3>
              <p className="text-gray-600">
                不仅仅是给出正确答案，而是深入分析您的翻译错误原因，提供详细的改进建议。
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">个性化学习路径</h3>
              <p className="text-gray-600">
                根据您的学习进度和薄弱环节，智能推荐适合的练习内容，实现个性化学习。
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">实时反馈系统</h3>
              <p className="text-gray-600">
                即时获得AI反馈，了解翻译中的语法、语义和文化适应性问题，快速提升翻译能力。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            学习流程
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">提交翻译</h3>
              <p className="text-gray-600">输入您的翻译练习</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI分析</h3>
              <p className="text-gray-600">智能识别错误类型</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">详细反馈</h3>
              <p className="text-gray-600">获得改进建议</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">跟踪进步</h3>
              <p className="text-gray-600">查看学习报告</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备好提升您的翻译能力了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            加入数千名大学翻译学习者，体验AI驱动的个性化学习
          </p>
          <a
            href="/study"
            className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-xl text-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            立即开始免费学习
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">TC</span>
                </div>
                <span className="text-xl font-bold">Translation Coach AI</span>
              </div>
              <p className="text-gray-400">专为大学英语翻译学习者设计</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2024 Translation Coach AI. All rights reserved.</p>
              <p className="text-gray-400 mt-2">发现翻译错误，而不仅仅是获得答案</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
