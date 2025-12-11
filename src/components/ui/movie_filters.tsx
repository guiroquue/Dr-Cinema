import React from "react";
import { View, TextInput, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

// ✅ Only addition you needed
export const DEFAULT_FILTERS = {
  title: "",
  actors: "",
  directors: "",
  pgRating: "",
  imdb: { min: "", max: "" },
  rotten: { min: "", max: "" },
  showtime: { from: "", to: "" },
};

type Props = {
  filters: any;
  setFilters: (v: any) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
};

export default function MovieFilters({ filters, setFilters, onApply, onReset, onClose }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Close */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Filters</Text>

        <Pressable onPress={onClose}>
          <Ionicons name="close" size={28} color={Colors.default.secondary} />
        </Pressable>
      </View>

      {/* Title */}
      <TextInput
        style={styles.input}
        placeholder="Movie title"
        value={filters.title}
        onChangeText={(t) => setFilters({ ...filters, title: t })}
        placeholderTextColor={Colors.default.secondary}
      />

      {/* Actors */}
      <TextInput
        style={styles.input}
        placeholder="Actor names"
        value={filters.actors}
        onChangeText={(t) => setFilters({ ...filters, actors: t })}
        placeholderTextColor={Colors.default.secondary}
      />

      {/* Directors */}
      <TextInput
        style={styles.input}
        placeholder="Director names"
        value={filters.directors}
        onChangeText={(t) => setFilters({ ...filters, directors: t })}
        placeholderTextColor={Colors.default.secondary}
      />

      {/* PG Rating */}
      <TextInput
        style={styles.input}
        placeholder="PG rating (e.g. PG-13)"
        value={filters.pgRating}
        onChangeText={(t) => setFilters({ ...filters, pgRating: t })}
        placeholderTextColor={Colors.default.secondary}
      />

      {/* IMDb */}
      <Text style={styles.label}>IMDb Rating</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Min"
          placeholderTextColor={Colors.default.secondary}
          keyboardType="numeric"
          value={filters.imdb.min}
          onChangeText={(t) =>
            setFilters({ ...filters, imdb: { ...filters.imdb, min: t } })
          }
        />
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Max"
          placeholderTextColor={Colors.default.secondary}
          keyboardType="numeric"
          value={filters.imdb.max}
          onChangeText={(t) =>
            setFilters({ ...filters, imdb: { ...filters.imdb, max: t } })
          }
        />
      </View>

      {/* Rotten Tomatoes */}
      <Text style={styles.label}>Rotten Tomatoes</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Min"
          placeholderTextColor={Colors.default.secondary}
          keyboardType="numeric"
          value={filters.rotten.min}
          onChangeText={(t) =>
            setFilters({ ...filters, rotten: { ...filters.rotten, min: t } })
          }
        />
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Max"
          placeholderTextColor={Colors.default.secondary}
          keyboardType="numeric"
          value={filters.rotten.max}
          onChangeText={(t) =>
            setFilters({ ...filters, rotten: { ...filters.rotten, max: t } })
          }
        />
      </View>

      {/* Showtime */}
      <Text style={styles.label}>Showtime</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="From"
          placeholderTextColor={Colors.default.secondary}
          value={filters.showtime.from}
          onChangeText={(t) =>
            setFilters({ ...filters, showtime: { ...filters.showtime, from: t } })
          }
        />
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="To"
          placeholderTextColor={Colors.default.secondary}
          value={filters.showtime.to}
          onChangeText={(t) =>
            setFilters({ ...filters, showtime: { ...filters.showtime, to: t } })
          }
        />
      </View>

      {/* Buttons — EXACTLY as you had them */}
      <View style={styles.buttonsRow}>
        <Pressable style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>

        <Pressable style={styles.applyBtn} onPress={onApply}>
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetBtn: {
    padding: 12,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    backgroundColor: Colors.default.primary,
  },
  resetText: {
    fontSize: 16,
  },
  applyBtn: {
    padding: 12,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    backgroundColor: Colors.default.action,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
  },
});
