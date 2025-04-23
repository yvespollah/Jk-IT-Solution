import http.server
import socketserver
import os

PORT = 8000

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

Handler = MyHttpRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever() 