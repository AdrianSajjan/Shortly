const InitializeResult = () => {
  //window.localStorage.removeItem("previous-results");
  let previousResults = window.localStorage.getItem("previous-results");
  if (previousResults != null) {
    previousResults = JSON.parse(previousResults);
    previousResults.forEach(result => {
      let _innerHTML = `<div class="result">
            <p class="result__input">
            ${result.url}
            </p>
            <p class="result__output">
            ${baseURL}/${result.hashid}
            </p>
            <button class="result__copy" onclick="HandleCopy(this)">Copy</button>
        </div>`;
      resultSection.innerHTML += _innerHTML;
    });
  }
};

const IndexExists = index => {
  let indexFound = false;
  if (
    typeof Storage != "undefined" &&
    window.localStorage.getItem("previous-results") != null
  ) {
    allResults = JSON.parse(window.localStorage.getItem("previous-results"));
    allResults.forEach(result => {
      if (result.url == index) indexFound = true;
    });
  }

  return indexFound;
};

const StoreResults = result => {
  if (typeof Storage != "undefined") {
    allResults = new Array();
    let previousResults = window.localStorage.getItem("previous-results");
    if (previousResults != null) allResults = JSON.parse(previousResults);
    allResults.push(result);
    console.log(allResults);
    window.localStorage.setItem("previous-results", JSON.stringify(allResults));
  }
};

InitializeResult();
