import createComponent from './createComponent';
import { withMapContext } from './Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/polygon?hl=de#Polygon */
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
  'fillColor',
  'fillOpacity',
  'geodesic',
  'map',
  'paths',
  'strokeColor',
  'strokeOpacity',
  'strokePosition',
  'strokeWeight',
  'visible',
  'zIndex',
];

const Polygon = createComponent('Polygon', evtNames, propertyNames);

export default withMapContext(Polygon);
