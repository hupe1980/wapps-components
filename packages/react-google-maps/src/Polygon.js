import createShape from './createShape';
import { withMapContext } from './Context';

const Polygon = createShape('Polygon');

export default withMapContext(Polygon);
