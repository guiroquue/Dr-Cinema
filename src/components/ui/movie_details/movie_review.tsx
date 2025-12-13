import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addReview } from "@/store/reviews_slice";
import { Colors, Fonts } from "@/constants/theme";

const EMPTY_REVIEWS: any[] = [];

interface MovieReviewsProps {
  imdbId: string;
}

export default function MovieReviews({ imdbId }: MovieReviewsProps) {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(
    (s) => s.reviews.byMovieId[imdbId] ?? EMPTY_REVIEWS
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
        <Pressable
          key={star}
          disabled={!onPress}
          onPress={() => onPress && onPress(star)}
          style={({ pressed }) => pressed && { opacity: 0.6 }}
        >
          <Text
            style={[
              styles.star,
              star <= value && styles.starActive,
            ]}
          >
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View style={styles.reviewsContainer}>
      <Text style={styles.reviewsHeader}>Umsagnir</Text>

      <Text style={styles.label}>Einkunn þín</Text>
      {renderStars(rating, setRating)}

      <Text style={styles.label}>Umsögn þín</Text>
      <TextInput
        style={styles.input}
        multiline
        value={reviewText}
        onChangeText={setReviewText}
        placeholder="Hvað fannst þér um þessa mynd?"
        placeholderTextColor="#999"
      />

      <Pressable
        disabled={!rating || !reviewText.trim() || submitting}
        onPress={handleSubmitReview}
        style={({ pressed }) => [
          styles.button,
          (!rating || !reviewText.trim() || submitting) && styles.buttonDisabled,
          pressed && { transform: [{ scale: 0.98 }] },
        ]}
      >
        <Text style={styles.buttonText}>
          {submitting ? "Sendi…" : "Senda umsögn"}
        </Text>
      </Pressable>

      {reviews.length === 0 ? (
        <Text style={styles.noReviewsText}>
          Engar umsagnir ennþá. Vertu fyrstur!
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
    marginTop: 6,
  },

  reviewsHeader: {
    fontSize: 22,
    fontFamily: Fonts.heading.bold,
    marginBottom: 16,
    color: Colors.default.secondary,
  },

  label: {
    fontSize: 14,
    fontFamily: Fonts.body.semibold,
    marginTop: 12,
    marginBottom: 6,
    color: Colors.default.secondary,
  },

  starsRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  star: {
    fontSize: 26,
    marginRight: 6,
    color: Colors.default.secondary,
  },

  starActive: {
    color: "#ffa600ff",
  },

  input: {
    borderWidth: 0.2,
    borderColor: Colors.default.secondary,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 96,
    textAlignVertical: "top",
    marginBottom: 12,
    fontFamily: Fonts.body.regular,
    fontSize: 14,
    color: Colors.default.secondary,
    backgroundColor: Colors.default.primary + "50",
  },

  button: {
    backgroundColor: Colors.default.action,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
  },

  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: Colors.default.action + "70",
  },

  buttonText: {
    color: Colors.default.primary,
    fontFamily: Fonts.body.semibold,
    fontSize: 15,
  },

  noReviewsText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: Fonts.body.regular,
    color: Colors.default.secondary,
  },

  reviewCard: {
    backgroundColor: Colors.default.background,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 0.2,
    borderColor: Colors.default.secondary,
  },

  reviewText: {
    marginTop: 6,
    fontSize: 14,
    fontFamily: Fonts.body.regular,
    color: Colors.default.secondary,
  },

  reviewMeta: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: Fonts.body.regular,
    color: Colors.default.secondary,
  },
});
