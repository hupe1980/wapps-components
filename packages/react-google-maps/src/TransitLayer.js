import createLayer from './createLayer';
import { withMapContext } from './Context';

const TransitLayer = createLayer('TransitLayer');

export default withMapContext(TransitLayer);
