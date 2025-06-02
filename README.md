# Gmail Project — Multi-Component Mail System
This project simulates a simplified Gmail-like system that supports user management, sending and receiving mails, labels, search functionality, and blacklist enforcement.

The system includes:
- A **Node.js (Express)** server that exposes a RESTful API.
- A **C++** server that manages a URL blacklist using a Bloom filter (via TCP).

**Note**: This project includes only backend logic. No frontend is implemented — all responses are returned in JSON format.

## System Requirements  
To run the application using Docker:
- Docker and Docker Compose installed.
- All required components — including the C++ server and node.js server — are built automatically using the provided `Dockerfile.server` and `Dockerfile.webserver`.

Project management tracking:
- Access to the JIRA board


## Project Structure
- `src/` — Source code  
  - `cpp/` — C++ components 
  - `py/` — Python components  
  - `web/` — Node.js backend (Express server)  
- `Tests/` — Project tests (cpp tests from last exercise)
- `data/` — Application data (e.g., storage files)  
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
docker-compose run --rm --build -p 3001:3000 webserver
```
To launch additional instances, open new terminals and run the same command with different ports:
```bash
docker-compose run --rm --build -p 3002:3000 webserver
docker-compose run --rm --build -p 3003:3000 webserver
```
**Note**: The internal port (`3000`) should remain fixed for all instances.  
Only the external port (`3001`, `3002`, etc.) should be changed when running multiple servers in parallel.

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

## API Documentation

### Base URL:

```
http://localhost:3000/api/
```
### Blacklist

#### 1. Add URL to blacklist

* **Method**: `POST`
* **Endpoint**: `/blacklist`
* **Description**: Adds a URL to the blacklist.
* **Body**:

```json
{
  "link": "www.example.com"
}
```

* **Notes**:

  * `link` is required.
  * The URL in `body` is verified for validity.

* **Responses**:

  * `201 Created` – The URL has been added to the blacklist.
  * `400 Bad Request` – Missing URL or invalid URL.

* **Behavior**:
* 
  * The JavaScript server connects to the C++ server and sends a POST request. As a result, the URL is added to the blacklist that stored on the C++ server.


#### 2. Delete URL from blacklist

There is no need to include any text in the header or body.

* **Method**: `DELETE`
* **Endpoint**: `/blacklist/:id`
* **Description**: Deletes a URL from the blacklist.

* **Notes**:

  * The URL is passed in the path through the id parameter.
  * If the id contains special characters (like \ or :) make sure to encode it before sending the request. For
    example:
    https://example.com
    becomes:
    https%3A%2F%2Fexample.com
  * The URL is verified for validity.

* **Responses**:

  * `201 Created` – The URL has been deleted from the blacklist.
  * `400 Bad Request` – Missing URL or invalid URL.
  * `404  Not Found` – URL wasn't in the blacklist from the start.

* **Behavior**:
  
  * The JavaScript server connects to the C++ server and sends a DELETE request. As a result, the URL is deleted from the blacklist that stored on the C++ server. 


### Mails

#### 1. Create a Mail

Requires Authentication 

* **Method**: `POST`
* **Endpoint**: `/mails`
* **Description**: Sends a mail from the current user to another user.
* **Headers**: `x-user-id`
* **Body**:

```json
{
  "to": "u-2",
  "subject": "Hello",
  "body": "This is a message with http://example.com"
}
```

* **Notes**:

  * `to` is required
  * `subject` and `body` are optional
  * URLs in `subject` or `body` are checked against a blacklist
    
* **Responses**:

  * `201 Created` – Mail was sent
  * `400 Bad Request` – Missing fields or blacklisted URL
  * `404 Not Found` – User not found


#### 2. Get last Mails

Requires Authentication 

* **Method**: `GET`
* **Endpoint**: `/mails`
* **Description**: Retrieves the latest 50 mails of the current user.
* **Headers**: `x-user-id`
* **Note**:

  * Mails are sorted from newest to oldest, regardless of whether they were sent or received.

* **Responses**:

  * `200 OK` – Array of mail objects
  * `404 Not Found` – User not found
  * `400 Bad Request` –Missing user ID 


#### 3. Get Mail by ID

Requires Authentication 

* **Method**: `GET`
* **Endpoint**: `/mails/:id`
* **Description**: Retrieves a specific mail by ID.
* **Headers**: `x-user-id`
* **Responses**:

  * `200 OK` – Mail object
  * `404 Not Found` – Mail or user not found
  * `400 Bad Request` - Missing user ID or mail ID


#### 4. Edit Mail 

Requires Authentication 

* **Method**: `PATCH`
* **Endpoint**: `/mails/:id`
* **Description**: Allows only the **sender** of the mail to update its body.
* **Headers**: `x-user-id`
* **Body**:

```json
{
  "body": "Updated content"
}
```

* **Validation**:

  * Only the sender can edit
  * Subject cannot be changed
  * New body is checked for blacklisted URLs

* **Notes**:

  * If an edit has been made, it is also updated for the user to whom the email was sent.
    
* **Responses**:

  * `200 OK` – Mail updated
  * `400 Bad Request` – Not the sender
  * `400 / 404` – Validation or lookup failure


#### 5. Delete Mail

Requires Authentication 

* **Method**: `DELETE`
* **Endpoint**: `/mails/:id`
* **Description**: Deletes a mail for the requesting user only.
* **Headers**: `x-user-id`
* **Responses**:

  * `204 No Content` – Mail deleted from user’s inbox
  * `404 Not Found` – Mail or user not found
  * `400 Bad Request` – Missing user ID or mail ID

    
### 6. Search Mails

Requires Authentication 

* **Method**: `GET`
* **Endpoint**: `/mails/search/:query`
* **Description**: Searches for mails matching the query string in `subject`, `body`, `from`, or `to`.
* **Headers**: `x-user-id`
* **Behavior**:

  * Trims the query string
  * Case-insensitive
  * Empty query (`""`) returns all mails
    
* **Responses**:

  * `200 OK` – Array of matching mails
  * `404 Not Found` – User not found
  * `400 Bad Request` – Missing user ID or query parameter

####  Mail Object Structure

```json
{
  "id": "m-u-1-1",
  "from": "u-1",
  "to": "u-2",
  "subject": "...",
  "body": "...",
  "links": ["http://example.com"],
  "labelIds": [],
  "time": "2024-05-31T12:00:00.000Z"
}
```

###  Users

### 1. Create a User

* **Method**: `POST`
* **Endpoint**: `/users`
* **Description**: Create a new gmail user.
* **Body**:

```json
{
    "username": "Dana",
    "password": "Bb12c3d4",
    "picture": "https://example.com/profile.jpg",
    "gender": "female",
    "birthday": "20.11.2022"
}
```

* **Notes**:

  * `username`, `password`, `gender` and `birthday` are required
  * `picture` is optional
  * The password must be at least 8 letters and contain at least 1 english letter in appercase form, and at least 1 english letter in lowwercase form
  * `birthday` must be in the form DD.MM.YYYY and be a date before today.
  * `gender` can be: male\ female\ other
  * `isDateValid` make sure the given string is a date by using the JS Date object, and compare it to regex.
  * `imagePattern` and `pattern` are regexes of an image url and a password format accordingly. if the given variable don’t match them, we stop the creation of a     user. 

* **Responses**:

  * `201 Created` – User was created
  * `400 Bad Request` – Missing fields or invalid fildes or a user with that username already exist.
  
* **Behavior**:

  * If there are uppercase letters in `gender`- make them lower case


#### 2. Get User by ID

 Requires Authentication

* **Method**: `GET`
* **Endpoint**: `/users/:id`
* **Description**: Returns information about a specific user.
* **Headers**: `x-user-id`
* **Notes**:
  
  * `x-user-id` and `id` are required
  * The value of `x-user-id` must match the`id` that is in the route.
  * if the user didn’t have the field `picture` then so does the return value.


* **Validation**:
  * only the user can access their information.

* **Responses**:
  
  * `200 Ok` – User was sent
  * `400 Bad Request` – Missing header.
  * `404 Not Found` – User not found


* **Behavior**:
  * only returns the non-private fildes


#### User Object Structure

```json
{
  "id": "u-0",
  "username": "name",
  "password": "Bb12c3d4",
  "picture": "http://example.com//pic.jpg",  
  "gender": "male",
  "birthday": "20.3.1992",
  "mailCounter": 0,
  "mails": [],
  "labelCounter": 0,
  "labels": []
}
```


###  Tokens

#### 1. Is User Registerd
* **Method**: `POST`
* **Endpoint**: `/tokens`
* **Description**:  Checks if a user is registered.
* **Body**:
  
```json
{
    "username": "Dana",
    "password": "Bb12c3d4",
 }
