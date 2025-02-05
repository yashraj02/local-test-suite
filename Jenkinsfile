pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // Set status to pending when build starts
                githubSetStatus(
                    context: 'continuous-integration/jenkins',
                    description: 'Build in progress',
                    status: 'PENDING'
                )
                
                // Your build steps here
                
                // Set status to success if build succeeds
                githubSetStatus(
                    context: 'continuous-integration/jenkins',
                    description: 'Build succeeded',
                    status: 'SUCCESS'
                )
            }
        }
    }
    post {
        failure {
            // Set status to failure if build fails
            githubSetStatus(
                context: 'continuous-integration/jenkins',
                description: 'Build failed',
                status: 'FAILURE'
            )
        }
    }
}