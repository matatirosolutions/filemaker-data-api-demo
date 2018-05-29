'use strict';

import $ from "jquery";


class FileMakerDataAPI {

    constructor(config) {
        this.config = config
    }

    fetchToken(success, error) {
        let that = this;
        let jqDeferred = $.ajax
        ({
            type: "POST",
            url: this.config.server + '/fmi/data/v1/databases/' + this.config.database + '/sessions',
            dataType: 'json',
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(that.config.username + ":" + that.config.password));
                xhr.setRequestHeader("Content-Type", "application/json");
            }
        });

        jqDeferred.then(function(resp) {
            that.token = resp.response.token;
            success(resp);
        }, function(xhrObj, textStatus, err) {
            error(err);
        });
    }


    performRequest(method, url, data, success, error) {
        let that = this;
        let jqDeferred = $.ajax
        ({
            type: method,
            url: this.config.server + '/fmi/data/v1/databases/' + this.config.database + '/layouts/' + url,
            dataType: 'json',
            async: true,
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + that.token);
                xhr.setRequestHeader("Content-Type", "application/json");
            }
        });

        jqDeferred.then(function(resp) {
            success(resp);
        }, function(xhrObj, textStatus, err) {
            error(err);
        });
    }

}

export default FileMakerDataAPI;