```

* **Notes**:
  
  * `username` and  `password` are required

* **Responses**:
  
  * `200 Ok` – User was found
  * `400 Bad Request` – Missing fields.
  * `404 Not Found` – User with that username and password was not found

* **Behavior**:
  
  * If a user with that username and password was found- return it’s id.
  * Otherwise returns 404 error.


###  Labels

#### 1. Create a Label

 Requires Authentication

* **Method**: `POST`
* **Endpoint**: `/labels`
* **Description**: Create a new label for a specific gmail user.
* **Headers**:  `x-user-id`
* **Body**:
  
```json
{
    "name": "Label-Name",
 }
```

* **Notes**:
  
  * `name` and `x-user-id` are required
  * `name` can’t be empty

* **Validation**:
  
  * Users can create labels only for themselves.

* **Responses**:
  
  * `201 Created` – Label was created for that user.
  * `400 Bad Request` – Missing fields or invalid name filde.
  * `404 Not Found` – User was not found


#### 2. Get Label by ID

Requires Authentication

* **Method**: `GET`
* **Endpoint**: `/labels/:id`
* **Description**: Returns information about a specific label of a specific user.
* **Headers**: `x-user-id` – Required for authentication

* **Notes**:
  * `x-user-id` and `id` are required

* **Validation**:
  * only the user can access their labels information.
  * The value of `x-user-id` must have a label with the id:`id` that is in the route.

* **Responses**:
  * `200 Ok` – Label was sent
  * `400 Bad Request` – Missing header.
  * `404 Not Found` – User not found or label not found

* **Behavior**:
  * Returns all the Label fildes


#### 3. Get All Labels

Requires Authentication

* **Method**: `GET`
* **Endpoint**: `/labels/`
* **Description**: Returns all the labels of a specific user.
* **Headers**: `x-user-id`

* **Notes**:
  * If the user doesn’t have labels yet, return an empty array.

* **Validation**:
  * only the user can access their labels information.

* **Responses**:
  * `200 Ok` – Label was sent
  * `400 Bad Request` – Missing header.
  * `404 Not Found` – User not found or label not found

* **Behavior**:
  * Returns all the Labels and their fields.

#### 4. Update Label 

Requires Authentication

* **Method**: `PATCH`
* **Endpoint**: `/labels/:id`
* **Description**: Update the name of a specific label of a specific user.
* **Headers**: `x-user-id`
* **Body**:
  
```json
{
    "name": "new-Label-Name",
 }
```

* **Notes**:
  * `x-user-id`, `name` and `id` are required.

* **Validation**:
  * only the user can access their labels information.
  * The value of `x-user-id` must have a label with the id:`id` that is in the route.
  * The new `name` can’t be found in a different label (of the same user).
	
* **Responses**:
  * `204 No Content` – Label name was changed
  * `400 Bad Request` – Missing header or name in Body, or an invalid new name was given.
  * `404 Not Found` – User was not found or label not found





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


## Screenshots

### Project Management - JIRA Board
![JIRA Board](https://github.com/eden05221/gmail_project/blob/main/images/part2/%E2%80%8F%E2%80%8FJira_Board.PNG.png?raw=true)

### Test Run Output
![Test Run Output](https://github.com/eden05221/gmail_project/blob/main/images/part2/Test_Run_Input.png?raw=true)

### Application Run Example
![Application Run](https://github.com/eden05221/gmail_project/blob/main/images/part2/Example_run.png?raw=true)


