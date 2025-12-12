import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Review {
  id: string;
  imdbId: string;
  rating: number; // 1–5
  text: string;
  createdAt: string;
}

interface ReviewsState {
  byMovieId: Record<string, Review[]>;
}

const initialState: ReviewsState = {
  byMovieId: {},
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview(
      state,
      action: PayloadAction<{ imdbId: string; rating: number; text: string }>
    ) {
      const { imdbId, rating, text } = action.payload;
      if (!imdbId) return;

      const list = state.byMovieId[imdbId] ?? [];
      const newReview: Review = {
        id: Date.now().toString(),
        imdbId,
        rating,
        text,
        createdAt: new Date().toISOString(),
      };

      state.byMovieId[imdbId] = [newReview, ...list];
    },
    clearReviewsForMovie(state, action: PayloadAction<{ imdbId: string }>) {
      delete state.byMovieId[action.payload.imdbId];
    },
  },
});

export const { addReview, clearReviewsForMovie } = reviewsSlice.actions;
export default reviewsSlice.reducer;
