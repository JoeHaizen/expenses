/* ============================================================
   💸 GESTION DES DÉPENSES — PAGE TABLEAU DE BORD
   Ce script gère l’affichage, la pagination, l’ajout, 
   la modification et la suppression des dépenses.
   Il filtre aussi les données par mois/année sélectionné.
   ============================================================ */

// -------------------------------
// 💰 Configuration du tableau des abonnements
// -------------------------------
const rowsPerPageSubscription = 2;
const tableSubscription = document.getElementById("subscriptionTable");
const tbodySubscription = tableSubscription.querySelector("tbody");
const paginationSubscription = document.getElementById("pagination");
const totalSubscriptionDisplay = document.getElementById("totalAmount");
// -------------------------------
// 📅 Gestion de la date (mois/année)
// -------------------------------
const dateInput = document.getElementById("moisAnnee");

/**
 * Retourne la valeur actuelle du champ date sous forme "YYYY-MM"
 */
async function totalAmount() {
  let total = 0;
   try {
    const response = await fetch("http://localhost:8080/api/subscriptions");
    if (!response.ok) throw new Error("Erreur de chargement des abonnements");

    const subscriptions = await response.json();
    console.log("Subscriptions for totalAmount:", subscriptions);
    subscriptions.forEach(subscription => {
      total += subscription.amount;
    });
  totalSubscriptionDisplay.textContent = total.toFixed(2) + " €";
    return total;
  } catch (error) {
    console.error("Erreur dans loadSubscriptions:", error);
    alert("Impossible de charger la somme des abonnements. Vérifiez le serveur API.");
  }
}

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
// 🔄 Chargement et affichage des abonnements
// -------------------------------
async function loadSubscriptions() {
  try {
    const response = await fetch("http://localhost:8080/api/subscriptions");
    if (!response.ok) throw new Error("Erreur de chargement des abonnements");

    const subscriptions = await response.json();
    const selectedMonth = getSelectedMonthYear();
    tbodySubscription.innerHTML = "";

    // 🔎 Filtrage par mois/année
    const filteredSubscriptions = subscriptions.filter(subscription => {
      return !selectedMonth || subscription.monthYearStart .startsWith(selectedMonth);
    });

    // 🧱 Construction du tableau
    filteredSubscriptions.forEach(subscription => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${subscription.label}</td>
        <td>${subscription.amount.toFixed(2)} €</td>
        <td>${subscription.description || "-"}</td>
        <td>${subscription.monthYearStart}</td>
        <td>${subscription.monthYearEnd}</td>

        <td>
          <button class="btn-edit" data-id="${subscription.id}">✏️</button>
          <button class="btn-delete" data-id="${subscription.id}">🗑️</button>
        </td>
      `;
      tbodySubscription.appendChild(row);
    });

    // 🔢 Mise à jour de la pagination
    const rowsSubscription = Array.from(tbodySubscription.querySelectorAll("tr"));
    displayPage(1, rowsPerPageSubscription, rowsSubscription, tbodySubscription);
    setupPagination(rowsSubscription, rowsPerPageSubscription, paginationSubscription, tbodySubscription);
    totalAmount();
  } catch (error) {
    console.error("Erreur dans loadSubscriptions:", error);
    alert("Impossible de charger les abonnements. Vérifiez le serveur API.");
  }
}

// -------------------------------
// ➕ Ajout d’une nouvel abonnement
// -------------------------------
const formNewSubscription = document.getElementById("add-new-subscription");
// -------------------------------
formNewSubscription.addEventListener("submit", async (event) => {
  event.preventDefault();

  const moisAnnee = getSelectedMonthYear();
  if (!moisAnnee) {
    alert("Veuillez sélectionner une date valide avant d’ajouter un abonnement.");
    return;
  }

  const monthYearStart = `${moisAnnee}-01`;
  const monthYearEnd = null;
  const newSubscription = {
    amount: parseFloat(document.getElementById("new-subscription").value),
    label: document.getElementById("label-new-subscription").value,
    description: document.getElementById("description-new-subscription").value,
    monthYearStart: monthYearStart,
    monthYearEnd: null
  };

  try {
    const response = await fetch("http://localhost:8080/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSubscription)
    });

    if (response.ok) {
      alert("Abonnement ajouté avec succès !");
      formNewSubscription.reset();
      await loadSubscriptions();
    } else {
      alert("Erreur lors de l’ajout de l’abonnement.");
    }
  } catch (error) {
    console.error("Erreur lors de l’ajout :", error);
  }
});

// -------------------------------
// ❌ Suppression d’un abonnement
// -------------------------------
tbodySubscription.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-delete")) return;

  const id = event.target.dataset.id;
  if (!confirm("Voulez-vous vraiment supprimer cet abonnement ?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/subscriptions/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      await loadSubscriptions();
    } else {
      alert("Erreur lors de la suppression.");
    }
  } catch (error) {
    console.error("Erreur de suppression :", error);
  }
});

// -------------------------------
// ✏️ Modification d’un abonnement
// -------------------------------
tbodySubscription.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("btn-edit")) return;

  const id = event.target.dataset.id;
  const newLabel = prompt("Nouveau label :");
  const newAmount = prompt("Nouveau montant :");
  const newDescription = prompt("Nouvelle description :");
  const EndSubscriptionDate = prompt("Date de fin (YYYY-MM-DD) :");

  if (!newLabel || !newAmount) {
    alert("Label et montant sont obligatoires.");
    return;
  }

  try {
    // 🔹 Étape 1 : Récupérer les données existantes pour cet ID
    const getResponse = await fetch(`http://localhost:8080/api/subscriptions/${id}`);
    if (!getResponse.ok) throw new Error("Impossible de récupérer l'abonnement existant");

    const existingSubscription = await getResponse.json();

    // 🔹 Étape 2 : Conserver la date de début existante
    const existingStartDate = existingSubscription.monthYearStart;

    // 🔹 Étape 3 : Construire l'objet mis à jour
    const updatedSubscription = {
      label: newLabel,
      amount: parseFloat(newAmount),
      description: newDescription || "",
      monthYearStart: existingStartDate, // ✅ garde la valeur d'origine
      monthYearEnd: EndSubscriptionDate
    };

    // 🔹 Étape 4 : Envoi de la mise à jour
    const response = await fetch(`http://localhost:8080/api/subscriptions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSubscription)
    });

    if (response.ok) {
      alert("Abonnement mis à jour avec succès !");
      await loadSubscriptions();
    } else {
      alert("Erreur lors de la mise à jour.");
    }

  } catch (error) {
    console.error("Erreur de mise à jour :", error);
    alert("Une erreur est survenue lors de la mise à jour.");
  }
});


// -------------------------------
// 📆 Rafraîchissement automatique au changement de date
// -------------------------------
dateInput.addEventListener("change", () => {
  loadSubscriptions();
  totalAmount();
});

// -------------------------------
// 🚀 Chargement initial
// -------------------------------
loadSubscriptions();
totalAmount();





