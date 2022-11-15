import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, Overlay } from './modalStyled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ OnClose, children }) => {
  const handleClose = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        OnClose();
      }
    },
    [OnClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [handleClose]);
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleClose);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleClose);
  // }

  // const handleClose = ({ target, currentTarget, code }) => {
  //   if (target === currentTarget || code === 'Escape') {
  //     OnClose();
  //   }
  // };

  return createPortal(
    <Overlay onClick={handleClose}>
      <StyledModal>{children}</StyledModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
