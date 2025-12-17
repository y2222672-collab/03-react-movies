import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; //

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService.ts";
import type { Movie } from "../../types/movie.ts";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setMovies([]);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {isError && <ErrorMessage />}

      {isLoading && <Loader />}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
