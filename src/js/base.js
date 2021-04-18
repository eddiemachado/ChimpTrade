/**
Base Functions
**/


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


// check if help has been dismissed
chrome.storage.sync.get('tradingHelp', function(data) {
  // if they haven't removed it, then let's show it
  if (data.tradingHelp !== 'false') {
    // insert the help message
    $('#tab-1').prepend('<div id="help-trading"class="help onboarding"><button class="close" data-close="help-trading"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.295 7.705C15.9056 7.31564 15.2744 7.31564 14.885 7.705L12 10.59L9.115 7.705C8.72564 7.31564 8.09436 7.31564 7.705 7.705V7.705C7.31564 8.09436 7.31564 8.72564 7.705 9.115L10.59 12L7.705 14.885C7.31564 15.2744 7.31564 15.9056 7.705 16.295V16.295C8.09436 16.6844 8.72564 16.6844 9.115 16.295L12 13.41L14.885 16.295C15.2744 16.6844 15.9056 16.6844 16.295 16.295V16.295C16.6844 15.9056 16.6844 15.2744 16.295 14.885L13.41 12L16.295 9.115C16.6844 8.72564 16.6844 8.09436 16.295 7.705V7.705Z" fill="black" fill-opacity="0.4"/></svg></button><p>Use this to calculate a potential trade. New to trading? <a href="#">Learn more</a></p></div>');
  }
});


// check if help has been dismissed
chrome.storage.sync.get('marketcapHelp', function(data) {
  // if they haven't removed it, then let's show it
  if (data.marketcapHelp !== 'false') {
    // insert the help message
    $('#tab-2').prepend('<div id="help-marketcap" class="help onboarding"><button class="close" data-close="help-marketcap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.295 7.705C15.9056 7.31564 15.2744 7.31564 14.885 7.705L12 10.59L9.115 7.705C8.72564 7.31564 8.09436 7.31564 7.705 7.705V7.705C7.31564 8.09436 7.31564 8.72564 7.705 9.115L10.59 12L7.705 14.885C7.31564 15.2744 7.31564 15.9056 7.705 16.295V16.295C8.09436 16.6844 8.72564 16.6844 9.115 16.295L12 13.41L14.885 16.295C15.2744 16.6844 15.9056 16.6844 16.295 16.295V16.295C16.6844 15.9056 16.6844 15.2744 16.295 14.885L13.41 12L16.295 9.115C16.6844 8.72564 16.6844 8.09436 16.295 7.705V7.705Z" fill="black" fill-opacity="0.4"/></svg></button><p>Calculate the potential marketcap of a coin. <a href="https://www.youtube.com/watch?v=ziQwtcNUIaU">Learn more</a></p></div>');
  }
});

// check if help has been dismissed
chrome.storage.sync.get('alertHelp', function(data) {
  // if they haven't removed it, then let's show it
  if (data.alertHelp !== 'false') {
    // insert the help message
    $('#tab-3').prepend('<div id="help-pricealert" class="help onboarding"><button class="close" data-close="help-pricealert"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.295 7.705C15.9056 7.31564 15.2744 7.31564 14.885 7.705L12 10.59L9.115 7.705C8.72564 7.31564 8.09436 7.31564 7.705 7.705V7.705C7.31564 8.09436 7.31564 8.72564 7.705 9.115L10.59 12L7.705 14.885C7.31564 15.2744 7.31564 15.9056 7.705 16.295V16.295C8.09436 16.6844 8.72564 16.6844 9.115 16.295L12 13.41L14.885 16.295C15.2744 16.6844 15.9056 16.6844 16.295 16.295V16.295C16.6844 15.9056 16.6844 15.2744 16.295 14.885L13.41 12L16.295 9.115C16.6844 8.72564 16.6844 8.09436 16.295 7.705V7.705Z" fill="black" fill-opacity="0.4"/></svg></button><p>Setup price alerts for ongoing trades. Each notification can have a custom url.</p></div>');
  }
});




// update the price in the header based on the gas prices
function updatePrice() {
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
}





// check if help has been dismissed
chrome.storage.local.get('coinData', function(data) {

  // console.log('base.js: ' + data.length);

  var maxCoins = 500;

  // console.log('outside ' + data[2].id)

  var coinJSON = JSON.stringify(data);
  var coinData = coinJSON.slice(0, maxCoins);

  // console.log(coinData.length);

  // for each one
  for (var i = 0; i < coinData.length; i++) {
    var obj = coinData[i];

    // console.log('Symbol: ' + obj[i].symbol);

  } // for each one

}); // end get storage




// createAlert('BTC', '$29,039.00');
//chrome.notifications.onClicked.addListener(onClickNotification('https://google.com'));





// initial price update when you open the popup
updatePrice();


