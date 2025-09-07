export default function App() {
  return (
    <div className="dark h-screen w-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-2xl bg-gray-800 shadow-lg text-center border border-gray-700 animate-fade-in">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">Welcome to Oxydesk</h1>
        <p className="text-gray-400 mb-8">
          A minimal desktop experience powered by React, Tailwind, and Electron.
        </p>

        {/* Button */}
        <button
          className="w-full py-3 rounded-xl text-lg font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-300"
          onClick={() => alert("Let's go! 🚀")}
        >
          Get Started
        </button>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          Made with ❤️ using <span className="text-indigo-400">Electron</span>
        </div>
      </div>
    </div>
  );
}
