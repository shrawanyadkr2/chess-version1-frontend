export function Landing() {
  return (
    <div className="bg-gradient-to-r from-[#2C3E50] via-[#1C2B3A] to-[#0A121D]

 min-h-screen flex items-center justify-center px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Image Section */}
        <div className="flex justify-center ">
          <img 
            src="/chessboard.jpeg"
            alt="chessboard"
            className="w-64 sm:w-72 md:w-80 lg:w-96 object-contain rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
          />
        </div>

        {/* Text + Button Section */}
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Play chess on the world no. 1 platform
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            Challenge players around the world, improve your skills, and enjoy the game.
          </p>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer">
            Play Online
          </button>
        </div>

      </div>
    </div>
  );
}
