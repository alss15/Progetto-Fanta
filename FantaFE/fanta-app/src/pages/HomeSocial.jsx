import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, TextField, Button, Card, CardContent, CardMedia, Avatar, IconButton, Menu, MenuItem, Snackbar, Alert } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Importa l'icona di check verde
import { Link } from "react-router-dom";
import DolceImage from "../materials/Dolce.jpg";
import PiantaImage from "../materials/Pianta.jpg";
import NoProfilePicture from "../materials/NoProfilePicture.jpg"; // Importa l'immagine di default

const HomeSocial = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostChallengeType, setNewPostChallengeType] = useState("SFIDA GIORNALIERA");
  const [newPostImage, setNewPostImage] = useState(null);
  const [user, setUser] = useState({
    id: 1,
    firstName: "Mario",
    lastName: "Rossi",
  });
  const [news, setNews] = useState([]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      creatorId: 2,
      creatorName: "Laura Bianchi",
      content: "Buongiorno amici! Iniziamo bene la settimana con questa nuova piantina in ufficio. Vi piace? A me piace TANTISSIMO! #greenlife #greenchallenge #sostenibilità #SfidaSettimanale",
      image: PiantaImage,
      challengeType: "SFIDA SETTIMANALE", // Aggiungi il tipo di sfida
      likes: [],
      comments: [],
    },
    {
      id: 2,
      creatorId: 3,
      creatorName: "Giovanni Verdi",
      content: "Ho fatto la sfida green giornaliera! Ecco a voi il mio dolce vegano :D. Che ne pensate? #greenlife #greenchallenge #sostenibilità #SfidaGiornaliera",
      image: DolceImage,
      challengeType: "SFIDA GIORNALIERA", // Tipo di sfida
      likes: [],
      comments: [],
    },
  ]);

  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchedNews = [
      {
        title: "Riduzione della plastica: consigli utili",
        description: "Scopri come ridurre l'uso della plastica nella vita quotidiana.",
        url: "https://www.fanpage.it/innovazione/",
      },
      {
        title: "Energia rinnovabile: il futuro è adesso",
        description: "Le ultime novità sull'energia solare e eolica.",
        url: "https://www.fanpage.it/innovazione/",
      },
      {
        title: "Cibo sostenibile: una scelta per il pianeta",
        description: "Come scegliere alimenti che rispettano l'ambiente.",
        url: "https://www.fanpage.it/innovazione/",
      },
    ];
    setNews(fetchedNews);
  }, []);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
    setNotifications([]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        if (post.likes.includes(user.id)) {
          post.likes = post.likes.filter((userId) => userId !== user.id);
        } else {
          post.likes.push(user.id);
          if (post.creatorId !== user.id) {
            setNotifications((prev) => [
              ...prev,
              {
                id: Date.now(),
                message: `${user.firstName} ${user.lastName} ha messo "Mi piace" al tuo post.`,
              },
            ]);
          }
        }
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleAddComment = (postId, commentText) => {
    if (!user || !user.firstName || !user.lastName) {
      setSnackbarOpen(true);
      return;
    }

    if (commentText.trim() === "") return;

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        post.comments.push({
          userId: user.id,
          userName: `${user.firstName} ${user.lastName}`,
          text: commentText,
        });

        if (post.creatorId !== user.id) {
          setNotifications((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: `${user.firstName} ${user.lastName} ha commentato il tuo post.`,
            },
          ]);
        }
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      setSnackbarOpen(true);
      return;
    }

    const newPost = {
      id: Date.now(),
      creatorId: user.id,
      creatorName: `${user.firstName} ${user.lastName}`,
      content: newPostContent,
      image: newPostImage,
      challengeType: newPostChallengeType, // Aggiungi il tipo di sfida
      likes: [],
      comments: [],
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setNewPostContent("");
    setNewPostChallengeType("SFIDA GIORNALIERA");
    setNewPostImage(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${require("../materials/sfondo-login2.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        margin: 0, // Rimuove margini
        padding: 0, // Rimuove padding
        boxSizing: "border-box", // Assicura che il padding non influenzi le dimensioni
      }}
    >
      {/* Contenuto principale */}
      <Box sx={{ display: "flex", flexDirection: "row", mt: 2, px: 2 }}>
        {/* Sezione laterale sinistra */}
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
              Menu
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
            Messaggi
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#044c93",
              color: "white",
              '&:hover': {
                backgroundColor: "#033b73",
              },
            }}
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
                <MenuItem key={notification.id} onClick={handleNotificationsClose}>
                  {notification.message}
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleNotificationsClose}>Nessuna notifica</MenuItem>
            )}
          </Menu>
        </Box>

        {/* Feed centrale */}
        <Box sx={{ width: "60%", p: 2 }}>
          {/* Post input */}
          <Card sx={{ mb: 2, borderColor: "#044c93", borderWidth: 1, borderStyle: "solid" }}>
            <CardContent>
              <TextField
                placeholder="Pubblica qui la tua sfida!"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <TextField
                  select
                  label="Seleziona tipo di sfida"
                  variant="outlined"
                  size="small"
                  sx={{ width: "40%" }}
                  value={newPostChallengeType}
                  onChange={(e) => setNewPostChallengeType(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="SFIDA GIORNALIERA">SFIDA GIORNALIERA</option>
                  <option value="SFIDA SETTIMANALE">SFIDA SETTIMANALE</option>
                  <option value="SFIDA MENSILE">SFIDA MENSILE</option>
                </TextField>
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
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setNewPostImage(imageUrl);
                      }
                    }}
                  />
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="contained" sx={{ backgroundColor: "#044c93", color: "white" }} onClick={handleCreatePost}>
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
          {/* Feed dei post */}
          <Box>
            {posts.map((post) => (
              <Card key={post.id} sx={{ mb: 2, borderColor: "#044c93", borderWidth: 1, borderStyle: "solid" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      alt={post.creatorName}
                      src={post.creatorId === user.id && user.avatar ? user.avatar : NoProfilePicture} // Usa l'immagine dell'utente o quella di default
                      sx={{ width: 40, height: 40, mr: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#044c93" }}>
                      {post.creatorName}
                    </Typography>
                  </Box>
                  {/* Tipo di sfida */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
                    <Typography variant="body2" sx={{ color: "#044c93", fontWeight: "bold" }}>
                      {post.challengeType}
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
                        width: "100%",
                        height: "auto",
                        aspectRatio: "4 / 3",
                        objectFit: "cover",
                      }}
                      image={post.image}
                      alt="Post image"
                    />
                  )}
                  {/* Mi piace */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}>
                    <IconButton onClick={() => handleLike(post.id)} sx={{ color: post.likes.includes(user.id) ? "#033b73" : "#044c93" }}>
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      {post.likes.length} Mi piace
                    </Typography>
                  </Box>
                  {/* Commenti */}
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                      Commenti
                    </Typography>
                    {post.comments.map((comment, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                        <strong>{comment.userName}:</strong> {comment.text}
                      </Typography>
                    ))}
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <TextField
                        placeholder="Scrivi un commento..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#044c93", color: "white" }}
                        onClick={() => handleAddComment(post.id, newComment)}
                      >
                        Invia
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Sezione laterale destra: News dal mondo */}
        <Box sx={{ width: "20%", p: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: 'Arial, sans-serif', fontWeight: "bold", mb: 2, color: "#044c93" }}>
            News dal mondo
          </Typography>
          {news.map((article, index) => (
            <Card key={index} sx={{ mb: 2, boxShadow: 3, borderRadius: 2, border: "1px solid #044c93" }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#033b73", mb: 1 }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                  {article.description}
                </Typography>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#044c93",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Leggi di più
                </a>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Snackbar per messaggio di errore */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          Il contenuto del post non può essere vuoto.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomeSocial;