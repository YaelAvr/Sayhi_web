# Gmail Project: Multi-Component Mail System
This project simulates a simplified Gmail-like system that supports user management, sending and receiving mails, labels, search functionality, and blacklist enforcement.

The system includes:
- A **Node.js (Express)** server that exposes a RESTful API.
- A **C++** server that manages a URL blacklist using a Bloom filter (via TCP).
- A **React** frontend showing a Gmail-like interface for users.
- An **Android** Gmail application that connects to the Node.js server.

## System Requirements  
To run the application using Docker:
- Docker and Docker Compose installed.
- All required components — including the C++ server and node.js server and react — are built automatically using the provided `Dockerfile.server` and `Dockerfile.webserver`.

Project management tracking:
- Access to the JIRA board


## Project Structure
- `servers/` — All the backend servers
  - `src/` — Source code
 	- `cpp/` — C++ components 
 	- `py/` — Python components  
 	- `web/` — Node.js backend (Express server)
  - `data/` — Application data (e.g., storage files)
  - `pictures/` — Contains the image of each user
  - `tempUploads/` — Images selected during the registration process until its completion
  - `package.json`, `package-lock.json` — Node.js dependencies  
- `Tests/` — Project tests (cpp tests from last exercise)
- `androidApp/`          Android frontend Gmail-like app
- `react-app/` — fronted (showing the Gmail-like interface)
  -`build/` — contains the optimized production ready version of the application
  - `public/` — include the index.html file and fonts folder
  - `package.json` — Node.js dependencies  
- `node_modules/` - contains all the dependencies and libraries required for the project to run
- `images/` — Screenshots for documentation  
- `.vscode/` — VSCode configuration (for development only)  
- `.gitignore` — Files and folders ignored by Git  
- `CMakeLists.txt` — Build configuration for C++ components  
- `Dockerfile.server` — Dockerfile for the cpp server 
- `Dockerfile.webserver` — Dockerfile for the Node.js server  
- `Dockerfile.pyclient` — Dockerfile for Python client (if used)  
- `docker-compose.yml` — Docker Compose configuration for multi-service setup  
- `package.json`, `package-lock.json` — Node.js dependencies  
- `README.md` — Project documentation  

## Usage and application Run Example
All the information can be found in the explanation.md inside the wiki folder.

## Application Run Example
All the information can be found in the runnigexample.md inside the wiki folder.














