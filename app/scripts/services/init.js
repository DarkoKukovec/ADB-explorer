import $ from 'jquery';
import Backbone from 'backbone';

import Backprop from 'backprop';

Backbone.$ = $;

Backprop.extendModel(Backbone.Model);
