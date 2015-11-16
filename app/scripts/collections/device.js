import Backbone from 'backbone';
import DeviceModel from 'models/device';

const client = nodeRequire('adbkit').createClient();

export default Backbone.Collection.extend({
  model: DeviceModel,
  client,

  async initialize() {
    await this.load();

    var tracker = await client.trackDevices();
    tracker.on('add', (device) => this.add(device));
    tracker.on('remove', (device) => this.remove(device));
    tracker.on('end', () => this.reset());
  },

  async load() {
    this.reset(await client.listDevices());
  }
});
