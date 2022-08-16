const localStorageKey = 'non_profit_referrer';

function parseURL() {
    var params = window.location.search.substring(1);
    if (!params) {
        return {};
    }
    return JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}

function tryUtmReferrer(params) {
    const utmParameters = {
        "147620": {
            name: "ACLU",
            revenueShare: 20,
            id: "147620"
        },
        "51234": {
            name: "YMCA",
            revenueShare: 30,
            id: "51234"
        }
    };
    // Check whether the URL contains a UTM source parameter and if the utm_source is
    // recognized, return the dictionary associated with the UTM source
    if ('utm_source' in params && params['utm_source'] in utmParameters) {
        return utmParameters[params['utm_source']];
    } else {
        return null;
    }
}

function getReferrerFromURL(){
    const urlParams = parseURL();
    var paramHash = tryUtmReferrer(urlParams);
    // When more referrer configurations are used, will add new tryXReferrer methods
    if (!paramHash) {
        return null;
    }
    window.localStorage.setItem(localStorageKey, JSON.stringify(paramHash));
    return paramHash;
}

function getReferrerFromStorage(){
    var referrerObjectFromStorage;
    try {
        referrerObjectFromStorage = JSON.parse(window.localStorage.getItem(localStorageKey));
    } catch (e) {
        return null;
    }
    return validateReferrerObject(referrerObjectFromStorage) ? referrerObjectFromStorage : null;
}

function validateReferrerObject(referrerObject) {
    return !!referrerObject && typeof(referrerObject) === 'object' && 'name' in referrerObject && 'revenueShare' in referrerObject && 'id' in referrerObject;
}

function populateBanner(){
    var referrerObject = getReferrerFromURL();
    referrerObject = !!referrerObject ? referrerObject : getReferrerFromStorage();

    // if referrerObject doesn't have a valid value, it probably means there wasn't a nonprofit referrer
    if (!referrerObject || !validateReferrerObject(referrerObject)) {
        console.log("no nonprofit referrer")
        return null;
    }

    const referrerName = referrerObject.name;
    const referrerPercentRevenueShare = referrerObject.revenueShare;

    // Grab cart value from html attribute
    var cartTotal;
    try {
        cartTotal = parseFloat(document.getElementById("dataDiv").dataset.cartTotal);
    } catch (e) {
        return null;
    }

    // Need to multiply by .01 to convert percent to decimal
    var referrerRevenue = parseFloat(cartTotal * referrerPercentRevenueShare * 0.01).toFixed(2);

    if (cartTotal > 0){
        document.getElementById("proceeds").innerHTML = '$' + referrerRevenue;
        document.getElementById("recipient").innerHTML = referrerName;
    } else {
        document.getElementById("revenueSharePercentage").innerHTML = referrerPercentRevenueShare + '%';
        document.getElementById("potentialRecipient").innerHTML = referrerName;
    }

    // This is last because we don't want to show the banner unless every value is set correctlys
    document.getElementById("banner").style.display = "inline";

}

window.onload = function() {
    populateBanner();
};
