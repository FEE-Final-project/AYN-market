import os

# This script opens file index.html and replace env vars inside of it
REACT_APP_API_ROOT = os.environ.get('REACT_APP_API_ROOT')
REACT_APP_BACKEND_ROOT = os.environ.get('REACT_APP_BACKEND_ROOT')
REACT_APP_WEBSOCKET_ROOT = os.environ.get('REACT_APP_WEBSOCKET_ROOT')

# Read the file
file = open('index.html', 'rt')
data = file.read()

# Replace data
data = data.replace('__REACT_APP_API_ROOT__', REACT_APP_API_ROOT)
data = data.replace('__REACT_APP_BACKEND_ROOT__', REACT_APP_BACKEND_ROOT)
data = data.replace('__REACT_APP_WEBSOCKET_ROOT__', REACT_APP_WEBSOCKET_ROOT)

# Write changes
file = open('index.html', 'wt')
file.write(data)
