import { useLoaderData, useNavigate } from "react-router";
import MovieRecommendations from "./MovieRecommendations";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";

function MovieDetail(){
    let movie = useLoaderData();
    let navigate = useNavigate();
    const [movieRatings, setMovieRatings] = useState({});

    // Rating Functions using Local Storage
    useEffect(() => {
        const storedRatings = localStorage.getItem("movieRatings");
        if (storedRatings) {
            setMovieRatings(JSON.parse(storedRatings));
        }
    }, []);

    let handleButtonBack = () =>{
        navigate(-1);
    }

    
    const handleRatingChange = (movieId, rating) => {
        setMovieRatings((prev) => ({
        ...prev,
        [movieId]: rating,
        }));
        let ratingsCopy = movieRatings;
        ratingsCopy = {
            ...movieRatings,
            [movieId]: rating

        }
        localStorage.setItem("movieRatings", JSON.stringify(ratingsCopy));
    };

    return(
        <>
        <div>
            <div className="sticky top-0 md:px-[100px] px-[25px] py-[15px] flex justify-between items-center bg-[radial-gradient(circle,_#EEAECA_0%,_#94BBE9_100%)] shadow-lg">
                <h1 className=" md:text-[25px] text-[20px] font-semibold ">Movies OverView</h1>
                <button className="px-[25px] py-[6px] text-white text-[16px] bg-black rounded-[4px] cursor-pointer"
                    onClick={handleButtonBack}
                >Back</button>
            </div>
            <div className="xl:px-[100px] md:px-[50px] px-[25px] py-[50px] bg-[#edd0eb75]">
                <div className="py-[30px] sm:px-[30px] px-[20px]  shadow-md bg-white">
                    <div className="md:flex justify-between gap-[40px]">
                        <div className="lg:w-1/4 md:w-1/3 w-full">
                            <img
                                className="h-[500px] w-full object-cover m-auto rounded-[15px]"
                                src={movie.Poster}
                                alt={movie.Title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/src/assets/No_Image_Available.jpg';
                                }}
                            />
                        </div>
                        
                        <div className="lg:w-3/4 md:w-2/3 w-full">
                            <h1 className="md:text-[25px] text-[20px] font-semibold mb-[15px] xl:mt-[80px] mt-[20px]">{movie.Title} 
                                <span className="ml-[10px] text-gray-500 md:text-[20px] text-[15px]">({movie.Year})</span>
                            </h1>
                            <p className="md:text-[16px] text-[14px] font-semibold mb-[15px] text-gray-600">{movie.Released}
                                <span className="ml-[5px]">. {movie.Genre}</span>
                                <span className="ml-[5px]">. {movie.Runtime}</span>
                            </p>
                           
                            <p className="md:text-[16px] text-[14px] font-semibold mb-[15px]">Overview : {movie.Plot}</p>
                            <p className="md:text-[16px] text-[14px] font-semibold">BoxOffice : {movie.BoxOffice}</p>
                            <div className="lg:flex justify-between gap-[20px] mt-[20px] items-center">
                                <div className="lg:mb-0 mb-[10px]">
                                    <p className="lg:text-[15px] text-[14px] text-gray-600 font-semibold mb-[5px]">{movie.Director}</p>
                                    <p className="lg:text-[15px] text-[14px] text-gray-500 font-semibold">Director</p>
                                </div>
                                <div className="lg:mb-0 mb-[10px]">
                                    <p className="lg:text-[15px] text-[14px] text-gray-600 font-semibold mb-[5px]">{movie.Language}</p>
                                    <p className="lg:text-[15px] text-[14px] text-gray-500 font-semibold">Language</p>

                                </div>
                                <div>
                                    <p className="lg:text-[15px] text-[14px] text-gray-600 font-semibold mb-[5px]">{movie.Writer}</p>
                                    <p className="lg:text-[15px] text-[14px] text-gray-500 font-semibold">Writer</p>
                                </div>
                            </div>
                            <StarRating
                                rating={movieRatings[movie.imdbID] || 0}
                                onRatingChange={(rating) => handleRatingChange(movie.imdbID, rating)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-[60px] border-t border-t-gray-500">
                    <h1 className="text-[25px] font-semibold mt-[40px]">Recommendations</h1>
                    <MovieRecommendations genre={movie.Genre} />
                </div>

            </div>
           
        </div>
            
        </>
    )
}

export default MovieDetail;