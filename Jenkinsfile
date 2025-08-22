pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH:./node_modules/.bin"
        HEADLESS = 'true'
    }

    parameters {
        string(name: 'TEST_SUITE', defaultValue: 'smoke', description: 'Which test suite to run: smoke, regression, full')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:prasannabj07/WebdriverIOLearning.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def tagExpression = params.TEST_SUITE == "smoke" ? "@smoke" : params.TEST_SUITE == "regression" ? "@regression" : ""
                    echo "Running tests with HEADLESS=${env.HEADLESS} and tagExpression='${tagExpression}'"
                    sh "npx wdio run wdio.conf.ts --cucumberOpts.tagExpression '${tagExpression}'"
                }
            }
        }

        stage('Publish Reports') {
            steps {
                // Optional: additional allure call here, but main reporting is in post
            }
        }
    }

    post {
        always {
            // Record JUnit results first
            junit 'reports/**/*.xml'

            // Allure reporting
            step([$class: 'AllureReportPublisher', results: [[path: 'allure-results']]])
        }
    }
}