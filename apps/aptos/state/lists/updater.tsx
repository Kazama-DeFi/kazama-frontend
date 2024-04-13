import { getVersionUpgrade, VersionUpgrade } from '@kazamaswap/token-lists'
import { acceptListUpdate, updateListVersion, useFetchListCallback } from '@kazamaswap/token-lists/react'
import { UNSUPPORTED_LIST_URLS } from 'config/constants/lists'
import { useEffect } from 'react'
import { useAllLists } from 'state/lists/hooks'
import { useQuery } from '@kazamaswap/awgmi'
import { useActiveListUrls } from './hooks'
import { useListState, initialState, useListStateReady } from './index'

export default function Updater(): null {
  const [listState, dispatch] = useListState()

  // get all loaded lists, and the active urls
  const lists = useAllLists()
  const activeListUrls = useActiveListUrls()

  const isReady = useListStateReady()

  useEffect(() => {
    if (isReady) {
      dispatch(updateListVersion())
    }
  }, [dispatch, isReady])

  const fetchList = useFetchListCallback(dispatch)

  // whenever a list is not loaded and not loading, try again to load it
  useQuery(
    ['first-fetch-token-list', lists],
    () => {
      Object.keys(lists).forEach((listUrl) => {
        const list = lists[listUrl]
        if (!list.current && !list.loadingRequestId && !list.error) {
          fetchList(listUrl).catch((error) => console.debug('list added fetching error', error))
        }
      })
    },
    {
      enabled: Boolean(isReady),
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  )

  useQuery(
    ['token-list'],
    async () => {
      return Promise.all(
        Object.keys(lists).map((url) =>
          fetchList(url).catch((error) => console.debug('interval list fetching error', error)),
        ),
      )
    },
    {
      enabled: Boolean(isReady && listState !== initialState),
      staleTime: 1000 * 60 * 10,
      refetchInterval: 1000 * 60 * 10,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  )

  // if any lists from unsupported lists are loaded, check them too (in case new updates since last visit)
  useEffect(() => {
    if (isReady) {
      Object.keys(UNSUPPORTED_LIST_URLS).forEach((listUrl) => {
        const list = lists[listUrl]
        if (!list || (!list.current && !list.loadingRequestId && !list.error)) {
          fetchList(listUrl).catch((error) => console.debug('list added fetching error', error))
        }
      })
    }
  }, [fetchList, lists, isReady])

  // automatically update lists if versions are minor/patch
  useEffect(() => {
    if (!isReady) return
    Object.keys(lists).forEach((listUrl) => {
      const list = lists[listUrl]
      if (list.current && list.pendingUpdate) {
        const bump = getVersionUpgrade(list.current.version, list.pendingUpdate.version)
        // eslint-disable-next-line default-case
        switch (bump) {
          case VersionUpgrade.NONE:
            throw new Error('unexpected no version bump')
          // update any active or inactive lists
          case VersionUpgrade.PATCH:
          case VersionUpgrade.MINOR:
          case VersionUpgrade.MAJOR:
            dispatch(acceptListUpdate(listUrl))
        }
      }
    })
  }, [dispatch, lists, activeListUrls, isReady])

  return null
}
