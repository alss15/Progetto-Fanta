import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Checkbox,
  Paper,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CardMedia,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { getAllSfide } from "../services/api";

const CreatorPage = () => {
  // Stato per la checklist
  const [tasks, setTasks] = useState([]);
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

  // Effetto per caricare le sfide
  useEffect(() => {
    const fetchSfide = async () => {
      try {
        const sfide = await getAllSfide();
        const formattedTasks = sfide.map((sfida, index) => ({
          id: index + 1,
          text: sfida.title,
          date: new Date(sfida.data).toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          completed: false,
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Errore durante il caricamento delle sfide:", error);
      }
    };

    fetchSfide();
  }, []);

  // Funzione per gestire il toggle
  const handleToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
    setNotifications([]);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${require("../materials/sfondo-login2.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        align="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Profilo utente */}
        <Container>
          <Paper elevation={3} sx={{ padding: 3, mt: 4, mb: 4, width: "30%", borderRadius: 2 }}>
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

            {/* Pulsanti */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link to="/Home-Social" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#044c93",
                    color: "white",
                    "&:hover": { backgroundColor: "#033b73" },
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
                  "&:hover": { backgroundColor: "#033b73" },
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

        {/* Lista di checklist */}
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Sfide in corso
            </Typography>
            <List>
              {tasks.map((task) => (
                <ListItem key={task.id} button onClick={() => handleToggle(task.id)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      tabIndex={-1}
                      disableRipple
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${task.text}`}
                    secondary={`Data: ${task.date}`}
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "green" : "black",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>

        {/* Sezione "I miei post" */}
        <Box align="center" sx={{ mb: 4, width: "60%" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            I miei post
          </Typography>
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
              <Typography variant="body1" sx={{ mb: 2 }}>
                {post.content}
              </Typography>
              {post.image && (
                <CardMedia
                  component="img"
                  sx={{
                    borderRadius: 2,
                    width: "75%",
                    height: "auto",
                    aspectRatio: "4 / 3",
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
            </Paper>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default CreatorPage;