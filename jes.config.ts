import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', //use ts-jest to transform to typeScript 
    testEnvironment: 'node', // Use Node.js
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform files .ts and .tsx with ts-jest
    },
    
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Extensions needed
    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'], // The test files
    transformIgnorePatterns: ['<rootDir>/node_modules/'], // ignore the node_modules
  };
  
  
  export default config;