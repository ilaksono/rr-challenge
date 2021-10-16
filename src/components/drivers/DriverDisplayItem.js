const DriverDisplayItem = (props) => {

  const {
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