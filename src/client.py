import socket 
import sys
import ipaddress

def is_valid_ip(ip):

    """
    Checks if the given string is a valid IP address.
    """
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False

def is_valid_port(port):

    """
    Checks if the given string is a valid PORT address.
    """
    if not port.isdigit():
        return False
    cur_port = int(port)
    return 1 <= cur_port <= 65535


def handle_input(argv):

    """
    Reads and validates IP and port from command-line arguments.
    Exits if input is invalid.
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
    Connects to the server and returns the socket.
    """

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((server_ip, server_port))
    return client_socket

def main():
    server_ip, server_port = handle_input(sys.argv)
    client_socket = connect_to_server(server_ip, server_port)
    try:
        while True:
            user_input = input()
            client_socket.sendall(bytes(user_input + '\n', 'utf-8'))

            response = b""
            while b'\n' not in response:
                response += client_socket.recv(4096)
            print(response.decode('utf-8'))
    finally:
        client_socket.close()

#if __name__ == "__main__":
 #   main()
