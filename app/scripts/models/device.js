import Backbone from 'backbone';

export default Backbone.Model.extend({
  load() {
    return this.collection.client.getProperties(this.id)
      .then((props) => this.props = props);
  },

  async getName() {
    if (!this.props) {
      await this.load();
    }
    var manufacturer = this.props['ro.product.manufacturer'];
    var model = this.props['ro.product.model'];
    return model.indexOf(manufacturer) ? manufacturer + ' ' + model : model;
  }
});
