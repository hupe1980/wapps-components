import { compose } from '../internal/utils';
import createEntity from './createEntity';
import withDirectionsService from './withDirectionsService';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/directions?hl=de#DirectionsRenderer */
const evtNames = ['directions_changed'];

const propertyNames = ['directions', 'map', 'options', 'panel', 'routeIndex'];

const DirectionsRenderer = createEntity(
  'DirectionsRenderer',
  evtNames,
  propertyNames,
);

export default compose(withMapContext, withDirectionsService)(
  DirectionsRenderer,
);
