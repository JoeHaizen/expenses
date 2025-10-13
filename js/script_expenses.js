 // Retour à l'accueil
  const btnAccueil = document.getElementById("btnAccueil");

  // Quand on clique sur Accueil
    btnAccueil.addEventListener("click", () => {
  window.location.href = "accueil.html";
    });

 

//Expense Table 
  const rowsPerPageExpense = 2;
  const tableExpense = document.getElementById("expenseTable");
  const tbodyExpense = tableExpense.querySelector("tbody");
  const rowsExpense = Array.from(tbodyExpense.querySelectorAll("tr"));
  const paginationExpense = document.getElementById("pagination");

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

  displayPage(1 ,rowsPerPageExpense,rowsExpense,tbodyExpense);
  displayPage(1,rowsPerPageSugg,rowsSugg, tbodySugg);
  setupPagination(rowsExpense, rowsPerPageExpense, paginationExpense,  tbodyExpense);
  setupPagination(rowsSugg, rowsPerPageSugg, paginationSugg, tbodySugg);



