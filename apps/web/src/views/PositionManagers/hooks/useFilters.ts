import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { updateQuery } from '@kazamaswap/utils/clientRouter'

function filterHookFactory(filterName: string) {
  return function useFilter(): [string | undefined, (filter: string | undefined) => void] {
    const router = useRouter()
    const filter = useMemo(() => {
      const value = router.query[filterName]
      if (Array.isArray(value)) {
        return value[0]
      }
      return value
    }, [router.query])

    const setFilter = useCallback(
      (value?: string) => {
        router.push(
          updateQuery(router.asPath, {
            [filterName]: value,
          }),
          '',
          { scroll: false },
        )
      },
      [router],
    )

    return [filter, setFilter]
  }
}

export const useSortBy = filterHookFactory('sortBy')

export const useSearch = filterHookFactory('search')
