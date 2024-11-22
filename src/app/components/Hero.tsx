export default function Hero() {
    return (
      <section className="bg-gray-100 p-8 text-center flex flex-col items-center space-y-6">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
          <img
            src="/bsuper.png"
            alt="Books Hero"
            className="mx-auto w-3/4 sm:w-2/3 md:w-1/2 h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-lg"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-gray-800">
          Explore Our Book Collection
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl">
          Discover an amazing variety of books curated just for you. Browse through genres, authors.
        </p>
      </section>
    );
  }
  