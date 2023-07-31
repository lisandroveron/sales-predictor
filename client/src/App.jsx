import {useForm} from "react-hook-form";

import "./css/normalize.css";
import "./css/index.css";

export function App(){
	const {register, handleSubmit, formState: {errors}} = useForm();

	return (<>
		<header>
			<img src="assets/icons/orange.svg" alt="" />
			<h1>Sales predictor</h1>
		</header>
		<main>
			<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
				<label htmlFor="file">Choose a .csv file</label>
				<input type="file" id="file" {...register("file", {
					required: true,
				})} />
				{errors.file?.type === "required"
					? <p>A file is required.</p>
					: null}

				<button>Send</button>
			</form>
		</main>
	</>);
};

function onSubmit(data){
	const formData = new FormData();
	for(const key in data){
		if(data[key] instanceof FileList){
			formData.append(key, data[key][0]);
		}else{
			formData.append(key, data[key]);
		};
	};

	fetch("/api/csv-file", {
		method: "POST",
		body: formData
	})
		.then(response => response.blob())
		.then(data => {
			const url = URL.createObjectURL(data);
			window.open(url, "_blank");
		});
};