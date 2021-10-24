import { Form } from 'react-bootstrap';
import * as sortModes from 'hooks/useSortMode';


// sort options
const modes = [
  sortModes.CREATED_AT,
  sortModes.SORT_ID,
  sortModes.START_TIME,
  sortModes.END_TIME,
  sortModes.REVENUE,
  sortModes.COST,
  sortModes.SOURCE,
  sortModes.DESTINATION,
  sortModes.REV_COST
]


const SortOrders = (props) => {

  const {
    sort: { mode, desc },
    handleChange,
    length
  } = props;
  const parsedOptions = modes.map(mode =>
    <option
      key={mode.attribute}
      value={mode.attribute}
    >{mode.text}</option>
  )
  return (
    <>
      <div className='light-color-text text-center'>Sort Orders | Total: 
      <strong >&nbsp;{length}</strong></div>
      <div className='flex'>
        <a
          className='thumbnail sort-button'
          onClick={() => handleChange(mode)}>
          <span>
            {desc ? '↓' : '↑'}
          </span>
        </a>
        <Form.Control
          as='select'
          value={mode}
          onChange={e => {
            handleChange(e.target.value)
          }}
        >{parsedOptions}</Form.Control>
      </div>
    </>
  )
}
export default SortOrders;