import Instance from "../instances/instance";

const MovieLoader = async ({ request }) => {
    const urlParams = new URL(request.url).searchParams;
    const search = urlParams.get("search") || "";
    const page = parseInt(urlParams.get("page")) || 1;
    const year = urlParams.get("year") || "All";

    const params = { s: search, page };
    if (year !== "All") {
        params.y = year; 
    }

    try {
        const response = await Instance.get("/", { params });

    return {
        movies: response.data.Search || [],
        totalResults: parseInt(response.data.totalResults) || 0,
        page,
        year,
        search,
    };
    } catch (error) {
        return { movies: [], totalResults: 0, page, search };
    }
};

export default MovieLoader;
