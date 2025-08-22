pipeline {
    agent any

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

        sstage('Run Smoke Tests') {
    steps {
        // Install dependencies first
        sh 'npm install'

        // Run only @smoke tagged tests
        sh 'npx wdio run wdio.conf.ts --cucumberOpts.tagExpression "@smoke"'
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