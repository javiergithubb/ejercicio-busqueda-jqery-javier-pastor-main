$(document).ready(function() {
  // Mostrar todos los clientes inicialmente
  mostrarClientes(clientes);

  // Filtrar clientes basados en la entrada de búsqueda
  $("#searchInput").on("keyup", function() {
    let textoBusqueda = $(this).val().toLowerCase();
    $(".card").each(function() {
      let valorCliente = $(this).find(".nombre").text().toLowerCase();
      if (valorCliente.startsWith(textoBusqueda)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Evento de clic para abrir el modal de añadir cliente
  $("#addClientBtn").on("click", function() {
    $("#addClientModal").modal("show");
  });

  // Evento de clic para confirmar la eliminación
  $('#confirmDelete').on('click', function() {
    let cardToDelete = $('#confirmModal').data('cardToDelete');
    cardToDelete.remove();
    $('#confirmModal').modal('hide');
  });

  // Evento de clic para guardar el cliente
  $("#saveClientBtn").on("click", function() {
    guardarCliente();
    $("#addClientModal").modal("hide");
  });

  // Función para guardar el cliente
  function guardarCliente() {
    let nombre = $("#nombre").val();
    let telefono = $("#telefono").val();
    let correo = $("#correo").val();
    let descripcion = $("#descripcion").val();
    let imagen = $("#imagenInput")[0].files[0]; // Obtener el archivo de imagen

    // Verificar si se seleccionó una imagen
    let imagenPath;
    if (imagen) {
      // Crear una URL local para la imagen seleccionada
      imagenPath = URL.createObjectURL(imagen);
    } else {
      // Usar la URL existente si no se seleccionó ninguna imagen nueva
      let clienteExistente = clientes.find(cliente => cliente.nombre === nombre);
      if (clienteExistente) {
        imagenPath = clienteExistente.imagen;
      } else {
        // Usar una imagen por defecto si no se seleccionó ninguna y el cliente no existe
        imagenPath = "imagenes/predet.png";
      }
    }

    let nuevoCliente = {
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      descripcion: descripcion,
      imagen: imagenPath
    };

    // reemplazar el cliente existente con los nuevos datos
    let index = clientes.findIndex(cliente => cliente.nombre === nombre);
    if (index !== -1) {
      clientes[index] = nuevoCliente;
    } else {
      // agregar un nuevo cliente si no existe
      clientes.push(nuevoCliente);
    }

    // mostrar los clientes actualizados
    mostrarClientes(clientes);
  }

  // mostrar clientes
  function mostrarClientes(clientes) {
    let listaClientes = $("#clientsList");
    listaClientes.empty();

    for (let i = 0; i < clientes.length; i++) {
      let cliente = clientes[i];
      let tarjeta = $("<div class='card'>" +
        "<h3 class='nombre'>" + cliente.nombre + "</h3>" +
        "<i class='fas fa-pencil-alt edit-icon'></i>" +
        "<i class='fas fa-trash trash-icon'></i>" +
        "<img src='" + cliente.imagen + "' alt='Imagen de " + cliente.nombre + "' onerror=\"this.onerror=null;this.src='imagenes/default.jpg';\">" +
        "<div class='cliente-info'>" +
        "<p class='telefono'>Teléfono: " + cliente.telefono + "</p>" +
        "<p class='correo'>Correo: " + cliente.correo + "</p>" +
        "<p class='descripcion'>" + cliente.descripcion + "</p>" +
        "</div>" +
        "</div>");

      listaClientes.append(tarjeta);
    }

    $(".trash-icon").on("click", function() {
      let cardToDelete = $(this).closest('.card');
      $('#confirmModal').data('cardToDelete', cardToDelete).modal('show');
    });

    $(".edit-icon").on("click", function() {
      let cardToEdit = $(this).closest('.card');
      let nombre = cardToEdit.find('.nombre').text();
      let telefono = cardToEdit.find('.telefono').text().slice(10); // Eliminar "Teléfono: " del texto
      let correo = cardToEdit.find('.correo').text().slice(8); // Eliminar "Correo: " del texto
      let descripcion = cardToEdit.find('.descripcion').text();
      
      $("#nombre").val(nombre);
      $("#telefono").val(telefono);
      $("#correo").val(correo);
      $("#descripcion").val(descripcion);

      $('#addClientModal').modal('show');
    });
  }
});

let clientes = [
  {
    nombre: "Nico Acuña",
    telefono: "6641234567",
    correo: "nicopayaso@gmail.com",
    descripcion: "De las mejores ratas de aulaestudio.",
    imagen: "imagenes/nico.jpg"
  },
  {
    nombre: "Adriano Condines",
    telefono: "6649876543",
    correo: "adriano@gmail.com",
    descripcion: "Gitano.",
    imagen: "imagenes/adriano.jpg"
  },
  {
    nombre: "Noel Santiañez",
    telefono: "6643334444",
    correo: "noel@gmail.com",
    descripcion: "Le gustan los estupefacientes.",
    imagen: "imagenes/noel.jpg"
  },
  {
    nombre: "Roberto Carlos",
    telefono: "6195556666",
    correo: "roberto@hotmail.com",
    descripcion: "Vive en betanzos, locura.",
    imagen: "imagenes/roberto.jpg"
  },
  {
    nombre: "Astor Gitano",
    telefono: "664820392",
    correo: "astorgitano@hotmail.com",
    descripcion: "Mítico Astor.",
    imagen: "imagenes/astor.jpg"
  },
  {
    nombre: "Manolo Lama",
    telefono: "664450396",
    correo: "manololama@hotmail.com",
    descripcion: "Un grande, de los míticos.",
    imagen: "imagenes/manololama.jpg"
  }
];
