import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addReview } from "@/store/reviews_slice";
import { Colors } from "@/constants/theme";

interface MovieReviewsProps {
  imdbId: string;
}

export default function MovieReviews({ imdbId }: MovieReviewsProps) {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(
    (s) => s.reviews.byMovieId[imdbId] ?? []
  );

  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = () => {
    if (!rating || !reviewText.trim()) return;

    setSubmitting(true);
    dispatch(
      addReview({
        imdbId,
        rating,
        text: reviewText.trim(),
      })
    );
    setRating(0);
    setReviewText("");
    setSubmitting(false);
  };

  const renderStars = (value: number, onPress?: (n: number) => void) => (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          disabled={!onPress}
          onPress={() => onPress && onPress(star)}
        >
          <Text
            style={[
              styles.star,
              star <= value && styles.starActive,
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.reviewsContainer}>
      <Text style={styles.reviewsHeader}>Reviews</Text>

      <Text style={styles.label}>Your rating</Text>
      {renderStars(rating, setRating)}

      <Text style={styles.label}>Your review</Text>
      <TextInput
        style={styles.input}
        multiline
        value={reviewText}
        onChangeText={setReviewText}
        placeholder="What did you think about this movie?"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[
          styles.button,
          (!rating || !reviewText.trim() || submitting) &&
            styles.buttonDisabled,
        ]}
        disabled={!rating || !reviewText.trim() || submitting}
        onPress={handleSubmitReview}
      >
        <Text style={styles.buttonText}>
          {submitting ? "Submitting…" : "Submit review"}
        </Text>
      </TouchableOpacity>

      {reviews.length === 0 ? (
        <Text style={styles.noReviewsText}>
          No reviews yet. Be the first!
        </Text>
      ) : (
        <View style={{ marginTop: 16 }}>
          {reviews.map((r) => (
            <View key={r.id} style={styles.reviewCard}>
              {renderStars(r.rating)}
              <Text style={styles.reviewText}>{r.text}</Text>
              <Text style={styles.reviewMeta}>
                {new Date(r.createdAt).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  reviewsHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  star: {
    fontSize: 24,
    marginRight: 4,
    color: "#ccc",
  },
  starActive: {
    color: "#fbbf24",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  button: {
    marginTop: 4,
    backgroundColor: Colors.default.action,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  noReviewsText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  reviewText: {
    marginTop: 4,
    fontSize: 14,
  },
  reviewMeta: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },
});
