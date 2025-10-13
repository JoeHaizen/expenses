const imgAccueil = document.getElementsByClassName('ImageAccueil')[0];
const zone = document.getElementById('zoneDeFormulaire');
const btnIncome = document.getElementById("btnIncome");
const btnExpenses = document.getElementById("btnExpenses");

/*imgAccueil.addEventListener('click',function(){
    imgAccueil.style.width='30%';
    imgAccueil.style.marginLeft ='650px';
    const nouveauChamp = document.createElement('input');
    nouveauChamp.type = 'text';
    nouveauChamp.name = 'champTexte[]';
    nouveauChamp.placeholder = 'Saisis du texte ici...';
    nouveauChamp.style.marginTop = '10px';
    zone.appendChild(nouveauChamp);

//    imgAccueil.style.transform='';
}); */
const rubriques = document.getElementById('rubriques');

imgAccueil.addEventListener('click', () => {
  imgAccueil.style.width = '30%';
  imgAccueil.style.marginLeft = '650px';
  rubriques.style.display = 'flex'; // ou 'block' si tu préfères en colonne
});

// Quand on clique sur INCOME
btnIncome.addEventListener("click", () => {
  window.location.href = "income.html";
});

// Quand on clique sur INCOME
btnExpenses.addEventListener("click", () => {
  window.location.href = "expenses.html";
});