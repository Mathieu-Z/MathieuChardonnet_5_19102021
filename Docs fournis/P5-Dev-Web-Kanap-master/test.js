updateDisplay(
    fetch().then(function(response) {
    response.text().then(function(text) {
      poemDisplay.textContent = text;
    });
  }));
