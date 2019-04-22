define(['jquery'],
function($) {
    
    function asyncRequest(ajaxObject) {
        if (ajaxObject) {
            return $.ajax(ajaxObject);
        }
    }
    
    function getRestData(url, data, successCallback, errorCallback) {
        const ajaxObject = {
            async: true,
            contentType: 'application/vnd.oracle.adf.resourceitem+json',
            data,
            error: errorCallback,
            success: successCallback,
            type: 'GET',
            url
        };
        return asyncRequest(ajaxObject);
    }
    
    return {
        getRestData
    };
    
});