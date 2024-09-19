function createSpinners(num) {
    var spinners = {};
    for (var i = 0; i < num; i++) {
      var spinner = document.createElement('div');
      spinner.className = 'spinner';
      spinner.id = 'divin' + (i+1);
      spinner.style.display = 'block';
      // <!-- now style -->
      spinner.style.margin = '100 auto';
      spinner.style.width = '50px';
      spinner.style.height = '50px';
      spinner.style.border = '3px solid transparent';
      spinner.style.borderRadius = '50%';
      spinner.style.borderTopColor = '#3498db';
      spinner.style.animation = 'spin 2s linear infinite';
      // <!-- document.body.appendChild(spinner); -->
      spinners[spinner.id] = spinner;
    }
    return spinners;
  }
  var spinnerDivs = createSpinners(3);
  // <!-- add spinners to the elements -->
_3p.fill("left","");
_3p.append("left",spinnerDivs['divin1']);
_3p.fill("center","");
_3p.append("center",spinnerDivs['divin2']);
_3p.fill("right","");
_3p.append("right",spinnerDivs['divin3']);
//  <!-- Add the keyframes animation -->
var styleSheet = document.styleSheets[0];
var keyframes = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
// <!-- 
// // Function to load CSS asynchronously
// function loadCSS(url) {
//     var stylesheet = document.createElement('link');
//     stylesheet.rel = 'stylesheet';
//     stylesheet.href = url;
//     document.head.appendChild(stylesheet);
// }

// document.addEventListener('DOMContentLoaded', function() {
//     // Your JavaScript code here
//     // For example, dynamically load a CSS file:
//     loadCSS(spinnerFile);
// }); -->