from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
from sklearn.linear_model import LinearRegression

app = Flask("server", static_folder="dist/assets/", template_folder="dist")
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.post("/server/csv-file")
def csv_file():
    df = pd.read_csv(request.files["file"])

    # Converting dates in days elapsed and separating NaNs in another DataFrame
    df["dates"] = pd.to_datetime(df["dates"], format="mixed")
    df["days_elapsed"] = (df["dates"] - df["dates"].min()).dt.days + 1
    df_not_nans = df.dropna()
    df_nans = df[pd.isna(df["sales"])]

    # Making prediction
    lr = LinearRegression()
    lr.fit(df_not_nans[["days_elapsed"]], df_not_nans["sales"])
    predicted = lr.predict(df_nans[["days_elapsed"]])
    df_nans.loc[:, "sales"] = predicted

    # Writing the results to a file
    df_nans.loc[:, "sales"] = df_nans["sales"].apply(lambda x: round(x, 2))
    df = pd.concat([df_nans, df_not_nans])
    df = df.sort_values(by="days_elapsed")
    df = df.drop(columns=["days_elapsed"])
    
    csv_file = df.to_csv(index=False)
    headers = {
        "Content-Type": "text/csv",
        "Content-Disposition":\
            f"attachment; filename={request.files['file'].filename}"
    }

    return csv_file, 200, headers