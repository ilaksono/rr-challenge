const DeleteIcon = (props) => {

  const {
    handleClickDelete = () => { },
    className = 'delete-icon',
    tooltip = 'Delete order'
  } = props

  return (
    <a className={'thumbnail align-start ' + className}
      data-toggle='tooltip'
      title={tooltip}
      href={true}
    >
      <img
        src='/images/delete.png'
        alt='Delete'
        onClick={handleClickDelete}
      />
    </a>
  )
}
export default DeleteIcon;