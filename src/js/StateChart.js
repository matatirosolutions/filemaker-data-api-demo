'use strict';

import $ from "jquery";
import Chart from 'chart.js';


class StateChart {

    constructor(FileMakerDataAPI, layout) {
        this.api = FileMakerDataAPI;
        this.layout = layout;
    }

    initialiseConnection() {
        this.api.fetchToken(this.initialiseData.bind(this), this.constructor.handleError);
    }

    initialiseData() {
        this.fetchData();
        window.setInterval(this.refreshData.bind(this), 5000);
    }

    refreshData() {
        $('#loading').show();
        let data = {
            "query": [{"Column1": ">0"}],
            "script.prerequest": "SetStates"
        };
        this.api.performRequest('POST', this.layout + '/_find', data, this.receiveRefreshData.bind(this));
    }

    fetchData() {
        let data = {
            "query": [{"Column1": ">0"}],
            "script.prerequest": "SetStates"
        };
        this.api.performRequest('POST', this.layout + '/_find', data, this.receiveData.bind(this));
    }

    receiveRefreshData(data) {
        let dataSets = this.constructor.parseReceivedData(data.response.data);
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data = dataSets.datasets[0].data;
        });
        this.chart.update();
        $('#loading').hide();
    }

    receiveData(data) {
        let config = this.chartConfig(data.response.data),
            ctx = document.getElementById('canvas').getContext('2d');
        this.chart = new Chart(ctx, config);
        $('#loading').hide();
    }

    chartConfig(data) {
        return {
            type: 'line',
            data: this.constructor.parseReceivedData(data),
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Users by state'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'State'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Count'
                        }
                    }]
                },
                bezierCurve: false
            }
        }
    }

    static handleError(error) {
        console.info(error);
    }

    static parseReceivedData(data) {
        let labels = [],
            values = [];
        $.each(data, function(k, row) {
            labels.push(row.fieldData.Column1);
            values.push(row.fieldData.Column2);
        });

        return {
            labels: labels,
            datasets: [{
                label: 'Number users',
                backgroundColor: '#ff0000',
                borderColor: '#ff0000',
                data: values,
                fill: false,
                lineTension: 0,
            }]
        };
    }
}

export default StateChart;