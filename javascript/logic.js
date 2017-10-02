$(document).ready(function() {
    let char = "";
    let pick = "";
    let charCount = 0;
    let allCharacters = ["mage", "ogre", "elf"];
    let charArray = [];
    let row = "";

    $(".moe").hide();
    $("#messages").html("Please select a character");
    


    



    $("#mage").click(function() {
        pick = "picked";
        char = "mage";
        selecChar();
    });

    $("#ogre").click(function() {
        pick = "picked";
        char = "ogre";
        selecChar();
    });

    $("#elf").click(function() {
        pick = "picked";
        char = "elf";
        selecChar();
    });

    $(".row1").click(function() {
        row = "Row1";
        if (pick === "picked") {
            rowChosen();
        }
    });

    $(".row2").click(function() {
        row = "Row2";
        if (pick === "picked") {
            rowChosen();
        }
    });

    $(".row3").click(function() {
        row = "Row3";
        if (pick === "picked") {
            rowChosen();
        }
    });

    $(".row4").click(function() {
        row = "Row4";
        if (pick === "picked") {
            rowChosen();
        }
    });

    function rowChosen() {
        charCount++;
        $("#" + char).fadeOut("slow");
        $(".moeChoices").fadeIn("slow");
        $("#messages").html("Please select a character");
        pick = "";
        $("#newChar" + row).prepend('<img id="' + charCount + char + row + '" data-position="1" class="moe" src="images/' + char + '.jpeg"/>');
        charArray.push("#" + charCount + char + row);
        console.log(charArray);
    }


    function selecChar() {
        
        if (charCount != 0) {
            for (var i=0; i<charArray.length; i++) {
                var position = $(charArray[i]).attr("data-position");

                if (position === "20") {
                    $(charArray[i]).css("position", "fixed");
                    // $(charArray[i]).css("margin-left", "20px");
                    $(charArray[i]).css("margin-top", "4px");
                } else {
                    $(charArray[i]).css("margin-left", "20px");
                    position++;
                    $(charArray[i]).attr("data-position", position);
                }
                
                
                
            }
        }


        for (var i=0; i<allCharacters.length; i++) {
            if (char != allCharacters[i]) {
                $("#" + allCharacters[i]).fadeOut("slow");
            }
        }
        $("#messages").html("Please select a row");
    }

})