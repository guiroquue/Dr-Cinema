import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoriteMovie } from "@/store/favorites_slice";

const KEY = "favorites";

export async function saveFavorites(favorites: FavoriteMovie[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(favorites));
}

export async function loadFavorites(): Promise<FavoriteMovie[]> {
  const val = await AsyncStorage.getItem(KEY);
  return val ? JSON.parse(val) : [];
}
