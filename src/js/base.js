/**
Base Functions
**/

// variables
var btcPrice;
var ethPrice;
var currency;

// first get the color scheme if they've chosen one
chrome.storage.sync.get('theme', function(data) {
  // get the variables
  var lightToggle = document.getElementById('light-mode');
  var darkToggle = document.getElementById('dark-mode');
  // if it's dark
  if (data.theme !== 'light') {
    lightToggle.classList.remove('active');
    darkToggle.classList.add('active');
    document.body.setAttribute('data-theme', 'dark');
  } else {
    darkToggle.classList.remove('active');
    lightToggle.classList.add('active');
    document.body.setAttribute('data-theme', 'light');
  }
});

// get your preferred currency
chrome.storage.local.get('currency', function(data) {
  // display the values in the header
  console.log('currenty currency: ' + data.currency);
  var entry = $('#entry-price');
  var exit = $('#exit-price');
  var input = $('#init-investment');
  // populate the label
  $('#label-currency').text(data.currency);
  $('#label-currency').attr('data-from', data.currency);
  // set it on the form
  switch (data.currency) {
    case 'btc':
      // change the placeholders
      $(input).attr('placeholder', '0.00000001');
      $(entry).attr('placeholder', '0.00001');
      $(exit).attr('placeholder', '0.00001');
      break;
    case 'eth':
      // change the placeholders
      $(input).attr('placeholder', '0.00000001');
      $(entry).attr('placeholder', '0.00001');
      $(exit).attr('placeholder', '0.00001');
      break;
    default:
      // change the placeholders
      $(input).attr('placeholder', '1000.00');
      $(entry).attr('placeholder', '1.00');
      $(exit).attr('placeholder', '2.00');
  }
});

// check if help has been dismissed
chrome.storage.sync.get('tradingHelp', function(data) {
  // if they haven't removed it, then let's show it
  if (data.tradingHelp !== 'false') {
    // insert the help message
    $('#tab-1').prepend('<div id="help-trading"class="help onboarding"><button class="close" data-close="help-trading"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.295 7.705C15.9056 7.31564 15.2744 7.31564 14.885 7.705L12 10.59L9.115 7.705C8.72564 7.31564 8.09436 7.31564 7.705 7.705V7.705C7.31564 8.09436 7.31564 8.72564 7.705 9.115L10.59 12L7.705 14.885C7.31564 15.2744 7.31564 15.9056 7.705 16.295V16.295C8.09436 16.6844 8.72564 16.6844 9.115 16.295L12 13.41L14.885 16.295C15.2744 16.6844 15.9056 16.6844 16.295 16.295V16.295C16.6844 15.9056 16.6844 15.2744 16.295 14.885L13.41 12L16.295 9.115C16.6844 8.72564 16.6844 8.09436 16.295 7.705V7.705Z" fill="black" fill-opacity="0.4"/></svg></button><p>Use this to calculate a potential trade.<br /><strong>Investment:</strong> is how much you put in<br /><strong>Entry:</strong> is the price you\'re buying at<br /><strong>Exit:</strong> is your sell target</p></div>');
  }
});

// check if help has been dismissed
chrome.storage.sync.get('marketcapHelp', function(data) {
  // if they haven't removed it, then let's show it
  if (data.marketcapHelp !== 'false') {
    // insert the help message
    $('#tab-2').prepend('<div id="help-marketcap" class="help onboarding"><button class="close" data-close="help-marketcap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.295 7.705C15.9056 7.31564 15.2744 7.31564 14.885 7.705L12 10.59L9.115 7.705C8.72564 7.31564 8.09436 7.31564 7.705 7.705V7.705C7.31564 8.09436 7.31564 8.72564 7.705 9.115L10.59 12L7.705 14.885C7.31564 15.2744 7.31564 15.9056 7.705 16.295V16.295C8.09436 16.6844 8.72564 16.6844 9.115 16.295L12 13.41L14.885 16.295C15.2744 16.6844 15.9056 16.6844 16.295 16.295V16.295C16.6844 15.9056 16.6844 15.2744 16.295 14.885L13.41 12L16.295 9.115C16.6844 8.72564 16.6844 8.09436 16.295 7.705V7.705Z" fill="black" fill-opacity="0.4"/></svg></button><p>Calculate the potential marketcap of a coin. <a href="https://www.youtube.com/watch?v=ziQwtcNUIaU" tabindex="-1">Why this matters</a></p></div>');
  }
});

