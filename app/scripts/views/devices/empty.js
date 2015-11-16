import Marionette from 'backbone.marionette';

import template from 'templates/devices/empty.hbs';

export default Marionette.ItemView.extend({
  template,
  tagName: 'paper-item'
});
