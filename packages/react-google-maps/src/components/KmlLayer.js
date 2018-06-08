import createEntity from './createEntity';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/kml?hl=de#KmlLayer */
const evtNames = ['click', 'defaultviewport_changed', 'status_chnaged'];

const updatablePropertyNames = ['map', 'options', 'url', 'zIndex'];

const KmlLayer = createEntity('KmlLayer', evtNames, updatablePropertyNames);

export default withMapContext(KmlLayer);