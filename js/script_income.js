/* ============================================================
   🏠 GESTION DES REVENUS — PAGE TABLEAU DE BORD
   Ce script gère l’affichage, la pagination, l’ajout, 
   la modification et la suppression des revenus.
   Il filtre aussi les données par mois/année sélectionné.
   ============================================================ */

// -------------------------------
// 🔙 Bouton de retour à l'accueil
// -------------------------------
const btnAccueil = document.getElementById("btnAccueil");
btnAccueil.addEventListener("click", () => {
  window.location.href = "accueil.html";
});

// -------------------------------
// 💰 Configuration du tableau des revenus
// -------------------------------
const rowsPerPageIncome = 2;
const tableIncome = document.getElementById("incomeTable");
const tbodyIncome = tableIncome.querySelector("tbody");
const paginationIncome = document.getElementById("pagination");

// -------------------------------
// 💡 Configuration du tableau des suggestions (facultatif)
// -------------------------------
const rowsPerPageSuggestions = 2;
const tableSuggestions = document.getElementById("suggestion-table");
const tbodySuggestions = tableSuggestions.querySelector("tbody");
const paginationSuggestions = document.getElementById("pagination-suggestion");

// -------------------------------
// 📅 Gestion de la date (mois/année)
// -------------------------------
const dateInput = document.getElementById("moisAnnee");

/**
 * Retourne la valeur actuelle du champ date sous forme "YYYY-MM"
 */
function getSelectedMonthYear() {
  return dateInput.value.trim(); // "2025-10" ou ""
}

// -------------------------------
// 📄 Pagination
// -------------------------------
function displayPage(page, rowsPerPage, rows, tbody) {
  tbody.innerHTML = "";
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  rows.slice(start, end).forEach(row => tbody.appendChild(row));
}

function setupPagination(rows, rowsPerPage, pagination, tbody) {
  const pageCount = Math.ceil(rows.length / rowsPerPage);
  pagination.innerHTML = "";
  
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.addEventListener("click", () => displayPage(i, rowsPerPage, rows, tbody));
    pagination.appendChild(btn);
  }
}

// -------------------------------
// 🔄 Chargement et affichage des revenus
// -------------------------------
async function loadIncomes() {
  try {
    const response = await fetch("http://localhost:8080/api/incomes");
    if (!response.ok) throw new Error("Erreur de chargement des revenus");

    const incomes = await response.json();
    const selectedMonth = getSelectedMonthYear();
    tbodyIncome.innerHTML = "";

    // 🔎 Filtrage par mois/année
    const filteredIncomes = incomes.filter(income => {
      return !selectedMonth || income.monthYear.startsWith(selectedMonth);
    });

    // 🧱 Construction du tableau
    filteredIncomes.forEach(income => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${income.label}</td>
        <td>${income.amount.toFixed(2)} €</td>
        <td>${income.description || "-"}</td>
        <td>${income.monthYear}</td>
        <td>
          <button class="btn-edit" data-id="${income.id}">✏️</button>
          <button class="btn-delete" data-id="${income.id}">🗑️</button>
        </td>
      `;
      tbodyIncome.appendChild(row);
    });
  
        // 🔢 Mise à jour de la pagination
    const rowsIncome = Array.from(tbodyIncome.querySelectorAll("tr"));
    displayPage(1, rowsPerPageIncome, rowsIncome, tbodyIncome);
    setupPagination(rowsIncome, rowsPerPageIncome, paginationIncome, tbodyIncome);

  } catch (error) {
    console.error("Erreur dans loadIncomes:", error);
    alert("Impossible de charger les revenus. Vérifiez le serveur API.");
  }
}
    // -------------------------------
// 🔄 Chargement et affichage des revenus
// -------------------------------
async function loadIncomesSuggestions() {
  try {
    const response = await fetch("http://localhost:8080/api/incomes-suggestions");
    if (!response.ok) throw new Error("Erreur de chargement des suggestions de revenus");

    const suggestions = await response.json();
    const selectedMonth = getSelectedMonthYear();
    tbodySuggestions.innerHTML = "";

    // 🔎 Filtrage par mois/année
    const filteredSuggestions = suggestions.filter(suggestion => {
      return !selectedMonth || suggestion.monthYear.startsWith(selectedMonth);
    });

    // 🧱 Construction du tableau
    filteredSuggestions.forEach(sugg => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${sugg.suggestion}</td>
        <td>${sugg.content} </td>
        <td>${sugg.monthYear}</td>
        <td>
          <button class="btn-edit" data-id="${sugg.id}">✏️</button>
          <button class="btn-delete" data-id="${sugg.id}">🗑️</button>
        </td>
      `;
      tbodySuggestions.appendChild(row);
    });
    const rowsSuggestions = Array.from(tbodySuggestions.querySelectorAll("tr"));
    displayPage(1, rowsPerPageSuggestions, rowsSuggestions, tbodySuggestions);
    setupPagination(rowsSuggestions, rowsPerPageSuggestions, paginationSuggestions, tbodySuggestions);


  } catch (error) {
    console.error("Erreur dans loadIncomesSuggestions:", error);
    alert("Impossible de charger les suggestions des revenus. Vérifiez le serveur API.");
  }
}


