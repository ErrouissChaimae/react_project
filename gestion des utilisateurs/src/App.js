/*import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    date: new Date().toISOString().slice(0, 10), // Date actuelle par défaut
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Ajouter ou mettre à jour un utilisateur
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
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setEditIndex(null);
      Swal.fire("Succès", "Utilisateur modifié avec succès.", "success");
    } else {
      setUsers([...users, formData]);
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

  // Supprimer un utilisateur avec confirmation
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
        setUsers(users.filter((_, i) => i !== index));
        Swal.fire("Supprimé !", "Utilisateur supprimé avec succès.", "success");
      }
    });
  };

  // Modifier un utilisateur
  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  // Recherche multi-champs
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Gestion des Utilisateurs</h1>

      {/* Barre de recherche *  /}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Formulaire * /}
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

      {/* Liste des utilisateurs * /}
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

export default App;*/


import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import SearchUser from "./components/SearchUser";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);

  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Gestion Utilisateurs
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Liste
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">
                    Ajouter
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    Rechercher
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<UserList users={users} setUsers={setUsers} />} />
          <Route path="/add" element={<AddUser users={users} setUsers={setUsers} />} />
          <Route path="/edit/:id" element={<EditUser users={users} setUsers={setUsers} />} />
          <Route path="/search" element={<SearchUser users={users} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
