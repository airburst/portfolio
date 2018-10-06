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

// Picture element sources array;
// [ min-width, image size ]
const SOURCES = [
  [658, '360px'],
  [1024, '700px'],
  [1500, '960px'],
  [2560, '1440px'],
];

export const makeSources = urls => {
  const sources = [];
  let mainImg;

  SOURCES.forEach(([minWidth, size]) => {
    const url = urls.filter(u => u.indexOf(size) > -1)[0];
    if (url) {
      sources.push(
        `<source media="(min-width: ${minWidth}px)" srcset="${url}">`
      );
      if (size === '360px') {
        mainImg = url;
      }
    }
  });
  // TODO: alt = caption
  return `<picture>
    ${sources.join('')}
    <img src="${mainImg}" alt="Caption">
  </picture>`;
};

/*
  <picture>
    <source media="(min-width: 650px)" srcset="img_pink_flowers.jpg">
    <source media="(min-width: 465px)" srcset="img_white_flower.jpg">
    <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
  </picture>
  */

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

// Convert array of 'http://localhost:3001/photos/2018/9/24/alps-008-360w.jpg'
// to 'http://localhost:3001/photos/2018/9/24/alps-008-360w.jpg 360w'
// i.e. append the relevant width string
const makeSrcSet = urls =>
  urls
    .filter((u, i) => u && i > 0 && i < urls.length - 1)
    .map(url => [url, url.match(widthRegex)].join(' '))
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

/*
<picture>
    <source media="(min-width: 2000px)" srcset="https://scriptura.github.io/Images/LotusTest.jpg, https://scriptura.github.io/Images/LotusTest.jpg 2x" sizes="100vw">
    <source media="(min-width: 1500px)" srcset="https://scriptura.github.io/Images/LotusTest2000.jpg, https://scriptura.github.io/Images/LotusTest.jpg 2x" sizes="100vw">
    <source media="(min-width: 1000px)" srcset="https://scriptura.github.io/Images/LotusTest1500.jpg, https://scriptura.github.io/Images/LotusTest2000.jpg 2x" sizes="100vw">
    <source media="(min-width: 800px)" srcset="https://scriptura.github.io/Images/LotusTest1000.jpg, https://scriptura.github.io/Images/LotusTest2000.jpg 2x" sizes="100vw">
    <source media="(min-width: 600px)" srcset="https://scriptura.github.io/Images/LotusTest800.jpg, https://scriptura.github.io/Images/LotusTest1500.jpg 2x" sizes="100vw">
    <source media="(min-width: 400px)" srcset="https://scriptura.github.io/Images/LotusTest600.jpg, https://scriptura.github.io/Images/LotusTest1000.jpg 2x" sizes="100vw">
    <source media="(min-width: 300px)" srcset="https://scriptura.github.io/Images/LotusTest400.jpg, https://scriptura.github.io/Images/LotusTest800.jpg 2x" sizes="100vw">
    <source srcset="https://scriptura.github.io/Images/LotusTest300.jpg" sizes="100vw"><img src="https://scriptura.github.io/Images/LotusTest.jpg" alt="Lotus">
  </picture>
*/
