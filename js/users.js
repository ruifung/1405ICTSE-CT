/*jslint browser: true*/
// USER MANAGEMENT EMULATION IN JAVASCRIPT
// REQUIRES lz-string.min.js & jQuery.

var userJS = {
    
    users : {},
    //THESE ARE ERROR CODES FOR YOU TO COMPARE AGAINST.
    //USE LIKE userJS.errors.UsernameError or something like that yes?
    errors : {
        UsernameError: 0x555352,
        PasswordError: 0x505744,
        EmailError: 0x454d4c,
        ExtraLoginError: 0x01AC0F
    },
    
    //Login function
    //Returns username on success.
    //Throws error on failure.
    // Errors must be caught. (By caught I mean try/catch)
    login : function(username, password) {
        var current = sessionStorage.getItem("usersJS.currentUser");
        //IF ALREADY LOGGED IN, THROW ERROR.
        if(current === null || current === "") {
            throw this.ExtraLoginError;
        }
        //IF USERNAME DOES NOT EXIST, THROW ERROR.
        if ((typeof this.users[username]) === "undefined") {
            throw this.errors.UsernameError;
        }
        //IF INVALID PASSWORD, THROW ERROR.
        //ELSE RETURN USERNAME!
        if (this.users[username].pwd === window.btoa(password)) {
            sessionStorage.setItem("usersJS.currentUser",username);
            return username;
        } else {
            throw this.errors.PasswordError;
        }
    },
    
    //Logout function
    //No return value, always suceeds.
    logout : function() {
        sessionStorage.setItem("usersJS.currentUser","");
    },
    
    //Get currently logged in user
    //Returns username.
    //  null if no user logged in.
    getLoggedInUser : function() {
        var user = sessionStorage.getItem("usersJS.currentUser");
        if (user === "") {
            return null;
        }
        return user;
    },
    
    //Register a user
    // No return value
    // Throws exception on failure. (Catch them.)
    register : function(username, pwd1, pwd2, email1, email2) {
        if (pwd1 !== pwd2) {
            throw this.errors.PasswordError;
        }
        if (email1 !== email2) {
            throw this.errors.EmailError;
        }
        if(username.length < 6) {
            throw this.errors.UsernameError;
        }
        
        //YES I KNOW IM STORING IT IN PLAINTEXT
        var userData = {
            pwd: window.btoa(pwd1),
            eml: email1
        };
        this.users[username] = userData;
        this.saveData();
        return;
    },
    
    
    //LOADDATA AND SAVEDATA ARE USED INTERNALLY.
    saveData : function() {
        var jsonString = JSON.stringify(this.users);
        var compressed = LZString.compressToUTF16(jsonString);
        localStorage.setItem("usersJS.emuDB",compressed);
    },
    
    loadData : function() {
        var compressed = localStorage.getItem("usersJS.emuDB");
        if (typeof compressed === null) {
            return;
        }
        var jsonString = LZString.decompressFromUTF16(compressed);
        var loadedData = JSON.parse(jsonString);
        jQuery.extend(this.users,loadedData);
    }
}
userJS.loadData();