pipeline {
    agent any

    parameters {
        string(
            name: 'FIREBASE_TESTER_GROUP',
            defaultValue: 'testers',
            description: 'Firebase App Distribution tester group alias'
        )
    }

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
                    junit(
                        testResults: 'reports/junit.xml',
                        allowEmptyResults: true
                    )
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

        stage('EAS Preview Build') {
            steps {
                withCredentials([string(
                    credentialsId: 'EXPO_TOKEN',
                    variable: 'EXPO_TOKEN'
                )]) {
                    sh '''
                        mkdir -p builds

                        npx eas-cli@20.1.0 build \
                          --platform android \
                          --profile preview \
                          --non-interactive \
                          --wait \
                          --json > builds/eas-build.json

                        BUILD_URL="$(
                          node -e '
                            const fs = require("fs");
                            const result = JSON.parse(
                              fs.readFileSync("builds/eas-build.json", "utf8")
                            );
                            const build = Array.isArray(result) ? result[0] : result;

                            if (!build?.artifacts?.buildUrl) {
                              throw new Error("EAS build did not return an APK URL");
                            }

                            process.stdout.write(build.artifacts.buildUrl);
                          '
                        )"

                        curl --fail --location \
                          "$BUILD_URL" \
                          --output builds/app-preview.apk
                    '''
                }
            }
            post {
                success {
                    archiveArtifacts(
                        artifacts: 'builds/app-preview.apk',
                        fingerprint: true
                    )
                }
            }
        }

        stage('Firebase App Distribution') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'FIREBASE_TOKEN',
                        variable: 'FIREBASE_TOKEN'
                    ),
                    string(
                        credentialsId: 'FIREBASE_APP_ID',
                        variable: 'FIREBASE_APP_ID'
                    )
                ]) {
                    sh '''
                        npx firebase-tools@15.20.0 \
                          appdistribution:distribute builds/app-preview.apk \
                          --app "$FIREBASE_APP_ID" \
                          --groups "$FIREBASE_TESTER_GROUP" \
                          --release-notes "Jenkins build ${BUILD_NUMBER} (${GIT_COMMIT})" \
                          --token "$FIREBASE_TOKEN"
                    '''
                }
            }
        }
    }
}