// check if help has been dismissed
chrome.storage.sync.get('alertHelp', function(data) {
  // if they haven't removed it, then let's show it
  if (data.alertHelp !== 'false') {
    // insert the help message
    $('#tab-3').prepend('<div id="help-pricealert" class="help onboarding"><button class="close" data-close="help-pricealert"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.295 7.705C15.9056 7.31564 15.2744 7.31564 14.885 7.705L12 10.59L9.115 7.705C8.72564 7.31564 8.09436 7.31564 7.705 7.705V7.705C7.31564 8.09436 7.31564 8.72564 7.705 9.115L10.59 12L7.705 14.885C7.31564 15.2744 7.31564 15.9056 7.705 16.295V16.295C8.09436 16.6844 8.72564 16.6844 9.115 16.295L12 13.41L14.885 16.295C15.2744 16.6844 15.9056 16.6844 16.295 16.295V16.295C16.6844 15.9056 16.6844 15.2744 16.295 14.885L13.41 12L16.295 9.115C16.6844 8.72564 16.6844 8.09436 16.295 7.705V7.705Z" fill="black" fill-opacity="0.4"/></svg></button><p>Setup price alerts for ongoing trades and point them to an exchange.</p></div>');
  }
});

// check if we have any alerts & build the list
chrome.storage.local.get('alerts', function(data) {
  for (var i = 0; i < data.alerts.length; i++) {
    var obj = data.alerts[i];
    // add the alerts to the list
    $('#alerts').prepend('<li id="alert-' + i + '" class="alert-item alert-' + obj.alertCoin + '"><div class="alert-content"><a href="https://www.coingecko.com/en/coins/' + obj.alertCoin + '" target="_blank" class="alert-coin">' + obj.alertCoin + '</a><p class="alert-price">Target: <span class="alert-target">' + obj.alertPriceTarget + '</span></p></div><button class="alert-remove" tabindex="-1">x</button></li>');
  } // for each one
});

// update the price in the header based on the gas prices
function updatePrices() {
  chrome.storage.sync.get('slow', function(data) {
    // display the values in the header
    document.getElementById('gas-slow').innerHTML = data.slow;
  });
  chrome.storage.sync.get('normal', function(data) {
    // display the values in the header
    document.getElementById('gas-normal').innerHTML = data.normal;
  });
  chrome.storage.sync.get('fast', function(data) {
    // display the values in the header
    document.getElementById('gas-fast').innerHTML = data.fast;
  });
  chrome.storage.sync.get('btcPrice', function(data) {
    // log the price for conversion
    document.getElementById('btcPrice').innerHTML = data.btcPrice;
  });
  chrome.storage.sync.get('ethPrice', function(data) {
    // log the price for conversion
    document.getElementById('ethPrice').innerHTML = data.ethPrice;
  });

}

// pull the coin info for the top 20 in marketcap
function PopulateMarketCap() {
  // check if help has been dismissed
  chrome.storage.local.get({ coins: []}, function(data) {
    // make it easier to read
    var coinData = JSON.stringify(data);
    //console.log('Get from storage: ' + coinData)
    // for each one
    for (var i = 0; i < data.coins.length; i++) {
      var obj = data.coins[i];
      // build the list
      var item = '<div class="mc-item"><div class="mc-left"><img class="mc-image" src="' + obj.image + '" alt="' + obj.name + '" /><div class="mc-coin-name"><a href="https://www.coingecko.com/en/coins/' + obj.id + '" class="mc-item-name" target="_blank" tabindex="-1">' + obj.name + '</a><span class="mc-item-small tabular">' + numeral(obj.current_price).format('$0,0[.]00') + '</span></div></div> <div class="mc-right"><span class="mc-item-mc tabular">' + numeral(obj.market_cap).format('$0,0[.]00') + '</span><span class="mc-item-small tabular">Circ. Supply: ' + numeral(obj.circulating_supply).format('0,0') + '</span></div></div>';
      // append it to the container
      $('#mc-list').append(item);
    } // for each one
  }); // end get storage
}

