pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t nethangidissanayake/student-record-backend:latest ./backend'
                sh 'docker build -t nethangidissanayake/student-record-frontend:latest ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push nethangidissanayake/student-record-backend:latest'
                sh 'docker push nethangidissanayake/student-record-frontend:latest'
            }
        }

        stage('Deploy') {
            steps {
                sh 'ansible-playbook -i /opt/deploy/inventory.ini /opt/deploy/deploy.yml'
            }
        }
    }
}
