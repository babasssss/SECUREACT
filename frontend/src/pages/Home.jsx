import { useAuth } from '../contexts/AuthContext'
function Home () {
  const { logout } = useAuth()
  return (
    <>
      <h1>HOME</h1>
      <button onClick={logout}>Se déconnecter</button>
    </>
  )
}

export default Home
