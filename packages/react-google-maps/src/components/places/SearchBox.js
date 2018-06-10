import createPlacesWidget from './createPlacesWidget';
import { withMapContext } from '../Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-widget?hl=de#SearchBox */
const evtNames = ['place_changed'];

const propertyNames = ['bounds'];

const SearchBox = createPlacesWidget('SearchBox', evtNames, propertyNames);

export default withMapContext(SearchBox);
