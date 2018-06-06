export const controlPosition = googleMaps => {
  const positions = {
    bottomCenter: googleMaps.ControlPosition.BOTTOM_CENTER,
    bottomLeft: googleMaps.ControlPosition.BOTTOM_LEFT,
    bottomRight: googleMaps.ControlPosition.BOTTOM_RIGHT,
    leftBottom: googleMaps.ControlPosition.LEFT_BOTTOM,
    leftCenter: googleMaps.ControlPosition.LEFT_CENTER,
    leftTop: googleMaps.ControlPosition.LEFT_TOP,
    rightBottom: googleMaps.ControlPosition.RIGHT_BOTTOM,
    rightCenter: googleMaps.ControlPosition.RIGHT_CENTER,
    rightTop: googleMaps.ControlPosition.RIGHT_TOP,
    topCenter: googleMaps.ControlPosition.TOP_CENTER,
    topLeft: googleMaps.ControlPosition.TOP_LEFT,
    topRight: googleMaps.ControlPosition.TOP_RIGHT,
  };

  return value => positions[value] || value;
};
