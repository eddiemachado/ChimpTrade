


// get the price via the API
chrome.runtime.sendMessage({name: "fetchPrice"}, (response) => {

  console.log(response);

});

console.log('app.js loaded');
