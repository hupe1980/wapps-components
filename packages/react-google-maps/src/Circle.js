import createShape from './createShape';
import { withMapContext } from './Context';

const Circle = createShape('Circle');

export default withMapContext(Circle);
