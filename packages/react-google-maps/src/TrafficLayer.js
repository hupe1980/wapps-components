import createLayer from './createLayer';
import { withMapContext } from './Context';

const TrafficLayer = createLayer('TrafficLayer');

export default withMapContext(TrafficLayer);
