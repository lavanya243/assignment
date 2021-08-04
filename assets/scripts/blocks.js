$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

const date = new Date();
let today = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
let time = date.getHours() + ":" + date.getMinutes();


Blockly.Blocks["example_input_text"] = {
  init: function () {
    this.appendStatementInput("Bot")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["What is the date today?",today], ["What is the time now?",time], ["How are you?","I am doing good."], ["What is JavaScript?","It is a scripting language for the web"], ["What is your name?","Lavanya Narayanan"]]), "Ask me a question:");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};





Blockly.JavaScript["example_input_text"] = function (block) {
  var text_input = block.getFieldValue("Ask me a question:");

  var code = `
	var inputTextValue = "${text_input}";
  `;
  return code;
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  Blockly.mainWorkspace.clear()
  redrawUi();
}
