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

          stage('EAS Build') {
              steps {
                  withCredentials([string(
                      credentialsId: 'expo-token',
                      variable: 'EXPO_TOKEN'
                  )]) {
                      sh '''
                          npx eas-cli@20.1.0 build \
                            --platform android \
                            --profile production \
                            --non-interactive \
                            --no-wait
                      '''
                  }
              }
          }
      }
  }