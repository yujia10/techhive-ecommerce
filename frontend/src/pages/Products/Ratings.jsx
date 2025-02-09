import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({value, text, colour}) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  return (
     <div className="flex items-center">
      {/* Render full stars based on the 'fullStars' count */}
      {/* [...Array(fullStars)] creates an array with 'fullStars' length */}
      {/* .map((_, index) => (...)) iterates over the array to render each star */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${colour} ml-1`} />
      ))}

      {/* Render a half star when halfStars equals to 1 */}
      {halfStars === 1 && <FaStarHalfAlt className={`text-${colour} ml-1`} />}

      {/* Render empty stars */}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar key={index} className={`text-${colour} ml-1`} />
      ))}

      <span className={`rating-text ml-{2rem} text-${colour}`}>
       {text}
      </span>
     </div>
  );
};

Ratings.defaultProps = {
  colour: "yellow-500",
};

export default Ratings
