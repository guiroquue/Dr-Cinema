// theaterService.ts
import { apiGet } from "./api";
import type { Theater } from "@/types/theatre";

export function fetchTheaters(baseUrl?: string, token?: string) {
  return apiGet("/theaters", baseUrl, token) as Promise<Theater[]>;
}

export function fetchTheaterById(
  theaterId: string,
  baseUrl?: string,
  token?: string
) {
  return apiGet(`/theaters/${theaterId}`, baseUrl, token) as Promise<Theater>;
}
