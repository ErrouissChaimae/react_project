import React, { useState } from "react";

const SearchUser = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    ["nom", "prenom", "email"].some((key) => {
      const value = user[key];
      // Vérifie que la valeur existe et qu'elle est une chaîne
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-4 text-center">Rechercher un utilisateur</h3>
      <input
        type="text"
        placeholder="Rechercher par nom, prénom ou email..."
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-4"
      />
      {filteredUsers.length > 0 ? (
        <ul className="list-group">
          {filteredUsers.map((user) => (
            <li key={user.id} className="list-group-item">
              {user.nom} {user.prenom} ({user.email})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
};

export default SearchUser;
