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

def send_command(client_socket, command):

    """
    Sends a command to the server.

    Args:
        client_socket (socket): The connected client socket.
        command (str): The command string to send.
    """

    client_socket.send(bytes(command + '\n', 'utf-8'))

def server_response(client_socket):

    """
    Receives and decodes the server's response.

    Args:
        client_socket (socket): The connected client socket.

    Returns:
        str: The response from the server, decoded and stripped of trailing newline.
    """
    
    response =b''
    while True:
        cur = client_socket.recv(4096)
        response += cur
        if b'\n' in cur:
            break
    return response.decode().strip()    # Strip trailing newline before printing

def start_runing_client():

    """
    Starts the client, connects to the server, and enters a loop to send and receive commands.
    Gracefully handles user interruption (Ctrl+C).
    """

    server_ip, server_port = handle_input()
    client_socket = connect_server(server_ip, server_port)
    try:                                        
        while True:
            command = input("Enter command: ")
            send_command(client_socket, command)
            response = server_response(client_socket)
            print(response)
    except KeyboardInterrupt:
        print("\nClient interrupted.")
    finally:
        client_socket.close()

if __name__ == "__main__":        # Run only if this file is executed directly (not imported as a module)
    start_runing_client()