import 'babel-core/polyfill';

import 'services/init';
import data from 'services/data';
// import router from 'routers/main';

import LayoutView from 'views/layout';

data.devices.on('add', (device) => console.log('Added device', device));
data.devices.on('remove', (device) => console.log('Removed device', device));

var layout = new LayoutView();
layout.render();
