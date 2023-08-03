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

		fetch("/server/csv-file", {
			method: "POST",
			body: formData
		})
			.then(response => response.blob())
			.then(data => {
				const url = URL.createObjectURL(data);
				setCsvURL(url);
			});
	};

	function handleInput(e){
		const filename = e.target.files[0].name;
		e.target.previousSibling.textContent = `Upload file: ${filename}`;
	};

	return (<>
		<header>
			<img src="assets/favicon.svg" alt="" />
			<h1>Sales predictor</h1>
		</header>
		<main>
			<form
				onSubmit={handleSubmit(onSubmit)}
				encType="multipart/form-data">

				<label htmlFor="file">Upload file</label>
				<input
					type="file"
					id="file"
					onInput={handleInput}
					{...register("file", {
						required: true,
					})}
				/>
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
	<p>To predict future sales, you must upload a .csv file with 2 columns: &quot;dates&quot; and &quot;sales&quot;.</p>
	<p>In the &quot;dates&quot; column try to use known date formats, such as: MM-DD-YYYY or DD/MM/YY, among others.</p>
	<p>The &quot;sales&quot; column should have English notation, without using a comma, just using the dot (.) to separate the decimal part if necessary.</p>
	<p>Also add new rows with the dates you want to predict. This is an example of the formats:</p>
	<table>
		<thead>
			<tr>
				<th>dates</th>
				<th>sales</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>2017-01-01</td>
				<td>27858.87</td>
			</tr>
			<tr>
				<td>2017-02-01</td>
				<td>25994.20</td>
			</tr>
			<tr>
				<td>2017-03-01</td>
				<td>27780.01</td>
			</tr>
			<tr>
				<td>2017-04-01</td>
				<td>29134.27</td>
			</tr>
			<tr>
				<td>2023-03-01</td>
				<td>363183.29</td>
			</tr>
			<tr>
				<td>2023-04-01</td>
				<td>385821.47</td>
			</tr>
			<tr>
				<td>2023-05-01</td>
			</tr>
			<tr>
				<td>2023-06-01</td>
			</tr>
			<tr>
				<td>2023-07-01</td>
			</tr>
			<tr>
				<td>2023-08-01</td>
			</tr>
		</tbody>
	</table>
	<p>Note that there are dates that do not have the sales data, those are the dates that will be sought to predict.</p>
	<p>You can copy the table, paste it into your Excel application, and save it in .csv format to use it here. Or alternatively, <a href="assets/example_file.csv">download this example.</a></p>
</>;