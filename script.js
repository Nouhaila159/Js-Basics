const etudiants = 
[
    {"Numero": 123, "fName": "Ahmad", "lName": "Amrani"},
    {"Numero": 456, "fName": "Rachid", "lName": "Karimi"},
    {"Numero": 789, "fName": "Hajar", "lName": "Tazi"}
];


//**************************************************AFFICHAGE*********************************** */
function showTable() {
    const rows = etudiants.map(element => {
        return "<tr id='etudiant" + element.Numero + "'>" +
               "<td id='etudiant" + element.Numero + "_numero'>" + element.Numero + "</td>" +
               "<td id='etudiant" + element.Numero + "_fName'>" + element.fName + "</td>" +
               "<td id='etudiant" + element.Numero + "_lName'>" + element.lName + "</td>" +
               "<td><button onclick='deleteElem(\"etudiant" + element.Numero + "\")'>Delete</button>"+"  "+
               "<button onclick='editElem(\"etudiant" + element.Numero + "\")'>Edit</button></td>" +
               "</tr>";
    });

    let data = "";
    rows.forEach(element => data += element);
    document.getElementById("tbody").innerHTML = data;
}



//****************************************ADD**************************************/

function addStudent() {
   const tbody = document.getElementById("tbody");
   // Créez une nouvelle ligne de tableau avec des champs d'entrée
   const newRow = document.createElement("tr");
   newRow.innerHTML = `
       <td><input type="text" id="newNumber"></td>
       <td><input type="text" id="newFirstName"></td>
       <td><input type="text" id="newLastName"></td>
       <td>
           <button onclick="saveNewStudent(this)">Save</button>
           <button onclick="cancelAddStudent(this)">Cancel</button>
       </td>
   `;

   tbody.appendChild(newRow);
}

function saveNewStudent(button) {
   // Récupérez les valeurs des nouveaux champs d'entrée
   const newNumber = document.getElementById("newNumber").value;
   const newFirstName = document.getElementById("newFirstName").value;
   const newLastName = document.getElementById("newLastName").value;

   // Vérifiez si tous les champs sont remplis
   if (newNumber === "" || newFirstName === "" || newLastName === "") {
       alert("Veuillez remplir tous les champs.");
       return;
   }

          // Ajoutez le nouvel étudiant à votre tableau
       etudiants.push({
           "Numero": parseInt(newNumber),
           "fName": newFirstName,
           "lName": newLastName
       });

       showTable();

   // Effacez les champs d'entrée
   clearInputFields();
}

function cancelAddStudent(button) {
   // Supprimez la ligne de tableau nouvellement ajoutée
   const newRow = button.parentNode.parentNode; // Obtenez la ligne parente du bouton
   const tbody = document.getElementById("tbody");
   tbody.removeChild(newRow);
   // Effacez les champs d'entrée
   clearInputFields();
}

function clearInputFields() {
   document.getElementById("newNumber").value = "";
   document.getElementById("newFirstName").value = "";
   document.getElementById("newLastName").value = "";
}



//************************************************SEARCH************************************************/
document.getElementById("query").addEventListener("input", filterTable);

function filterTable(e) {
    e.preventDefault();
    const value = document.getElementById("query").value.toLowerCase();
    const res = etudiants.filter(etudiant => (
        etudiant.fName.toLowerCase().includes(value) ||
        etudiant.lName.toLowerCase().includes(value) ||
        etudiant.Numero.toString().toLowerCase().includes(value)
    ));
    const rows = res.map(etudiant => `
        <tr id="etudiant${etudiant.Numero}">
            <td id="etudiant${etudiant.Numero}_numero">${etudiant.Numero}</td>
            <td id="etudiant${etudiant.Numero}_fName">${etudiant.fName}</td>
            <td id="etudiant${etudiant.Numero}_lName">${etudiant.lName}</td>
            <td>
                <button onclick='deleteElem("etudiant${etudiant.Numero}")'>Delete</button>
                <button onclick='editElem("etudiant${etudiant.Numero}")'>Edit</button>
            </td>
        </tr>
    `);
    const data = rows.join("");
    document.getElementById("tbody").innerHTML = data;
}
//***********************************************DELETE****************************************/

    function deleteElem(id){
    document.getElementById(id).style.display = "none";
    }
    
//**************************************************EDIT*****************************************/     
    function saveElem(id) {
        // Récupérez les nouvelles valeurs des champs d'entrée
        var idParts = id.split("etudiant");
        var numeroLigne = parseInt(idParts[1]);

        var newNumero = document.getElementById("input1").value;
        var newFName = document.getElementById("input2").value;
        var newLName = document.getElementById("input3").value;
        
        /*console.log(numeroLigne);
        console.log(newNumero);
        console.log(newFName);
        console.log(newLName);*/

    // Mettez à jour le tableau 'etudiants' avec les nouvelles valeurs
    for (var i = 0; i < etudiants.length; i++) {
        if (etudiants[i].Numero === numeroLigne) {
            etudiants[i].Numero = parseInt(newNumero);
            etudiants[i].fName = newFName;
            etudiants[i].lName = newLName;
            break; // Sortez de la boucle une fois que l'élément a été mis à jour
        }
    }

    showTable();
}
    
    function editElem(id) {
         // Récupérez les valeurs actuelles
         var numero = document.getElementById(id + "_numero").innerText;
         var fName = document.getElementById(id + "_fName").innerText;
         var lName = document.getElementById(id + "_lName").innerText;
     
         // Créez des champs d'entrée pour l'édition
         var editHtml = "<td><input id='input1' type='text' value='" + numero + "'></td>" +
                        "<td><input id='input2' type='text' value='" + fName + "'></td>" +
                        "<td><input id='input3' type='text' value='" + lName + "'></td>" +
                        "<td><button onclick='showTable()'>Cancel</button>"+"  "+
                        "<button onclick='saveElem(\"" + id + "\")'>Save</button></td>";
     
         document.getElementById(id).innerHTML = editHtml;
     }

