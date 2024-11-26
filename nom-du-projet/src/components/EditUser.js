import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = ({ users, setUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userToEdit = users.find((user) => user.id === parseInt(id));
  
  // Initialiser les champs avec les données actuelles de l'utilisateur
  const [formData, setFormData] = useState(userToEdit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      Swal.fire("Erreur", "Tous les champs sont obligatoires.", "error");
      return;
    }

    // Vérifie si l'email existe déjà chez un autre utilisateur
    if (
      users.some(
        (user) =>
          user.email === formData.email && user.id !== parseInt(id)
      )
    ) {
      Swal.fire("Erreur", "Cet email est déjà utilisé par un autre utilisateur.", "error");
      return;
    }

    // Mettre à jour l'utilisateur
    setUsers(
      users.map((user) =>
        user.id === parseInt(id) ? formData : user
      )
    );

    Swal.fire("Succès", "Utilisateur modifié avec succès.", "success");
    navigate("/"); // Retour à la liste des utilisateurs
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4 text-center">Modifier l'utilisateur</h3>
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
        <button onClick={handleSubmit} className="btn btn-warning btn-sm px-4">
            Mettre à jour
        </button>
      </div>

    </div>
  );
};

export default EditUser;
