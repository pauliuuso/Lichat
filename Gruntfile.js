module.exports = function(grunt)
{
    grunt.initConfig
    ({
        // get config info from package.json
        pkg: grunt.file.readJSON("package.json"),
        // configure jshint to check js files for errors
        jshint:
        {
            options:
            {
                reporter: require("jshint-stylish")
            },
            // when this task is run, lint gruntfile and all js files in src
            build: ["Gruntfile.js", "js/*.js"]
        },
        // minify js files
        uglify:
        {
            options:
            {
                banner: "/*\n <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> \n*/\n"
            },
            build:
            {
                files:
                {
                    "js/script.min.js" : ["js/userController.js", "js/loginController.js", "js/registerController.js", "js/homeController.js", "js/welcomeController.js", "js/allUsersController.js", "js/backController.js", "js/pictureController.js", "js/passwordController.js", "js/addThemeController.js", "js/editThemeController.js", "js/themeController.js", "js/levelsController.js", "js/privilegesController.js", "js/forgotController.js", "services/userService.js"]
                }
            }
        }
    });
    
    // load grunt plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    
};