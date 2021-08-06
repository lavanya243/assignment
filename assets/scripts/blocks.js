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


Blockly.Blocks['bot_block'] = {
  init: function() {
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("Bot");
        this.setColour(130);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dropdown_block'] = {
  init: function() {
    this.appendStatementInput("dropdown")
        .setCheck(null)
        .appendField("Ask me a question:")
        .appendField(new Blockly.FieldDropdown([["What is the date today?",today], 
                                                ["What is the time now?",time], 
                                                ["How are you?","I am doing good. Thank you."], 
                                                ["What is JavaScript?","It is a scripting language for the web"], 
                                                ["What is your name?","Lavanya Narayanan"]]), "input");
    this.setPreviousStatement(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['bot_block'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');

  var code = `
	var botValue = "${statements_name}";
  `;
  return code;
};

Blockly.JavaScript['dropdown_block'] = function (block) {

  var text_input = block.getFieldValue("input");

  let code = `
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
  
  code = Blockly.JavaScript.workspaceToCode(workspace);
  var geval = eval;
  try {
    geval(code);
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