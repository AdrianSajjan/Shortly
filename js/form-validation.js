const docForm = document.querySelector(".form");
const docInput = document.querySelector(".form__input");
const formError = document.querySelector(".form__error");

const resultSection = document.querySelector(".results");

const baseURL = "https://rel.ink";
const baseAPI = "https://rel.ink/api/links/";
const websiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/gi;

let inputURL = "";
let canSubmitForm = true;

const ResetFormError = () => {
  formError.classList.add("hide");
  formError.innerHTML = "";
};

const AjaxCall = (url, methodType, body) => {
  canSubmitForm = false;
  return new Promise((resolve, reject) => {
    const xHTTP = new XMLHttpRequest();
    xHTTP.open(methodType, url, true);
    xHTTP.setRequestHeader("Content-Type", "application/json");
    xHTTP.send(body);

    xHTTP.onreadystatechange = () => {
      if (xHTTP.readyState == 4) {
        if ((xHTTP.status = 200)) {
          const response = JSON.parse(xHTTP.responseText);
          resolve(response);
        } else {
          reject(xHTTP.status);
        }
      }
    };
  });
};

const ShowResult = response => {
  canSubmitForm = true;
  const hashID = response.hashid;
  const finalURL = `${baseURL}/${hashID}`;
  const userURL = response.url;

  const innerHTML = `<div class="result">
    <p class="result__input">
    ${userURL}
    </p>
    <p class="result__output">
    ${finalURL}
    </p>
    <button class="result__copy" onclick="HandleCopy(this)">Copy</button>
  </div>`;

  resultSection.innerHTML += innerHTML;

  StoreResults(response);
};

const HandleCopy = event => {
  targetText = event.previousElementSibling.innerHTML;
  let tempInput = document.createElement("Input");
  document.body.appendChild(tempInput);
  tempInput.value = targetText;
  tempInput.select();
  document.execCommand("Copy");
  document.body.removeChild(tempInput);
  alert("Copied!");
};

const HandleError = error => {
  console.log(error);
  formError.classList.remove("hide");
  formError.innerHTML = error;
};

const HandleSubmit = event => {
  event.preventDefault();
  if (!canSubmitForm) {
    formError.classList.remove("hide");
    formError.innerHTML = "Previous Result being processed!";
    return;
  } else {
    ResetFormError();
  }

  if (inputURL.length == 0) {
    formError.classList.remove("hide");
    formError.innerHTML = "Please add a link.";
  } else if (!inputURL.match(websiteRegex)) {
    formError.classList.remove("hide");
    formError.innerHTML = "Please add a valid URL.";
  } else {
    ResetFormError();

    if (!inputURL.includes("https://")) {
      if (inputURL.includes("http://"))
        inputURL = inputURL.slice(0, 5) + "s" + inputURL.slice(5);
      else inputURL = `https://${inputURL}`;
    }

    if (IndexExists(inputURL)) {
      formError.classList.remove("hide");
      formError.innerHTML = "URL already exists";
    } else {
      ResetFormError();
      const body_raw = {
        url: inputURL
      };
      const body = JSON.stringify(body_raw);
      AjaxCall(baseAPI, "POST", body).then(ShowResult, HandleError);
    }
  }
};

const HandleChange = event => {
  inputURL = event.target.value;
};

docForm.addEventListener("submit", HandleSubmit);
docInput.addEventListener("keyup", HandleChange);
