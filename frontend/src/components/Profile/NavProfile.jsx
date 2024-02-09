import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Typography, Box, Button } from '@mui/material'
import { Avatar } from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { QUERY_SINGLE_USER } from '../../utils/queries'
import auth from '../../utils/auth'
import App from '../../App'

export default function NavProfile() {
  const { id } = useParams()
  console.log(`User id: ${id}`)

  const [userHeight, setUserHeight] = useState(0)

  // boolean to check if profile is yours
  const sameUser = id == auth.getProfile().data._id

  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: id },
  })

  if (loading) {
    return <p>Loading...</p> // Replace with loading spinner
  }
  const user = data?.user // Access the 'username' field from the response data
  console.log(user)
  console.log('userHeight = ' + userHeight)
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
<<<<<<< HEAD
        minHeight: '80vh', 
      }}
    >
      {!sameUser ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#013440',
            color: '#e4ebf2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            textAlign: 'center',
            padding: 7.5,
            width: '30%', 
            maxWidth: 400, 
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item>
              <Typography>{user.username}</Typography>
            </Grid>
            {/* send friend request */}
            <Grid item>
=======
        minHeight: '60vh', // Adjusted minHeight to fit the content better
      }}
    >
      <Paper
        elevation={5}
        sx={{
          backgroundColor: '#013440',
          color: '#e4ebf2',
          display: 'flex',
          padding: 7.5,
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid item>
            <Typography>{user.username}</Typography>
          </Grid>
          {/* send friend request */}
          <Grid item>
            {!sameUser ? (
>>>>>>> cf08eca923ff83da255daae9ad119336b4f54a27
              <Button
                color="secondary"
                variant="contained"
                type="addFriend"
                href="#"
              >
                Add Friend
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
<<<<<<< HEAD
                variant="contained"
                type="newMessage"
                href="#"
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#013440',
                color: '#e4ebf2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2.5,
                minHeight: '100%'
              }}
            >
              <Grid item sx={{ padding: 1.5 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Grid>
              <Grid item sx={{ padding: 1.5 }}>
                <Typography>{user.username}</Typography>
              </Grid>
              <Grid item sx={{ padding: 1.5 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="editProfile"
                  href="/settings"
                >
                  Edit Profile
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#e4ebf2',
                color: '#013440',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2.5,
                minHeight: '100%'
              }}
            >
              <Typography>This is where the chats will go!</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

{
  /* <Button
                color="primary"
=======
>>>>>>> cf08eca923ff83da255daae9ad119336b4f54a27
                variant="contained"
                type="signup"
                href="/settings"
              >
                Edit Profile
              </Button> */
}
