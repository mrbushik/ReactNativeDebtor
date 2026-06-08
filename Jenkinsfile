pipeline {
    agent any

    stages {
      stage('Install') {
        steps {
          sh 'node -v'
          sh 'npm -v'
          sh 'npm ci'
        }
      }

      stage('Validate') {
        steps {
          sh 'npx expo-doctor || true'
        }
      }
    }
  }