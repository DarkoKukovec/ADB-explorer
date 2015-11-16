import Marionette from 'backbone.marionette';

import template from 'templates/layout.hbs';
import DevicesView from 'views/devices/main';

export default Marionette.LayoutView.extend({
  el: '.main',
  className: 'main-view',
  template,

  regions: {
    toolbarRegion: '.main__toolbar',
    sidebarRegion: '.main__sidebar',
    contentRegion: '.main__content',
    statusbarRegion: '.main__statusbar'
  },

  onRender() {
    this.toolbarRegion.show(new DevicesView());
  }
});
