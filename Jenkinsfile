pipeline {
    agent any
    
    environment {
        NODE_ENV = 'test'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        // Run tests and generate coverage report
                        sh 'npm run test:coverage'
                        
                        // Optional: Publish coverage reports
                        publishHTML(target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: false,
                            keepAll: true,
                            reportDir: 'coverage',
                            reportFiles: 'index.html',
                            reportName: 'Coverage Report'
                        ])
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Tests failed: ${e.message}")
                    }
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                script {
                    def coverage = sh(
                        script: 'node -e "const coverage = require(\'./coverage/coverage-summary.json\'); console.log(coverage.total.lines.pct);"',
                        returnStdout: true
                    ).trim()
                    
                    if (coverage.toFloat() < 80) {
                        error("Coverage ${coverage}% is below minimum threshold of 80%")
                    }
                }
            }
        }
        
        stage('Build') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                // Add your deployment steps here
                sh 'echo "Deploying to production..."'
            }
        }
    }
    
    post {
        always {
            // Clean workspace
            cleanWs()
        }
        failure {
            // Notify team on failure
            emailext (
                subject: "Pipeline Failed: ${currentBuild.fullDisplayName}",
                body: "Pipeline failed at stage: ${currentBuild.result}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
}