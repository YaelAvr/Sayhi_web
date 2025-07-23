
# Gmail Android App – Setup Instructions

## Setup Steps

### 1. Open MongoDB Connection
Make sure your MongoDB instance is running and accessible.  
If you're using a remote cluster (e.g., MongoDB Atlas), verify that the connection string is correct and access is allowed from your IP.

---

### 2. Create `.env` File in VS Code
In **Visual Studio Code**, create a `.env` file in the **root directory** of the project with the necessary environment variables.
![JIRA Board](https://github.com/eden05221/gmail_project/blob/main/images/p5/files.png)
The .env file:
![JIRA Board](https://github.com/eden05221/gmail_project/blob/main/images/p5/env.png)

---

### 3. Run Docker Compose (in WSL)
Open a **WSL terminal** and navigate to the project root.  
Run the following command to build and start all services:

```bash
docker compose up --build



