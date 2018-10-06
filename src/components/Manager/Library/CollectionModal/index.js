import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import NewCollectionForm from './NewCollectionForm';
import './Modal.css';

class CollectionModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeHandler: PropTypes.func.isRequired,
  };

  render() {
    const { open, closeHandler } = this.props;

    return (
      <div>
        <Modal
          className="dark-modal"
          size="tiny"
          open={open}
          onClose={this.close}
        >
          <Modal.Header>Create New Collection</Modal.Header>
          <Modal.Content>
            <NewCollectionForm
              cancelHandler={closeHandler}
              validateOnChange={false}
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default CollectionModal;
