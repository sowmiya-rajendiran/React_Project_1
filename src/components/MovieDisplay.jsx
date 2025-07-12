import { Link } from "react-router";

function MovieDisplay({movie}){
    return(
        <div className="shadow-lg rounded-[15px]">
            <Link to={'/moviedetails'+"?id=" + movie.imdbID}>
                <img
                        className="h-[350px] w-[400px] object-cover m-auto rounded-t-[15px]"
                        src={movie.Poster}
                        alt={movie.Title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/src/assets/No_Image_Available.jpg';
                        }}
                         
                    />
            </Link>
            <div className="p-3 rounded-b-[10px]">
                <Link to={'/moviedetails'+"?id=" + movie.imdbID} className="text-[16px] font-bold hover:text-blue-400">{(movie.Title).slice(0,20)}</Link>
                <p className="text-[16px] text-gray-400 mt-[5px]">{movie.Year}</p>

            </div>

        </div>
    )
}

export default MovieDisplay;