/***
File: Background Functions
Author: Rainbow Sprinkles
These can't reference the dom at all and only exist to support the extension in the background
***/

// catch errors
try {

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

    // let's check to see if there's been an alert
    chrome.storage.sync.get('alertActive', function(data) {
      // display the values in the header
      console.log(data);
      // if there's an active alert
      if ( data.alertActive == 'true') {
        // show the alert badge
        chrome.action.setBadgeText({text: 'Alert'});
        chrome.action.setBadgeBackgroundColor({ color: 'red' });
        // don't update the gas price
        return;
      }
      // show the updated gas price
      getGasPrice();
    });
  });

  // let's check your alerts and see if it's time yet
  function CheckAlertPrices() {



  }

  // get the coin list for the marketcaps
  function GetCoinData() {
    // the gas api
    const apiCall = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10';
    // calling the api
    fetch(apiCall).then(function(res) {
      // wait for response
      if (res.status !== 200) {
        console.log('api refused the connection');
        return;
      }
      res.json().then(function(data) {
        // console.log('Background API Call: ' + coinData);
        chrome.storage.local.set({ coins: data });
      });
    }).catch(function(err) {
      console.log('api gave an error: ' + err);
    });
  }

  // get the coin list of all alerts (btc & eth are defaults)
  function GetAlertData() {
    // the gas api
    const apiCall = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd&include_market_cap=false';
    // calling the api
    fetch(apiCall).then(function(res) {
      // wait for response
      if (res.status !== 200) {
        console.log('api refused the connection');
        return;
      }
      res.json().then(function(data) {
        // console.log(data);
        // push that prices into storage
        chrome.storage.sync.set({ btcPrice: data.bitcoin.usd });
        chrome.storage.sync.set({ ethPrice: data.ethereum.usd });
        
      });
    }).catch(function(err) {
      console.log('api gave an error: ' + err);
    });
  }


  // initial calls when you start the extension
  GetCoinData();
  getGasPrice();
  GetAlertData();
  // se the initial currency to used
  chrome.storage.sync.set({ currency: 'usd' });

}
catch(e) {


  // output errors from service worker
  console.log(e);



} // end try
