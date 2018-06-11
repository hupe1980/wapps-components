import createComponent from './createComponent';
import { withMapContext } from './Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/fusion-tables?hl=de#FusionTablesLayer */
const evtNames = ['click'];

const propertyNames = [
  'clickable',
  'heatmap',
  'map',
  'query',
  'styles',
  'suppressInfoWindows',
];

const FusionTablesLayer = createComponent(
  'FusionTablesLayer',
  evtNames,
  propertyNames,
);

export default withMapContext(FusionTablesLayer);
