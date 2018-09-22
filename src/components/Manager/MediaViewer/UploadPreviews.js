import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import Thumbnail from './Thumbnail';
import './MediaViewer.css';

// TODO: Include a progress bar on each preview
export const Previews = ({ sizes }) =>
  sizes.map((k, i) => (
    <div className="thumbnail preview" key={i}>
      <Loader active inverted inline />
    </div>
  ));

const UploadPreviews = ({ photos, selected, clickHandler, dragHandler }) => {
  const photoSet = photos.map(d => d.id);

  return photos.map(p => (
    <Thumbnail
      key={p.id}
      id={p.id}
      src={p.thumbnail}
      selected={selected.includes(p.id)}
      clickHandler={clickHandler(photoSet)}
      dragHandler={dragHandler}
    />
  ));
};

UploadPreviews.propTypes = {
  photos: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
  dragHandler: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default UploadPreviews;

// componentWillMount() {
//   this.unsubscribe = this.subscribe(this.props.channelId);
// }

// componentWillUnmount() {
//   if (this.unsubscribe) {
//     this.unsubscribe();
//   }
// }

// subscribe = channelId =>
// this.props.data.subscribeToMore({
//   document: newChannelMessageSubscription,
//   variables: {
//     channelId,
//   },
//   updateQuery: (prev, { subscriptionData }) => {
//     if (!subscriptionData) {
//       return prev;
//     }

//     return {
//       ...prev,
//       messages: [subscriptionData.newChannelMessage, ...prev.messages],
//     };
//   },
// });

// export default graphql(uploadProgressSubscription, {
//   options: props => { variables: { filename: props.filename }  },
// })(Thumbnail);
