import Marionette from 'backbone.marionette';

import data from 'services/data';
import DeviceListView from 'views/devices/list';

import template from 'templates/devices/main.hbs';

export default Marionette.LayoutView.extend({
  template,

  regions: {
    listRegion: 'paper-dropdown-menu'
  },

  onRender() {
    this.listRegion.show(new DeviceListView());
  }
});
