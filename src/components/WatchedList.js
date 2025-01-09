import WatchItem from "./WatchItem";


const WatchedList = ({watched , handleRemoveWatched }) =>{
    return (
        <ul className="list list-movies">
            {watched.map((movie) => (
            <WatchItem movie={movie}  key={movie.imdbID} handleRemoveWatched={handleRemoveWatched} />
            ))}
        </ul>
    );
}

export default  WatchedList;
