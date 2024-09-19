// var _3pSearchDiv = "center";
function applyCenteredStyle(){
    this.style.width = "200px";
    // this.style.height = "200px";
    // this.style.backgroundColor = "white";
    // this.style.borderRadius = "50%";
    this.style.display = "flex";
    this.style.justifyContent = "center";
    this.style.alignItems = "center";
    this.style.position = "absolute";
    this.style.top = "50%";
    this.style.left = "50%";
    this.style.transform = "translate(-50%, -50%)";
}
function createSearchDoButton() {
    const div2 = document.createElement("div");
    div2.id = "do-div";
    // div2.style.width = "200px";
    div2.style.height = "200px";
    div2.style.backgroundColor = "white";
    div2.style.borderRadius = "50%";
    // div2.style.display = "flex";
    // div2.style.justifyContent = "center";
    // div2.style.alignItems = "center";
    div2.style.fontSize = "72px";
    div2.textContent = "d[ ]"; // Text content
    // div2.style.position = "absolute";
    // div2.style.top = "50%";
    // div2.style.left = "50%";
    // div2.style.transform = "translate(-50%, -50%)";
    applyCenteredStyle.call(div2);

    // Append to _3p search div
    _3p.fill("center","");
    _3p.append("center",div2);
}

///search form or editable div for submission 
function createSearchForm() {

    const input = document.createElement('div');
    input.contentEditable = 'true';
    
    input.id = "do-input";
    input.type = 'text';
    input.placeholder = 'Search...';

    // Add CSS styles directly to the input element
    input.style.backgroundColor = "black";
    input.style.color = "white";
    input.style.border = '2px solid #4CAF50';
    input.style.padding = '10px';
    input.style.fontSize = '16px';            
    input.style.resize = "none"; /* Prevent manual resizing */
    input.style.wordWrap = "break-word"; /* Ensure text wraps within the textarea */
    input.style.overflowWrap = "break-word";/*Both declerations required for backward-compatibility */
    // input.style.display = "none";

    //apply the centered style
    applyCenteredStyle.call(input);
    
    //add dynamic resizing to text input
    input.addEventListener('input', function() {
        const text = input.innerText;
        if (text.length > MAX_CHARACTERS) {
            editableDiv.innerText = text.substring(0, MAX_CHARACTERS);
            alert(`Character limit of ${MAX_CHARACTERS} exceeded!`);
        }
        this.style.height = 'auto'; // Reset the height
        this.style.height = Math.min(this.scrollHeight, 200) + 'px'; // Adjust the height up to 200px
    
    });

    // Append the input field to the form
    form.appendChild(input);

    // Append the form to the parent div
    _3p.fill("center","");
    _3p.append("center",input);

    // Focus the cursor inside the text input field
    input.focus();
}

function doSearch(){
    (createSearchDoButton());
    // (createSearchForm());
    var doDiv = document.getElementById("do-div");
    doDiv.addEventListener("click",createSearchForm);
}
// Execute the function when the page is fully loaded
document.addEventListener("DOMContentLoaded", doSearch);