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
        //.setCheck(null)
        .appendField("Bot");
        this.setColour(130);

 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dropdown_block'] = {
  init: function() {
    this.appendStatementInput("dropdown")
        //.setCheck(null)
        .appendField("Ask me a question:")
        .appendField(new Blockly.FieldDropdown([["What is the date today?",today], 
                                     
                                                ["What is the time now?",time], 
                                                ["How are you?","I am doing good. Thank you."], 
                                                ["What is JavaScript?","It is a scripting language for the web"], 
                                                ["What is your name?","Lavanya Narayanan"]]), "input");
    this.setPreviousStatement(true,"NAME");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
 
Blockly.JavaScript['dropdown_block'] = function (block) {
  let text_input;
  let code;
  let inputTextValue;
  Blockly.JavaScript['bot_block'] = function ()
  {
    text_input = block.getFieldValue("input");
    code = `
        inputTextValue = "${text_input}";
              `;
    return code;
  };
};

 /*
Blockly.JavaScript['bot_block'] = function () {
 
  Blockly.JavaScript['dropdown_block'] = function (block)
  {
    var text_input = block.getFieldValue("input");
    var code = `
    var inputTextValue = "${text_input}";
    `;
              
    return code;
  };

};

    //Blockly.JavaScript['dropdown_block']();
 
  /*  Blockly.JavaScript['dropdown_block'] = function (block) {

        let text_input = block.getFieldValue("input");
        let code = `
                  var inputTextValue = "${text_input}";
                  `;
        return code;
      };*/


    
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
/*
      Blockly.JavaScript.addReservedWords('code');
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      
      try {
        eval(code);
      } catch (e) {
        alert(e);
      }
      redrawUi();*/
    }
    
    function reset() {
      delete inputTextValue;
      Blockly.mainWorkspace.clear()
      redrawUi();
    }
