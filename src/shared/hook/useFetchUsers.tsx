import { authKeys, getUsersApi } from '@/apis/auth/api'
import UserEntity from '@/modules/user/entity'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export interface useFetchUsersProps {
  isKeepPreviousData?: boolean
  page?: number
  limit?: number
  q?: string
  customerType?: string
  staleTime?: number
}

export const useFetchUsers = ({
  isKeepPreviousData = false,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT_PER_PAGE,
  q,
  customerType,
  staleTime = 30
}: useFetchUsersProps) => {
  const queryInfo = useQuery({
    queryKey: authKeys.fetchUsersPagination(page, limit, q, customerType),
    queryFn: async (): Promise<{
      users: Array<UserEntity>
      total: number
    }> => {
      let querypath = `?page=${page}&limit=${limit}`

      if (q) {
        querypath += `&q=${q}`
      }

      if (customerType) {
        querypath += `&type=${customerType}`
      }

      return await getUsersApi(querypath)
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * staleTime
  })

  return queryInfo
}
