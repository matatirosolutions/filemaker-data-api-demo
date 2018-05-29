
import FileMakerDataAPI from "./FileMakerDataAPI";
import StateChart from "./StateChart";
require('../css/index.css');

let fmConnection = new FileMakerDataAPI({
    'server': 'https://fms17.msdev.co.uk',
    'username': 'DataAPIReadOnly',
    'password': 'Qwerty1!',
    'database': 'ITG01Demo',
});

let chart = new StateChart(fmConnection, 'VirtualList');
chart.initialiseConnection();
