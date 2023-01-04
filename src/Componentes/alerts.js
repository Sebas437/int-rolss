import Swal from 'sweetalert2';

export function showSuccessAlert(props) {
  Swal.fire({
    title: '¡Éxito!',
    text: props + ' registrado exitosamente',
    icon: 'success',
  });
}

export function showErrorAlert() {
  Swal.fire({
    title: 'Error',
    text: 'Ha ocurrido un error.',
    icon: 'error',
  });
}