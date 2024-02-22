import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/configApp'
function PostCard({$id, title , featuredImage}) {
  return (
    <Link to={ `/post/${$id}`}>
        <div className='w-full bg-grey-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreView(featuredImage)} alt={title} className='rounded-xl'/>
            </div>
            <h2 className='text-2xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard