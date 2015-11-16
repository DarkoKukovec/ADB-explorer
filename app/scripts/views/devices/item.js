import Marionette from 'backbone.marionette';

import template from 'templates/devices/item.hbs';

export default Marionette.ItemView.extend({
  template,

  ui: {
    $name: '.device-item__name'
  },

  className: 'device-item',
  tagName: 'paper-item',

  async onRender() {
    await this.model.load();
    this.ui.$name.text(await this.model.getName());
  }
});
