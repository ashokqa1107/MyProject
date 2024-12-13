pipeline {
    agent any
    environment {
        // Define environment variables
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
    }
    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git url: 'https://github.com/pavanoltraining/cypressautomation.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                sh 'npm install'
            }
        }

        stage('Cache Cypress Binary') {
            steps {
                echo 'Caching Cypress binaries...'
                sh 'npm cache clean --force'
                sh 'npx cypress install'
            }
        }

        stage('Verify Cypress Installation') {
            steps {
                echo 'Verifying Cypress installation...'
                sh 'npx cypress verify'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress tests...'
                sh 'npx cypress run'
            }
        }

        stage('Archive Reports') {
            steps {
                echo 'Archiving Cypress reports...'
                archiveArtifacts artifacts: '**/cypress/reports/**/*', allowEmptyArchive: true
            }
        }

    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. See the console output for details.'
        }
    }
}
