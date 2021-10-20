import { useState } from 'react';

export const CREATED_AT = {
  text: 'Creation Date',
  attribute: 'created_at'
}
export const END_TIME = {
  text: 'Arrival Time',
  attribute: 'end_time'
};
export const START_TIME = {
  text: 'Departure Time',
  attribute: 'start_time'
};

export const REVENUE = {
  text: 'Revenue',
  attribute: 'revenue_cents'
};
export const COST = {
  text: 'Cost',
  attribute: 'cost_cents'
};
export const SOURCE = {
  text: 'Supplier',
  attribute: 'source_address_id'
};
export const DESTINATION = {
  text: 'Customer',
  attribute: 'destination_address_id'
};

export const REV_COST = {
  text: 'Revenue - Cost Difference',
  attribute: 'revenue_cost'
}





const init = {
  mode: 'created_at',
  desc: true
}
const useSortMode = () => {

  const [sort, setSort] = useState(init)
  const handleChangeSort = mode => {
    if (sort.mode === mode)
      return setSort(prev => ({ ...prev, desc: !prev.desc }));
    setSort({ desc: true, mode })
  }

  const handleSort = (arr) => {
    const {
      mode,
      desc
    } = sort;
    switch (mode) {
      case CREATED_AT.attribute:
        return arr.sort((lp, rp) =>
          desc ?
            (new Date(rp.created_at).getTime() - new Date(lp.created_at).getTime())
            : (new Date(lp.created_at).getTime() - new Date(rp.created_at).getTime())
        )
      case END_TIME.attribute:
        return arr.sort((lp, rp) =>
          desc ?
            (new Date(rp.end_time).getTime() - new Date(lp.end_time).getTime())
            : (new Date(lp.end_time).getTime() - new Date(rp.end_time).getTime())
        )

      case START_TIME.attribute:
        return arr.sort((lp, rp) =>
          desc ?
            (new Date(rp.start_time).getTime() - new Date(lp.start_time).getTime())
            : (new Date(lp.start_time).getTime() - new Date(rp.start_time).getTime())
        )
      case REVENUE.attribute:
        return arr.sort((lp, rp) =>
          desc ?
            (rp.revenue_cents - lp.revenue_cents)
            : (lp.revenue_cents - rp.revenue_cents)
        )
      case COST.attribute:
        return arr.sort((lp, rp) =>
          desc ?
            (rp.cost_cents - lp.cost_cents)
            : (lp.cost_cents - rp.cost_cents)
        )
      case SOURCE.attribute:
        return arr.sort((lp, rp) =>
          desc ?
            (rp.source_address_id - lp.source_address_id)
            : (lp.source_address_id - rp.source_address_id)
        )
      case DESTINATION.attribute:
        return arr.sort((lp, rp) =>
          desc ?
            (rp.destination_address_id - lp.destination_address_id)
            : (lp.destination_address_id - rp.destination_address_id)
        )
      case REV_COST.attribute:
        return arr.sort((lp, rp) =>
          desc ?
            ((rp.revenue_cents - rp.cost_cents) - (lp.revenue_cents - lp.cost_cents))
            : ((lp.revenue_cents - lp.cost_cents) - (rp.revenue_cents - rp.cost_cents))
        )


      default: return arr;
    }
  }

  return {
    sort,
    handleSort,
    handleChangeSort
  }
}
export default useSortMode;