export function formatDateIS(dateStr?: string) {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");

  const monthsIS = [
    "janúar",
    "febrúar",
    "mars",
    "apríl",
    "maí",
    "júní",
    "júlí",
    "ágúst",
    "september",
    "október",
    "nóvember",
    "desember"
  ];

  const mIndex = Number(month) - 1;
  const monthName = monthsIS[mIndex] ?? "";

  return `${Number(day)}. ${monthName} ${year}`;
}
