# Sales predictor

*An app to predict future sales based on data entered from a .csv file.*

A specialized application for predictive sales analytics, powered by linear regression. This tool allows users to upload .csv files with historical sales data and, through a data cleansing and transformation process, applies a linear regression model to predict future sales.

Try the [live demo](https://predictor.adaptable.app/).

## How to run in local

To run the application code on your computer, follow the steps below.

Note: Remember, use `cd` command to move through directories. And, in Windows, use Git Bash console.

### Requisites

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download)
- [Python 3](https://www.python.org/downloads/)

### Clone the repository

`git clone https://github.com/lisandroveron/sales-predictor.git && cd sales-predictor`

Note: In the steps below, you need to open two terminals (or Git Bash). One inside "client" folder directory, and the another one in "server" folder.

### Install dependencies

In the "client" folder run:

- `npm install`

In the "server" folder run:

- `python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`

### Run development servers

In "client" folder run:

- `npm run dev -- --host`

In "server" folder run:

- `source venv/bin/activate && flask -A server:app run --debug`

Now you can open in the [development server](http://localhost:5173).