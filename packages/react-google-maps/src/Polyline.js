import createShape from './createShape';
import { withMapContext } from './Context';

const Polyline = createShape('Polyline');

export default withMapContext(Polyline);
