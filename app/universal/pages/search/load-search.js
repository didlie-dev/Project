/****look good for a starting point */
// To do
// 1) put all of this in a single class to make it transportable.
// 2) ... (make sure you understand about the ... to iterate over an array in a function as foreach)

/********check that all dependencies are defined */
Requires([
        'globalVariableRequest',
        'makeElementDrag',
        'languagePatterns'
            ]);
//REMEMBER THE VALUE OF THE FILE-NAME IN AJAX MUST BE 'true'
/*********************************************** */

// var _3pSearchDiv = "center";
function applyUTF8inputStyle(){
    this.style.fontFamily = "'Noto Sans', 'Arial Unicode MS', 'DejaVu Sans', 'Segoe UI', 'Liberation Sans', sans-serif";
}

//for validating JSON
function isValidJSON(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (e) {
        return false;
    }
}


//for use in more than one function
function applyCenteredStyle(){
    this.style.width = "200px";
    this.style.display = "flex";
    this.style.justifyContent = "center";
    this.style.alignItems = "center";
    this.style.position = "absolute";
    this.style.top = "50%";
    this.style.left = "50%";
    this.style.transform = "translate(-50%, -50%)";
}
// .my-3d-div {
//     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
// }
// .my-3d-div {
//     perspective: 1000px;
//     transform: rotateX(20deg) rotateY(10deg);
// }

//form submit function to create the button
function createDoSubmitButton(){
    const div2 = document.createElement("div");
    div2.id = "do-button";
    div2.style.position = "absolute";
    div2.style.width = "50px";
    div2.style.display = "block";
    div2.style.justifyContent = "center";
    div2.style.alignItems = "center";
    div2.style.position = "absolute";
    div2.style.top = "0";
    div2.style.height = "50px";
    div2.style.left = "50%";
    div2.style.backgroundColor = "ocean";
    div2.style.borderRadius = "50%";
    div2.style.fontSize = "25px";
    //3D stuff
    div2.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.9)";
    div2.style.perspective = "100px";
    // div2.style.transform = "rotateX(11deg) rotateY(10deg)";//wierd lopsided effect
    div2.style.background = "linear-gradient(45deg, #e0e0e0, #eeeeee)";


    div2.textContent = "d[ ]"; // Text content
  return div2;
}

function createSearchDoButton() {
    const div2 = document.createElement("div");
    div2.id = "do-div";
    div2.style.height = "200px";
    div2.style.backgroundColor = "white";
    div2.style.borderRadius = "50%";
    div2.style.fontSize = "75px";
    div2.textContent = "d[ ]"; // Text content
    applyCenteredStyle.call(div2);

    // Append to _3p search div
    _3p.fill("center","");
    _3p.append("center",div2);
}


///search form or editable div for submission 
function createSearchForm() {
    var MAX_CHARACTERS = 256;
    const input = document.createElement('div');
    input.contentEditable = 'true';
    
    input.id = "do-input";

    input.type = 'text';
    input.placeholder = 'Search...';
    input.innerHTML = 'Search...'
    // Add CSS styles directly to the input element
    input.style.backgroundColor = "black";
    input.style.color = "white";
    input.style.border = '2px solid #4CAF50';
    input.style.padding = '10px';
    input.style.fontSize = '16px';            
    input.style.resize = "none"; /* Prevent manual resizing */
    input.style.overflow = "hidden"; /*  */
    // input.style.overflowY = "auto"; /* resizes Y auto */
    input.style.whiteSpace = "pre-wrap";
    input.style.wordWrap = "break-word"; /* Ensure text wraps within the textarea */
    input.style.overflowWrap = "break-word";/*Both declerations required for backward-compatibility */
    input.style.wordBreak = "break-word";/*Both declerations required for backward-compatibility */
    // input.style.display = "none";

    //fun styles to play with
    // input.style.borderRadius = "50%";


    //apply the centered style
    applyCenteredStyle.call(input);
    applyUTF8inputStyle.call(input);
    
    //add dynamic resizing to text input
    input.addEventListener('input', function() {
        const text = input.innerText;
        if (text.length > MAX_CHARACTERS) {
            input.innerText = text.substring(0, MAX_CHARACTERS);
            alert(`Character limit of ${MAX_CHARACTERS} exceeded!`);
        }
        this.style.height = 'auto'; // Reset the height
        this.style.height = Math.min(this.scrollHeight, 200) + 'px'; // Adjust the height up to 200px
    
    });

    //input editable div, event listener for ENTER
    input.addEventListener('keydown', function(event) {

        /**can also add a fucntion here for dynamic search  */
       
        /** and a function for in-page price estimation */
    
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default action (new line)
            submitForm();
        }
    });

    // Append the form to the parent div
    _3p.fill("center","");
    _3p.append("center",input);

    // Make the button to submit
    var button = createDoSubmitButton();

    //add an event listener for the click to submit
    button.addEventListener("click",submitForm);

    //make button draggable
    input.parentElement.appendChild(button);
    makeElementDrag("do-button");
    
    // Focus the cursor inside the text input field
    input.focus();

    /**language detection */
    /****************************************** */
    //language detection
    // const languagePatterns = window.languagePatterns;
    //this value is dynamically loaded after the page loads
        
 
    input.addEventListener('input', function(event) {
        const text = this.innerText.trim();
        const firstChar = Array.from(text).pop() || '';
        let detectedLanguage = 'Unknown';

        for (const [language, pattern] of Object.entries(languagePatterns)) {
            if (pattern.test(firstChar)) {
                detectedLanguage = language;
                break;
            }
        }
        console.log(detectedLanguage);
    });
    input.addEventListener('focus', function(event) {
        if(this.innerHTML =="Search..."){
            this.innerHTML = "";
            this.cursor = "wait";
        }
    });

}

function doSearch(){
    console.log("doSearch");
    (createSearchDoButton());
    // (createSearchForm());
    var doDiv = document.getElementById("do-div");
    doDiv.addEventListener("click",createSearchForm);
}

/**THE MOST IMPORTANT FUNCTION TO SEND THE FORM */

// Function to submit the form using fetch
function submitForm() {
    // Get the editable div content
    const input = document.getElementById('do-input');
    const content = input.innerText;
    const encodedInput = encodeURIComponent(content);
    //seewhat it looks like
    console.log("sending this: " + encodedInput);
    // alert("check the console messages");//test
    //send it and look at response

    const fetchTarget = window.location.href + "?SEARCH=" + encodedInput;//TEST

    console.log("URI looks like this: " + fetchTarget);//TEST
    /******************************************************** */
    /** fetchJSON function universalised to allow for dynamic */
    /** variable loading........variables must be predefined  */
    /******************************************************** */
    
    globalVariableRequest(fetchTarget);// ajax/...
}

/* SEND FORM FUNCTION ABOVE */

//now the fun drag d[] button stuff:

// Execute the function when the page is fully loaded
document.addEventListener("DOMContentLoaded", doSearch);
// doSearch();
