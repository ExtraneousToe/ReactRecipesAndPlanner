async function requestApi(apiUrl, callback) {
    // make the request
    await fetch(apiUrl, {
        accept: "application/json",
    })
        // when it comes back, check the status
        .then(checkStatus)
        // if that goes well, parse the response
        .then(parseJsonResponse)
        // then give it back via the callback
        .then(callback);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        // the response code is in the 'good' range
        return response;
    }

    // is was bad, throw an error
    const error = new Error(`HTTP Error: ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}

function parseJsonResponse(response) {
    return response.json();
}

const ApiClient = { requestApi };
export default ApiClient;
