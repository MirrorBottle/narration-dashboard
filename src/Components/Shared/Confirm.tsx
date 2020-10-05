import Swal from "sweetalert2";
import Promise from "promise";
const Confirm = (message: string): any =>
    new Promise(function (resolve, reject) {
        Swal.fire({
            title: "Are you sure?",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2E8686",
            cancelButtonColor: "#E53E3E",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!",
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                resolve(result);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                reject(result);
            }
        });
    });

export default Confirm;
