$(document).ready(function() {
    let char = "";
    let pick = "";
    let charCount = 0;
    let allCharacters = ["mage", "ogre", "elf"];

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
        if (pick === "picked") {
            charCount++;
            $("#" + char).fadeOut("slow");
            $(".moeChoices").fadeIn("slow");
            $("#messages").html("Please select a character");
            pick = "";
            $("#newChar").html('<img id="' + charCount + char + 'Row1" class="moe" src="images/' + char + '.jpeg"/>');
        }
    });


    function selecChar() {
        if (charCount != 0) {
            // console.log("#" + charCount + char + "Row1");
            for (var i=0; i<allCharacters.length; i++) {
                
                $("#" + charCount + allCharacters[i] + "Row1").css("margin-left", "20px");
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