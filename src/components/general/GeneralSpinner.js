import { Spinner } from 'react-bootstrap';
import * as con from 'utils/con';

const GeneralSpinner = (props) => {
  const {
    style,
    animation,
    size,
    divStyle = {}
  } = props;

  return <div
    style={divStyle}
  >
    <Spinner
      style={style || {
        color: con.rrBlue,
      }}
      data-testid='general-spinner'
      animation={animation || 'border'}
      size={size || 'sm'}
    />
  </div>
}
export default GeneralSpinner;