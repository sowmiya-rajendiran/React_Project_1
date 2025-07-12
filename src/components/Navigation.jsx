import { useNavigate } from "react-router";

function Navigation({totalResults ,page , search}){
    let navigate = useNavigate();
    const totalPages = Math.ceil(totalResults / 10);

    const goToPage = (newPage) => {
        navigate(`/movies?search=${search}&page=${newPage}`);
    };
    
    return(
        <div className="mb-[50px]">
             {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                        <button
                            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 cursor-pointer"
                            disabled={page === 1}
                            onClick={() => goToPage(page - 1)}
                        >
                            Previous
                        </button>

                        <span className="text-gray-600 font-medium">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 cursor-pointer"
                            disabled={page === totalPages}
                            onClick={() => goToPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
        </div>

    )

}

export default Navigation;