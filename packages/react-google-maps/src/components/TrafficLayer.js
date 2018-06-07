import createEntity from './createEntity';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/map?hl=de#TrafficLayer */
const evtNames = [];

const updatablePropertyNames = ['map', 'options'];

const TrafficLayer = createEntity(
  'TrafficLayer',
  evtNames,
  updatablePropertyNames,
);

export default withMapContext(TrafficLayer);
