function languageDetection(id){
 
    var language = "Unknown";

    const div = document.getElementById(id);
    var txt = div.innerText;
    var char = Array.from(txt)[0] || '';

    const languagePatterns = {
        'English': /^[A-Za-z]+$/,
        'Georgian': /^[\u10A0-\u10FF]+$/,
        'Arabic': /^[\u0600-\u06FF]+$/,
        'Cyrillic': /^[\u0400-\u04FF]+$/,
        'Chinese': /^[\u4E00-\u9FFF]+$/,
        // Add more languages as needed
    };

    const check = function(char){
        for (const [lang, pattern] of Object.entries(languagePatterns)) {
            if (pattern.test(char)) {
                language = lang;
                console.log("Language is now: "+ this.language);//TEST
            };
        }
    }

    this.check(char);//for initial state of language in element

    console.log("is the Initial Language in the element");//TEST

    div.addEventListener('input', function(event) {

    this.check(input);
        }); //for each new character entered into the element

    
};