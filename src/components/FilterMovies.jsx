import { useEffect, useState, useMemo } from "react";

const FilterMovies = ({ movies, getDataCallBack }) => {

    const [selectedGenre, setSelectedGenre] = useState("All");

    // Filter Movies Based On Genre
    const allGenres = useMemo(() => {
        const genreSet = new Set();
        movies.forEach((movie) => {
        if (movie.Genre) {
            movie.Genre.split(",").forEach((g) => genreSet.add(g.trim()));
        }
        });
        return ["All", ...Array.from(genreSet).sort()];
    }, [movies]);

  
    const filteredMovies = useMemo(() => {
        return selectedGenre === "All"
        ? movies
        : movies.filter((movie) =>
            movie.Genre?.toLowerCase().includes(selectedGenre.toLowerCase())
            );
    }, [selectedGenre, movies]);

  
    useEffect(() => {
        getDataCallBack(filteredMovies);
    }, [filteredMovies, getDataCallBack]);

    return (
        <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border border-gray-600 p-2 rounded w-full"
        >
            {allGenres.map((genre) => (
            <option key={genre} value={genre}>
                {genre}
            </option>
            ))}
        </select>
    );
};

export default FilterMovies;
