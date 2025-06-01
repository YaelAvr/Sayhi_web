# Gmail Project — URL Blacklist System
This project implements a URL blacklist system using a Bloom filter in C++. The application supports adding, checking, and deleting URLs via a TCP client-server architecture. The server is written in C++, and the client is written in Python. The system is designed according to SOLID principles and follows the TDD methodology.


## System Requirements  
To run the application using Docker:
- Docker and Docker Compose installed.
- All required components — including the C++ server and Python client — are built automatically using the provided `Dockerfile.server` and `Dockerfile.client`.

Project management tracking:
- Access to the JIRA board


## Project Structure
- `src/` — Source code  
  - `cpp/` — C++ components 
  - `py/` — Python components  
  - `web/` — Node.js backend (Express server)  
- `Tests/` — Project tests  
- `data/` — Application data (e.g., storage files, mock DBs)  
- `images/` — Screenshots for documentation  
- `.vscode/` — VSCode configuration (for development only)  
- `.gitignore` — Files and folders ignored by Git  
- `CMakeLists.txt` — Build configuration for C++ components  
- `Dockerfile.server` — Dockerfile for the Node.js Express server  
- `Dockerfile.webserver` — (Optional) Dockerfile for static web server (if used)  
- `Dockerfile.pyclient` — Dockerfile for Python client (if used)  
- `docker-compose.yml` — Docker Compose configuration for multi-service setup  
- `package.json`, `package-lock.json` — Node.js dependencies  
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
  
### Tests usage
To compile and run the tests using Docker, use the following command:
```bash
docker-compose run --rm --build tests
``` 
  

## Example Run


**Input**:
```bash
POST www.example.com
GET www.example.com
DELETE www.example.com
GET www.example.com
```

**Output**:
```bash
201 Created
200 Ok

true true
204 No Content
200 Ok

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

 The new command that was added — delete,  did not change the existing code. The reason we were able to extend the functionality without making changes is that we had initially defined the command menu as a map, so we could simply add a new command to the map without affecting the existing commands or the overall functionality of the code.  

---

###  3. Change in Output Format 

 The change in the command output caused a specific change only in the print
 output, and aside from the modified strings, there was no change in the functionality of the rest of the code.  

---

###  4. Shift from Console I/O to Socket Communication

The fact that input/output comes from sockets instead of the console required us to make some adjustments to our code. Instead of having a single IO management class containing static functions, we created an abstract class with abstract input and output functions.
This change allowed us to retain the printed output to the console, for example in tests where we printed to the console to compare outputs. Additionally, it enabled us to communicate through the socket, since in those parts of the code we defined the IO type as one that communicates via sockets (a class named SocketsInputOutput).

This way, we were able to implement IO through the socket without changing the general functionality of the code.




  
## Screenshots

### Project Management - JIRA Board
![JIRA Board](https://github.com/eden05221/gmail_project/blob/main/images/part2/%E2%80%8F%E2%80%8FJira_Board.PNG.png?raw=true)

### Test Run Output
![Test Run Output](https://github.com/eden05221/gmail_project/blob/main/images/part2/Test_Run_Input.png?raw=true)

### Application Run Example
![Application Run](https://github.com/eden05221/gmail_project/blob/main/images/part2/Example_run.png?raw=true)