// initial price update & marketcap list when you open the popup
updatePrices();
PopulateMarketCap();


// functional javascript stuff
jQuery( document ).ready(function($) {

  // go back to the main page
  $(document).on('click', '.btn-go-main', function() {
    $('body').removeClass('show-donate');
    return false;
  });
  // copy to clipboard
  $(document).on('click', '.btn-copy', function() {
    copyHash();
    return false;
  });
  // change tabs
  $(document).on('click', '.tab', function() {
    // get the proper tab
    var targetTab = $(this).data('tab');
    var logo = document.getElementById('logo');
    // remove current style
    $('.tab').removeClass('tab-current');
    // make this the current
    $(this).addClass('tab-current');
    // remove all the other tabs
    $('.tab-container').removeClass('is-visible');
    // change the tabs
    $('#' + targetTab).addClass('is-visible');
    // make the first input focused
    $('#' + targetTab + ' .first-focus').focus();
    // change the monkey face
    if (targetTab == 'tab-2') {
      logo.className = "happy";
    }
    else if (targetTab == 'tab-3') {
      logo.className = "something";
    }
    else if (targetTab == 'tab-0') {
      logo.className = "donate";
    }
    else {
      logo.className = "";
    }
    return false;
  });

  //
  // keyups and typing functions
  //

  // calculating the trade
  $(document).on('keyup', '.input-trade-live', function() {
    // run the calculation
    calculateTrade();
  });
  // calculating the marketcap
  $(document).on('keyup', '.input-mc-live', function() {
    // run the calculation
    calculateMarketCap();
  });

  //
  // calculations
  //

  // getting the coin data from the API
  $(document).on('keyup', '#select-coin', delay(function(e) {

    var search = this.value;
    var priceAPI = 'https://api.coingecko.com/api/v3/simple/price?ids=' + search + '&vs_currencies=usd&include_market_cap=false';
    var validator = $('#coin-validator');

    // calling the api
    fetch(priceAPI).then(function(res) {
      // wait for response
      if (res.status !== 200) {
        console.log('api refused the connection');
        return;
      }
      res.json().then(function(data) {

        var coinName = Object.keys(data)[0];
        // if your entry exists
        if (coinName) {
          // enable the fields when we have the data
          $('.alert-fetch-input, #btn-create-alert').removeAttr('disabled');
          // the data we get back
          console.log(data);
          $('#alert-price').val(data[coinName].usd);
          validator.removeClass('coin-error');
          validator.addClass('coin-found');
        }
        // if there's no match
        else {
          // disable the fields when we don't have the data
          $('.alert-fetch-input, #btn-create-alert').attr('disabled', true);
          validator.removeClass('coin-found');
          validator.addClass('coin-error');
          console.log("Empty return, show error message");
        }

      });
    }).catch(function(err) {
      console.log('api gave an error: ' + err);
    });



  }, 300));

  // when i exit the field, then format it properly
  $(document).on('focusout', '.input-mc-live, .input-target-live', function() {

    // get the value of what the user is typing
    var value = $(this).val();
    // format the value
    var formatted = numeral(value).format('0,0[.]00');
    // display the value formatted
    $(this).val(formatted);


  });

  // when i exit the field, then format it properly
  $(document).on('focusout', '.input-trade-live', function() {

    // get the value of what the user is typing
    var value = $(this).val();
    var formatted;
    var currency = $('#label-currency').text();
    // format the input
    if( value.length ) {
      // format the content
      if (currency == 'usd') {
        // format the value
        formatted = numeral(value).format('0,0[.]00');
      }
      // or it's eth or btc
      else {
        // format the value
        formatted = numeral(value).format('0.00000000');
      }
    }
    // if it's still empty
    else {
    }
    // display the value formatted
    $(this).val(formatted);
  });

  // display the coin select drop down
  $(document).on('click', '.dropdown-trigger', function() {
    // get the dropdown from the data attribute
    var dropdown = $(this).data('dropdown');
    // show the dropdown
    $('#' + dropdown).attr("hidden",false);
    return false;
  });

  // when clicking an element within a dropdown list
  $(document).on('click', '.list-currency', function() {
    //get values
    var coin = $(this).data('currency');
    var entry = $('#entry-price');
    var exit = $('#exit-price');
    var input = $('#init-investment');

    // update the from attribute
    $('#label-currency').attr('data-from', $('#label-currency').text());
    // get the from value
    var from = $('#label-currency').data('from');

    // hide the dropdown
    $('#dropdown-currency').attr("hidden",true);
    // save your settings
    chrome.storage.local.set({ currency: coin });
    // set it on the form
    switch (coin) {
      case 'btc':
        // change the placeholders
        $(input).attr('placeholder', '0.00000001');
        $(entry).attr('placeholder', '0.00001');
        $(exit).attr('placeholder', '0.00001');
        break;
      case 'eth':
        // change the placeholders
        $(input).attr('placeholder', '0.00000001');
        $(entry).attr('placeholder', '0.00001');
        $(exit).attr('placeholder', '0.00001');
        break;
      default:
        // change the placeholders
        $(input).attr('placeholder', '1000.00');
        $(entry).attr('placeholder', '1.00');
        $(exit).attr('placeholder', '2.00');
    }

    console.log(from + ' -> ' + coin + ' ' + input);

    console.log('before calculation from: ' + from);
    // convert the values
    convertCurrency(from, coin, input);
    // populate the label
    $('#label-currency').text(coin);
    // update the from attribute after the calculation is done
    $('#label-currency').attr('data-from', coin);

    console.log('after calculation from: ' + from);
    return false;
  });



  /***
  Onboarding & Help alerts
  ***/

  // closing the trading help
  $(document).on( 'click', '.close[data-close="help-trading"]', function() {
    // remove it
    $('#help-trading').remove();
    // set that it's been removed
    chrome.storage.sync.set({ tradingHelp: 'false' });
  });
  // closing the marketcap help
  $(document).on( 'click', '.close[data-close="help-marketcap"]', function() {
    // remove it
    $('#help-marketcap').remove();
    // set that it's been removed
    chrome.storage.sync.set({ marketcapHelp: 'false' });
  });
  // closing the set price alert help
  $(document).on( 'click', '.close[data-close="help-pricealert"]', function() {
    // remove it
    $('#help-pricealert').remove();
    // set that it's been removed
    chrome.storage.sync.set({ alertHelp: 'false' });
  });


  // theme selector
  $(document).on( 'click', '.btn-theme', function() {
    var theme = $('body').data('theme');
    var btn = $(this).data('theme');
    // if you click on the light theme
    if (btn == 'light') {
      // set the theme
      chrome.storage.sync.set({ theme: 'light' });
      $('.dark-mode').removeClass('active');
      $('.light-mode').addClass('active');
      $('body').attr('data-theme','light');
    }
    // if you click on the dark theme
    else if (btn == 'dark') {
      // set the theme
      chrome.storage.sync.set({ theme: 'dark' });
      $('.light-mode').removeClass('active');
      $('.dark-mode').addClass('active');
      $('body').attr('data-theme','dark');
    }
    return false;
  });


  // create an alert
  $(document).on('click', '#btn-create-alert', function() {

    var coin = $('#select-coin').val();
    var price = $('#alert-price').val();
    var url = $('#alert-url').val();

    // console.log(coin + ' & ' + price + ' & ' + url);

    // if the price isn't empty
    if (price != '') {
      // create the alert and store it
      CreateAlert(coin, price, url);
    } else {
      $('#alert-price').addClass('is-invalid');
      $('#alert-price').attr('placeholder' ,'Add a value');
      $(this).prop('disabled', true);
    }

    // then let's clear out the fields so that we can't spam them
    $('#alert-price').val('');
    $('#alert-url').val('');

    return false;
  });

  // once you start to type in an invalid field, we remove it
  $(document).on('keyup', '.input.is-invalid', function() {
      $('#alert-price').removeClass('is-invalid');
      $('#btn-create-alert').prop('disabled', false);
  });




}); /* end on document ready */


