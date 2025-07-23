import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

const FilterMovies = ({ movies, getDataCallBack }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedYear = searchParams.get("year") || "All";

    const allYears = useMemo(() => {
      const years = new Set();
      movies.forEach(movie => {
        const year = parseInt(movie.Year);
        if (!isNaN(year)) years.add(year);
      });
      return ["All", ...Array.from(years).sort()];// Optional: sort years
    }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchYear = selectedYear === "All" || movie.Year === selectedYear;
      return matchYear;
    });
  }, [movies, selectedYear]);

  useEffect(() => {
    getDataCallBack(filteredMovies);
  }, [filteredMovies, getDataCallBack]);

  const handleChange = (e) => {
      const value = e.target.value;
      const newParams = new URLSearchParams(searchParams);

      if (value === "All") {
        newParams.delete("year");
      } else {
        newParams.set("year", value);
      }

      newParams.set("page", 1);
      setSearchParams(newParams);
  };

  return (
    <div className="space-y-2">
      <select
        value={selectedYear}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        {allYears.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}

        
      </select>
    </div>
  );
};

export default FilterMovies;

