pipeline {
    agent any

    tools {
        nodejs "NodeJS_18" // name from Jenkins Global Tool Configuration
    }

    environment {
        PATH = "$PATH:./node_modules/.bin"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:username/your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
        steps {
            sh 'npm run smoke'
        }
}

        stage('Publish Reports') {
            steps {
                // If using Allure reports
                allure([
                    includeProperties: false,
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            junit 'reports/**/*.xml' // optional if using JUnit xml
        }
        failure {
            mail to: 'your-email@example.com',
                 subject: "❌ Jenkins Build Failed",
                 body: "Check Jenkins job for details."
        }
    }
}