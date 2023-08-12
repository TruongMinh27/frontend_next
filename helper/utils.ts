export const getFormatedStringFromDays = (numberOfDays: number) => {
  const years = Math.floor(numberOfDays / 365);
  const months = Math.floor((numberOfDays % 365) / 30);
  const days = Math.floor((numberOfDays % 365) % 30);

  const yearsDisplay =
    years > 0 ? years + (years == 1 ? " năm " : " năm ") : "";
  const monthsDisplay =
    months > 0 ? months + (months == 1 ? " tháng " : " tháng ") : "";
  const daysDisplay = days > 0 ? days + (days == 1 ? " ngày " : " ngày") : "";
  return yearsDisplay + monthsDisplay + daysDisplay;
};
