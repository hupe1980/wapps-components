import createComponent from './createComponent';
import { withMapContext } from './Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/map?hl=de#TrafficLayer */
const evtNames = [];

const propertyNames = ['autoRefresh', 'map'];

const TrafficLayer = createComponent('TrafficLayer', evtNames, propertyNames);

export default withMapContext(TrafficLayer);
