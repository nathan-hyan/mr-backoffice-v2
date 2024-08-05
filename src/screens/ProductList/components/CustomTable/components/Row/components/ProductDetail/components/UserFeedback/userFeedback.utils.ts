import { UserFeedback } from 'types/data';

export const getAverageRating = (array: UserFeedback[]) => {
  const ratingSum = array.reduce((prev, curr) => {
    return prev + curr.rating;
  }, 0);

  return ratingSum / array.length;
};
