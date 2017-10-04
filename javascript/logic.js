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
        scav: 1,
        range: 4
        },
        { char: "ogre",
        attack: 1,
        hp: 6,
        scav: 3,
        range: 2
        },
        { char: "elf",
        attack: 2,
        hp: 4,
        scav: 2,
        range: 3
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
            for (var j = 1; j < 20; j++) {

                let characterImage = $('<img id="r' + i + 's' + j + '" class="emptyBox" hp=0 attack=0 scav=0 range=0 occupied=false />');
                let enemyCharacterImage = $('<img id="enemyr' + i + 's' + j + '" class="emptyBox" hp=0 attack=0 scav=0 range=0 occupied=false />');

                // Changes the picture to have a transparent background
                $("#r" + i + "s" + j).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#enemyr" + i + "s" + j).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");

                // Adds an area for stats
                let statArea = $('<div id="statsR' + i + 's' + j + '" />');
                let enemyStatArea = $('<div id="enemyStatsR' + i + 's' + j + '" />');
                $(statArea).css({"text-align":"center", "font-size":"15px", "width":"20", "display":"block"});
                $(enemyStatArea).css({"text-align":"center", "font-size":"15px", "width":"20", "display":"block"});
                
                // Combines the pic and stats on the same line
                let imageAndHP = $("<div>");
                let enemyimageAndHP = $("<div>");
                $(imageAndHP).css({"float":"left"});
                $(enemyimageAndHP).css({"float":"left"});
                $(imageAndHP).append(characterImage, statArea);
                $(enemyimageAndHP).append(enemyCharacterImage, enemyStatArea);

                // Adds it to the corresponding row on the page
                $("#row" + i).append(imageAndHP);
                $("#enemyrow" + i).prepend(enemyimageAndHP);
            }       
        }
    }

    // Clicking this means the user selected the MAGE character
    $("#mage").click(function() {
        pick = "picked";
        char = allCharacters[0].char;
        attack = allCharacters[0].attack;
        hp = allCharacters[0].hp;
        scav = allCharacters[0].scav;
        range = allCharacters[0].range;
        moveCharacters();
    });

    // Clicking this means the user selected the OGRE character
    $("#ogre").click(function() {
        pick = "picked";
        char = allCharacters[1].char;
        attack = allCharacters[1].attack;
        hp = allCharacters[1].hp;
        scav = allCharacters[1].scav;
        range = allCharacters[1].range;
        moveCharacters();
    });

    // Clicking this means the user selected the ELF character
    $("#elf").click(function() {
        pick = "picked";
        char = allCharacters[2].char;
        attack = allCharacters[2].attack;
        hp = allCharacters[2].hp;
        scav = allCharacters[2].scav;
        range = allCharacters[2].range;
        moveCharacters();
    });

    // The user clicks and places a character on ROW1
    $(".row1").click(function() {
        row = 1;
        if (pick === "picked") {
            rowChosen();
        }
    });

    // The user clicks and places a character on ROW2
    $(".row2").click(function() {
        row = 2;
        if (pick === "picked") {
            rowChosen();
        }
    });

    // The user clicks and places a character on ROW3
    $(".row3").click(function() {
        row = 3;
        if (pick === "picked") {
            rowChosen();
        }
    });

    // The user clicks and places a character on ROW4
    $(".row4").click(function() {
        row = 4;
        if (pick === "picked") {
            rowChosen();
        }
    });

    // This runs when the user selects a row
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
        $("#r" + row + "s1").attr("range", range);

        // Adds a heart icon and the character's health
        $("#statsR" + row + "s1").html($('<img id="heart" src="images/heart.png" />'));
        $("#statsR" + row + "s1").append(hp);
        $("#statsR" + row + "s1").append($('<img id="heart" src="images/fight.ico" />'));
        $("#statsR" + row + "s1").append(attack);

        // Setting attributes to the newChar object
        newChar.char = char;
        newChar.row = row;
        newChar.pic = 'images/' + char + '.jpeg';
        newChar.attack = attack;
        newChar.hp = hp;
        newChar.scav = scav;
        newChar.range = range;
        newChar.position = 1;
        newChar.atBeans = false;
        newChar.inRange = false;
        charArray.push(newChar);
        row = 0;

        // console.log(charArray);
    }

    // This runs everytime the user selects a new character
    function moveCharacters() {
        for (var j = 0; j < charArray.length; j++) {

            // Harvests beans for the PLAYER
            if (charArray[j].atBeans === "true") {
                // harvest beans
            }

            // PLAYER is within range to attack enemy
            if (charArray[j].inRange === "true") {
                // PLAYER attack
            }

            let isSpaceAheadOccupied = $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("occupied");
            // This moves all PLAYER characters closer to the beans by 1 space BUT only if the space ahead of it is NOT occupied
            if (isSpaceAheadOccupied === "false") {
                // Change next box for the PLAYER to new values
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("src", charArray[j].pic);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("occupied", true);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("hp", charArray[j].hp);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("attack", charArray[j].attack);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("scav", charArray[j].scav);
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("range", charArray[j].range);
                $("#statsR" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).html($('<img id="heart" src="images/heart.png" />'));
                $("#statsR" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).append(charArray[j].hp);
                $("#statsR" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).append($('<img id="heart" src="images/fight.ico" />'));
                $("#statsR" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).append(charArray[j].attack);

                // Empties the current box for the PLAYER
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("occupied", false);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("hp", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("attack", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("scav", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("range", 0);
                $("#statsR" + charArray[j].row + "s" + charArray[j].position).empty();

                charArray[j].position = Number(charArray[j].position) + 1;
                
                if (charArray[j].position === 27) {
                    charArray[j].atBeans = true;
                }

                if (charArray[j].range === 4 && charArray[j].position === 24) {
                    charArray[j].inRange = true;
                } else if (charArray[j].range === 3 && charArray[j].position === 25) {
                    charArray[j].inRange = true;
                } else if (charArray[j].range === 2 && charArray[j].position === 26) {
                    charArray[j].inRange = true;
                }
           }
        }


        // CANNOT use same k as above as both charArray and enemyCharArray may be a different qty
        for (var k = 0; k < enemyCharArray.length; k++) {
            
            // This will be for the enemy harvesting beans
            if (enemyCharArray[k].atBeans === "true") {
                // ENEMY harvest beans
            }

            // ENEMY is within range to attack player
            if (enemyCharArray[k].inRange === "true") {
                // ENEMY attack
            }

            let isSpaceAheadOccupiedforEnemy = $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("occupied");
            // This moves all ENEMY characters closer to the beans by 1 space BUT only if the space ahead of it is NOT occupied
            if (isSpaceAheadOccupiedforEnemy === "false") {
                // Change next box for the ENEMY to new values
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("src", enemyCharArray[k].pic);
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("occupied", true);
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("hp", enemyCharArray[k].hp);
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("attack", enemyCharArray[k].attack);
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("scav", enemyCharArray[k].scav);
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("range", enemyCharArray[k].range);
                $("#enemyStatsR" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).html($('<img id="heart" src="images/heart.png" />'));
                $("#enemyStatsR" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).append(enemyCharArray[k].hp);
                $("#enemyStatsR" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).append($('<img id="heart" src="images/fight.ico" />'));
                $("#enemyStatsR" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).append(enemyCharArray[k].attack);

                // Empties the current box for the ENEMY
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("occupied", false);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("hp", 0);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("attack", 0);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("scav", 0);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("range", 0);
                $("#enemyStatsR" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).empty();

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
        let enemyCharNumber = Math.floor((Math.random() * 3));
        let enemyRow = Math.floor((Math.random() * 4) + 1);
        let prevEnemyRow = 0;

        // Makes sure the computer doesn't enter a character on the same row as previous
        if (enemyCharArray.length < 1) {
            prevEnemyRow = 0;
        } else {
            prevEnemyRow = enemyCharArray[enemyCharArray.length-1].row;
        }

        if (prevEnemyRow === enemyRow) {
            enemyPlacesCharacter();
        } else {
            newEnemyChar = {};
        
            $("#enemyr" + enemyRow + "s1").attr("src", 'images/' + allCharacters[enemyCharNumber].char + '.jpeg');
            $("#enemyr" + enemyRow + "s1").attr("occupied", true);
            $("#enemyr" + enemyRow + "s1").attr("hp", allCharacters[enemyCharNumber].hp);
            $("#enemyr" + enemyRow + "s1").attr("attack", allCharacters[enemyCharNumber].attack);
            $("#enemyr" + enemyRow + "s1").attr("scav", allCharacters[enemyCharNumber].scav);
            $("#enemyStatsR" + enemyRow + "s1").html($('<img id="heart" src="images/heart.png" />'));
            $("#enemyStatsR" + enemyRow + "s1").append(allCharacters[enemyCharNumber].hp);
            $("#enemyStatsR" + enemyRow + "s1").append($('<img id="heart" src="images/fight.ico" />'));
            $("#enemyStatsR" + enemyRow + "s1").append(allCharacters[enemyCharNumber].attack);

            // Setting attributes to the newChar object
            newEnemyChar.char = allCharacters[enemyCharNumber].char;
            newEnemyChar.row = enemyRow;
            newEnemyChar.pic = 'images/' + allCharacters[enemyCharNumber].char + '.jpeg';
            newEnemyChar.attack = allCharacters[enemyCharNumber].attack;
            newEnemyChar.hp = allCharacters[enemyCharNumber].hp;
            newEnemyChar.scav = allCharacters[enemyCharNumber].scav;
            newEnemyChar.position = 1;
            newEnemyChar.atBeans = false;
            newEnemyChar.inRange = false;
            enemyCharArray.push(newEnemyChar);
            // console.log(enemyCharArray);
        }
    }

});