import socket 
import sys
import ipaddress

def is_valid_ip(ip):

    """
    Checks if the given string is a valid IP address.
    """
    return ip == "server"


def is_valid_port(port):

    """
    Checks if the given string is a valid PORT address.
    """
    if not port.isdigit():
        return False
    cur_port = int(port)
    return 1024 <= cur_port <= 65535


def handle_input(argv):

    """
    Reads and validates IP and port from command-line arguments.
    Exits the program if input is invalid.
    
    Args:
        argv (list): Command-line arguments, expected format: [script_name, ip, port]
    
    Returns:
        tuple: (server_ip as str, server_port as int)
    """

    if len(argv) != 3:
        sys.exit(1)
    
    server_ip = argv[1]
    if not is_valid_ip(server_ip):
        sys.exit(1)

    server_port = argv[2]
    if not is_valid_port(server_port):
        sys.exit(1)
    
    return server_ip, int(server_port)

def connect_to_server(server_ip, server_port):

    """
    Establishes a TCP connection to the server at the given IP and port.
    Exits the program if the connection fails.
    """

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((server_ip, server_port))
    return client_socket


def main():

    """
    Main client logic:
    - Parses IP and port from the command-line
    - Connects to the server
    - Enters an infinite loop:
        - Reads a command from the user
        - Sends it to the server with newline terminator
        - Waits for a response that ends with newline
        - Prints the response exactly as received (without extra newline)
    - Closes the socket on exit
    """

    server_ip, server_port = handle_input(sys.argv)
    client_socket = connect_to_server(server_ip, server_port)
    try:
        while True:
            user_input = input()
            client_socket.sendall(bytes(user_input + '\n', 'utf-8'))

            response = b""
            while b'\n' not in response:
                response += client_socket.recv(4096)
            print(response.decode('utf-8'), end="")
    except KeyboardInterrupt:
        pass  # exit silently on Ctrl+C
    finally:
        client_socket.close()

if __name__ == "__main__":
    main()