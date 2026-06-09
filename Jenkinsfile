pipeline {
    agent any

    environment {
      NPM_CONFIG_CACHE = "${WORKSPACE}/.npm-cache"
    }

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

      stage('Build Android') {
        steps {
          withCredentials([string(credentialsId: 'EXPO_TOKEN', variable: 'EXPO_TOKEN')]) {
            sh 'npx eas-cli build --platform android --profile preview --non-interactive'
          }
        }
      }
    }
  }