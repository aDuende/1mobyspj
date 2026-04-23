export default function ProfilePage() {
  return (
    <div className="p-6" style={{ fontFamily: "Geometrica, sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Profile
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              TC
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tarin.Chon
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Fullstack Dev</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <p className="text-gray-900 dark:text-white">
                tarin.chon@1moby.com
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <p className="text-gray-900 dark:text-white">Engineering</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Join Date
              </label>
              <p className="text-gray-900 dark:text-white">January 15, 2027</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
