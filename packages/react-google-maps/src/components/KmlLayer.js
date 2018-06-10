import createComponent from './createComponent';
import { withMapContext } from './Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/kml?hl=de#KmlLayer */
const evtNames = ['click', 'defaultviewport_changed', 'status_chnaged'];

const propertyNames = ['map', 'options', 'url', 'zIndex'];

const KmlLayer = createComponent('KmlLayer', evtNames, propertyNames);

export default withMapContext(KmlLayer);
