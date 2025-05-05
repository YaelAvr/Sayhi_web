import socket 
import sys

def handle_input():

    """
    Handles command-line input.
    
    Returns:
        tuple: A tuple containing the server IP and server port.
    
    Exits:
        If the number of arguments is incorrect or the port is not an integer.
    """

    if len(sys.argv) != 3:
        print("tamplate: client.py <server_ip> <server_port>")
        sys.exit(1)
    
    server_ip = sys.argv[1]
    try:
        server_port = int(sys.argv[2])
    except ValueError:
        print("port needs to be an integer")
        sys.exit(1)
    
    return server_ip, server_port

def connect_server(server_ip, server_port):

    """
    Establishes a TCP connection to the server.

    Args:
        server_ip (str): The IP address of the server.
        server_port (int): The port number of the server.

    Returns:
        socket: The connected client socket.
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
