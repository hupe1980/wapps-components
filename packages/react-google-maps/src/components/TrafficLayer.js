import createEntity from './createEntity';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/map?hl=de#TrafficLayer */
const evtNames = [];

const propertyNames = ['autoRefresh', 'map'];

const TrafficLayer = createEntity('TrafficLayer', evtNames, propertyNames);

export default withMapContext(TrafficLayer);
