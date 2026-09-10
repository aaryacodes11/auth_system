import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('You must be logged in to view this page')
      return
    }
    fetch('http://auth-system-twnl.onrender.com/api/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then((data) => setUser(data))
      .catch(() => setError('Session expired. Please log in again.'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (error) return <div className="auth-page"><p className="auth-message">{error}</p></div>
  if (!user) return <p style={{ textAlign: 'center' }}>Loading...</p>

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome, {user.name} 👋</h2>
        <p>Email: {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Profile