// delay for the API search
function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

// calculate a coins marketcap
function calculateMarketCap() {
  // get input values
  var targetPrice = numeral($('#mc-target').val());
  var circulating = $('#mc-circ-supply').val().replace(/,/g , '');
  var mcCount;
  var mcAnswer = $('#mc-est-mc');
  // calculate the estimated marketcap
  output = targetPrice.multiply(circulating);
  // display the marketcap
  mcAnswer.text(numeral(output).format('$ 0,0'));

}

// convert
function convertCurrency(from, to, input) {
  // get the value of what was inputted
  var value = $(input).val().replace(/,/g , '');
  var conversion;
  var btcPrice = $('#btcPrice').text();
  var ethPrice = $('#ethPrice').text();
  var btcRate = 1 / btcPrice;
  var ethRate = 1 / ethPrice;

  // if you aren't swapping
  if (from === to) {
    // do nothing
    return;
  }
  // if you're going usd -> btc
  else if ((from === 'usd') && (to === 'btc')) {
    console.log('going usd->btc');
    console.log('Exchange rate: ' + btcRate);
    // calculate based on btc exchange rate
    conversion = ( value * btcRate );
    // format it
    output = numeral(conversion).format('0[.]00000000');
    // change the value within the field
    $(input).val(output);
  }

  // if you're going usd -> eth
  else if ((from === 'usd') && (to === 'eth')) {
    console.log('going usd->eth');
    console.log('Exchange rate: ' + ethRate);
    // calculate based on btc exchange rate
    conversion = ( value * ethRate );
    // format it
    output = numeral(conversion).format('0[.]00000000');
    // change the value within the field
    $(input).val(output);
  }

  // if you're going btc -> eth
  else if ((from === 'btc') && (to === 'eth')) {

    console.log('btc->eth');

    // calculate based on btc price
    conversion = (value / ethPrice);
    // format it
    output = numeral(conversion).format('0[.]00000000');
    // console.log(conversion);
    // change the value within the field
    $(input).val(output);

  }

  // if you're going eth -> btc
  else if ((from === 'eth') && (to === 'btc')) {

    console.log('going eth->btc');
    // convert it to usd first
    usdValue = ( value * 200 );
    // calculate based on btc price
    conversion = (value / btcPrice);
    // format it
    output = numeral(conversion).format('0[.]00000000');
    // console.log(conversion);
    // change the value within the field
    $(input).val(output);

  }

  // if you're going btc -> usd
  else if ((from === 'btc') && (to === 'usd')) {
    console.log('going btc->usd');
    console.log('Exchange rate: ' + btcRate);
    // calculate based on btc exchange rate
    conversion = ( value * btcPrice );
    // format it
    output = numeral(conversion).format('0,0[.]00');
    // change the value within the field
    $(input).val(output);
  }

  // if you're going eth -> usd
  else {
    console.log('going eth->usd');
    console.log('Exchange rate: ' + ethRate);
    // calculate based on btc exchange rate
    conversion = ( value * ethPrice );
    // format it
    output = numeral(conversion).format('0,0[.]00');
    // change the value within the field
    $(input).val(output);
  }
}

