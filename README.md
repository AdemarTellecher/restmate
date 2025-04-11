<div align="center">
<a href="https://github.com/aunjaffery/restmate"><img src="build/appicon.png" width="120"/></a>
</div>
<h1 align="center">Restmate</h1>

<div align="center">
<strong>Restmate is a modern lightweight cross-platform Rest API Client available for Mac, Windows, and
Linux.</strong>
</div>
<br><br>

<div align="center">
 <img alt="screenshot" src="screenshots/restmate1.png">
 <img alt="screenshot" src="screenshots/restmate2.png">
</div>

## Feature

- Super lightweight, built on Webview2, without embedded browsers (Thanks
  to [Wails](https://github.com/wailsapp/wails)).
- Send requests with different methods (GET, POST, PUT, DELETE).
- Send requests with different body types (Form, Raw, Binary).
- Create and manage environments to store variables and configurations for your API endpoints.
- Data is stored locally on your machine. and no data is sent to any server.
- Import collections and requests from Postman.
- Dark mode with multiple themes (ayu, nord, tokyoNight, dracula)

## Installation

Available to download for free from [here](https://github.com/aunjaffery/restmate/releases/).

## Build Guidelines

### Prerequisites

- Go (latest version)
- Node.js >= 18
- NPM >= 10

### Install Wails

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### Pull the Code

```bash
git clone https://github.com/aunjaffery/restmate
```

### Build Frontend

```bash
npm install --prefix ./frontend
```

or

```bash
cd frontend
npm install
```

### Compile and Run

```bash
wails dev
```

## Support

You can support the development of Restmate by starring the repository, sharing it with your friends, and contributing to the project. Also you can support the project by donating to the project's wallet.
