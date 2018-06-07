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

const updatablePropertyNames = [
  'draggable',
  'editable',
  'map',
  'options',
  'path',
  'paths',
  'visible',
];

const Polygon = createEntity('Polygon', evtNames, updatablePropertyNames);

export default withMapContext(Polygon);
