
import { useEffect, useState } from "react";
import Instance from "../instances/instance";
import { Link } from "react-router";
import NoImage from "../assets/No_Image_Available.jpg";

function MovieRecommendations({genre}){
    
    const [recommendations , setRecommendations] = useState([]);

    // Recommendations based on Movie Genre
    useEffect(()=>{

        if (!genre) return;

        const firstGenre = genre.split(',')[0].trim();

        const fetchRecommendations = async () =>{
            try{
                const res = await Instance.get(`?s=${firstGenre}`);
                if(res.data && res.data.Search){
                    const shuffled = [...res.data.Search].sort(() => 0.5 - Math.random());
                    const randomFive = shuffled.slice(0, 5);
                    setRecommendations(randomFive);
                }
            }
            catch(error){
                return [];
            }
        };

        fetchRecommendations();
    },[genre])

    return(
        <>
            {recommendations.length === 0 ? (
                <h1 className="text-[18px] font-semibold text-center mt-[50px]">No Recommendations</h1>

            ) :(
                <div className="grid lg:grid-cols-5 md:grid-cols-3  grid-cols-1 gap-[20px] mt-[25px]">
                    {recommendations.map((movie) => (
                        <div key={movie.imdbID} className="shadow-lg bg-white rounded-[15px]">
                           <Link to={'/moviedetails'+"?id=" + movie.imdbID}>
                                <img
                                        className="h-[200px] w-full object-cover m-auto rounded-t-[15px]"
                                        src={movie.Poster}
                                        alt={movie.Title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = NoImage;
                                        }}
                                        
                                    />
                            </Link>
                            <div className="p-2 text-center">
                                <Link to={'/moviedetails'+"?id=" + movie.imdbID} className=" text-[15px] text-gray-600 font-semibold ">{(movie.Title).slice(0,20)}</Link>
                            </div>
                            
                        </div>
                    ))}

                </div>
            )}
            
        </>
    )
}

export default MovieRecommendations;