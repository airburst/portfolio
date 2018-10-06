import { serverUrl } from '../../ServerContext';

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
const FIRST_IMAGE = 5; // 360px

// Gallery breakpoints:
// Not resizing below 658px on desktop
// 2 columns all the way up to 1500px;
const MEDIA_QUERY_SIZES = [
  '(min-width: 658px) and (max-width: 1023px) 700px',
  '(min-width: 1024px) and (max-width: 1499px) 700px',
  '(min-width: 1500px) and (max-width: 2559px) 960px',
  '360px',
  // '(min-width: 3800px) 2560px', // Not needed because of side margins
].join(',');

const widthRegex = /([\d]+w)/gm;

const indexOfLargestPicture = urls => {
  // Don't use item 0, which is original size
  const urlsWithoutOriginal = [...urls];
  urlsWithoutOriginal.splice(0, 1);
  const largest = urlsWithoutOriginal.reduce((a, b) => a || b, null);
  return urls.indexOf(largest);
};

// Convert array of '/photos/2018/9/24/alps-008-360w.jpg'
// to '{serverUrl}/photos/2018/9/24/alps-008-360w.jpg 360w'
// i.e. append the relevant width string
const makeSrcSet = urls =>
  urls
    .filter((u, i) => u && i > 0 && i < urls.length - 1)
    .map(url => [`${serverUrl}${url}`, url.match(widthRegex)].join(' '))
    .reverse()
    .join(',');

export const lightboxSet = allPhotos => {
  if (!allPhotos || !allPhotos.data) {
    return null;
  }
  return allPhotos.data.map(p => {
    const i = indexOfLargestPicture(p.urls);
    return {
      caption: p.caption,
      src: p.urls[i],
      srcSet: makeSrcSet(p.urls),
    };
  });
};

export default allPhotos => {
  if (!allPhotos || !allPhotos.data) {
    return null;
  }
  return allPhotos.data.map(p => {
    const i = indexOfLargestPicture(p.urls);
    return {
      id: p.id,
      src: p.urls[FIRST_IMAGE],
      srcSet: makeSrcSet(p.urls),
      sizes: MEDIA_QUERY_SIZES,
      width: SIZES[i],
      height: Math.floor((p.height * SIZES[i]) / p.width),
    };
  });
};
