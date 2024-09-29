document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", () => {
    const inputValue = textInput.value.trim();
    if (!inputValue) {
      window.alert("Please enter a location");
      return;
    }

    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?key=7KBMQELFBJZ46DVCSC5GLRPGZ`,
      { mode: "cors" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const { currentConditions } = data;
        document.getElementById("res").innerText = currentConditions.conditions;
        document.getElementById("tym").innerText = new Date(
          currentConditions.datetime
        ).toLocaleString();

        document.getElementById(
          "add"
        ).innerText = `${currentConditions.humidity}%`;
      })
      .catch((err) => {
        window.alert("Incorrect Location or Failed to fetch data");
        console.error(err);
      });
  });
});
