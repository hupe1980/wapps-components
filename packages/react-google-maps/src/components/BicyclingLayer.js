import createComponent from './createComponent';
import { withMapContext } from './Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/map?hl=de#BicyclingLayer */
const evtNames = [];

const propertyNames = ['map'];

const BicyclingLayer = createComponent(
  'BicyclingLayer',
  evtNames,
  propertyNames,
);

export default withMapContext(BicyclingLayer);
