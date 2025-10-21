/* ============================================================
   💸 GESTION DES DÉPENSES — PAGE TABLEAU DE BORD
   Ce script gère l’affichage, la pagination, l’ajout, 
   la modification et la suppression des dépenses.
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
// 💰 Configuration du tableau des dépenses
// -------------------------------
const rowsPerPageExpense = 2;
const tableExpense = document.getElementById("expenseTable");
const tbodyExpense = tableExpense.querySelector("tbody");
const paginationExpense = document.getElementById("pagination");

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
  return dateInput.value.trim();
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
// 🔄 Chargement et affichage des dépenses
// -------------------------------
async function loadExpenses() {
  try {
    const response = await fetch("http://localhost:8080/api/expenses");
    if (!response.ok) throw new Error("Erreur de chargement des dépenses");

    const expenses = await response.json();
    const selectedMonth = getSelectedMonthYear();
    tbodyExpense.innerHTML = "";

    // 🔎 Filtrage par mois/année
    const filteredExpenses = expenses.filter(expense => {
      return !selectedMonth || expense.monthYear.startsWith(selectedMonth);
    });

    // 🧱 Construction du tableau
    filteredExpenses.forEach(expense => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${expense.label}</td>
        <td>${expense.amount.toFixed(2)} €</td>
        <td>${expense.description || "-"}</td>
        <td>${expense.monthYear}</td>
        <td>
          <button class="btn-edit" data-id="${expense.id}">✏️</button>
          <button class="btn-delete" data-id="${expense.id}">🗑️</button>
        </td>
      `;
      tbodyExpense.appendChild(row);
    });

    // 🔢 Mise à jour de la pagination
    const rowsExpense = Array.from(tbodyExpense.querySelectorAll("tr"));
    displayPage(1, rowsPerPageExpense, rowsExpense, tbodyExpense);
    setupPagination(rowsExpense, rowsPerPageExpense, paginationExpense, tbodyExpense);

  } catch (error) {
    console.error("Erreur dans loadExpenses:", error);
    alert("Impossible de charger les dépenses. Vérifiez le serveur API.");
  }
}

// -------------------------------
// 🔄 Chargement et affichage des suggestions de dépenses
// -------------------------------
async function loadExpenseSuggestions() {
  try {
    const response = await fetch("http://localhost:8080/api/expenses-suggestions");
    if (!response.ok) throw new Error("Erreur de chargement des suggestions de dépenses");

    const suggestions = await response.json();
    const selectedMonth = getSelectedMonthYear();
    tbodySuggestions.innerHTML = "";

    const filteredSuggestions = suggestions.filter(suggestion => {
      return !selectedMonth || suggestion.monthYear.startsWith(selectedMonth);
    });

    filteredSuggestions.forEach(sugg => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${sugg.suggestion}</td>
        <td>${sugg.content}</td>
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
    console.error("Erreur dans loadExpenseSuggestions:", error);
    alert("Impossible de charger les suggestions de dépenses. Vérifiez le serveur API.");
  }
}

// -------------------------------
// ➕ Ajout d’une nouvelle dépense
// -------------------------------
const formNewExpense = document.getElementById("add-new-expense");

formNewExpense.addEventListener("submit", async (event) => {
  event.preventDefault();

  const moisAnnee = getSelectedMonthYear();
  if (!moisAnnee) {
    alert("Veuillez sélectionner une date valide avant d’ajouter une dépense.");
    return;
  }

  const monthYear = `${moisAnnee}-01`;
  const newExpense = {
    amount: parseFloat(document.getElementById("new-expense").value),
    label: document.getElementById("label-new-expense").value,
    description: document.getElementById("description-new-expense").value,
    monthYear: monthYear
  };

  try {
    const response = await fetch("http://localhost:8080/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense)
    });

    if (response.ok) {
      alert("Dépense ajoutée avec succès !");
      formNewExpense.reset();
      await loadExpenses();
    } else {
      alert("Erreur lors de l’ajout de la dépense.");
    }
  } catch (error) {
    console.error("Erreur lors de l’ajout :", error);
  }
});

// -------------------------------
// ❌ Suppression d’une dépense
// -------------------------------
tbodyExpense.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-delete")) return;

  const id = event.target.dataset.id;
  if (!confirm("Voulez-vous vraiment supprimer cette dépense ?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      await loadExpenses();
    } else {
      alert("Erreur lors de la suppression.");
    }
  } catch (error) {
    console.error("Erreur de suppression :", error);
  }
});

// -------------------------------
// ✏️ Modification d’une dépense
// -------------------------------
tbodyExpense.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-edit")) return;

  const id = event.target.dataset.id;
  const newLabel = prompt("Nouveau label :");
  const newAmount = prompt("Nouveau montant :");
  const newDescription = prompt("Nouvelle description :");

  if (!newLabel || !newAmount) {
    alert("Label et montant sont obligatoires.");
    return;
  }

  const updatedExpense = {
    label: newLabel,
    amount: parseFloat(newAmount),
    description: newDescription || "",
    monthYear: getSelectedMonthYear() + "-01"
  };

  try {
    const response = await fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExpense)
    });
    if (response.ok) {
      await loadExpenses();
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  } catch (error) {
    console.error("Erreur de mise à jour :", error);
  }
});

// -------------------------------
// ➕ Ajout d’une nouvelle suggestion de dépense
// -------------------------------
const formNewSuggestion = document.getElementById("add-new-suggestion");

formNewSuggestion.addEventListener("submit", async (event) => {
  event.preventDefault();

  const moisAnnee = getSelectedMonthYear();
  if (!moisAnnee) {
    alert("Veuillez sélectionner une date valide avant d’ajouter une suggestion.");
    return;
  }

  const monthYear = `${moisAnnee}-01`;
  const newSuggestion = {
    suggestion: document.getElementById("new-suggestion").value,
    content: document.getElementById("content-new-suggestion").value,
    monthYear: monthYear
  };

  try {
    const response = await fetch("http://localhost:8080/api/expenses-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSuggestion)
    });

    if (response.ok) {
      alert("Suggestion ajoutée avec succès !");
      formNewSuggestion.reset();
      await loadExpenseSuggestions();
    } else {
      alert("Erreur lors de l’ajout de la suggestion.");
    }
  } catch (error) {
    console.error("Erreur lors de l’ajout :", error);
  }
});

// -------------------------------
// ❌ Suppression d’une suggestion de dépense
// -------------------------------
tbodySuggestions.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-delete")) return;

  const id = event.target.dataset.id;
  if (!confirm("Voulez-vous vraiment supprimer cette suggestion ?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/expenses-suggestions/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      await loadExpenseSuggestions();
    } else {
      alert("Erreur lors de la suppression.");
    }
  } catch (error) {
    console.error("Erreur de suppression :", error);
  }
});

// -------------------------------
// ✏️ Modification d’une suggestion de dépense
// -------------------------------
tbodySuggestions.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-edit")) return;

  const id = event.target.dataset.id;
  const newSuggestion = prompt("Nouvelle suggestion :");
  const newContent = prompt("Nouveau contenu :");

  if (!newSuggestion || !newContent) {
    alert("Suggestion et contenu sont obligatoires.");
    return;
  }

  const updatedSuggestion = {
    suggestion: newSuggestion,
    content: newContent,
    monthYear: getSelectedMonthYear() + "-01"
  };

  try {
    const response = await fetch(`http://localhost:8080/api/expenses-suggestions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSuggestion)
    });
    if (response.ok) {
      await loadExpenseSuggestions();
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
  loadExpenses();
  loadExpenseSuggestions();
});

// -------------------------------
// 🚀 Chargement initial
// -------------------------------
loadExpenses();
loadExpenseSuggestions();
