import Swal from 'sweetalert2';
/* import withReactContent from 'sweetalert2-react-content';


function swDeleteAlert( func ) {
	const MySwal = withReactContent(Swal);
	MySwal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!',
	}).then((result) => {
		if (result.isConfirmed) {
			func();
		
		}
	});
} */



export async function handleFormDelete({
  deleteUrl,
  id,
  handleDelete,
  router,
}) {
  await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete({ api:deleteUrl, id });
      router.back();
    }
  });
}



export function successAlert(msg = 'Deleted successfully') {
	Swal.fire({
    icon: "success",
    timerProgressBar: true,
    title: msg,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function errorAlert(msg = 'Something went wrong! Please try Again') {
	Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
    timer: 2500,
    timerProgressBar: true,
  });
}

