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



