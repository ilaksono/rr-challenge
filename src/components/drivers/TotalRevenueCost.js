const TotalRevenueCost = (props) => {
  const {
    filteredList = []
  } = props;


  const totalRevenue = (filteredList.reduce((acc, order) => acc + order.revenue_cents, 0) / 100).toFixed(2);
  const totalCost = (filteredList.reduce((acc, order) => acc + order.cost_cents, 0) / 100).toFixed(2);
  return (
    <>
      <div className='revenue-cost-summary'>
        Total Revenue: $&nbsp;
        <span className='green-color-text'>
          {totalRevenue}
        </span>
      </div>
      <div>
        Total Cost: $&nbsp;
        <span className='red-color-text'>
          {totalCost}
        </span>
      </div>
    </>
  )
}
export default TotalRevenueCost;