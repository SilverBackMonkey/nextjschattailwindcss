import { createContext, useState } from "react";

type RatingContext = {
  rating: number;
  setRating: (count) => void;
  clearRating: () => void;
};

export const RatingContext = createContext<RatingContext>({} as RatingContext);

export const RatingProvider = ({ children }) => {
  const [rat, setRat] = useState(0);
};
