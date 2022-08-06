import React, { useState } from 'react'
import { useActions } from '../../hooks/action';
import { useAppSelector } from '../../hooks/redux';
import { IRepo } from '../../models/models'

function RepoCard({ repo }: { repo: IRepo }) {
    const { addFavourite, removeFavourite } = useActions()
    const { favourites } = useAppSelector(state => state.github)
    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

    const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addFavourite(repo.html_url)
        setIsFav(true)
    }

    const removeFrpmFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeFavourite(repo.html_url)
        setIsFav(false)
    }

    return (
        <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
            <a
                href={repo.html_url}
                target='_blank'
                rel="noreferrer"
                className='cursor-pointer'
            >
                <h2
                    className='text-lg font-bold'
                >
                    {repo?.full_name}
                </h2>
                <p
                    className='text-sm'
                >
                    Forks: <span className='font-bold'>{repo?.forks}</span> <br />
                    Watchers: <span className='font-bold'>{repo?.watchers}</span>
                </p>
                <p
                    className='text-sm font-thin'
                >
                    {repo?.description}
                </p>

                <div className='flex'>
                    {
                        !isFav && <button
                            className='py-2 mt-2 mr-2 px-4 bg-green-400 text-white rounded hover:shadow-md transition-all'
                            onClick={addToFavourite}
                        >
                            Add
                        </button>
                    }

                    {
                        isFav && <button
                            className='py-2 mt-2 px-4 bg-red-500 text-white rounded hover:shadow-md transition-all'
                            onClick={removeFrpmFavourite}
                        >
                            Remove
                        </button>
                    }
                </div>
            </a>
        </div>
    )
}

export default RepoCard