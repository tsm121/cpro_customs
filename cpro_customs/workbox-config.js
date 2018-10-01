module.exports = {
	//Global directory of app
	"globDirectory": ".",
	//Patterns for files that will be added
	"globPatterns": [
		//Add all assets images
		"public/assets/**/*.{png,jpg,svg}",
		"public/manifest.json"
	],
	//Destination to service worker template
	"swSrc": "src/sw-base.js",
	//Destination where the new service worker will be saved
	"swDest": "src/custom-sw.js",
	"globIgnores": [],
	// Remove 'public/' prefix from url
	modifyUrlPrefix: {
		'public/': ''
	}
};