// calculate a trade
function calculateTrade() {
  // get the values
  var usd = $('#init-investment').data('usd');
  var initInvestment = $('#init-investment').val().replace(/,/g , '');;
  var entryPrice = $('#entry-price').val().replace(/,/g , '');;
  var exitPrice = $('#exit-price').val().replace(/,/g , '');;
  var percentage = $("#tr-percentage");
  var total = $('#tr-total');
  var profit = $('#tr-profit');
  var logo = document.getElementById("logo");

  // reset the monkey when you retype
  logo.className = "";
  // calculate the total
  totalReturn = (initInvestment / entryPrice) * exitPrice;
  // calculate the total profit
  var totalProfit = totalReturn - initInvestment;
  // calculate the percentage
  var profitLoss = Math.round(((totalReturn - initInvestment) + Number.EPSILON) * 0.1) / 100;
  // var profitLoss = numeral(totalReturn - initInvestment).multiply('0.1');
  // var profitLoss = Math.floor((totalReturn / initInvestment) * 0.01)

  // get your preferred currency
  chrome.storage.local.get('currency', function(data) {
    // the currency we have set
    var currency = data.currency;
    // how we show our profits
    switch (currency) {
      case 'btc':
        // format the totals
        output = numeral(totalReturn).format('0.00000000');
        total.text(numeral(output).format('0.00000000') + ' BTC');
        profit.text(numeral(totalProfit).format('0.00000000') + ' BTC');
        break;
      case 'eth':
        // format the totals
        output = numeral(totalReturn).format('0.00000000');
        total.text(numeral(output).format('0.00000000') + ' ETH');
        profit.text(numeral(totalProfit).format('0.00000000') + ' ETH');
        break;
      default:
        // format the totals
        output = numeral(totalReturn).format('0,0[.]00');
        total.text(numeral(output).format('$ 0,0[.]00'));
        profit.text(numeral(totalProfit).format('$ 0,0[.]00'));
    } // end switch
  }); // end get currency from local storage

  // display the percentage
  percentage.text(numeral(profitLoss).format('0%'));

  // if you're in profit
  if (profitLoss > 0) {
      profitLoss = "+" + profitLoss;
      percentage.removeClass("text-red");
      percentage.addClass("text-green");
      logo.className = "sunglasses";

    // if you're in loss
  } else if (profitLoss < 0){
      percentage.removeClass("text-green");
      percentage.addClass("text-red");
      logo.className = "sad";

    // if you break even
  } else {
      percentage.removeClass("text-red");
      percentage.removeClass("text-green");
      logo.className = "meh";
  }

}

