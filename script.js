document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById("carrerasDropdown");
    const submitButton = document.getElementById("submitButton");

    // Fetch de la API para llenar el dropdown
    fetch("https://api-tecnm.onrender.com/carreras")
        .then(response => response.json())
        .then(data => {
            // Rellenar el dropdown con los datos de la API
            data.forEach(carrera => {
                const option = document.createElement("option");
                option.text = carrera.nombre;
                option.value = carrera.id;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
        });

    // Manejar el clic del botón
    submitButton.addEventListener("click", function() {
        const selectedCarreraId = dropdown.value;
        if (selectedCarreraId) {
            window.location.href = `info.html?carreraId=${selectedCarreraId}`;
        } else {
            alert("Por favor, selecciona una carrera antes de continuar.");
        }
    });
});
