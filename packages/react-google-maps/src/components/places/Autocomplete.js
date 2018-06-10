import createPlacesWidget from './createPlacesWidget';
import { withMapContext } from '../Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-widget?hl=de#Autocomplete */
const evtNames = ['place_changed'];

const propertyNames = [
  'bounds',
  'componentRestrictions',
  'placeIdOnly',
  'strictBounds',
  'types',
];

const Autocomplete = createPlacesWidget(
  'Autocomplete',
  evtNames,
  propertyNames,
);

export default withMapContext(Autocomplete);
