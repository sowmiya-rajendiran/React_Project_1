import { Link, useLoaderData, useNavigate } from "react-router";
import MovieDisplay from "./MovieDisplay";
import Navigation from "./Navigation";
import FilterMovies from "./FilterMovies";
import { useState } from "react";

function MovieList(){
    let {movies , totalResults , page , search , year} = useLoaderData();
    const [filteredMovies, setFilteredMovies] = useState([]);
    let navigate = useNavigate();

    let handleSearchItAgain = () =>{
        navigate('/');
    }
    // Get Data from FilterMovies Child to Parent Via Callback Function
    let getDataCallBack = (filteredMovies) =>{
        setFilteredMovies(filteredMovies);
    }

    return(
        <>
            <div>
                {movies.length === 0 ? (
                    <div className="text-center mt-[200px]  px-[100px"> 
                        <h1 className=" text-[20px] font-semibold] mb-[16px]"> No Search Results </h1>
                        <button className="text-white bg-black py-[11px] px-5 text-[16px] text-center rounded-full cursor-pointer hover:bg-gray-600"
                                onClick={handleSearchItAgain}
                        >Search Again </button>
                    </div>
                    ) : (
                        <div>
                            <div className=" sticky top-0 md:px-[100px] px-[25px] py-[15px] flex justify-between items-center bg-[radial-gradient(circle,_#EEAECA_0%,_#94BBE9_100%)] shadow-lg">
                                <h1 className=" sm:text-[25px] text-[20px] font-semibold ">Popular Movies</h1>
                                <Link to='/' className="px-[25px] py-[6px] text-white text-[16px] bg-black rounded-[4px]">Back</Link>
                            </div>
                            <div className="sm:flex gap-[30px] lg:px-[100px] md:px-[50px] px-[25px] py-[50px]">
                                <div className="sm:w-1/5 w-full sm:mb-0 mb-[25px]">
                                    <h1 className="text-[18px] font-semibold text-gray-600 mb-[15px]">Filters</h1>
                                    <FilterMovies movies={movies} getDataCallBack={getDataCallBack}/>
                                    
                                </div>
                                <div className="sm:w-4/5 w-full">
                                    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[35px] ">
                            
                                        {(filteredMovies.length > 0 ? filteredMovies : movies).map((movie) => (
                                            <MovieDisplay key={movie.imdbID} movie={movie} />
                                        ))}

                                    </div>

                                </div>
                            </div>

                        </div>
                            
                    )}

            </div>
            <Navigation totalResults={totalResults} page={page} search={search} year={year}/>
        </>
    )
}

export default MovieList;