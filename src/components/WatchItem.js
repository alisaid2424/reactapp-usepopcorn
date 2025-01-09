

const WatchItem = ({movie , handleRemoveWatched}) =>{
    return (
        <li >
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
            <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>
            </div>
            <button onClick={()=>handleRemoveWatched(movie.imdbID)} className="btn-delete">X</button>
        </li>
    )
}

export default WatchItem;