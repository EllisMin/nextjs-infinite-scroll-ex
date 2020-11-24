import fetch from 'node-fetch'
import UserList from '../components/UserList'

const HomePage = ({ userData }) => {
  return (
    <div className="home-page">
      <UserList userData={userData} />
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  // Fetch the first page as default
  const page = query.page || 1
  let userData = null
  // Fetch data from external API
  try {
    const fetchOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
      }),
    }
    const res = await fetch(`${process.env.FETCH_URL}/api/users`, fetchOption)
    if (res.status !== 200) {
      throw new Error('Failed to fetch')
    }
    userData = await res.json()
  } catch (err) {
    userData = { error: { message: err.message } }
  }
  // Pass data to the page via props
  return { props: { userData } }
}
export default HomePage
