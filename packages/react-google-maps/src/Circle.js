import createEntity from './createEntity';
import { withMapContext } from './Context';

/** https://developers.google.com/maps/documentation/javascript/reference/3.exp/polygon?hl=de#Circle */
const evtNames = [
  'center_changed',
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
  'radius_changed',
  'rightclick',
];

const updatablePropertyNames = [
  'center',
  'draggable',
  'editable',
  'map',
  'options',
  'radius',
  'visible',
];

const Circle = createEntity('Circle', evtNames, updatablePropertyNames);

export default withMapContext(Circle);
