pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH:./node_modules/.bin"
        HEADLESS = 'true' // CI/CD headless; locally can override with HEADLESS=false
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
                sh 'npm ci' // clean install for CI pipelines
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Choose tag expression based on TEST_SUITE parameter
                    def tagExpression = ""
                    if (params.TEST_SUITE == "smoke") {
                        tagExpression = "@smoke"
                    } else if (params.TEST_SUITE == "regression") {
                        tagExpression = "@regression"
                    } else {
                        tagExpression = "" // run all tests
                    }

                    // Log which mode is running
                    echo "Running tests with HEADLESS=${env.HEADLESS} and tagExpression='${tagExpression}'"

                    // Run WebDriverIO tests
                    sh "npx wdio run wdio.conf.ts --cucumberOpts.tagExpression '${tagExpression}'"
                }
            }
        }

        stage('Publish Reports') {
            steps {
                // Allure report
                allure([
                    includeProperties: false,
                    results: [[path: 'allure-results']]
                ])
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