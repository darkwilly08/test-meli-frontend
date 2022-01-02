export const onlyDecimalPart = (n, fixedPositions) => {
  n = Math.abs(n); // Change to positive
  return (n - Math.floor(n)).toFixed(fixedPositions).substring(2);
};

export const toLocale = (n) => {
  let lang = navigator.language;
  if (lang === "es") {
    lang = "es-AR"; //the harcode is due to CLDR definition about thousand separator - https://st.unicode.org/cldr-apps/v#/es/Symbols/70ef5e0c9d323e01
  }
  return new Intl.NumberFormat(lang).format(n);
};
