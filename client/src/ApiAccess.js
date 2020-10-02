function get(apiUrl, callback) {
    // make the request
    return (
        fetch(apiUrl, {
            accept: "application/json",
        })
            // when it comes back, check the status
            .then(checkStatus)
            // if that goes well, parse the response
            .then(parseJsonResponse)
            // then give it back via the callback
            .then(callback)
    );
}

function checkStatus(response) {
    console.log(response);
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

function put(apiUrl, data, callback) {
    return fetch(apiUrl, {
        method: "PUT", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

function post(apiUrl, data, callback) {
    return fetch(apiUrl, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

function del(apiUrl, data, callback) {
    console.log(data);
    return (
        fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            // when it comes back, check the status
            .then(checkStatus)
            // if that goes well, parse the response
            .then(parseJsonResponse)
            // then give it back via the callback
            .then(callback)
    );
}

const ApiClient = { get, put, post, del };
export default ApiClient;
