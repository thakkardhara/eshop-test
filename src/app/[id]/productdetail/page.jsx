import React from 'react'
import Productdetail from '../../../components/Productdetail';

const page = async({params}) => {
    const { id } = await params;
  return (
    <div>
      <Productdetail  id={id}/>
    </div>
  )
}

export default page