// copy to clipboard
function copyHash() {
  // get the value
  var copyText = document.getElementById("address");
  copyText.select();
  // For mobile devices
  copyText.setSelectionRange(0, 99999);
  // Copy the text inside the text field
  document.execCommand("copy");
}

// format the field
function formatValue(toCurrency) {

}


// when you click the create alert button
function CreateAlert(coin, price, url) {
  // by passing an object you can define default values e.g.: []
  chrome.storage.local.get({ alerts: [] }, function (data) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    var alerts = data.alerts;
    // add the new alert to the list
    alerts.push({ alertCoin: coin, alertPriceTarget: price, alertURL: url });

    // set the new array value to the same key
    chrome.storage.local.set({ alerts: alerts }, function () {
        // add the alerts to the list
        $('#alerts').prepend('<li id="alert-01" class="alert-item alert-' + coin + '"><div class="alert-content"><a href="https://www.coingecko.com/en/coins/' + coin + '" target="_blank" class="alert-coin">' + coin + '</a><p class="alert-price">Target: <span class="alert-target">' + price + '</span></p></div><button class="alert-remove" tabindex="-1">x</button></li>');
    });
  });
}

function ShowAlert(coin, price, url) {
  // send it to chrome
  chrome.notifications.create({
      // function when the alert is created
      type: 'basic',
      iconUrl: 'src/img/32.png',
      title: coin + ' Price Alert',
      message: coin + ' has hit the target price of ' + price
  });
  // make it clickable
  chrome.notifications.onClicked.addListener(onClickNotification(url));
}



// when you click the alert, where does it go?
function onClickNotification(targetUrl) {
  chrome.tabs.create({
    url: targetUrl
  })
}
