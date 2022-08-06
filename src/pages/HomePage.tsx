import React, { useEffect, useState } from 'react'
import RepoCard from '../components/repo-card/repo-card';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'

function HomePage() {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search)
  const [drop, setDrop] = useState(false)
  const { isLoading, isError, data: users } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDrop(false)
  }

  useEffect(() => {
    if (debounced.length >= 3 && users?.length! > 0) {
      setDrop(true)
    } else {
      setDrop(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, users])

  // console.log(data)
  return (
    <div className='flex justify-center pt-10 mx-auto  flex-col items-center box-border'>
      {isError && <p className='text-center text-red-600 block mb-4'>Something went wrong...</p>}

      <div className='relative w-[560px]'>
        <input
          type="search"
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for Github username...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {
          drop && <ul className='list-none abosolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white'>
            {isLoading && <p className='text-center'>Loading...</p>}
            {users?.map(user => (
              <li
                key={user.id}
                onClick={clickHandler.bind(null, user.login)}
                className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
              >
                {user.login}
              </li>
            ))}
          </ul>
        }

        <div className="container">
          {areReposLoading && <p className='text-center'>Repos are loading...</p>}
          {repos?.map(repo => (
            <RepoCard
              repo={repo}
              key={repo.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage