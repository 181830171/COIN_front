pipeline {
    agent any
    stages{
        stage('check out'){
            git credentialsId: '5355acb9-7b22-405c-949a-96338f37c645', url:'http://212.129.149.40/181250062_fabulousseciii/frontend-coin.git'
        }
		stage('install'){
			sh 'npm install'
		}
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
       stage('Test') {
            steps {
                sh 'npm run test'
                }
       }
    }

}