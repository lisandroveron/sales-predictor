import {useState} from "react";
import {useForm} from "react-hook-form";

import "./css/normalize.css";
import "./css/index.css";

export function App(){
	const [csvURL, setCsvURL] = useState("");
	const {register, handleSubmit, formState: {errors}} = useForm();

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
				setCsvURL(url);
				// window.open(url, "_blank");
			});
	};

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
				})}/>
				{errors.file?.type === "required"
					? <p>A file is required.</p>
					: null}

				<button>Send</button>
			</form>
			{csvURL
				? <a href={csvURL}>
					<input type="button" value="Download" />
				</a>
				: null}
			{Instructions}
		</main>
	</>);
};

const Instructions = <>
	<h2>Instructions:</h2>
	<p>To predict future sales, you must upload a .csv file with 2 columns:
		&quot;dates&quot; and &quot;sales&quot;.</p>
	<p>In the &quot;dates&quot; column try to use known date formats, such
		as: MM-DD-YYYY or DD/MM/YY, among others.</p>
	<p>The &quot;sales&quot; column should have English notation, without
		using a comma, just using the dot (.) to separate the decimal part
		if necessary.</p>
	<p>Also add new rows with the dates you want to predict. This is an
		example of the .csv file:</p>
	<pre>
		&#32;dates, sales&#10;
		2017-01-01,27858.87&#10;
		2017-02-01,25994.20&#10;
		2017-03-01,27780.01&#10;
		2017-04-01,29134.27&#10;
		2023-03-01,363183.29&#10;
		2023-04-01,385821.47&#10;
		2023-05-01,&#10;
		2023-06-01,&#10;
		2023-07-01,&#10;
		2023-08-01,
	</pre>
	<p>Note that there are dates that do not have the sales data, those are
		the dates that will be sought to predict.</p>
</>;