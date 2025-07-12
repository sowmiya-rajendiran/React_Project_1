import { useState } from "react";

const StarRating = ({totalStars = 5 , rating = 0, onRatingChange }) =>{
    const [hover, setHover] = useState(0);

    return(
        <div>
            <div className="flex gap-[5px] mt-[15px]">
                {[...Array(totalStars)].map((_,index)=>{
                    const starValue = index + 1;
                    return(
                        <button
                            key={index}
                            type="button"
                            onClick={() => onRatingChange?.(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <span className={`text-[35px] cursor-pointer 
                                ${starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'}`}>
                                        ★
                            </span>
                            
                        </button>
                    )
                })}

            </div>

            <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>

        </div>
       
    )
}

export default StarRating;