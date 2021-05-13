/**
Base Functions
**/

// variables
var btcPrice;
var ethPrice;
var bnbPrice;
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
    $('#alerts').prepend('<li id="alert-' + i + '" class="alert-item alert-' + obj.alertCoin + '"><div class="alert-content"><a href="https://www.coingecko.com/en/coins/' + obj.alertCoin + '" target="_blank" class="alert-coin" tabindex="-1" >' + obj.alertCoin + '</a><p class="alert-price"><span class="alert-current-price alert-current-' + obj.alertCoin + '"></span> Target: <span class="alert-target">$' + obj.alertPriceTarget + '</span></p></div><button class="alert-right alert-close" tabindex="-1" data-remove="' + obj.alertCoin + '" data-alert="alert-update"><svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.0607 8.06066C26.6464 7.47487 26.6464 6.52513 26.0607 5.93934C25.4749 5.35355 24.5251 5.35355 23.9393 5.93934L16 13.8787L8.06066 5.93934C7.47487 5.35355 6.52513 5.35355 5.93934 5.93934C5.35355 6.52513 5.35355 7.47487 5.93934 8.06066L13.8787 16L5.93934 23.9393C5.35355 24.5251 5.35355 25.4749 5.93934 26.0607C6.52513 26.6464 7.47487 26.6464 8.06066 26.0607L16 18.1213L23.9393 26.0607C24.5251 26.6464 25.4749 26.6464 26.0607 26.0607C26.6464 25.4749 26.6464 24.5251 26.0607 23.9393L18.1213 16L26.0607 8.06066Z" fill="#000A14"/></svg></button><a href="' + obj.alertURL + '" title="' + obj.alertURL + '" class="alert-right alert-link" tabindex="-1"><svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6577 6.34131C22.1831 6.34119 22.7034 6.44459 23.1889 6.64561C23.6744 6.84664 24.1155 7.14134 24.487 7.51288C24.8586 7.88443 25.1533 8.32553 25.3543 8.81101C25.5553 9.29647 25.6587 9.81679 25.6586 10.3422C25.6585 10.8677 25.5548 11.388 25.3536 11.8733C25.1523 12.3587 24.8574 12.7997 24.4857 13.1711L20.9497 16.7071C20.5783 17.0785 20.1373 17.3732 19.652 17.5742C19.1667 17.7752 18.6466 17.8787 18.1213 17.8787C17.596 17.8787 17.0758 17.7752 16.5905 17.5742C16.1052 17.3732 15.6643 17.0785 15.2928 16.7071C14.7071 16.1213 13.7573 16.1213 13.1715 16.7071C12.5857 17.2929 12.5857 18.2426 13.1715 18.8284C13.8215 19.4784 14.5932 19.994 15.4425 20.3458C16.2918 20.6976 17.202 20.8787 18.1213 20.8787C19.0405 20.8787 19.9508 20.6976 20.8 20.3458C21.6493 19.994 22.421 19.4784 23.071 18.8284L26.6061 15.2934C27.2563 14.6436 27.7727 13.8715 28.1248 13.0224C28.477 12.1729 28.6584 11.2625 28.6586 10.3429C28.6588 9.42341 28.4779 8.51285 28.1261 7.66328C27.7743 6.8137 27.2586 6.04177 26.6084 5.39156C25.9582 4.74136 25.1862 4.22563 24.3366 3.87384C23.4871 3.52205 22.5765 3.34109 21.657 3.34131C20.7375 3.34152 19.827 3.5229 18.9776 3.87509C18.1284 4.22718 17.3569 4.7431 16.7071 5.39337L15.2511 6.84937C14.6653 7.43516 14.6653 8.38491 15.2511 8.97069C15.8368 9.55648 16.7866 9.55648 17.3724 8.97069L18.8284 7.51469C19.1997 7.14298 19.6412 6.84757 20.1266 6.64633C20.612 6.44508 21.1322 6.34143 21.6577 6.34131Z" fill="#000A14"/><path d="M12.3479 14.4258C12.8332 14.2248 13.3534 14.1213 13.8787 14.1213C14.4039 14.1213 14.9241 14.2248 15.4094 14.4258C15.8947 14.6268 16.3356 14.9215 16.7071 15.2929C17.2929 15.8787 18.2426 15.8787 18.8284 15.2929C19.4142 14.7071 19.4142 13.7574 18.8284 13.1716C18.1784 12.5216 17.4067 12.006 16.5574 11.6542C15.7082 11.3024 14.7979 11.1213 13.8787 11.1213C12.9594 11.1213 12.0491 11.3024 11.1999 11.6542C10.3506 12.006 9.57892 12.5216 8.92891 13.1716L5.39387 16.7066C4.74359 17.3564 4.22718 18.1284 3.87509 18.9776C3.5229 19.827 3.34152 20.7375 3.34131 21.6571C3.34109 22.5766 3.52205 23.4871 3.87384 24.3367C4.22563 25.1863 4.74136 25.9582 5.39156 26.6084C6.04177 27.2586 6.8137 27.7744 7.66328 28.1262C8.51285 28.4779 9.42341 28.6589 10.3429 28.6587C11.2625 28.6585 12.1729 28.4771 13.0224 28.1249C13.8715 27.7728 14.6431 27.2569 15.2929 26.6066L16.7486 25.1508C17.3344 24.5651 17.3344 23.6153 16.7486 23.0295C16.1629 22.4437 15.2131 22.4437 14.6273 23.0295L13.1715 24.4853C12.8002 24.857 12.3587 25.1524 11.8733 25.3537C11.388 25.5549 10.8677 25.6586 10.3422 25.6587C9.81679 25.6588 9.29647 25.5554 8.81101 25.3544C8.32553 25.1534 7.88443 24.8587 7.51288 24.4871C7.14134 24.1156 6.84664 23.6745 6.64561 23.189C6.44459 22.7035 6.34119 22.1832 6.34131 21.6578C6.34143 21.1323 6.44508 20.612 6.64633 20.1267C6.84757 19.6413 7.14248 19.2003 7.5142 18.8289L11.0502 15.2929C11.4217 14.9215 11.8626 14.6268 12.3479 14.4258Z" fill="#000A14"/></svg></a></li>');
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
  chrome.storage.sync.get('bnbPrice', function(data) {
    // log the price for conversion
    document.getElementById('bnbPrice').innerHTML = data.bnbPrice;
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

  // when you open the popup, focus the init investment
  $('#init-investment').focus();

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

  // closing alerts
  $(document).on('click', '.alert-close', function() {
    var coin = $(this).data('remove');
    var alert = $(this).data('alert');
    console.log(alert);
    // remove the actual alert from the UI
    $('#' + alert).remove();
    // clear it from the api call
    ClearAlert(coin);
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
    var feedback = $('.input-desc');

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
          feedback.addClass('is-wrong').text("Try using 'Bitcoin', not 'BTC'. You can find the full names on Coingecko.");
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
        formatted = numeral(value).format('0,0[.]000000');
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

  // changing the currency on the trading view
  $(document).on('click', '.list-currency', function() {
    //get values
    var coin = $(this).data('currency');
    var entry = $('#entry-price');
    var exit = $('#exit-price');
    var input = $('#init-investment');
    var label = $('#label-currency');
    var current = $('#label-currency').text();

    // update the from attribute
    label.attr('data-from', current);

    // get the from value
    var from = label.data('from');

    // hide the dropdown
    $('#dropdown-currency').attr("hidden",true);
    // save your settings
    chrome.storage.local.set({ currency: coin });
    // format the placeholders
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
      case 'bnb':
        // change the placeholders
        $(input).attr('placeholder', '0.000001');
        $(entry).attr('placeholder', '0.0001');
        $(exit).attr('placeholder', '0.0001');
        break;
      default:
        // change the placeholders
        $(input).attr('placeholder', '1000.00');
        $(entry).attr('placeholder', '1.00');
        $(exit).attr('placeholder', '2.00');
    }

    // this one is not...
    console.log('before calculation from: ' + from);


    // convert the values
    convertCurrency(from, coin, input);
    convertCurrency(from, coin, entry);
    convertCurrency(from, coin, exit);
    // change the values ouput

    // populate the label
    label.text(coin);
    // change the value of from
    from = coin;

    // update the from attribute after the calculation is done
    label.data('from', from);

    // this one is updated
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
  var bnbPrice = $('#bnbPrice').text();
  var btcRate = 1 / btcPrice;
  var ethRate = 1 / ethPrice;
  var bnbRate = 1 / bnbPrice;

  // if you're going from btc
  switch (from) {
    // btc
    case 'btc':
      // now we figure out what you're going to
      switch (to) {
        // btc
        case 'btc':
          // do nothing
          break;
        // eth
        case 'eth':
          console.log('btc->eth');
          // calculate based on btc price
          conversion = ((value * btcPrice) / ethPrice);
          // format it
          output = numeral(conversion).format('0[.]00000000');
          // change the value within the field
          $(input).val(output);
          break;
        // bnb
        case 'bnb':
          console.log('btc->bnb');
          // calculate based on btc price
          conversion = ((value * btcPrice) / bnbPrice);
          // format it
          output = numeral(conversion).format('0[.]000000');
          // change the value within the field
          $(input).val(output);
          break;
        // usd
        default:
          console.log('going btc->usd');
          // calculate based on btc exchange rate
          conversion = ( value * btcPrice );
          // format it
          output = numeral(conversion).format('0,0[.]00');
          // change the value within the field
          $(input).val(output);
      }
      break;
    // eth
    case 'eth':
      // now we figure out what you're going to
      switch (to) {
        // btc
        case 'btc':
          console.log('eth->btc');
          // calculate based on btc price
          conversion = ((value * ethPrice) / btcPrice);
          // format it
          output = numeral(conversion).format('0[.]00000000');
          // change the value within the field
          $(input).val(output);
          break;
        // eth
        case 'eth':
        // do nothing
          break;
        // bnb
        case 'bnb':
          console.log('eth->bnb');
          // calculate based on btc price
          conversion = ((value * ethPrice) / bnbPrice);
          // format it
          output = numeral(conversion).format('0[.]000000');
          // change the value within the field
          $(input).val(output);
          break;
        // usd
        default:
          console.log('going eth->usd');
          // calculate based on btc exchange rate
          conversion = ( value * ethPrice );
          // format it
          output = numeral(conversion).format('0,0[.]00');
          // change the value within the field
          $(input).val(output);
      }
      break;
    // bnb
    case 'bnb':
      // now we figure out what you're going to
      switch (to) {
        // btc
        case 'btc':
          console.log('bnb->btc');
          // calculate based on btc price
          conversion = ((value * bnbPrice) / btcPrice);
          // format it
          output = numeral(conversion).format('0[.]00000000');
          // change the value within the field
          $(input).val(output);
          break;
        // eth
        case 'eth':
          console.log('bnb->eth');
          // calculate based on btc price
          conversion = ((value * bnbPrice) / ethPrice);
          // format it
          output = numeral(conversion).format('0[.]00000000');
          // change the value within the field
          $(input).val(output);
          break;
        // bnb
        case 'bnb':
        // do nothing
          break;
        // usd
        default:
          console.log('going bnb->usd');
          // calculate based on btc exchange rate
          conversion = ( value * bnbPrice );
          // format it
          output = numeral(conversion).format('0,0[.]00');
          // change the value within the field
          $(input).val(output);
      }
      break;
    // usd
    default:
      // now we figure out what you're going to
      switch (to) {
        // btc
        case 'btc':
          console.log('usd->btc');
          // calculate based on btc price
          conversion = (value * btcRate);
          // format it
          output = numeral(conversion).format('0[.]00000000');
          // change the value within the field
          $(input).val(output);
          break;
        // eth
        case 'eth':
          console.log('usd->eth');
          // calculate based on btc price
          conversion = (value * ethRate);
          // format it
          output = numeral(conversion).format('0[.]00000000');
          // change the value within the field
          $(input).val(output);
          break;
        // bnb
        case 'bnb':
          console.log('usd->bnb');
          // calculate based on btc price
          conversion = (value * bnbRate);
          // format it
          output = numeral(conversion).format('0[.]000000');
          // change the value within the field
          $(input).val(output);
          break;
        // usd
        default:
        // do nothing
      }
  }
}

// calculate a trade
function calculateTrade() {
  // get the values
  var usd = $('#init-investment').data('usd');
  var initInvestment = $('#init-investment').val().replace(/,/g , '');;
  var entryPrice = $('#entry-price').val().replace(/,/g , '');;
  var exitPrice = $('#exit-price').val().replace(/,/g , '');;
  var percentage = document.getElementById("tr-percentage");
  var total = $('#tr-total');
  var profit = $('#tr-profit');
  var logo = document.getElementById("logo");
  var container = document.getElementById('trade-calculator');

  // reset the monkey when you retype
  logo.className = "";
  // calculate the total
  totalReturn = (initInvestment / entryPrice) * exitPrice;
  // calculate the total profit
  var totalProfit = totalReturn - initInvestment;
  // calculate the percentage
  var profitLoss = (exitPrice / entryPrice) - 1;

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
  var percent = numeral(profitLoss).format('0%');

  percentage.innerHTML = percent;

  // as long as all three fields have values
  if ((entryPrice != '') && (exitPrice != '')) {
    // if you're in profit
    if (profitLoss > 0) {
        profitLoss = "+ " + profitLoss;
        percentage.className = "text-green";
        logo.className = "sunglasses";
        container.className = "trade-positive";

      // if you're in loss
    } else if (profitLoss < 0){
        percentage.className = "text-red";
        logo.className = "sad";
        container.className = "trade-negative";

      // if you break even
    } else {
        percentage.className = "";
        logo.className = "meh";
        container.className = "";
    }
  }
  // if the user removes text in one of them, reset it
  else {
    container.className = "";
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
        $('#alerts').prepend('<li id="alert-01" class="alert-item alert-' + coin + '"><div class="alert-content"><a href="https://www.coingecko.com/en/coins/' + coin + '" target="_blank" class="alert-coin" tabindex="-1" >' + coin + '</a><p class="alert-price"><span class="alert-current-' + coin + '"></span> Target: <span class="alert-target">' + price + '</span></p></div><button class="alert-remove alert-list-remove" tabindex="-1" data-remove="' + coin + '" data-alert="alert-update">x</button></li>');
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


function ClearAlert(coin) {

  console.log(coin);


  // remove any badge on the extension and make sure the gas shows again

  // remove the calls for the price from the API


}

// get the prices from your alerts

// when you click the alert, where does it go?
function onClickNotification(targetUrl) {
  chrome.tabs.create({
    url: targetUrl
  })
}
