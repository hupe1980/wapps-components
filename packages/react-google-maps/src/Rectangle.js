import createShape from './createShape';
import { withMapContext } from './Context';

const Rectangle = createShape('Rectangle');

export default withMapContext(Rectangle);
