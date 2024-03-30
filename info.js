document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID de la carrera de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const carreraId = queryParams.get("carreraId");

    if (carreraId) {
        // Llenar el primer contenedor con las materias
        fillContainer("https://api-tecnm.onrender.com/materias/" + carreraId, "materiasContent");

        // Llenar el segundo contenedor con el dropdown de especialidades
        fillDropdown("https://api-tecnm.onrender.com/especialidades/" + carreraId, "especialidadesDropdown");

        // Manejar el cambio en el dropdown de especialidades
        const especialidadesDropdown = document.getElementById("especialidadesDropdown");
        especialidadesDropdown.addEventListener("change", function() {
            const especialidadId = this.value;
            if (especialidadId) {
                fillMateriasPorEspecialidad(carreraId, especialidadId);
            }
        });
    }
});

function fillContainer(apiUrl, containerId) {
    const container = document.getElementById(containerId);

    // Fetch de la API para obtener los datos
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Crear elementos HTML para cada dato y agregarlos al contenedor
            data.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.textContent = item.nombre;
                container.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
        });
}

function fillDropdown(apiUrl, dropdownId) {
    const dropdown = document.getElementById(dropdownId);

    // Fetch de la API para llenar el dropdown
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Rellenar el dropdown con los datos de la API
            data.forEach(item => {
                const option = document.createElement("option");
                option.text = item.nombre;
                option.value = item.id;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
        });
}

function fillMateriasPorEspecialidad(carreraId, especialidadId) {
    const materiasContainer = document.getElementById("materiasEspecialidadContent");

    // Limpiar el contenedor de materias
    materiasContainer.innerHTML = "";
    
    // Construir la URL de la API
    const apiUrl = `https://api-tecnm.onrender.com/materias_especialidad/${carreraId}?especialidad=${especialidadId}`;

    // Fetch de la API para obtener las materias por especialidad
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Crear elementos HTML para cada dato y agregarlos al contenedor
            data.forEach(materia => {
                const materiaElement = document.createElement("div");
                materiaElement.textContent = materia.nombre;
                materiasContainer.appendChild(materiaElement);
            });
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
        });
}
