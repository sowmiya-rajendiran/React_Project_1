import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";
import MovieList from "./components/MovieList";
import MovieLoader from "./loaders/MovieLoader";
import MovieDetail from "./components/MovieDetail";
import MovieListLoader from "./loaders/MovieListLoader";

let routes = [
    {
        path : '/',
        element : <Home />
    },
    {
        path : '/movies',
        element : <MovieList />,
        loader : MovieLoader,
        hydrateFallbackElement: <div>Loading...</div>,
    },
    {
        path : '/moviedetails',
        element : <MovieDetail />,
        loader : MovieListLoader,
        hydrateFallbackElement: <div>Loading...</div>,
    }
]

let router = createBrowserRouter(routes ,{
    future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }
})

function App(){
    return(
        <RouterProvider 
            router={router}
            future={{
                v7_startTransition: true,
            }}
        />
    )
}

export default App;