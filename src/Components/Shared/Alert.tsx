import Swal from "sweetalert2";

const Alert = (type: "success" | "error", title: string, message: string) => Swal.fire({
    icon: type,
    title: title,
    text: message,
    showConfirmButton: true,
    confirmButtonColor: '#2C7A7B',
})

export default Alert;