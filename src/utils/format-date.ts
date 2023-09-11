export default function formatDate(date: Date): string {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString();
}
