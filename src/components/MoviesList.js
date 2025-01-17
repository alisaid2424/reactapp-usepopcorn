import Movie from "./Movie";

const MoviesList = ({movies , handleSelectedMovie}) => {
    return (
    <ul className="list list-movies">
        {movies.map((movie) => (
        <Movie  movie={movie}   key={movie.imdbID} handleSelectedMovie={handleSelectedMovie} />
        ))}
    </ul>
    );
};

export default MoviesList;
