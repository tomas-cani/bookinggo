const baseEndpoint = 'https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6'

function getLocations(searchTerm) {
  const solrTerm = `solrTerm=${searchTerm}`;
  const fullEndpoint = `${baseEndpoint}&${solrTerm}`;
  return fetch(fullEndpoint)
    .then(response => response.json())
    .then(jsonResponse => jsonResponse.results);
}
