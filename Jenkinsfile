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
        environment {
          EXPO_TOKEN = credentials('EXPO_TOKEN')
        }
        steps {
          sh '''
            npx eas-cli build --platform android --profile preview --non-
            interactive
          '''
        } pipeline {
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
                 environment {
                   EXPO_TOKEN = credentials('EXPO_TOKEN')
                 }
                 steps {
                   sh '''
                     npx eas-cli build --platform android --profile preview --non-interactive
                   '''
                 }
               }
             }
           }
      }
    }
  }