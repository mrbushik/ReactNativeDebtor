 pipeline {
      agent any

      environment {
          NPM_CONFIG_CACHE = "${WORKSPACE}/.npm-cache"
          CI = "true"
      }

      stages {
          stage('Install') {
              steps {
                  sh 'node -v'
                  sh 'npm -v'
                  sh 'npm ci'
              }
          }

          stage('Quality') {
              steps {
                  sh 'npm run typecheck'
                  sh 'npm run lint'
                  sh 'npm run format:check'
              }
          }

          stage('Test') {
              steps {
                  sh 'npm run test:ci'
              }
              post {
                  always {
                      archiveArtifacts(
                          artifacts: 'coverage/**',
                          allowEmptyArchive: true
                      )
                  }
              }
          }

          stage('Expo Validate') {
              steps {
                  sh 'npx expo-doctor'
              }
          }

          stage('EAS Build') {
              steps {
                  withCredentials([string(
                      credentialsId: 'EXPO_TOKEN',
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
