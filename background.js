/***
File: Background Functions
Author: Rainbow Sprinkles
These can't reference the dom at all and only exist to support the extension in the background
***/

// catch errors
try {

  // setting the variable to collect coin data
  var coinData = [];

  // the hunt for gas prices
  function getGasPrice() {
    // the gas api
    const apiCall = 'https://gasprice-proxy.herokuapp.com/provider/ethgaswatch';
    // calling the api
    fetch(apiCall).then(function(res) {
      // wait for response
      if (res.status !== 200) {
        response({slow: 'ERR',normal: 'ERR',fast: 'ERR'});
        // console.log('API Error');
        return;
      }
      res.json().then(function(data) {
        // Store the current data for the popup page
        chrome.storage.sync.set({ slow: data.slow.gwei });
        chrome.storage.sync.set({ normal: data.normal.gwei });
        chrome.storage.sync.set({ fast: data.fast.gwei });
        // update the badge with the normal value
        chrome.action.setBadgeText({text: String(data.normal.gwei)});
        // if the gas is high, show it in red
        chrome.action.setBadgeBackgroundColor({ color: '#252525' });
      });
    }).catch(function(err) {
      // console.log('api gave an error: ' + err);
    });
  } // end get gas price function


  // set a timer to update the gas
  chrome.alarms.create('update_gas',{
    "periodInMinutes": 2
  });

  // when the alarm hits, then run the function
  chrome.alarms.onAlarm.addListener(alarm => {
    getGasPrice();
    // show the new price in the badge
    chrome.action.setBadgeText({text: 'Alert'});
    chrome.action.setBadgeBackgroundColor({ color: 'red' });

  });

  // get the coin list and store it in local storage
  function GetCoinData() {
    // the gas api
    const apiCall = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false';
    // calling the api
    fetch(apiCall).then(function(res) {
      // wait for response
      if (res.status !== 200) {
        console.log('api refused the connection');
        return;
      }
      res.json().then(function(data) {
        // push it to the variable
        coinData.push(data);
        // push that variable into the local storage
        chrome.storage.local.set({ coinData });
      });
    }).catch(function(err) {
      console.log('api gave an error: ' + err);
    });
  }


  // initial calls when you start the extension
  GetCoinData();
  getGasPrice();

}
catch(e) {


  // output errors from service worker
  console.log(e);



} // end try
