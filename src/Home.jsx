import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function Home(){

    let navigate = useNavigate();
    let [searchParams]  = useSearchParams();
    let [query , setQuery] = useState(searchParams.get("search") || "");
    let [page] = useState(parseInt(searchParams.get("page")) || 1);
    
    let handleInput = (e) =>{
        setQuery(e.target.value);
    }
    // Search 
    let handleSubmit =(e) => {
        e.preventDefault();
        navigate(`/movies?search=${encodeURIComponent(query)}&page=${page}`);
    }

    return(
        <div className="md:py-[280px] py-[170px] lg:px-[100px] md:px-[50px] px-[25px] bg-[radial-gradient(circle,_#EEAECA_0%,_#94BBE9_100%)] text-black p-6 rounded-xl shadow-lg text-center">
                <h1 className="lg:text-[30px] text-[20px] font-bold mb-[15px] ">🎬 Movie Review</h1>
                <p className="text-[16px] text-white mb-[40px] font-semibold">Search Your Movies Here </p>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            required
                            value={query}
                            onChange={handleInput}
                            className="md:w-1/2 w-full h-[47px] py-[9px] px-5 focus:outline-none md:rounded-r-none md:rounded-l-full rounded-full bg-white text-gray-500"
                        />
                        <button type="submit"
                            className=' border-t-1 border-black text-white bg-black py-[11px] px-5 text-[16px] text-center md:mt-0 mt-[20px] md:rounded-l-none md:rounded-r-full rounded-full cursor-pointer hover:bg-gray-600 hover:border-gray-600'
                        >Search</button>
                    </form>
                </div>
            </div>
    )
}

export default Home;