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

## Usage 
To compile and run the application using Docker, use the following commands:
To run the cpp server, open a dedicated terminal, and run:
```bash
docker-compose run --rm --build server
```
To run one instance of the webserver, While the previous terminal is open, open another dedicated terminal, and run:
```bash
docker-compose run --rm --build -p 3000:3000 webserver
```
To launch additional instances, open new terminals and run the same command with different ports:
```bash
docker-compose run --rm --build -p 3001:3000 webserver
docker-compose run --rm --build -p 3002:3000 webserver
```
**Note**: The internal port (`3000`) should remain fixed for all instances.  
Only the external port (`3001`, `3002`, etc.) should be changed when running multiple servers in parallel.\
You should **access the server using the left-side port** in the `-p` flag.  
For example, if you run: `-p 3001:3000`, you should open the browser at: `http://localhost:3001`.

### Changing CMD Parameters – Format & Instructions:
  
To change the default parameters passed to the server, edit the `CMD` line in the relevant Dockerfile:

#### `Dockerfile.server`
```
CMD ["./my_program", "8080", "30", "2", "1"]
#                      │       │     └────── start of hash functions
#                      |       └──────────── Bloom filter size
#                      └──────────────────── server port
```
Edit these values directly to modify how the server is launched inside the containers.

**Note**: If you changed the port, you should also change it in the environment variable in the "docker-compose.yml" file.
```bash
environment:
 SERVER_HOST: server
 SERVER_PORT: 8080
```

## Screenshots

### Project Management - JIRA Board
![JIRA Board](https://github.com/eden05221/gmail_project/blob/main/images/part4/jira.png)


### Application Run Example
The following screenshot demonstrates user registration and login to Gmail, and actions that the user can perform:
### Registration:
- **Username**\
  Must be **6 to 30 characters** long.  
  You can use **letters**, **numbers**, and **periods** only.
  Each username must be **unique** — no duplicates allowed.
  Example: `dana.s123`

- **Password**  
  Must be at least **8 characters** long.  
  Example: `12345678`

- **Display Name**  
  Must include at least a **first name**; **last name is optional**.  
  No restrictions on length or characters used.  
  Multiple users can share the same display name.  
  Example: `Dana` or `Dana Sela`

- **Birthday**  
  The **day** and **year** fields must contain **digits only**.  
  The entered date must be **valid** (e.g., `30.2.2002` is invalid).  
  The date must be **before today** (no future birthdays).  
  The final saved format is: `30 April 2002`.

- **Profile Picture**  
  The uploaded file must not exceed **5MB** in size.  
  Accepted formats: `.jpeg`, `.jpg`, `.png`, `.webp`, `.svg`, `.gif`.  
  Example: `https://example.com/profile.jpg`
  
![The user registers for Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/1.png)
![The user registers for Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/2.png)
![The user registers for Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/3.png)


### Login:
![The user logs in to Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/4.png)
![The user logs in to Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/5.png)


### Actions in Gmail:

Create and send a mail:
![The user performs actions in Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/6.png)
![The user performs actions in Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/7.png)

Create a label and add a mail to this label:
![The user performs actions in Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/8.png)
![The user performs actions in Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/9.png)
![The user performs actions in Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/10.png)
![The user performs actions in Gmail](https://github.com/eden05221/gmail_project/blob/main/images/part4/11.png)

Switching to dark mode by clicking the sun icon will change the screen colors to a dark theme, as shown in the images below:
![Dark mode](https://github.com/eden05221/gmail_project/blob/main/images/part4/12.png)
![Dark mode](https://github.com/eden05221/gmail_project/blob/main/images/part4/13.png)














