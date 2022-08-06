import React from 'react'
import { useAppSelector } from '../hooks/redux'

function FavouritesPage() {
  const { favourites } = useAppSelector(state => state.github)

  if (favourites.length === 0) return <p className='text-center'>No items...</p>

  return (
    <div className='flex justify-center pt-10 mx-auto  flex-col items-center box-border'>
      <ul className='list-none'>
        {
          favourites?.map(repo => (
            <li key={repo}>
              <a
                target='_blank'
                href={repo}
                rel="noreferrer"
              >
                {repo}
                </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default FavouritesPage