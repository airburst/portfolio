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

const largestSize = urls => {
  // Don't use item 0, which is original size
  const urlsWithoutOriginal = [...urls];
  urlsWithoutOriginal.splice(0, 1);
  return urlsWithoutOriginal.reduce((a, b) => a || b, null);
};

const indexOfLargestPicture = urls => {
  // Don't use item 0, which is original size
  const urlsWithoutOriginal = [...urls];
  urlsWithoutOriginal.splice(0, 1);
  const largest = urlsWithoutOriginal.reduce((a, b) => a || b, null);
  return urls.indexOf(largest);
};

const makeSrcSet = urls =>
  urls.filter((u, i) => u && i > 0 && i < urls.length - 1);

export default allPhotos => {
  if (!allPhotos || !allPhotos.data) {
    return null;
  }
  return allPhotos.data.map(p => {
    console.log(makeSrcSet(p.urls));

    const i = indexOfLargestPicture(p.urls);
    return {
      id: p.id,
      src: p.urls[i],
      // srcSet
      width: SIZES[i],
      height: Math.floor((p.height * SIZES[i]) / p.width),
    };
  });
};

// srcSet: [
//   'https://source.unsplash.com/2ShvY8Lf6l0/500x375 500w',
//   'https://source.unsplash.com/2ShvY8Lf6l0/800x600 800w',
//   'https://source.unsplash.com/2ShvY8Lf6l0/1024x768 1024w',
//   'https://source.unsplash.com/2ShvY8Lf6l0/1600x1200 1600w'
// ],
// sizes: ['(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw'],
