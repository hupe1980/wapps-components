import createLayer from './createLayer';
import { withMapContext } from './Context';

const KmlLayer = createLayer('KmlLayer');

export default withMapContext(KmlLayer);
