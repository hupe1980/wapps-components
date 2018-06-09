import createShape from './createShape';
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

const propertyNames = [
  'center',
  'clickable',
  'draggable',
  'editable',
  'fillColor',
  'fillOpacity',
  'map',
  'radius',
  'strokeColor',
  'strokeOpacity',
  'strokePosition',
  'strokeWeight',
  'visible',
  'zIndex',
];

const Circle = createShape('Circle', evtNames, propertyNames);

export default withMapContext(Circle);
