import { Fragment, useEffect, useState } from "react";
import usePrevState from "./hooks/usePrevState";
import useLocalStorageState from "./hooks/useLocalStorageState";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import ErrorMassage from "./components/ErrorMassage";
import MovieDetails from "./components/MovieDetails";
import SummaryWatched from "./components/SummaryWatched";
import WatchedList from "./components/WatchedList";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const prevQuery = usePrevState(query);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseSelected = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleRemoveWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      const useKey = process.env.REACT_APP_API_KEY;
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${useKey}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found");
        setMovies(data.Search);
        //console.log(data.Search)
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (prevQuery !== query) {
      const counter = setTimeout(() => {
        if (query) {
          fetchMovies();
          handleCloseSelected();
        }
      }, 2000);

      return () => {
        clearTimeout(counter);
      };
    }
  }, [query, prevQuery]);

  return (
    <Fragment>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {error && <ErrorMassage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseSelected={handleCloseSelected}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <SummaryWatched watched={watched} />
              <WatchedList
                watched={watched}
                handleRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </Fragment>
  );
};
export default App;
