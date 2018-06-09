import createEntity from './createEntity';
import { withMapContext } from './Context';

/** https://developers.google.com/maps/documentation/javascript/reference/3.exp/polygon?hl=de#Polygon */
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

const Polygon = createEntity('Polygon', evtNames, propertyNames);

export default withMapContext(Polygon);
