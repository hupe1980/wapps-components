import createPlacesWidget from './createPlacesWidget';
import { withMapContext } from '../Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-widget?hl=de#SearchBox */
const evtNames = ['place_changed'];

const SearchBox = createPlacesWidget('SearchBox', evtNames);

export default withMapContext(SearchBox);
