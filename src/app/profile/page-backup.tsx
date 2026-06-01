export default function ProfilePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">User Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - User info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600 mr-6">
                  JS
                </div>
                <div>
                  <h3 className="text-xl font-bold">John Smith</h3>
                  <p className="text-gray-600">English Translation Student</p>
                  <p className="text-gray-500">University of Languages</p>
                  <p className="text-gray-500">Level: Intermediate</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="p-3 bg-gray-50 rounded border">john.smith@example.com</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <div className="p-3 bg-gray-50 rounded border">20230012345</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                  <div className="p-3 bg-gray-50 rounded border">English Translation</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <div className="p-3 bg-gray-50 rounded border">2023-09-01</div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <div className="p-3 bg-gray-50 rounded border min-h-20">
                  Passionate about English-Chinese translation. Currently focusing on technical and academic translation skills.
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                  Edit Profile
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Learning Goals</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <h4 className="font-medium text-blue-800">Improve Technical Translation</h4>
                    <p className="text-sm text-blue-700">Target: 90% accuracy in technical documents</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-800">75%</div>
                    <div className="text-sm text-blue-600">Progress</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <h4 className="font-medium text-green-800">Expand Vocabulary</h4>
                    <p className="text-sm text-green-700">Target: 2000 specialized terms</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-800">62%</div>
                    <div className="text-sm text-green-600">Progress</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div>
                    <h4 className="font-medium text-purple-800">Master Academic Writing Style</h4>
                    <p className="text-sm text-purple-700">Complete 20 academic translation exercises</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-800">45%</div>
                    <div className="text-sm text-purple-600">Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Stats and achievements */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Learning Statistics</h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">24</div>
                  <div className="text-gray-600">Exercises Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">85%</div>
                  <div className="text-gray-600">Average Accuracy</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">7</div>
                  <div className="text-gray-600">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">1,240</div>
                  <div className="text-gray-600">Words Learned</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Recent Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-bold">🏆</span>
                  </div>
                  <div>
                    <div className="font-medium">Translation Master</div>
                    <div className="text-sm text-gray-600">Completed 20 exercises with 90%+ accuracy</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">📚</span>
                  </div>
                  <div>
                    <div className="font-medium">Vocabulary Builder</div>
                    <div className="text-sm text-gray-600">Learned 1000+ new words</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">🔥</span>
                  </div>
                  <div>
                    <div className="font-medium">Consistent Learner</div>
                    <div className="text-sm text-gray-600">7-day learning streak</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Settings</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition duration-200">
                  <div className="font-medium">Notification Preferences</div>
                  <div className="text-sm text-gray-500">Manage your notification settings</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition duration-200">
                  <div className="font-medium">Privacy Settings</div>
                  <div className="text-sm text-gray-500">Control your privacy options</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition duration-200">
                  <div className="font-medium">Learning Preferences</div>
                  <div className="text-sm text-gray-500">Customize your learning experience</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}