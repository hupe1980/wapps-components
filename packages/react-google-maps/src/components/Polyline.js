import createEntity from './createEntity';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/polygon?hl=de#Polyline */
const evtNames = [
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'rightclick',
];

const updatablePropertyNames = [
  'draggable',
  'editable',
  'map',
  'options',
  'path',
  'visible',
];

const Polyline = createEntity('Polyline', evtNames, updatablePropertyNames);

export default withMapContext(Polyline);
