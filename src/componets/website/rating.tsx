// import { Box, IconButton } from "@chakra-ui/react";
// import { StarIcon, StarOutlineIcon } from "@chakra-ui/icons";

// interface RatingProps {
//   rating: number;
//   totalStars?: number;
//   onRatingChange?: (newRating: number) => void;
// }

// const Rating = ({ rating, totalStars = 5, onRatingChange }: RatingProps) => {
//   const handleClick = (index: number) => {
//     if (onRatingChange) {
//       onRatingChange(index + 1);
//     }
//   };

//   return (
//     <Box display="flex">
//       {Array.from({ length: totalStars }).map((_, index) => (
//         <IconButton
//           key={index}
//           aria-label={`star ${index + 1}`}
//           icon={rating > index ? <StarIcon /> : <StarOutlineIcon />}
//           onClick={() => handleClick(index)}
//           variant="link"
//           color="gold"
//         />
//       ))}
//     </Box>
//   );
// };

// export default Rating;
import { Box, IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface RatingProps {
  rating: number;
  totalStars?: number;
  onRatingChange?: (newRating: number) => void;
}

const Rating = ({ rating, totalStars = 5, onRatingChange }: RatingProps) => {
  const handleClick = (index: number) => {
    if (onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <Box display="flex">
      {Array.from({ length: totalStars }).map((_, index) => (
        <IconButton
          key={index}
          aria-label={`star ${index + 1}`}
          icon={<StarIcon />}
          onClick={() => handleClick(index)}
          variant="link"
          color={rating > index ? "yellow.400" : "gray.300"} // Adjust the color to represent filled vs. outlined
          boxSize="24px" // Set the size of the star icon
        />
      ))}
    </Box>
  );
};

export default Rating;
