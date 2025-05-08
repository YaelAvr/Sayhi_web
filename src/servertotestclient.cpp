#include <iostream>
#include <string>
#include <unistd.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <cstring>

#define PORT 12345

std::string handleCommand(const std::string& command) {
    std::string trimmed = command;
    if (!trimmed.empty() && trimmed.back() == '\n') {
        trimmed.pop_back();
    }

    if (trimmed == "1") {
        return "201 Created\n";
    }
    if (trimmed == "2") {
        return "200 Ok\n";
    }
    if (trimmed.rfind("DELETE ", 0) == 0) {
        return "204 No Content\n";
    }
    if (trimmed == "DELETE" || trimmed == "GET") {
        return "404 Not Found\n";
    }
    if (trimmed.rfind("POST", 0) == 0) {
        return "201 Created\n";
    }

    return "400 Bad Request\n";
}

int main() {
    int server_fd, client_socket;
    struct sockaddr_in address;
    socklen_t addrlen = sizeof(address);
    char buffer[4096] = {0};

    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == 0) return 1;

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;  // 0.0.0.0
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) return 1;
    if (listen(server_fd, 1) < 0) return 1;

    client_socket = accept(server_fd, (struct sockaddr*)&address, &addrlen);
    if (client_socket < 0) return 1;

    while (true) {
        memset(buffer, 0, sizeof(buffer));
        int valread = 0;
        std::string command = "";

        // Read until newline
        while (true) {
            valread = read(client_socket, buffer, 1);
            if (valread <= 0) break;
            command += buffer[0];
            if (buffer[0] == '\n') break;
        }

        if (valread <= 0) break;  // client disconnected

        std::string response = handleCommand(command);
        send(client_socket, response.c_str(), response.length(), 0);
    }

    close(client_socket);
    close(server_fd);
    return 0;
}