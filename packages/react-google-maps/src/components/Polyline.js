import createComponent from './createComponent';
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

const propertyNames = [
  'clickable',
  'draggable',
  'editable',
  'geodesic',
  'icons',
  'map',
  'path',
  'strokeColor',
  'strokeOpacity',
  'strokeWeight',
  'visible',
  'zIndex',
];

const Polyline = createComponent('Polyline', evtNames, propertyNames);

export default withMapContext(Polyline);
