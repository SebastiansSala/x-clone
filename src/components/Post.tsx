import { Avatar } from "@nextui-org/avatar"
import React from "react"

const Post = () => {
  return (
    <li className='grid grid-cols-12 border-t-1 border-gray-600 p-4'>
      <Avatar className='col-span-1' />
      <div className='col-span-11'>
        <div>
          <div>
            <h4>DogeDesigner</h4>
            <p>@Artist</p>
            <span>8h</span>
          </div>
          <div>...</div>
        </div>
        <div className='w-full'>
          <p className='truncate max-w-full'>
            aroiesntaroeitnoiearoiesntaroeitnoiearoiesntaroeitnoiearoiesntaroeitnoiearoiesntaroeitnoiearoiesntaroeitnoiearoiesntaroeitnoiearoiesntaroeitnoiearoiesntaroeitnoie
          </p>
        </div>
        <div></div>
        <div className='flex justify-between py-2'></div>
      </div>
    </li>
  )
}

export default Post
