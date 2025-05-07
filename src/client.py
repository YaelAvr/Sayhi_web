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


def handle_input():

    """
    Reads and validates IP and port from command-line arguments.
    Exits if input is invalid.
    """

    if len(sys.argv) != 3:
        print("tamplate: client.py <server_ip> <server_port>")
        sys.exit(1)
    
    server_ip = sys.argv[1]
    if not is_valid_ip(server_ip):
        print("ip is not valid")
        sys.exit(1)

    server_port = sys.argv[2]
    if not is_valid_port(server_port):
        print("port is not valid")
        sys.exit(1)
    
    return server_ip, server_port

def connect_to_server(server_ip, server_port):

    """
    Connects to the server and returns the socket.
    """

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((server_ip, server_port))
    return client_socket

def main():
    server_ip, server_port = handle_input()
    client_socket = connect_to_server(server_ip, server_port)
    # socket remains open for future communication

if __name__ == "__main__":
    main()
