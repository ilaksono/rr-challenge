import * as con from 'utils/con';

const ModalCloseButton = props =>
  <div className='rr-close-btn'
    onClick={props.onHide}
  >X</div>

export default ModalCloseButton;