import createComponent from './createComponent';
import { withMapContext } from './Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/polygon?hl=de#Circle */
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

const Circle = createComponent('Circle', evtNames, propertyNames);

export default withMapContext(Circle);
