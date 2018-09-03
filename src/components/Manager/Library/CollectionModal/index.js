import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
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
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon="checkmark" onClick={closeHandler} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CollectionModal;
