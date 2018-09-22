import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import Thumbnail from './Thumbnail';
import { uploadProgressSubscription } from '../../../queries';
import './MediaViewer.css';

/**
 * TODO:
 * This would be an experimental component to bind indivdual
 * Preview comps to their own uipload and progress subscription.
 * Each should continue if the user navigates away, storing
 * the subscriptions in state.
 */

// TODO: Include a progress bar on each preview
export const Previews = ({ sizes }) =>
  sizes.map((k, i) => (
    <div className="thumbnail preview" key={i}>
      <Loader active inverted inline />
    </div>
  ));

class UploadPreviews extends React.Component {
  static propTypes = {
    uploads: PropTypes.object.isRequired,
  };

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

  render() {
    const { uploads } = this.props; // [{ name, size }]
    const photoSet = photos.map(d => d.id);

    return <div />;
  }
}

export default UploadPreviews;

// export default graphql(uploadProgressSubscription, {
//   options: props => { variables: { filename: props.filename }  },
// })(Thumbnail);
