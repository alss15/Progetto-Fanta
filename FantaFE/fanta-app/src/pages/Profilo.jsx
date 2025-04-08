import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Card, CardContent, CardMedia, Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

const Profilo = () => {
  const [user, setUser] = useState({
    id: 1,
    firstName: "Mario",
    lastName: "Rossi",
    bio: "Amo la sostenibilità e le sfide green!",
    avatar: require("../materials/mario.jpg"),
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      creatorId: 1,
      creatorName: "Mario Rossi",
      content: "Il mio primo post sulla sostenibilità!",
      image: require("../materials/Pianta.jpg"),
      likes: [2, 3],
      comments: [
        { userId: 2, userName: "Laura Bianchi", text: "Bellissimo post!" },
        { userId: 3, userName: "Pippo Rossi", text: "Concordo!" },
      ],
    },
    {
      id: 2,
      creatorId: 1,
      creatorName: "Mario Rossi",
      content: "Ho completato la sfida green giornaliera!",
      image: require("../materials/Dolce.jpg"),
      likes: [2],
      comments: [],
    },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Laura Bianchi ha messo 'Mi piace' al tuo post." },
    { id: 2, message: "Pippo Rossi ha commentato il tuo post." },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);

  // Funzione per aprire il menu delle notifiche
  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il menu delle notifiche
  const handleNotificationsClose = () => {
    setAnchorEl(null);
    setNotifications([]); // Svuota le notifiche dopo averle lette
  };

  return (
    <div
      style={{
        backgroundImage: `url(${require("../materials/sfondo-login2.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
     

      {/* Contenuto del profilo */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, px: 2 }}>
        {/* Informazioni del profilo */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, width: "60%" }}>
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={user.avatar}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" sx={{ color: "gray" }}>
              {user.bio}
            </Typography>
          </Box>
        </Box>

        {/* Sezione notifiche */}
        <Box sx={{ mb: 4, width: "60%" }}>
          {/* Tasto Home Social */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#044c93",
                color: "white",
                mb: 2,
                '&:hover': {
                  backgroundColor: "#033b73",
                },
              }}
            >
              Home Social
            </Button>
          </Link>

          {/* Tasto Notifiche */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "#044c93", color: "white", mb: 2 }}
            onClick={handleNotificationsClick}
          >
            <NotificationsIcon
              sx={{
                mr: 1,
                color: notifications.length > 0 ? "red" : "white",
              }}
            />
            Notifiche
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleNotificationsClose}
            sx={{ mt: 1 }}
          >
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem key={notification.id}>{notification.message}</MenuItem>
              ))
            ) : (
              <MenuItem>Nessuna notifica</MenuItem>
            )}
          </Menu>
        </Box>

        {/* Sezione "I miei post" */}
        <Box sx={{ mb: 4, width: "60%" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            I miei post
          </Typography>
          {posts.map((post) => (
            <Card key={post.id} sx={{ mb: 2, border: "1px solid #044c93" }}>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>
                {post.image && (
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: 2,
                      width: "100%",
                      height: "auto",
                      mb: 2,
                    }}
                    image={post.image}
                    alt="Post image"
                  />
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton sx={{ color: "#044c93" }}>
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="body2">{post.likes.length} Mi piace</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Profilo;