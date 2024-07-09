import { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { Card } from '../../components/card'
import { createSession } from '../../utils/ApiClient'
import { Error } from '../../components/error'
import { setToken } from '../../utils/LocalStorage'
import { useUser } from '../../providers/UserProvider'
import { useNavigate } from 'react-router-dom';
import { urls } from '../../utils/urls'

export const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      return
    }

    setError('')

    createSession(email, password)
      .then((response) => {
        const token = response.data.token
        setToken(token)
        
        const user = response.data.user
        setUser(user);

        navigate(urls.chat.url())
      })
      .catch(() => {
        setError("Invalid email or password")
      }
    )
  }

  return (
    <div className="p-3 bg-gray-100 h-screen flex justify-center">
      <div className="max-w-[400px]">
        <div className="mb-10">
          <img src="/bear1.jpg" alt="logo" className="mx-auto rounded-lg" />
        </div>
        <Card>
          <Typography variant="h4" className="text-center min-w-[22rem]">Bear Identification</Typography>
          {error && <Error error={error} />}
          <div className="my-5">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </Card>

      </div>
    </div>
  )
}
