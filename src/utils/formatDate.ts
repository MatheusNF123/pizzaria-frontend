function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}


function generateDate() {
  const dateFormat = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).split(' ');

  const time = dateFormat[1];
  const date = dateFormat[0].split('/').reverse().join("-").replace(',', '');
  const formattedDate = `${date}T${time}`;

  return formattedDate;
}

export { formatDate, generateDate }