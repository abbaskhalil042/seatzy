export function compareDates(departureTime: any, arrivalTime: any) {
  const d = new Date(departureTime);
  const a = new Date(arrivalTime);
  return a.getTime() > d.getTime();
}
