 // Retour à l'accueil
  const btnAccueil = document.getElementById("btnAccueil");

  // Quand on clique sur Accueil
    btnAccueil.addEventListener("click", () => {
  window.location.href = "accueil.html";
    });

  
 //Income Table 
  const rowsPerPageIncome = 2;
  const tableIncome = document.getElementById("incomeTable");
  const tbodyIncome = tableIncome.querySelector("tbody");
  const rowsIncome = Array.from(tbodyIncome.querySelectorAll("tr"));
  const paginationIncome = document.getElementById("pagination");

  //Suggestion Table 
  const rowsPerPageSugg = 2; 
  const tableSugg = document.getElementById("suggestion-table");
  const tbodySugg = tableSugg.querySelector("tbody");
  const rowsSugg = Array.from(tbodySugg.querySelectorAll("tr"));
  const paginationSugg = document.getElementById("pagination-suggestion")


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
      btn.addEventListener("click", () => displayPage(i, rowsPerPage,rows ,tbody));
      pagination.appendChild(btn);
    }
  }
  displayPage(1 ,rowsPerPageIncome,rowsIncome,tbodyIncome);
  displayPage(1,rowsPerPageSugg,rowsSugg, tbodySugg);
  setupPagination(rowsIncome, rowsPerPageIncome, paginationIncome,  tbodyIncome);
  setupPagination(rowsSugg, rowsPerPageSugg, paginationSugg, tbodySugg);


  //Ajout d'une nouvelle entrée de revenu
  const formNewIncome = document.getElementById("add-new-income");
    formNewIncome.addEventListener("submit", () => {
    event.preventDefault(); // Empêche le rechargement de la page
    const newAmount = document.getElementById("new-income").value;
    console.log("Montant ajouté :", newAmount);
    const newLabel = document.getElementById("label-new-income").value;
    console.log("Label ajouté :", newLabel);
    const newDescription = document.getElementById("description-new-income").value;
    console.log("Description ajoutée :", newDescription);
 // Ajoute la nouvelle ligne dans le tableau
   const newRow = `
    <tr>
      <td>${newAmount}</td>
      <td>${newLabel}</td>
      <td>${newDescription}</td>
    </tr>
  `;
  tbodyIncome.insertAdjacentHTML("beforeend", newRow); 
 //   formNewIncome.reset(); // Réinitialise le formulaire
    });
