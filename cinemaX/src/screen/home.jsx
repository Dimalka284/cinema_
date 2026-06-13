import MovieRow from "../components/MovieRow";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="bg-[#0f1014] min-h-screen pb-20">
      <Hero />

      {/* Movie Rows using OMDB API */}
      <div className="relative z-20 flex flex-col gap-8 md:gap-12 -mt-16 md:-mt-24 px-0 md:px-0">

        {/* Comedy & Animation */}
        <MovieRow title="Feel Good Movies" searchTerm="cars" />
        <MovieRow title="Animation" searchTerm="animation" />
        <MovieRow title="Animated Adventures" searchTerm="kung fu panda" />

        {/* Action */}
        <MovieRow title="Action Packed" searchTerm="john wick" />
        <MovieRow title="Mission Impossible" searchTerm="mission impossible" />
        <MovieRow title="Fast & Furious" searchTerm="fast furious" />

        {/* Sci-Fi */}
        <MovieRow title="Epic Sci-Fi" searchTerm="interstellar" />
        <MovieRow title="Marvel Universe" searchTerm="avengers" />
        <MovieRow title="DC Universe" searchTerm="batman" />
        <MovieRow title="Space Adventures" searchTerm="star wars" />

        {/* Thriller & Horror */}
        <MovieRow title="Supernatural Horror" searchTerm="insidious" />
        <MovieRow title="Horror Classics" searchTerm="conjuring" />

        {/* Drama */}
        <MovieRow title="Oscar Winners" searchTerm="oppenheimer" />
        <MovieRow title="Martial Arts" searchTerm="karate" />

        {/* Popular Franchises */}
        <MovieRow title="Harry Potter" searchTerm="harry potter" />
        <MovieRow title="Lord of the Rings" searchTerm="lord of the rings" />
        <MovieRow title="Jurassic World" searchTerm="jurassic" />
        <MovieRow title="Pirates of the Caribbean" searchTerm="pirates caribbean" />
      </div>
    </div>
  );
}

export default Home;