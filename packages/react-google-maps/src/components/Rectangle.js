import createShape from './createShape';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/polygon?hl=de#Rectangle */
const evtNames = [
  'bounds_changed',
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

const propertyNames = [
  'bounds',
  'draggable',
  'editable',
  'map',
  'options',
  'visible',
];

const Rectangle = createShape('Rectangle', evtNames, propertyNames);

export default withMapContext(Rectangle);
