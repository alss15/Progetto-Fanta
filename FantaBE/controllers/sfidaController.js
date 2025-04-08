
const db = require('../models');
const Sfida = db.Sfida;

exports.createSfida = async (req, res) => {
    try {
      const { title, description, data } = req.body;
      if (req.user && (req.user.role !== 'admin' )) {
        return res.status(403).json ({ error: "Non autorizzato"});

      }

      const newSfida = await Sfida.create({ title, description, data});
      res.status(201).json(newSfida);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


exports.getAllSfide = async (req, res) => {
    try {
      const Sfide = await Sfida.findAll();
      res.json(Sfide);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.getSfidaById = async (req, res) => {
    try {
      const { id } = req.params;
      const sfida = await Sfida.findByPk(id);
      if (!sfida) return res.status(404).json({ message: "Sfida non trovata" });
      res.json(sfida);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.updateSfida = async (req, res) => {
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
  

  exports.deleteSfida = async (req, res) => {
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



  

