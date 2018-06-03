import createEntity from './createEntity';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/map?hl=de#TransitLayer */
const evtNames = [];

const updatablePropertyNames = ['map'];

const TransitLayer = createEntity(
  'TransitLayer',
  evtNames,
  updatablePropertyNames,
);

export default withMapContext(TransitLayer);
