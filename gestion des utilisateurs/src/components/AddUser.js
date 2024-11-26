import React, { useState } from "react";
import Swal from "sweetalert2";

const AddUser = ({ users, setUsers }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    date: new Date().toISOString().slice(0, 10),
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      Swal.fire("Erreur", "Tous les champs sont obligatoires.", "error");
      return;
    }

    if (users.some((user) => user.email === formData.email)) {
      Swal.fire("Erreur", "Cet email est déjà enregistré.", "error");
      return;
    }

    setUsers([...users, { ...formData, id: Date.now() }]);
    Swal.fire("Succès", "Utilisateur ajouté avec succès.", "success");
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      date: new Date().toISOString().slice(0, 10),
      password: "",
    });
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4 text-center">Ajouter un utilisateur</h3>
      <div className="mb-3">
        <label className="form-label">Nom</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Prénom</label>
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="d-flex justify-content-center">
       <button onClick={handleSubmit} className="btn btn-success w-100">
        Ajouter
        </button>
      </div>
      
    </div>
  );
  
};

export default AddUser;