// functional javascript stuff
jQuery( document ).ready(function($) {


  // panels
  var panel1 = $('.panel-main');
  var panel2 = $('.panel-settings');
  var panel3 = $('.panel-donate');

  // show the donate panel
  $(document).on('click', '.btn-donate', function() {
    $('body').addClass('show-donate');
    return false;
  });

  // go back to the main page
  $(document).on('click', '.btn-go-main', function() {
    $('body').removeClass('show-donate');
    return false;
  });

  // show the main panel
  $(document).on('click', '.btn-back', function() {
    $('body').removeClass('show-settings');
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
    // remove current style
    $('.tab').removeClass('tab-current');
    // make this the current
    $(this).addClass('tab-current');
    // remove all the other tabs
    $('.tab-container').removeClass('is-visible');
    // change the tabs
    $('#' + targetTab).addClass('is-visible');
    return false;
  });


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




  // calculating the marketcap
  $("#select-coin").keyup(delay(function (e) {

    var search = this.value;
    var priceAPI = 'https://api.coingecko.com/api/v3/simple/price?ids=' + search + '&vs_currencies=usd';

    // calling the api
    fetch(priceAPI).then(function(res) {
      // wait for response
      if (res.status !== 200) {
        console.log('api refused the connection');
        return;
      }
      res.json().then(function(data) {



        $('#alert-price').val(data.usd);

        console.log(data[1].usd);


      });
    }).catch(function(err) {
      console.log('api gave an error: ' + err);
    });

    console.log('Time elapsed!', this.value + search);



  }, 500));

  // when i exit the field, then format it properly
  $(document).on('focusout', '.input-mc-live', function() {
    // get the value of what the user is typing
    var value = $(this).val();
    // format the value
    var formatted = numeral(value).format('0,0[.]00');
    // display the value formatted
    $(this).val(formatted);
  });



  // when i exit the field, then format it properly
  $(document).on('focusout', '.input-trade-live', function() {

    // only do this if you're calculating in usd
    if ($(this).data('currency') == 'usd') {
      // get the value of what the user is typing
      var value = $(this).val();
      // format the value
      var formatted = numeral(value).format('0,0[.]00');
      // display the value formatted
      $(this).val(formatted);
    }


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
    var btcPrice = '567079.39';
    var ethPrice = '24938.92';

    // hide the dropdown
    $('#dropdown-currency').attr("hidden",true);
    // set the parameter for the rest of the form
    chrome.storage.sync.set({ currency: coin });

    chrome.storage.sync.get('currency', function(data) {
      // display the values in the header
      console.log(data);
    });

    // populate the label
    $('#label-currency').text(coin);

    // convert the value
    convertCurrency('usd', 'btc', '#init-investment');

    // add the data attribute
    input.attr('data-currency', coin);


    return false;
  });



  // when clicking an element within a dropdown list
  $(document).on('click', '.list-coin', function() {

    var coin = $(this).data('coin').toUpperCase();
    var price = $(this).data('price');
    var img = $(this).data('image');

    // hide the dropdown
    $('#dropdown-coinlist').attr("hidden",true);

    // update the input
    $('#select-coin').val(coin);
    // set the data attribute that will show up in the alert
    $('#select-coin').data('name', coin);
    // set the data attribute on the select
    $('#alert-price').val(price);

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

    console.log(coin + ' & ' + price + ' & ' + url);

    // if the price isn't empty
    if (price != '') {
      // create the alert and store it
      createAlert(coin, price, url);
    } else {
      $('#alert-price').addClass('is-invalid');
      $('#alert-price').attr('placeholder' ,'Add a value');
      $(this).prop('disabled', true);
    }

    // then let's clear out the fields so that we can't spam them
    $('#alert-price').val('');
    $('#alert-url').val('');

    // if there is an alert, update the badge
    chrome.action.setBadgeText({text: 'Alert'});
    // make it red until the next time
    chrome.action.setBadgeBackgroundColor({ color: 'red' });

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
  mcCount = mcAnswer.text().trim().length;
  if (mcCount > '18') {
    $('#mc-label').text('MCap');
  } else {
    $('#mc-label').text('Marketcap');
  }
  // display the marketcap
  mcAnswer.text(numeral(output).format('$ 0,0'));

}

// convert
function convertCurrency(from, to, input) {

  var value = $(input).val();
  var conversion;
  var btcPrice = '569054.93';
  var ethPrice = '24059.93';

  console.log('value: ' + value);
  console.log('from: ' + from);
  console.log('to: ' + to);
  console.log('input: ' + input);

  // if you're going usd -> btc
  if ((from === 'usd') && (to === 'btc')) {

    console.log('usd->btc');
    console.log('btc price: ' + btcPrice);
    // calculate based on btc price
    conversion = (value / btcPrice);
    // format it
    output = numeral(conversion).format('0.00000000');
    // console.log(conversion);
    // change the value within the field
    $(input).val(output);
    // set the placeholders
    $(input).attr('placeholder', '0.00000001');
    // entry.attr('placeholder', '0.00000001');
    // exit.attr('placeholder', '0.00000001');
  }

  // if you're going usd -> eth
  else if ((from === 'usd') && (to === 'eth')) {

    console.log('usd->eth');
    console.log('eth price: ' + ethPrice);
    // calculate based on btc price
    conversion = (value / ethPrice);
    // format it
    output = numeral(conversion).format('0.00000000');
    // console.log(conversion);
    // change the value within the field
    $(input).val(output);
    // set the placeholders
    $(input).attr('placeholder', '0.00000001');
    // entry.attr('placeholder', '0.00000001');
    // exit.attr('placeholder', '0.00000001');

  }

  // if you're going btc -> eth
  else if ((from === 'btc') && (to === 'eth')) {

    console.log('btc->eth');
    console.log('eth price: ' + ethPrice);
    // calculate based on btc price
    conversion = (value / ethPrice);
    // format it
    output = numeral(conversion).format('0.00000000');
    // console.log(conversion);
    // change the value within the field
    $(input).val(output);
    // set the placeholders
    $(input).attr('placeholder', '0.00000001');
    // entry.attr('placeholder', '0.00000001');
    // exit.attr('placeholder', '0.00000001');

  }

  // if you're going eth -> btc
  else if ((from === 'eth') && (to === 'btc')) {

  }

  // if you're going btc -> usd
  else if ((from === 'btc') && (to === 'usd')) {

  }

  // if you're going eth -> usd
  else {

  }



}


// calculate a trade
function calculateTrade() {
  // get the values
  var currency = $('#init-investment').data('currency');
  var initInvestment = $('#init-investment').val().replace(/,/g , '');;
  var entryPrice = $('#entry-price').val().replace(/,/g , '');;
  var exitPrice = $('#exit-price').val().replace(/,/g , '');;
  var percentage = $("#tr-percentage");
  var total = $('#tr-total');
  var profit = $('#tr-profit');


  // calculate the total
  totalReturn = (initInvestment / entryPrice) * exitPrice;
  // calculate the total profit
  var totalProfit = totalReturn - initInvestment;
  // calculate the percentage
  var profitLoss = Math.round(((totalReturn - initInvestment) + Number.EPSILON) * 0.1) / 100;
  // var profitLoss = numeral(totalReturn - initInvestment).multiply('0.1');
  // var profitLoss = Math.floor((totalReturn / initInvestment) * 0.01)


  // if you're currency is btc
  if  (currency == 'btc') {

    // format the totals
    output = numeral(totalReturn).format('0.00000000');
    total.text(numeral(output).format('0.00000000'));
    profit.text(numeral(totalProfit).format('0.00000000'));


    console.log('in bitcoin');

  }

  // if you're currency is eth
  else if (currency == 'eth') {

    // format the totals
    output = numeral(totalReturn).format('0.00000000');
    total.text(numeral(output).format('0.00000000'));
    profit.text(numeral(totalProfit).format('0.00000000'));

    console.log('in eth');
  }

  // if your currency is usd
  else {

    console.log('in usd');

    // format the totals
    output = numeral(totalReturn).format('0,0.00');
    total.text(numeral(output).format('$0,0.00'));
    profit.text(numeral(totalProfit).format('$0,0.00'));



  }



  // display the percentage
  percentage.text(numeral(profitLoss).format('0%'));

  // if you're in profit
  if (profitLoss > 0) {
      profitLoss = "+" + profitLoss;
      percentage.removeClass("text-red");
      percentage.addClass("text-green");

    // if you're in loss
  } else if (profitLoss < 0){
      percentage.removeClass("text-green");
      percentage.addClass("text-red");

    // if you break even
  } else {
      percentage.removeClass("text-red");
      percentage.removeClass("text-green");
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



function createAlert(coin, price, url) {
  // send it to chrome
  chrome.notifications.create({
      // function when the alert is created
      type: 'basic',
      iconUrl: 'src/img/32.png',
      title: coin + ' Price Alert',
      message: coin + ' has hit the target price of ' + price
    }
  )

  $('#alerts').prepend('<li id="alert-01" class="alert-item"><div class="alert-content"><p class="alert-coin">' + coin + '</p><p class="alert-price">Target: <span class="alert-target">' + price + '</span></p></div><button class="alert-remove">Remove</button></li>');

}

// when you click the alert, where does it go?
function onClickNotification(targetUrl) {
  chrome.tabs.create({
    url: targetUrl
  })
}
