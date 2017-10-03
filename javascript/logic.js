$(document).ready(function() {
    let char = "";
    let pick = "";
    let atBeans = false;
    let waitToScavenge = false;
    let attack = 0;
    let hp = 0;
    let scav = 0;
    let scavengeRow = 0;
    let allCharacters = ["mage", "ogre", "elf"];
    let charArray = [];
    let row = 0;
    let newChar = {};

    $(".moe").hide();
    $("#messages").html("Please select a character");
    
createEmptyBoxes();

    function createEmptyBoxes() {
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 28; j++) {
                $("#row" + i).append('<img id="r' + i + 's' + j + '" class="emptyBox" occupied=false />');
            }      
        }
    }

    



    $("#mage").click(function() {
        pick = "picked";
        char = "mage";
        attack = 3;
        hp = 2;
        scav = 1;
        moveCharacters();
    });

    $("#ogre").click(function() {
        pick = "picked";
        char = "ogre";
        attack = 1;
        hp = 6;
        scav = 3;
        moveCharacters();
    });

    $("#elf").click(function() {
        pick = "picked";
        char = "elf";
        attack = 2;
        hp = 4;
        scav = 2;
        moveCharacters();
    });

    $(".row1").click(function() {
        row = 1;
        if (pick === "picked") {
            rowChosen();
        }
    });

    $(".row2").click(function() {
        row = 2;
        if (pick === "picked") {
            rowChosen();
        }
    });

    $(".row3").click(function() {
        row = 3;
        if (pick === "picked") {
            rowChosen();
        }
    });

    $(".row4").click(function() {
        row = 4;
        if (pick === "picked") {
            rowChosen();
        }
    });

    function rowChosen() {
        moveCharacters();

        newChar = {};
        $(".moeChoices").fadeIn("slow");
        $("#messages").html("Please select a character");
        pick = "";
        $("#r" + row + "s1").attr("src", 'images/' + char + '.jpeg');
        $("#r" + row + "s1").attr("occupied", true);
        // Setting attributes to the newChar object
        newChar.char = char;
        newChar.row = row;
        newChar.position = 1;
        newChar.pic = 'images/' + char + '.jpeg';
        newChar.attack = attack;
        newChar.hp = hp;
        newChar.scav = scav;
        newChar.position = 1;
        newChar.atBeans = false;
        newChar.waitToScavenge = false;
        charArray.push(newChar);
        row = 0;

        // console.log(charArray);
    }


    function moveCharacters() {
        // This moves all characters ahead 1 space BUT only if the space ahead of it is NOT occupied
        for (var j = 0; j < charArray.length; j++) {
            let isSpaceAheadOccupied = $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("occupied");
            
           if (isSpaceAheadOccupied === "false") {
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("occupied", false);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("src", charArray[j].pic);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("occupied", true);
                charArray[j].position = Number(charArray[j].position) + 1;
           }
        }
        
        for (var i=0; i<allCharacters.length; i++) {
            if (char != allCharacters[i]) {
                $("#" + allCharacters[i]).fadeOut("slow");
            }
        }
        $("#messages").html("Please select a row");
    }

});