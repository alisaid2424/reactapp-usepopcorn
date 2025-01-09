import { useRef } from "react";
import useKey from "../hooks/useKey";

const Search = ({query , setQuery}) => {

    const iputEl = useRef(null);

    useKey("Enter" , () => {
    if (document.activeElement === iputEl.current) return;
    iputEl.current.focus();
    setQuery(" ");
    });

    return (
    <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={iputEl}
    />
    )
}

export default Search;

