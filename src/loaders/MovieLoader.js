
import Instance from "../instances/instance"

let MovieLoader = async({request}) => {

    let url = new URL(request.url).searchParams.get('search');
    const page = parseInt(new URL(request.url).searchParams.get('page')) || 1;

    try{
        let responce = await Instance.get('/' , {params : {s:url ,page}});

        const basicResults = responce.data.Search || [];
            // For each movie, fetch full details
            const fullMovies = await Promise.all(
                basicResults.map((movie) =>
                    Instance.get("/", {
                    params: { i: movie.imdbID },
                    }).then((res) => res.data)
                )
            );

        return {
            movies: fullMovies,
            totalResults: parseInt(responce.data.totalResults) || 0,
            page,
            search : url
        }   
    }
    catch(error){
        return { movies: [] };
    }
    
}

export default MovieLoader;