import createEntity from './createEntity';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/map?hl=de#TransitLayer */
const evtNames = [];

const propertyNames = ['map'];

const TransitLayer = createEntity('TransitLayer', evtNames, propertyNames);

export default withMapContext(TransitLayer);
