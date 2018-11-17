const locationContainerElement = document.querySelector('.location-container');;
const locationInput = locationContainerElement.querySelector('#location');

locationInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  if (searchTerm.length > 1) {
    getLocations(searchTerm)
      .catch(showError)
      .then(showLocationResults);
  } else {
    removeLocationResults();
  }
});

function showLocationResults(locationResults) {
  const locationResultsElement = createLocationResultsElement(locationResults);
  updateLocationResults(locationResultsElement);
}

function updateLocationResults(newLocationResultsElement) {
  removeLocationResults();
  locationContainerElement.appendChild(newLocationResultsElement);
}

function removeLocationResults() {
  const oldLocationResultsElement = document.querySelector('.location-results');
  if (oldLocationResultsElement) {
    locationContainerElement.removeChild(oldLocationResultsElement);
  }
}

function showError() {
  return {
    docs: [
      { name: 'An error has ocurred, try again later' }
    ],
    numFound: 0
  };
}
