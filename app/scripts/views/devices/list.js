import Marionette from 'backbone.marionette';

import data from 'services/data';
import DeviceItemView from 'views/devices/item';
import DeviceEmptyView from 'views/devices/empty';

export default Marionette.CollectionView.extend({
  collection: data.devices,
  childView: DeviceItemView,
  emptyView: DeviceEmptyView,

  tagName: 'paper-menu',
  className: 'dropdown-content',

  onRender() {
    this.$el.attr('selected', 1);
  }
});
