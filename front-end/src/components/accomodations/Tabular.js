import React from 'react';
import './css/Tabular.css';

function totalCost(costArr) {
  const total = costArr.reduce((total, num) => total + num, 0)
  return total
}

export default function Table({ customer, costList }) {
  const t = customer.transport
  const d = customer.duration

  return (
    <div className='outer-table table-font medium-border-bottom'>
      <div className='outer-row medium-border-bottom'>
        <div className='outer-cell bold'>Type</div>
        <div className='outer-cell bold'>Qty</div>
        <div className='outer-cell bold'>Price</div>
      </div>
      <div className='outer-row'>
        <div className='outer-cell'>{ customer.home.type }</div>
        <div className='outer-cell'>{ customer.home.number }</div>
        <div className='outer-cell price'>${ costList[0] }</div>
      </div>
      <div className='outer-row'>
        <div className='outer-cell'>{ customer.mealPlan.type }</div>
        <div className='outer-cell'>{ customer.groupSize }</div>
        <div className='outer-cell price'>${ costList[1] }</div>
      </div>
      { customer.transport
          ?
          <div className='outer-row'>
            <div className='outer-cell'>Transport</div>
            <div className='outer-cell'>
              <div className='inner-table'>
                <div className='inner-row'>
                  <div className='inner-cell pad-right'>Vans</div>
                  <div className='inner-cell pad-right'>{t.type.van}</div>
                  <div className='inner-cell price'>  ${t.type.van * t.price[0] * d}</div>
                </div>
                <div className='inner-row'>
                  <div className='inner-cell pad-right'>Cars</div>
                  <div className='inner-cell pad-right'>{t.type.car}</div>
                  <div className='inner-cell price'>  ${t.type.car * t.price[1] * d}</div>
                </div>
                <div className='inner-row'>
                  <div className='inner-cell pad-right'>Motorbikes</div>
                  <div className='inner-cell pad-right'>{t.type.motorbike}</div>
                  <div className='inner-cell price '>  ${t.type.motorbike * t.price[2] * d}</div>
                </div>
              </div>
            </div>
            <div className='outer-cell price'>${ costList[2] }</div>
          </div>
          :
          <div className='outer-row'>
            <div className='outer-cell'>Transport</div>
            <div className='outer-cell'>None</div>
            <div className='outer-cell price'>$0</div>
          </div>
      }
      <div className='vert-space'/>
      <div className='outer-row bg-light'>
        <div className='outer-cell'></div>
        <div className='outer-cell bold'> Total </div>
        <div className='outer-cell price bold'> ${totalCost(costList)}</div>
      </div>
    </div>
  )
}
