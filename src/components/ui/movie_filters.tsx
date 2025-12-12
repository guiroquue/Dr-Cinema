import React from "react";
import { View, TextInput, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/constants/theme";

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

      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Síur</Text>

        <Pressable onPress={onClose}>
          <Ionicons name="close" size={28} color={Colors.default.secondary} />
        </Pressable>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Mynd títill"
        value={filters.title}
        onChangeText={(t) => setFilters({ ...filters, title: t })}
        placeholderTextColor={Colors.default.secondary}
      />

      <TextInput
        style={styles.input}
        placeholder="Nafn leikara"
        value={filters.actors}
        onChangeText={(t) => setFilters({ ...filters, actors: t })}
        placeholderTextColor={Colors.default.secondary}
      />

      <TextInput
        style={styles.input}
        placeholder="Nafn leikstróra"
        value={filters.directors}
        onChangeText={(t) => setFilters({ ...filters, directors: t })}
        placeholderTextColor={Colors.default.secondary}
      />

      <TextInput
        style={styles.input}
        placeholder="PG rating (e.g. PG, PG-13 or R)"
        value={filters.pgRating}
        onChangeText={(t) => setFilters({ ...filters, pgRating: t })}
        placeholderTextColor={Colors.default.secondary}
      />

      <Text style={styles.label}>IMDb Einkunn</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Lámark"
          placeholderTextColor={Colors.default.secondary}
          keyboardType="numeric"
          value={filters.imdb.min}
          onChangeText={(t) =>
            setFilters({ ...filters, imdb: { ...filters.imdb, min: t } })
          }
        />
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Hámark"
          placeholderTextColor={Colors.default.secondary}
          keyboardType="numeric"
          value={filters.imdb.max}
          onChangeText={(t) =>
            setFilters({ ...filters, imdb: { ...filters.imdb, max: t } })
          }
        />
      </View>

      <Text style={styles.label}>Rotten Tómatar</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Lámark"
          placeholderTextColor={Colors.default.secondary}
          keyboardType="numeric"
          value={filters.rotten.min}
          onChangeText={(t) =>
            setFilters({ ...filters, rotten: { ...filters.rotten, min: t } })
          }
        />
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Hámark"
          placeholderTextColor={Colors.default.secondary}
          keyboardType="numeric"
          value={filters.rotten.max}
          onChangeText={(t) =>
            setFilters({ ...filters, rotten: { ...filters.rotten, max: t } })
          }
        />
      </View>

      {/* Buttons — EXACTLY as you had them */}
      <View style={styles.buttonsRow}>
        <Pressable style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetText}>Hreinsa</Text>
        </Pressable>

        <Pressable style={styles.applyBtn} onPress={onApply}>
          <Text style={styles.applyText}>Skoða</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
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
    fontFamily: Fonts.body.semibold,
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 8,
    fontSize: 12,
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
    backgroundColor: Colors.default.secondary,
  },
  resetText: {
    fontSize: 16,
    color: Colors.default.primary,
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
