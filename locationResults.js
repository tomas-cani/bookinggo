function createLocationResultsElement(locationResults) {
  const locationResultsElement = document.createElement('ul');
  locationResultsElement.classList.add('location-results');

  if (locationResults.numFound > 0) {
    locationResults.docs.map(createLocationResultElement)
    .forEach(locationResultElement => locationResultsElement.appendChild(locationResultElement));  
  } else {
    locationResultsElement.appendChild(createNotFoundElement(locationResults.docs[0]));
  }

  return locationResultsElement;
}

function createLocationResultElement(locationResult) {
  const locationResultElementItem = document.createElement('li');
  locationResultElementItem.classList.add('location-result');
  const locationResultElement = document.createElement('a');

  const locationResultTypeElement = createLocationResultTypeElement(locationResult.placeType);
  locationResultElement.appendChild(locationResultTypeElement);
  const locationResultTextElement = createLocationResultTextElement(locationResult);
  locationResultElement.appendChild(locationResultTextElement);

  locationResultElementItem.appendChild(locationResultElement);

  return locationResultElementItem;
}

function createNotFoundElement(notFound) {
  const notFoundElementItem = document.createElement('li');
  notFoundElementItem.classList.add('location-result');
  notFoundElementItem.classList.add('not-found');

  const notFoundElement = document.createElement('div');
  const notFoundTextElement = document.createTextNode(notFound.name);
  notFoundElement.appendChild(notFoundTextElement);

  notFoundElementItem.appendChild(notFoundElement);
  return notFoundElementItem;
}

function createLocationResultTypeElement(placeType) {
  const placeTypeNames = {
    'A': 'airport', 
    'C': 'city', 
    'D': 'district', 
    'F': 'region', 
    'G': 'place', 
    'P': 'region', 
    'S': 'station', 
    'T': 'station'
  };
  const placeTypeName = placeTypeNames[placeType];

  const locationResultTypeElement = document.createElement('span');
  locationResultTypeElement.classList.add('location-result-type');
  locationResultTypeElement.classList.add(placeTypeName);

  locationResultTypeElement.appendChild(document.createTextNode(capitalize(placeTypeName)));
  return locationResultTypeElement;
}

function createLocationResultTextElement(locationResult) {
  const locationResultTextElement = document.createElement('div');
  locationResultTextElement.classList.add('location-result-text');

  const locationResultNameElement = createLocationResultNameElement(locationResult);
  const locationResultCityElement = createLocaltionResultCityElement(locationResult);

  locationResultTextElement.appendChild(locationResultNameElement);
  locationResultTextElement.appendChild(locationResultCityElement);
  return locationResultTextElement;
}

function createLocaltionResultCityElement(locationResult) {
  const locationResultCityElement = document.createElement('span');
  locationResultCityElement.classList.add('location-result-city');

  const locationZone = locationResult.city || locationResult.region;
  const city = `${locationZone ? locationZone + ', ' : ''} ${locationResult.country}`;
  locationResultCityElement.appendChild(document.createTextNode(city));

  return locationResultCityElement;
}

function createLocationResultNameElement(locationResult) {
  const locationResultName = locationResult.placeType === 'A' ? 
  `${locationResult.name} (${locationResult.iata})` : locationResult.name;
  return document.createTextNode(locationResultName);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}