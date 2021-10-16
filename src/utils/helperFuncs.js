export const formatDate = (date) => {
  const time = new Date(date).getTime();
  let diff = (new Date().getTime() - time) / 1000;
  let unit;
  const obj = formatDiffString(diff);
  unit = obj.unit;
  diff = obj.diff;

  return `${diff} ${unit} ago`;
}
export const formatDiffString = (d, u = 'second') => {
  let unit = u;
  let diff = d;
  if (diff >= 60) {
    // convert to minutes
    diff /= 60;
    unit = "minute";
    if (diff >= 60) {
      // '' hours
      diff /= 60;
      unit = "hour";
      if (diff >= 24) {
        // '' days
        diff /= 24;
        unit = "day";
        if (diff >= 30) {
          // '' months
          diff /= 30;
          unit = "month";
          if (diff >= 12) {
            // '' years
            diff /= 12;
            unit = "year";
          }
        }
      }
    }
  }
  diff = parseInt(diff);
  if (diff !== 1) unit += "s";
  return { diff, unit };
}