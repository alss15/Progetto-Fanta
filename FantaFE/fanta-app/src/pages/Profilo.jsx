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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import CreateSfida from "../components/CreateSfida";

const Profilo = () => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  console.log(user);

  const [posts, setPosts] = useState([
    {
      id: 1,
      creatorId: 1,
      creatorName: user.nome + " " + user.cognome,
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
      creatorName: user.nome + " " + user.cognome,
      content: "Ho completato la sfida green giornaliera!",
      image: require("../materials/Dolce.jpg"),
      likes: [2],
      comments: [],
      points: 20,
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openCreateSfida, setOpenCreateSfida] = useState(false);


  const handleCreateSfidaClick = () => {
    setOpenCreateSfida(true); // Mostra il componente CreateSfida
  };

  const handleCloseCreateSfida = () => {
    setOpenCreateSfida(false); // Chiudi il componente CreateSfida
  };

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
      <Box align="center" sx={{ display: "flex", flexDirection: "column", alignItems: "center", px: 2 }}>
        <Container>
          <Paper elevation={3} align="left" sx={{ padding: 3, mt: 4, mb: 4, width: "30%", borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "center" }}>
              <Avatar
                alt={`${user.nome} ${user.cognome}`}
                src="../materials/Pippo.png"
                sx={{
                  width: 80, height: 80, mr: 3, border: "3px solid #044c93",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.1)" },
                }}
            ></Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {user.nome} {user.cognome}
                </Typography>
                <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
                  Bentornato {user.nome}! Completa le sfide e guadagna FantaMonete!


                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link to="/Home-Social" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#044c93",
                    color: "white",
                    "&:hover": { backgroundColor: "#033b73" },
                    fontWeight: "bold",


                  }}
                  fullWidth
                >
                  Home Fanta-Social!
                </Button>
              </Link>
              <Link to="/sfide" style={{ textDecoration: "none" }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    
                    backgroundColor: "#044c93",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#033b73",
                    },
                  }}
                >
                  Sfide in corso
                </Button>
              </Link>
              {/* Se l'utente è un admin, mostra il bottone per creare una sfida */}
              {user && user.role === "admin" && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#044c93",
                    color: "white",
                    "&:hover": { backgroundColor: "#033b73" },
                    mb: 1,
                  }}
                  onClick={handleCreateSfidaClick}
                >
                  Crea Sfida
                </Button>
              )}
              {/* Mostra il dialogo per creare una sfida */}
              <Dialog open={openCreateSfida} onClose={handleCloseCreateSfida}>
                <DialogTitle>Crea una nuova sfida</DialogTitle>
                <DialogContent>
                  <CreateSfida />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCreateSfida} color="primary">
                    Annulla
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Paper>
        </Container>
        {/*Contatore delle FantaMonete*/}
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
          <img
            src={require("../materials/Moneta.png")}
            alt="FantaMonete"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "10px",
              border: "2px solid white",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            FantaMonete: {totalPoints}
          </Typography>
        </Box>

        

        {/* Lista dei post */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // Permette di andare a capo se lo spazio non è sufficiente
            justifyContent: "center", // Centra i post orizzontalmente
            gap: 3, // Spaziatura tra i post
            mt: 3, // Margine superiore
            mb: 3, // Margine inferiore
          }}
        >
          {posts.map((post) => (
            <Paper
              key={post.id}
              elevation={3}
              sx={{
                padding: 3,
                mb: 4,
                borderRadius: 2,
                border: "1px solid #044c93",
                width: "400px", // Larghezza fissa
                height: "450px", // Altezza fissa
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Distribuisce il contenuto
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#044c93" }}>
                  {post.creatorName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "#044c93" }}>
                    +{post.points || 0} FantaMonete
                  </Typography>
                  <CheckCircleIcon sx={{ color: "green" }} />
                </Box>
              </Box>

              <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
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
                    mb: 2,
                    objectFit: "cover",
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
 )
}
export default Profilo;