// -------------------------------
// ➕ Ajout d’un nouveau revenu
// -------------------------------
const formNewIncome = document.getElementById("add-new-income");

formNewIncome.addEventListener("submit", async (event) => {
  event.preventDefault();

  const moisAnnee = getSelectedMonthYear();
  if (!moisAnnee) {
    alert("Veuillez sélectionner une date valide avant d’ajouter un revenu.");
    return;
  }

  const monthYear = `${moisAnnee}-01`;
  const newIncome = {
    amount: parseFloat(document.getElementById("new-income").value),
    label: document.getElementById("label-new-income").value,
    description: document.getElementById("description-new-income").value,
    monthYear: monthYear
  };

  try {
    const response = await fetch("http://localhost:8080/api/incomes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIncome)
    });

    if (response.ok) {
      alert("Revenu ajouté avec succès !");
      formNewIncome.reset();
      await loadIncomes();
    } else {
      alert("Erreur lors de l’ajout du revenu.");
    }
  } catch (error) {
    console.error("Erreur lors de l’ajout :", error);
  }
});

// -------------------------------
// ❌ Suppression d’un revenu
// -------------------------------
tbodyIncome.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-delete")) return;

  const id = event.target.dataset.id;
  if (!confirm("Voulez-vous vraiment supprimer cette suggestion de revenu ?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/incomes/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      await loadIncomes();
    } else {
      alert("Erreur lors de la suppression.");
    }
  } catch (error) {
    console.error("Erreur de suppression :", error);
  }
});

// -------------------------------
// ✏️ Modification d’un revenu
// -------------------------------
tbodyIncome.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-edit")) return;

  const id = event.target.dataset.id;
  const newLabel = prompt("Nouveau label :");
  const newAmount = prompt("Nouveau montant :");
  const newDescription = prompt("Nouvelle description :");

  if (!newLabel || !newAmount) {
    alert("Label et montant sont obligatoires.");
    return;
  }

  const updatedIncome = {
    label: newLabel,
    amount: parseFloat(newAmount),
    description: newDescription || "",
    monthYear: getSelectedMonthYear() + "-01"
  };

  try {
    const response = await fetch(`http://localhost:8080/api/incomes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedIncome)
    });
    if (response.ok) {
      await loadIncomes();
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  } catch (error) {
    console.error("Erreur de mise à jour :", error);
  }
});
// -------------------------------
// ➕ Ajout d’une nouvelle suggestion de revenu
// -------------------------------
const formNewSuggestion = document.getElementById("add-new-suggestion");

formNewSuggestion.addEventListener("submit", async (event) => {
  event.preventDefault();

  const moisAnnee = getSelectedMonthYear();
  if (!moisAnnee) {
    alert("Veuillez sélectionner une date valide avant d’ajouter une nouvelle suggestion.");
    return;
  }

  const monthYear = `${moisAnnee}-01`;
  const newSuggestion = {
    suggestion: document.getElementById("new-suggestion").value,
    content: document.getElementById("content-new-suggestion").value,
    monthYear: monthYear
  };

  try {
    const response = await fetch("http://localhost:8080/api/incomes-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSuggestion)
    });

    if (response.ok) {
      alert("Suggestion ajoutée avec succès !");
      formNewSuggestion.reset();
      await loadIncomesSuggestions();
    } else {
      alert("Erreur lors de l’ajout de la suggestion.");
    }
  } catch (error) {
    console.error("Erreur lors de l’ajout :", error);
  }
});

// -------------------------------
// ❌ Suppression d’une suggestion de revenu
// -------------------------------
tbodyIncome.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-delete")) return;

  const id = event.target.dataset.id;
  if (!confirm("Voulez-vous vraiment supprimer ce revenu ?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/incomes-suggestions/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      await loadIncomesSuggestions();
    } else {
      alert("Erreur lors de la suppression.");
    }
  } catch (error) {
    console.error("Erreur de suppression :", error);
  }
});

// -------------------------------
// ✏️ Modification d’un revenu
// -------------------------------
tbodyIncome.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-edit")) return;

  const id = event.target.dataset.id;
  const newSuggestion = prompt("Nouvelle suggestion :");
  const newContent = prompt("Nouveau contenu :");
  
  if (!newContent || !newSuggestion) {
    alert("Contenu et suggestion sont obligatoires.");
    return;
  }

  const updatedIncome = {

    suggestion: newSuggestion,
    content: newContent,
    monthYear: getSelectedMonthYear() + "-01"
  };

  try {
    const response = await fetch(`http://localhost:8080/api/incomes-suggestions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedIncome)
    });
    if (response.ok) {
      await loadIncomesSuggestions();
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  } catch (error) {
    console.error("Erreur de mise à jour :", error);
  }
});

// -------------------------------
// 📆 Rafraîchissement automatique au changement de date
// -------------------------------
dateInput.addEventListener("change", () => {
  loadIncomes();
  loadIncomesSuggestions();
});

// -------------------------------
// 🚀 Chargement initial
// -------------------------------
loadIncomes();
loadIncomesSuggestions();
  
