
export function formatDate(dateInput: string | Date): string {
  const date = new Date(dateInput);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); 
  const year = date.getFullYear();

  const getOrdinal = (n: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  return `${day}${getOrdinal(day)}, ${month} ${year}`;
}


