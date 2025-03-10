pipeline {
    agent {
        docker {
            image 'node:20'
            // args '-u root:root'  // Falls root-Rechte erforderlich sind, kannst du diese Zeile aktivieren
        }
    }

    // Environment variables used during deployment
    environment {
        LOCAL_BUILD_DIR = ".next"
        ARCHIVE_NAME    = "next_build.tar.gz"
        REMOTE_USER     = "ec2-user"
        REMOTE_HOST     = "ec2-16-24-152-125.me-south-1.compute.amazonaws.com"
        REMOTE_PATH     = "/usr/share/nginx/html"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out source code from SCM..."
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo "Installing npm packages..."
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo "Running tests..."
                sh 'npm run test'
            }
        }
        stage('Build') {
            steps {
                echo "Building the Next.js application..."
                sh 'npm run build'
            }
        }
        stage('Package & Deploy') {
            steps {
                // Use SSH credentials (credential ID "my-ssh-key" must be configured in Jenkins)
                sshagent (credentials: ['my-ssh-key']) {
                    sh '''
                        #!/bin/bash
                        set -e

                        echo "Creating archive for the build directory '${LOCAL_BUILD_DIR}'..."
                        tar -czf ${ARCHIVE_NAME} ${LOCAL_BUILD_DIR}

                        echo "Transferring ${ARCHIVE_NAME} to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}..."
                        scp -o IdentitiesOnly=yes ${ARCHIVE_NAME} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

                        echo "Starting deployment on the remote server..."
                        ssh -o IdentitiesOnly=yes ${REMOTE_USER}@${REMOTE_HOST} <<EOF
                            #!/bin/bash
                            set -e
                            cd ${REMOTE_PATH} || { echo "Failed to change directory to ${REMOTE_PATH}"; exit 1; }
                            echo "Current directory: \$(pwd)"
                            
                            if [ -d ".next" ]; then
                                echo "Removing old build directory .next..."
                                rm -rf .next
                            fi
                            
                            echo "Extracting ${ARCHIVE_NAME}..."
                            tar -xzf ${ARCHIVE_NAME} -C .
                            
                            echo "Deleting archive ${ARCHIVE_NAME}..."
                            rm ${ARCHIVE_NAME}
                            
                            echo "Stopping all PM2 processes..."
                            pm2 kill
                            
                            echo "Starting Next.js application with PM2..."
                            pm2 start npm --name "next-app" -- start
EOF

                        echo "Deleting local archive ${ARCHIVE_NAME}..."
                        rm ${ARCHIVE_NAME}
                        echo "Deployment completed."
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Build, test, and deployment completed successfully."
        }
        failure {
            echo "An error occurred during build, test, or deployment."
        }
    }
}
