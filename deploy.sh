#!/bin/bash

LOCAL_BUILD_DIR=".next"
ARCHIVE_NAME="next_build.tar.gz"
REMOTE_USER="ec2-user"
REMOTE_HOST="ec2-16-24-152-125.me-south-1.compute.amazonaws.com"
REMOTE_PATH="/usr/share/nginx/html"
SSH_KEY="$HOME/Desktop/CraftScene/craftscenewebsite.pem"

# Remove exist lokalen Build folder
if [ -d "$LOCAL_BUILD_DIR" ]; then
    echo "Remove exist lokalen Build folder $LOCAL_BUILD_DIR..."
    rm -rf "$LOCAL_BUILD_DIR"
fi

echo "Install npm-packages..."
npm install

echo "Build the app..."
npm run build

echo "Create archive for build folder $LOCAL_BUILD_DIR..."
tar -czf $ARCHIVE_NAME $LOCAL_BUILD_DIR

echo "Transfer $ARCHIVE_NAME to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH..."
scp -i $SSH_KEY -o IdentitiesOnly=yes $ARCHIVE_NAME ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

ssh -i $SSH_KEY -o IdentitiesOnly=yes ${REMOTE_USER}@${REMOTE_HOST} <<EOF
    cd "$REMOTE_PATH" || { echo "Konnte nicht in $REMOTE_PATH wechseln"; exit 1; }
  echo "Aktuelles Verzeichnis: \$(pwd)"
  
  # Replace old .next folder if exist
  if [ -d ".next" ]; then
    echo "Remove old .next folder"
    rm -rf .next
  fi
  
  echo "extract new archive that contains next js"
  tar -xzf "$ARCHIVE_NAME" -C .
  
  echo "Remove after extract"
  rm "$ARCHIVE_NAME"


  echo "Stoppe alle PM2-Prozesse..."
  pm2 kill
  
  # Die Next.js-Anwendung über PM2 neu starten
  echo "start next js app again"
  pm2 start npm --name "next-app" -- start
EOF

echo "Remove archive from the local machine"
rm $ARCHIVE_NAME

echo "Deployment Done."
