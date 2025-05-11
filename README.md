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
- `src/` — source files
- `Tests/` — tests files
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

## Design Reflection – Open/Closed Principle

As required, we examined whether recent changes in Exercise 2 violated the **Open/Closed Principle**:  
Below are four key aspects we were asked to assess:

---

###  1. Change in Command Names

As a result of the change in the command names, we didn’t have any significant changes in the code, except for the function responsible for input classification. In this function, we wanted to check the input provided by the client, and since the input changed (in the previous assignment we had to check numbers, and now we are checking strings), we had to modify the comparisons themselves so that they now compare strings.
  Aside from the change I mentioned , we didn’t change the rest of the code — we kept the operations represented by numbers in the code itself, and assigned each string a specific number. This way, we avoided modifying the rest of the code.

---

###  2. Addition of New Commands 

- **Did it require modifying code that should be closed to changes?**  
  _[Yes / No]_

- **If yes** – How did we refactor the code to prevent this in the future?  
  _[Your explanation here]_

- **If no** – What modularity or abstraction helped us extend without modifying existing logic?  
  _[Your explanation here]_

---

###  3. Change in Output Format 

- **Did it require modifying code that should be closed to changes?**  
  _[Yes / No]_

- **If yes** – How did we redesign output generation to support multiple formats going forward?  
  _[Your explanation here]_

- **If no** – What previous separation of concerns allowed us to update output easily?  
  _[Your explanation here]_

---

###  4. Shift from Console I/O to Socket Communication

- **Did it require modifying code that should be closed to changes?**  
  _[Yes / No]_

- **If yes** – How did we isolate I/O layers to prevent tight coupling with business logic?  
  _[Your explanation here]_

- **If no** – What interface/design from Exercise 1 already supported switching I/O mechanisms?  
  _[Your explanation here]_


  
## Screenshots

### Project Management - JIRA Board
![JIRA Board](https://github.com/eden05221/gmail_project/blob/main/images/part2/%E2%80%8F%E2%80%8FJira_Board.PNG.png?raw=true)

### Application Run Example
![Application Run](https://github.com/eden05221/gmail_project/blob/main/images/example.PNG.png?raw=true)



