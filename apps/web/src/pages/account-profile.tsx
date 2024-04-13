import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserData } from 'api/DataRetriever'

const ProfilePage = () => {
  const { address: account } = useAccount()
  const userData = useUserData()
  const router = useRouter()

  useEffect(() => {
      if (userData.general_data.usernamer !== null) {
        router.push(`/${userData.general_data.username}`)
      } else {
        router.push('/')
      }
  }, [account, router])

  return null
}

export default ProfilePage
