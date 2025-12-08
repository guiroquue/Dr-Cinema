export function groupMoviesByMonth(movies: any[]) {
  const monthsIS = [
    "Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní",
    "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"
  ];

  const sections: { title: string; data: any[] }[] = [];

  movies.forEach((movie) => {
    const date = movie["release-dateIS"];
    if (!date) return;

    const [year, month] = date.split("-");
    const monthName = `${monthsIS[Number(month) - 1]} ${year}`;

    let section = sections.find((s) => s.title === monthName);
    if (!section) {
      section = { title: monthName, data: [] };
      sections.push(section);
    }

    section.data.push(movie);
  });

  return sections;
}
