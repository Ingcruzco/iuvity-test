import {
  useState,
  useEffect
} from 'react'

import axios from 'axios'

const useUsers = (setLoading) => {
  const [users, setUsers] = useState([])


  /** GET USERS */
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(process.env.REACT_APP_USERS_URL)
        setUsers(data)
      } catch (err) {
        console.log('KO::USERS', err)
      }finally{
        setLoading(false);
      }
    }

    getUsers()
  }, [])

  return {
    users,
    setUsers
  }
}

export default useUsers
