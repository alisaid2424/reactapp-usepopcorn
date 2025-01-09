import { Fragment, useEffect, useState } from "react";
import useKey from "../hooks/useKey";
import StarRateing from "./StarRateing";
import Loader from "./Loader";

const MovieDetails = ({selectedId , handleCloseSelected , handleAddWatched , watched}) => {
    const [movie , setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating , setUserRating] = useState("");
    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find((movie)=> movie.imdbID === selectedId)?.userRating

    const {
    Actors : actors , 
    Director : director , 
    Genre: genre , 
    Plot: plot , 
    Poster : poster , 
    Released :released , 
    Runtime : runtime , 
    Title:title , 
    Year: year , 
    imdbRating
    } = movie;

    //handle Add movie to Favorites
    const handleAdd =  () => {
    const newWatchedAdd = {
        imdbID : selectedId,
        title,
        year,
        poster,
        imdbRating : Number(imdbRating),
        runtime : Number(runtime.split(" ").at(0)),
        userRating
    };

    handleAddWatched(newWatchedAdd);
    handleCloseSelected();
    }

    //get Movie Details
    useEffect(()=>{
    const getMovieDetails = async () => {
        setIsLoading(true);
        const KEY = "f1633904";
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
    }

    getMovieDetails();
    },[selectedId])


    //effect change title with selected movies
    useEffect(()=>{
        if(!title)  return;
        document.title = `Movie | ${title}`;

        return () =>  document.title =  "usePopcorn";
    },[title])



    //effect exit with btn Escape (by hook)
    useKey("Escape" , handleCloseSelected);


    return (
    <div className="details">
    {
        isLoading ? 
        <Loader /> 
        : 
        <Fragment>
        <header>
            <button onClick={handleCloseSelected} className="btn-back">&larr;</button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &bull; {runtime}</p>
            <p>{genre}</p>
            <p><span>⭐️</span>{imdbRating} IMDb rating</p>
            </div>
        </header>
        <section>
            <div className="rating">
            {!isWatched ? 
                <Fragment>
                <StarRateing  maxRateing={10}  size={24}  onRateMovies={setUserRating}   />
                {userRating > 0 && <button onClick={handleAdd} className="btn-add">+ Add to list</button>}
                </Fragment>
                :
                <p>You rated with movie  {watchedUserRating} <span>⭐️</span></p>
            }
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
        </section>
        </Fragment>
    }
    </div>
    )
}

export default MovieDetails;
