import Instance from "../instances/instance";

const MovieListLoader = async({request}) =>{
    let id = new URL(request.url).searchParams.get('id');
    try{
        // Fetch Data for Movie Details Route
        let res = await Instance.get('' , {
            params : {i : id , plot : 'full'}
        });

        return res.data;
    }
    catch (error) {
        return {}
    }
    
}

export default MovieListLoader;