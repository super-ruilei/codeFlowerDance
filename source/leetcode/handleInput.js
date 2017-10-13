/*
    let input = {
      originPoster: {
        size: {
          width: 900,
          height: 500,
        },
        regions: [
          { x: 32, y: 283, width: 531, height: 89 },
          { x: 43, y: 255, width: 512, height: 32 },
          { x: 43, y: 375, width: 519, height: 97 }
        ]
      },
      newSize: {
        width: 1900,
        height: 1500,
      }
    };
    let k = 1;
    let output = {
      size: {
        width: 1900,
        height: 1500,
      },
      regions: [
        { x: 32, y: 849, width: 531, height: 267 },
        { x: 43, y: 765, width: 512, height: 96 },
        { x: 43, y: 1125, width: 519, height: 291 }
      ]
    }
*/

/* 
  c = newSize.height / size.height
  x' = x
  y' = y * c
  regions.width' = size.width
  regions.height' = size.height * c 
*/
var handleInput = function ({ originPoster, newSize }, k) {
  let c = newSize.height / originPoster.size.height;
  let size = newSize;
  let regions = originPoster.regions.map( ({x, y, width, height}) => {
    return {
      x,
      width,
      y: y * c,
      height: height *c
    }
  });
  // note: x[0] = regions[0]['x'] or regions[0].x
  return {
    size,
    regions
  }
};

export default handleInput;
