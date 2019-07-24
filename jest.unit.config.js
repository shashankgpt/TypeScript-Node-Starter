module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: 'tsconfig.json'
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
	setupFilesAfterEnv: [
		"<rootDir>/src/server.ts"
	  ],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: [
		'**/**/*.unit.spec.(ts|js)'
	],
	testEnvironment: 'node'
};