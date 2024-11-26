import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, deleteUser } from "./redux/usersSlice";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    date: new Date().toISOString().slice(0, 10),
    password: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      Swal.fire("Erreur", "Tous les champs sont obligatoires.", "error");
      return;
    }

    if (users.some((user, index) => user.email === formData.email && index !== editIndex)) {
      Swal.fire("Erreur", "Cet email est déjà enregistré.", "error");
      return;
    }

    if (editIndex !== null) {
      dispatch(updateUser({ index: editIndex, data: formData }));
      setEditIndex(null);
      Swal.fire("Succès", "Utilisateur modifié avec succès.", "success");
    } else {
      dispatch(addUser(formData));
      Swal.fire("Succès", "Utilisateur ajouté avec succès.", "success");
    }

    setFormData({
      nom: "",
      prenom: "",
      email: "",
      date: new Date().toISOString().slice(0, 10),
      password: "",
    });
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(index));
        Swal.fire("Supprimé !", "Utilisateur supprimé avec succès.", "success");
      }
    });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Gestion des Utilisateurs</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="card-title text-center mb-3">
          {editIndex !== null ? "Modifier Utilisateur" : "Ajouter Utilisateur"}
        </h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="form-control"
              placeholder="Entrez le nom"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="form-control"
              placeholder="Entrez le prénom"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Entrez l'email"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Mot de Passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Entrez le mot de passe"
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <button
            className={`btn ${editIndex !== null ? "btn-warning" : "btn-success"}`}
            onClick={handleSubmit}
          >
            {editIndex !== null ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      </div>

      <h4 className="mb-3">Liste des Utilisateurs</h4>
      {filteredUsers.length > 0 ? (
        <table className="table table-striped shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.date}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
};

export default App;
