//This function will initialize the area for writing Javascript code
function initializeCodeEditor() {
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai"); //ou cobalt?
  editor.session.setMode("ace/mode/javascript");

  editor.setOptions({
    fontFamily: "Source Code Pro",
    fontSize: "10pt",
    showLineNumbers: true
  });

  $("#editor").resizable({
    handleSelector: ".splitter",
    resizeWidth: false
  });
};



//When DOM is ready, call the function to initialize the code editor
$( document ).ready(function() {
  initializeCodeEditor();
});
