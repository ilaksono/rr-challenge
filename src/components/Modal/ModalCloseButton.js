import * as con from 'utils/con';

const ModalCloseButton = props =>
  <div style={{
    backgroundColor: 'white',
    color: con.rrBlue,
    borderRadius: '50%',
    minWidth: 24,
    minHeight: 24,
    maxWidth: 24,
    maxHeight: 24,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '1.8',
    fontFamily: 'sans-serif',
    cursor: 'pointer'
  }}
    onClick={props.onHide}
  >X</div>

export default ModalCloseButton;