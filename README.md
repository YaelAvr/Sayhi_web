# Gmail Project — URL Blacklist System
This project implements a URL blacklist system using a Bloom filter in C++. The application supports adding, checking, and deleting URLs via a TCP client-server architecture. The server is written in C++, and the client is written in Python. The system is designed according to SOLID principles and follows the TDD methodology.


## System Requirements  
To run the application using Docker:
- Docker and Docker Compose installed.
- All required components — including the C++ server and Python client — are built automatically using the provided `Dockerfile.server` and `Dockerfile.client`.

For local development (without Docker):
- C++17 compatible compiler (e.g., g++)
- Git (optional, for cloning the repository)

Project management tracking:
- Access to the JIRA board


## Project Structure
- `src/` — C++ source files
- `Tests/` — C++ tests files
- `data/` — Bloom filter save files
- `.vscode/` — VSCode project settings (optional for development)
- `Dockerfile.client` — Docker instructions for building Python client
- `Dockerfile.server` — Docker instructions for building the C++ server
- `docker-compose.yml` — Docker Compose configuration
- `CMakeLists.txt` — CMake build script
- `.gitignore` — Git ignored files
- `images` — Screenshots used in the README documentation
- `README.md` — Project documentation


## Usage 
To compile and run the application using Docker, use the following command:

```bash
docker-compose run --rm --build server
docker-compose run --rm --build client
``` 
After starting the application use:

- POST [URL] to add a URL to the blacklist.

- GET [URL] to check if a URL is blacklisted.

- DELETE [URL] to delete a URL from the blacklist.
  

### Changing CMD Parameters – Format & Instructions:
  
To change the default parameters passed to the server or client, edit the `CMD` line in the relevant Dockerfile:
  
#### `Dockerfile.client`
```
CMD ["python", "client.py", "server", "8080"]
#                   │         │          └── server port
#                   │         └──────────── server IP or hostname
#                   └────────────────────── Python script name
```
    
#### `Dockerfile.server`
```
CMD ["./my_program", "8080", "30", "2", "1"]
#                      │       │     └────── start of hash functions
#                      |       └──────────── Bloom filter size
#                      └──────────────────── server port
```
Edit these values directly to modify how the server and client are launched inside the containers.
  
### tests usage
To compile and run the tests using Docker, use the following command:
```bash
docker-compose run --rm --build tests
``` 
  

## Example Run


**Input**:
```bash
8 1
1 www.example.com0
2 www.example.com0
2 www.example.com4
```

**Output**:
```bash
true true
true false
```
## Screenshots

### Project Management - JIRA Board
![JIRA Board](https://github.com/eden05221/gmail_project/blob/main/images/%E2%80%8F%E2%80%8FJira_Board.PNG?raw=true)

### Application Run Example
![Application Run](https://github.com/eden05221/gmail_project/blob/main/images/example.PNG.png?raw=true)



