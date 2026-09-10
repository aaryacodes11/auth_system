import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://auth-system-twnl.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Registered successfully! Redirecting to login...')
        setTimeout(() => navigate('/'), 1500)
      } else {
        setMessage(data.message)
      }
    } catch (err) {
      setMessage('Something went wrong')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        {message && <p className="auth-message">{message}</p>}
        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  )
}

export default Register