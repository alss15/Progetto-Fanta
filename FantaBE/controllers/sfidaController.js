const Sfida = require("../models/sfida");

const createSfida = async (req, res) => {
    try {
      const { title, description, data } = req.body;
      const newSfida = await Sfida.create({ title, description, data });
      res.status(201).json(newSfida);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {createSfida};

const getAllSfide = async (req, res) => {
    try {
      const Sfide = await Sfida.findAll();
      res.json(Sfide);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {getAllSfide};

  const getSfidaById = async (req, res) => {
    try {
      const { id } = req.params;
      const sfida = await Sfida.findByPk(id);
      if (!sfida) return res.status(404).json({ message: "Sfida non trovata" });
      res.json(sfida);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {getSfidaById};

  const updateSfida = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, data } = req.body;
      
      const sfida = await Sfida.findByPk(id);
      if (!sfida) return res.status(404).json({ message: "Sfida non trovata" });
      sfida.title = title || sfida.title;
      sfida.description = description || sfida.description;
      sfida.eventDate = data || sfida.data;
      
      await sfida.save();
      res.json(sfida);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {updateSfida};

  const deleteSfida = async (req, res) => {
    try {
      const { id } = req.params;
      const sfida = await Sfida.findByPk(id);
      if (!sfida) return res.status(404).json({ message: "Sfida non trovata" });
  
      await sfida.destroy();
      res.json({ message: "Sfida eliminata con successo" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {deleteSfida};


  

