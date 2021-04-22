var api = 'https://api.binance.com';

var pairTextField = document.getElementById('pair');
var amountNumberField = document.getElementById('amount');
var amountLabel = document.getElementById('amountLabel');
var amountRange = document.getElementById('amountRange');
var timeFrameOption = document.getElementById('timeFrame');
var emaRibbonSetting = document.getElementById('EMA_Ribbon');
var stopLossNumberField = document.getElementById('trailingStopLoss');

var exchangeInfo;
var minQuoteAssetAmount = 0;
var maxQuoteAssetAmount = 0;
var price = 0;

var pairList = [];

$('#create-bot-button').on('click', function () {
    $.ajax({
        url: api + '/api/v3/exchangeInfo',
        contentType: 'application/x-www-form-urlencoded',
        success: function (response) {
            console.log(response);
            exchangeInfo = response;
            response.symbols.forEach(element => {
                pairList.push(element.symbol);
            });
        }
    });
});

$('#pair').on('focusout', function () {
    pairTextField.value = pairTextField.value.toUpperCase().trim();

    exchangeInfo.symbols.forEach(element => {
        if (element.symbol == pairTextField.value) {
            amountLabel.innerHTML = 'Amount (' + element.quoteAsset + ')';

            minQuoteAssetAmount = parseFloat(element.filters[3].minNotional);
            switch (element.quoteAsset) {
                case 'BTC':
                    maxQuoteAssetAmount = amountBTC;
                    amountRange.disabled = false;
                    break;
                case 'USDT':
                    maxQuoteAssetAmount = amountUSDT;
                    amountRange.disabled = false;
                default:
                    amountRange.disabled = true;
                    break;
            }
        }
    });
});

//  OldRange = (OldMax - OldMin)  
//  NewRange = (NewMax - NewMin)  
//  NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin
$('#amountRange').on('input', function () {
    amountNumberField.value = parseFloat(((amountRange.value * (maxQuoteAssetAmount - minQuoteAssetAmount)) / 100) + minQuoteAssetAmount).toFixed(8);
});

$('#submitCreateBotForm').on('click', function () {
    validateCreateBotForm();
    $.ajax({
        url: '/bot/createBot/',
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken
        },
        data: {
            "pair": pairTextField.value.toString(),
            "amount": amountNumberField.value.toString(),
            "timeFrame": timeFrameOption.value.toString(),
            "settings": {
                "emaRibbon": "true"
            },
            "stopLoss": stopLossNumberField.value.toString()
        },
        success: function (response) {
            console.log('Bot Created');
            console.log(response);
            $('#createBotModal').modal('hide');
        }
    });
});

$('#pair').autocomplete({
    source: pairList,
    appendTo: '#suggestionResult',
    classes: {
        "ui-autocomplete": "highlight"
    },
    select: function (event, ui) {
        pairTextField.value = ui.value;
    }
});

function validateCreateBotForm() {
    var pairFlag = false;

    if (pairTextField.value == "" || amountNumberField.value == "" || stopLossNumberField.value == "") {
        alert("Field Empty");
        return false;
    }

    exchangeInfo.symbols.forEach(element => {
        if (element.symbol == pairTextField.value) {
            pairFlag = true;
            return;
        }
    });
    if (!pairFlag) {
        alert('Invalid Pair');
        return false;
    }

    if (!((amountNumberField.value > minQuoteAssetAmount) && (amountNumberField.value < maxQuoteAssetAmount))) {
        alert('Invalid amount');
        return false;
    }

    if (stopLossNumberField.value <= 0) {
        alert('Invalid Stop Loss');
        return false;
    }
}