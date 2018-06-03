import createEntity from './createEntity';
import withDirectionsService from './withDirectionsService';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/directions?hl=de#DirectionsRenderer */
const evtNames = ['directions_changed'];

const updatablePropertyNames = [
  'directions',
  'map',
  'options',
  'panel',
  'routeIndex',
];

const DirectionsRenderer = createEntity(
  'DirectionsRenderer',
  evtNames,
  updatablePropertyNames,
);

const Test = withDirectionsService(DirectionsRenderer);

export default withMapContext(Test);
