#!/bin/sh
ESCAPED_DOMAIN=$(echo "$DOMAIN" | sed 's/\//\\\//g')
# Check if the DOMAIN environment variable is set
if [ -z "$DOMAIN" ]; then
  echo "DOMAIN environment variable is not set. Exiting."
  exit 1
fi

# Replace the placeholder in the JavaScript file
sed -i 's/let domain = "https:\/\/api.medlinker.org";/let domain = "'$ESCAPED_DOMAIN'";/' /usr/share/nginx/html/js/constants.js

# Start Nginx
exec "$@"
