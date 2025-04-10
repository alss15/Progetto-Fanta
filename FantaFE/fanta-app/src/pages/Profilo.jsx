import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CardMedia,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
      content: "Sfida settimanale completata! Ecco la mia pianta!",
      image: require("../materials/Pianta.jpg"),
      likes: [2, 3],
      comments: [
        { userId: 2, userName: "Laura Bianchi", text: "Bellissimo post!" },
        { userId: 3, userName: "Pippo Rossi", text: "Concordo!" },
      ],
      points: 50,
    },
    {
      id: 2,
      creatorId: 1,
      creatorName: "Mario Rossi",
      content: "Ho completato la sfida green giornaliera!",
      image: require("../materials/Dolce.jpg"),
      likes: [2],
      comments: [],
      points: 20,
    },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Laura Bianchi ha messo 'Mi piace' al tuo post." },
    { id: 2, message: "Pippo Rossi ha commentato il tuo post." },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
    setNotifications([]);
  };

  {/* Calcolo dei punti totali */}
  const totalPoints = posts.reduce((sum, post) => sum + (post.points || 0), 0);

  return (
    <div
      style={{
        backgroundImage: `url(${require("../materials/sfondo-login2.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Box align='center' sx={{ display: "flex", flexDirection: "column", alignItems: "center", px: 2 }}>
        {/* Contenitore informazioni profilo */}
        <Container>
          <Paper elevation={3} align='left' sx={{ padding: 3, mt: 4, mb: 4, width: "30%", borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "center" }}>
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

            {/* Pulsanti Home Social e Notifiche */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link to="/Home-Social" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#044c93",
                    color: "white",
                    '&:hover': { backgroundColor: "#033b73" },
                  }}
                  fullWidth
                >
                  Home Social
                </Button>
              </Link>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#044c93",
                  color: "white",
                  '&:hover': { backgroundColor: "#033b73" },
                }}
                onClick={handleNotificationsClick}
                fullWidth
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
          </Paper>
        </Container>
      

      

      {/* Contenitore principale */}
      <Box align="center" sx={{ mb: 4, width: "60%" }}>
        {/* Contatore delle FantaMonete */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
          
            color: "#044c93", 
            padding: "10px 20px", 
            borderRadius: "8px", 
            textAlign: "center", 
            mb: 3, 
            fontWeight: "bold", 
            width: "fit-content", 
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 5)", 
          }}
        >
          {/* Icona della moneta */}
          <img
            src={require("../materials/Moneta.png")}
            alt="FantaMonete"
            style={{
              width: "30px", // Larghezza dell'icona
              height: "30px", // Altezza dell'icona
              marginRight: "10px", // Spaziatura tra l'icona e il testo
              border: "2px solid white", // Contorno bianco
              borderRadius: "50%", // Per rendere il contorno circolare
              backgroundColor: "white", // Sfondo bianco dietro l'immagine
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            FantaMonete: {totalPoints}
          </Typography>
        </Box>

        {/* Titolo "Sfide Effettuate" */}
        <Box
          sx={{
            backgroundColor: "#044c93", 
            color: "white", 
            padding: "10px 20px", 
            borderRadius: "8px", 
            textAlign: "center", 
            mb: 3, 
            BoxShadow: "0px 4px 8px rgba(0, 0, 0, 5)", 
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Sfide Effettuate
          </Typography>
        </Box>

        {/* Lista dei post */}
        {posts.map((post) => (
          <Paper
            key={post.id}
            elevation={3}
            sx={{
              padding: 3,
              mb: 4,
              borderRadius: 2,
              border: "1px solid #044c93",
            }}
          >
            {/* Tipo di sfida e punti guadagnati con check verde */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "#044c93" }}>
                {post.creatorName} - {post.content.includes("settimanale") ? "SFIDA SETTIMANALE" : "SFIDA GIORNALIERA"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#044c93" }}>
                  +{post.points || 0} FantaMonete
                </Typography>
                <CheckCircleIcon sx={{ color: "green" }} />
              </Box>
            </Box>

            {/* Contenuto del post */}
            <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
              {post.content}
            </Typography>

            {/* Immagine del post */}
            {post.image && (
              <CardMedia
                component="img"
                sx={{
                  borderRadius: 2,
                  width: "100%", // Larghezza massima
                  height: "auto", // Altezza automatica
                  aspectRatio: "4 / 3", // Mantiene il rapporto 4:3
                  mb: 2,
                  objectFit: "cover", // Assicura che l'immagine riempia l'area
                }}
                image={post.image}
                alt="Post image"
              />
            )}

            {/* Sezione "Mi piace" */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton sx={{ color: "#044c93" }}>
                <ThumbUpIcon />
              </IconButton>
              <Typography variant="body2">{post.likes.length} Mi piace</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      </Box>

    </div>
  );
};

export default Profilo;