# Gmail Project — URL Blacklist System
This project implements a URL blacklist system using a Bloom filter in C++.
The application supports adding and checking URLs, is developed with Test-Driven Development (TDD) methodology, and follows SOLID principles for flexibility and maintainability.
The Bloom filter is saved to a file to ensure persistence between runs.

## System Requirements
To run the application using Docker:
- Docker and Docker Compose installed.

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
- `Dockerfile` — Docker build instructions
- `docker-compose.yml` — Docker Compose configuration
- `CMakeLists.txt` — CMake build script
- `.gitignore` — Git ignored files
- `README.md` — Project documentation


## Usage
To compile and run the application using Docker, use the following command:

```bash
docker-compose run --rm --build gmail-project
``` 
After starting the application:

Enter the initial Bloom filter size and hash function configuration.

Then use:

- 1 [URL] to add a URL to the blacklist.

- 2 [URL] to check if a URL is blacklisted.

## Example Run

```bash
Input:
8 1
1 www.example.com0
2 www.example.com0
2 www.example.com4
```

```bash

Output:
true true
true false
```


