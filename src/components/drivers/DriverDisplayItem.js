const DriverDisplayItem = (props) => {

  const {
    id,
    driver_fname,
    driver_lname,
    selected = false,
    handleClick = () => { }
  } = props;
  const containerClass = 'display-item' + (selected ? ' selected' : '')
  return (
    <div className={containerClass}
      onClick={handleClick}
    >
      <div
      className='order-id light-color-text'
      >dr_{id}</div>
      <img
        src='/images/default.png'
        alt={`${driver_fname} ${driver_lname}`}
      />
      <div>
        <div>{driver_fname}</div>
        <div>{driver_lname}</div>
      </div>
    </div>
  )

}

export default DriverDisplayItem;