$(document).ready(function() {
    let char = "";
    let pick = "";
    let atBeans = false;
    let waitToScavenge = false;
    let attack = 0;
    let hp = 0;
    let scav = 0;
    let scavengeRow = 0;
    let newHP = 0;
    let newAttack = 0;
    let newScav = 0;
    
    const allCharacters = [
        { char: "mage",
        attack: 3,
        hp: 2,
        scav: 1
        },
        { char: "ogre",
        attack: 1,
        hp: 6,
        scav: 3
        },
        { char: "elf",
        attack: 2,
        hp: 4,
        scav: 2
        }
    ];

    // console.log(allCharacters);

    let charArray = [];
    let enemyCharArray = [];
    let row = 0;
    let newChar = {};


    $(".moe").hide();
    $("#messages").html("Please select a character");
    
createEmptyBoxes();

    // This creates all empty boxes on the screen and adds attributes to them
    function createEmptyBoxes() {
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 28; j++) {
                $("#row" + i).append('<img id="r' + i + 's' + j + '" class="emptyBox" hp=0 attack=0 scav=0 occupied=false />');
                $("#r" + i + "s" + j).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#enemyrow" + i).prepend('<img id="enemyr' + i + 's' + j + '" class="emptyBox" hp=0 attack=0 scav=0 occupied=false />');
                $("#enemyr" + i + "s" + j).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
            }      
        }
    }

    $("#mage").click(function() {
        pick = "picked";
        char = allCharacters[0].char;
        attack = allCharacters[0].attack;
        hp = allCharacters[0].hp;
        scav = allCharacters[0].scav;
        moveCharacters();
    });

    $("#ogre").click(function() {
        pick = "picked";
        char = allCharacters[1].char;
        attack = allCharacters[1].attack;
        hp = allCharacters[1].hp;
        scav = allCharacters[1].scav;
        moveCharacters();
    });

    $("#elf").click(function() {
        pick = "picked";
        char = allCharacters[2].char;
        attack = allCharacters[2].attack;
        hp = allCharacters[2].hp;
        scav = allCharacters[2].scav;
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
        enemyPlacesCharacter();

        newChar = {};
        $(".moeChoices").fadeIn("slow");
        $("#messages").html("Please select a character");
        pick = "";
        $("#r" + row + "s1").attr("src", 'images/' + char + '.jpeg');
        $("#r" + row + "s1").attr("hp", hp);
        $("#r" + row + "s1").attr("attack", attack);
        $("#r" + row + "s1").attr("scav", scav);
        $("#r" + row + "s1").attr("occupied", true);
        // Setting attributes to the newChar object
        newChar.char = char;
        newChar.row = row;
        newChar.pic = 'images/' + char + '.jpeg';
        newChar.attack = attack;
        newChar.hp = hp;
        newChar.scav = scav;
        newChar.position = 1;
        newChar.atBeans = false;
        charArray.push(newChar);
        row = 0;

        // console.log(charArray);
    }


    function moveCharacters() {
        for (var j = 0; j < charArray.length; j++) {

            // Harvests beans for the player
            if (charArray[j].atBeans === "true") {
                // harvest beans for player here
            }

            let isSpaceAheadOccupied = $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("occupied");
            // This moves all characters ahead 1 space BUT only if the space ahead of it is NOT occupied
            if (isSpaceAheadOccupied === "false") {
                // Change next box for the PLAYER to new values
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("src", charArray[j].pic);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("occupied", true);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("hp", charArray[j].hp);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("attack", charArray[j].attack);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("scav", charArray[j].scav);

                // Change current box for the PLAYER to old values
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("occupied", false);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("hp", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("attack", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("scav", 0);

                charArray[j].position = Number(charArray[j].position) + 1;
                
                if (charArray[j].position === 27) {
                    charArray[j].atBeans = true;
                }
           }
        }


        // CANNOT use same k as above as both charArray and enemyCharArray may be a different qty
        for (var k = 0; k < enemyCharArray.length; k++) {
            
            // This will be for the enemy harvesting beans
            if (enemyCharArray[k].atBeans === "true") {
                // ENEMY harvest beans
            }

            let isSpaceAheadOccupiedforEnemy = $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("occupied");
            // This moves the enemy's charaters ahead
            if (isSpaceAheadOccupiedforEnemy === "false") {
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("occupied", false);
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("src", enemyCharArray[k].pic);
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("occupied", true);
                enemyCharArray[k].position = Number(enemyCharArray[k].position) + 1;

                if (enemyCharArray[k].position === 27) {
                    enemyCharArray[k].atBeans = true;
                }
           }
        }
        
        for (var i=0; i<allCharacters.length; i++) {
            if (char != allCharacters[i].char) {
                $("#" + allCharacters[i].char).fadeOut("slow");
            }
        }
        $("#messages").html("Please select a row");
    }

    function enemyPlacesCharacter() {
        var enemyCharNumber = Math.floor((Math.random() * 3));
        var enemyRow = Math.floor((Math.random() * 4) + 1);

        newEnemyChar = {};
     
        $("#enemyr" + enemyRow + "s1").attr("src", 'images/' + allCharacters[enemyCharNumber].char + '.jpeg');
        $("#enemyr" + enemyRow + "s1").attr("occupied", true);
        $("#enemyr" + enemyRow + "s1").attr("hp", allCharacters[enemyCharNumber].hp);
        $("#enemyr" + enemyRow + "s1").attr("attack", allCharacters[enemyCharNumber].attack);
        $("#enemyr" + enemyRow + "s1").attr("scav", allCharacters[enemyCharNumber].scav);
        // Setting attributes to the newChar object
        newEnemyChar.char = allCharacters[enemyCharNumber].char;
        newEnemyChar.row = enemyRow;
        newEnemyChar.pic = 'images/' + allCharacters[enemyCharNumber].char + '.jpeg';
        newEnemyChar.attack = allCharacters[enemyCharNumber].attack;
        newEnemyChar.hp = allCharacters[enemyCharNumber].hp;
        newEnemyChar.scav = allCharacters[enemyCharNumber].scav;
        newEnemyChar.position = 1;
        newEnemyChar.atBeans = false;
        enemyCharArray.push(newEnemyChar);
        console.log(enemyCharArray);
    }

});