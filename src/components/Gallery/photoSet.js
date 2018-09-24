// NOTE: Must be the same array as on server
export const SIZES = [
  'original', // We won't use anything larger than 2560
  2560,
  1440,
  960,
  700,
  360,
  { longestEdge: 150 }, // We don't use the thumbnail
];

// Gallery breakpoints:
// Not resizing below 658px on desktop
// 2 columns below 909px: A pano picture could be 3/4 of this width
// 3 columns below 910 - 1509px: A pano picture could be 1/2 of this
// 4 columns above 1510px
const MEDIA_QUERY_SIZES = [
  '(min-width: 480px) and (max-width: 657px) 360px',
  '(min-width: 658px) and (max-width: 1509px) 700px',
  '(min-width: 1510px) and (max-width: 2109px) 960px',
  '(min-width: 2110px) 1440px',
  // '(min-width: 3800px) 2560px', // Not needed because of side margins
].join(',');

// const largestSize = urls => {
//   // Don't use item 0, which is original size
//   const urlsWithoutOriginal = [...urls];
//   urlsWithoutOriginal.splice(0, 1);
//   return urlsWithoutOriginal.reduce((a, b) => a || b, null);
// };

const indexOfLargestPicture = urls => {
  // Don't use item 0, which is original size
  const urlsWithoutOriginal = [...urls];
  urlsWithoutOriginal.splice(0, 1);
  const largest = urlsWithoutOriginal.reduce((a, b) => a || b, null);
  return urls.indexOf(largest);
};

const widthRegex = /([\d]+w)/gm;

// Convert array of 'http://localhost:3001/photos/2018/9/24/alps-008-360w.jpg'
// to 'http://localhost:3001/photos/2018/9/24/alps-008-360w.jpg 360w'
// i.e. append the relevant width string
const makeSrcSet = urls =>
  urls
    .filter((u, i) => u && i > 0 && i < urls.length - 1)
    .map(url => [url, url.match(widthRegex)].join(' '))
    .reverse()
    .join(',');

export default allPhotos => {
  if (!allPhotos || !allPhotos.data) {
    return null;
  }
  return allPhotos.data.map(p => {
    const i = indexOfLargestPicture(p.urls);
    return {
      id: p.id,
      src: p.urls[i],
      srcSet: makeSrcSet(p.urls),
      sizes: MEDIA_QUERY_SIZES,
      width: SIZES[i],
      height: Math.floor((p.height * SIZES[i]) / p.width),
    };
  });
};
