import { UserFeedback } from 'types/data';

export function getAverageRating(ratings: UserFeedback[]): number {
  if (ratings.length === 0) {
    return 0;
  }

  const total = ratings.reduce((acc, rating) => acc + Number(rating.rating), 0);
  const average = total / ratings.length;

  return Math.min(Math.max(average, 0), 5);
}
