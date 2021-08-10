const form = document.querySelector("form");

const search = document.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  //  grab element  with id

  const messageone = document.querySelector("#message-one");
  const messagetwo = document.querySelector("#message-two");

  // messages
  messageone.textContent = "Loading... ";
  messagetwo.textContent = " ";

  // added the fetch api
  fetch("/weather/?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageone.textContent = data.error;
      } else {
        messageone.textContent = data.Forecast;
        messagetwo.textContent = data.place;
      }
    });
  });
});
