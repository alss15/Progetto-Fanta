import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Link } from "react-router-dom";
import MenuListe from "../components/MenuListe";

const HomeSocial = () => {
  // Recupera l'utente da localStorage
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;


  
  const [newComment, setNewComment] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostChallengeType, setNewPostChallengeType] = useState("SFIDA GIORNALIERA");
  const [newPostImage, setNewPostImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 3,
      creatorId: 4,
      creatorName: "Valerio Rossi",
      content: "E' stata un'impresa ascoltare Ivan tutte quelle ore, però ne sono uscito vivo.. ahahah! :) ",
      image: require("../materials/EY.jpg"),
      avatar: require("../materials/valerio.png"),
      likes: [],
      comments: [],
    },
    {
      id: 1,
      creatorId: 2,
      creatorName: "Laura Bianchi",
      content: "Buongiorno amici! Iniziamo bene la settimana con questa nuova piantina in ufficio. Vi piace? A me piace TANTISSIMO! #greenlife #greenchallenge #sostenibilità #SfidaSettimanale",
      image: require("../materials/Pianta.jpg"),
      likes: [2, 3],
      comments: [
        { userId: 2, userName: "Giovanni Verdi", text: "Bellissima pianta!" },
        { userId: 3, userName: "Mario Rossi", text: "Concordo, è stupenda!" },
      ],
    },
    {
      id: 2,
      creatorId: 3,
      creatorName: "Giovanni Verdi",
      content: "Ho fatto la sfida green giornaliera! Ecco a voi il mio dolce vegano :D. Che ne pensate? #greenlife #greenchallenge #sostenibilità #SfidaGiornaliera",
      image: require("../materials/Dolce.jpg"),
      likes: [1],
      comments: [],
    },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Laura Bianchi ha messo 'Mi piace' al tuo post." },
    { id: 2, message: "Giovanni Verdi ha commentato il tuo post." },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(true); // Stato per notifiche non lette

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadNotifications(false); // Spegne il tasto notifiche
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      alert("Il contenuto del post non può essere vuoto.");
      return;
    }

    const newPost = {
      id: Date.now(),
      creatorId: user.id,
      creatorName: `${user.nome} ${user.cognome}`,
      content: newPostContent,
      image: newPostImage,
      likes: [],
      comments: [],
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setNewPostContent("");
    setNewPostChallengeType("SFIDA GIORNALIERA");
    setNewPostImage(null);
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes.includes(user.id) ? post.likes.filter((id) => id !== user.id) : [...post.likes, user.id] }
          : post
      )
    );
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { userId: user.id, userName: `${user.nome} ${user.cognome}`, text: newComment }] }
          : post
      )
    );
    setNewComment("");
  };

  const handleAddEmoji = (emoji) => {
    setNewPostContent((prevContent) => prevContent + emoji);
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
      <Box sx={{ display: "flex", flexDirection: "row", px: 2 }}>
        {/* Sidebar sinistra */}
        <Box sx={{ width: "20%", p: 2 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                backgroundColor: "#044c93",
                color: "white",
                fontWeight: "bold",
                '&:hover': {
                  backgroundColor: "#033b73",
                },
              }}
            >
              HomePage
            </Button>
          </Link>
          <Link to="/profilo" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 1,
                backgroundColor: "#044c93",
                color: "white",
                '&:hover': {
                  backgroundColor: "#033b73",
                },
              }}
            >
              Profilo
            </Button>
          </Link>
          <Link to="/sfide" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 1,
                backgroundColor: "#044c93",
                color: "white",
                '&:hover': {
                  backgroundColor: "#033b73",
                },
              }}
            >
              Sfide
            </Button>
          </Link>
          <Button
            fullWidth
            variant="contained"
            startIcon={<NotificationsIcon />}
            sx={{
              mb: 1,
              backgroundColor: unreadNotifications ? "#ff9800" : "#044c93", // Arancione se ci sono notifiche non lette
              color: "white",
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: unreadNotifications ? "#e68900" : "#033b73",
              },
            }}
            onClick={handleNotificationsClick}
          >
            Notifiche
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleNotificationsClose}
          >
            {notifications.length === 0 ? (
              <MenuItem>Nessuna notifica</MenuItem>
            ) : (
              notifications.map((notification) => (
                <MenuItem key={notification.id}>{notification.message}</MenuItem>
              ))
            )}
          </Menu>
        </Box>
           {/* Componente per le sfide */}
        
          <Box sx={{ width: "60%", p: 2 }}>
            <Card sx={{ mb: 2, borderColor: "#044c93", borderWidth: 1, borderStyle: "solid" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              alt={`${user.nome} ${user.cognome}`}
              src={user.avatar || "https://via.placeholder.com/150"}
              sx={{ width: 50, height: 50, mr: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#044c93" }}>
              {`${user.nome} ${user.cognome}`}
            </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <TextField
              placeholder="Pubblica qui la tua sfida!"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            
            
                </Box>
                <MenuListe />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 2, gap: 2 }}>
            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: "#044c93", color: "white" }}
            >
              Carica Foto
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setNewPostImage(URL.createObjectURL(e.target.files[0]))}
              />
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#044c93", color: "white" }}
              onClick={handleCreatePost}
            >
              Pubblica
            </Button>
                </Box>
                {newPostImage && (
            <CardMedia
              component="img"
              sx={{
                borderRadius: 2,
                width: "100%",
                height: "auto",
                mt: 2,
              }}
              image={newPostImage}
              alt="Immagine caricata"
            />
                )}
                
              </CardContent>
            </Card>

            {/* Post finti */}
          {posts.map((post) => (
            <Card key={post.id} sx={{ mb: 2, boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    alt={post.creatorName}
                    src="https://via.placeholder.com/150"
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#044c93" }}>
                    {post.creatorName}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>
                {post.image && (
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: 2,
                      width: "50%",
                      height: "auto",
                      mb: 2,
                      mx: "auto",
                    }}
                    image={post.image}
                    alt="Post image"
                  />
                )}
                <Typography variant="body2" sx={{ color: "#044c93", fontWeight: "bold" }}>
                  {post.challengeType}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1 }}>
                  <CheckCircleIcon sx={{ color: "#4caf50" }} />
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "#4caf50" }}>
                    {post.points} Fanta Punti
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <IconButton onClick={() => handleLike(post.id)}>
                    <ThumbUpIcon
                      sx={{
                        color: post.likes.includes(user.id) ? "#044c93" : "gray",
                      }}
                    />
                  </IconButton>
                  <Typography variant="body2" sx={{ color: "#044c93", fontWeight: "bold" }}>
                    {post.likes.length} Mi piace
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Commenti:
                  </Typography>
                  {post.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                      <strong>{comment.userName}:</strong> {comment.text}
                    </Typography>
                  ))}
                  <TextField
                    placeholder="Scrivi un commento..."
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddComment(post.id);
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default HomeSocial;