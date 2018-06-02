import createLayer from './createLayer';
import { withMapContext } from './Context';

const BicyclingLayer = createLayer('BicyclingLayer');

export default withMapContext(BicyclingLayer);
