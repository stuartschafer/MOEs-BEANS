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
    let beansCollected = 0;
    let enemyBeansCollected = 0;
    let hit = "";
    let prob = 0;
    let enemyProb = 0;
    let enemy = 0;
    let player = 0;
    let enemyCard = 0;
    let playerCard = 0;
    let spot = 0;
    let enemyPlace = 0;
    let enemySpot = 0;
    let charArray = [];
    let enemyCharArray = [];
    const fightPeeps = [charArray, enemyCharArray, charArray];
    const fightKnowns = ["enemyr", "r", "enemyStatsR", "statsR", "underEnemyStatsR", "underStatsR"];
    
    const allCharacters = [
        { char: "mage",
        attack: 3,
        // hp: 2,
        hp: 99,
        scav: 1,
        range: 4
        },
        { char: "ogre",
        attack: 1,
        // hp: 6,
        hp: 99,
        scav: 3,
        range: 2
        },
        { char: "elf",
        attack: 2,
        // hp: 4,
        hp: 99,
        scav: 2,
        range: 3
        }
    ];

    let row = 0;
    let newChar = {};


    $(".moe").hide();
    // $("#messages").html("Please select a character");
    
createEmptyBoxes();

    // This creates all empty boxes on the screen and adds attributes to them
    function createEmptyBoxes() {
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 20; j++) {

                let characterImage = $('<img id="r' + i + 's' + j + '" class="emptyBox" hp=0 attack=0 scav=0 range=0 card=0 occupied=false src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />');
                let enemyCharacterImage = $('<img id="enemyr' + i + 's' + j + '" class="emptyBox" hp=0 attack=0 scav=0 range=0 card=0 occupied=false src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />');

                // Adds an area for stats
                let statArea = $('<div id="statsR' + i + 's' + j + '" class="stats" />');
                let underPicStatArea = $('<div id="underStatsR' + i + 's' + j + '" class="underStats" />');
                let enemyStatArea = $('<div id="enemyStatsR' + i + 's' + j + '" class="stats" />');
                let underEnemyStatArea = $('<div id="underEnemyStatsR' + i + 's' + j + '" class="underStats" />');
                $(statArea).css({"text-align":"center", "font-size":"10px", "width":"20", "display":"block"});
                $(underPicStatArea).css({"text-align":"center", "font-size":"10px", "width":"20", "display":"block"});
                $(enemyStatArea).css({"text-align":"center", "font-size":"10px", "width":"20", "display":"block"});
                $(underEnemyStatArea).css({"text-align":"center", "font-size":"10px", "width":"20", "display":"block"});
                
                // Combines the pic and stats on the same line
                let imageAndHP = $("<div>");
                let enemyimageAndHP = $("<div>");
                $(imageAndHP).css({"float":"left"});
                $(enemyimageAndHP).css({"float":"left"});
                $(imageAndHP).append(statArea, characterImage, underPicStatArea);
                $(enemyimageAndHP).append(enemyStatArea, enemyCharacterImage, underEnemyStatArea);

                // Adds it to the corresponding row on the page
                $("#row" + i).append(imageAndHP);
                $("#enemyrow" + i).prepend(enemyimageAndHP);
            }       
        }
    }

    // Clicking this means the user selected the MAGE character
    $("#mage").click(function() {
        if (pick != "picked") {
            pick = "picked";
            char = allCharacters[0].char;
            attack = allCharacters[0].attack;
            hp = allCharacters[0].hp;
            scav = allCharacters[0].scav;
            range = allCharacters[0].range;
            moveCharacters();
        }
    });

    // Clicking this means the user selected the OGRE character
    $("#ogre").click(function() {
        if (pick != "picked") {
            pick = "picked";
            char = allCharacters[1].char;
            attack = allCharacters[1].attack;
            hp = allCharacters[1].hp;
            scav = allCharacters[1].scav;
            range = allCharacters[1].range;
            moveCharacters();
        }
        
    });

    // Clicking this means the user selected the ELF character
    $("#elf").click(function() {
        if (pick != "picked") {
            pick = "picked";
            char = allCharacters[2].char;
            attack = allCharacters[2].attack;
            hp = allCharacters[2].hp;
            scav = allCharacters[2].scav;
            range = allCharacters[2].range;
            moveCharacters();
        }
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
        // $("#messages").html("Please select a character");
        pick = "";
        $("#r" + row + "s1").attr("src", 'images/' + char + '.jpeg');
        $("#r" + row + "s1").attr("hp", hp);
        $("#r" + row + "s1").attr("attack", attack);
        $("#r" + row + "s1").attr("scav", scav);
        $("#r" + row + "s1").attr("occupied", true);
        $("#r" + row + "s1").attr("range", range);

        // Adds a heart icon and the character's health
        $("#statsR" + row + "s1").append($('<img id="heart" src="images/fight.ico" />'));
        $("#statsR" + row + "s1").append(attack);
        $("#underStatsR" + row + "s1").html($('<img id="heart" src="images/heart.png" />'));
        $("#underStatsR" + row + "s1").append(hp);
        playerCard++;
        $("#r" + row + "s1").attr("card", playerCard);

        // Setting attributes to the newChar object
        newChar.char = char;
        newChar.row = row;
        newChar.pic = 'images/' + char + '.jpeg';
        newChar.attack = attack;
        newChar.hp = hp;
        newChar.scav = scav;
        newChar.range = range;
        newChar.card = playerCard;
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
            if (charArray[j].atBeans === true) {
                let scavenge = charArray[j].scav;
                beansCollected = beansCollected + scavenge;
                $("#yourBeans").html(beansCollected);
            }

            // PLAYER is within range to attack enemy
            if (charArray[j].inRange === true) {
                checkIfFight(j);    
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
                $("#r" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).attr("card", $("#r" + charArray[j].row + "s" + charArray[j].position).attr("card"));
                $("#underStatsR" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).html($('<img id="heart" src="images/heart.png" />'));
                $("#underStatsR" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).append(charArray[j].hp);
                $("#statsR" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).append($('<img id="heart" src="images/fight.ico" />'));
                $("#statsR" + charArray[j].row + "s" + (Number(charArray[j].position) + 1)).append(charArray[j].attack);

                // Empties the current box for the PLAYER
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("occupied", false);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("hp", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("attack", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("scav", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("range", 0);
                $("#r" + charArray[j].row + "s" + charArray[j].position).attr("card", 0);
                $("#statsR" + charArray[j].row + "s" + charArray[j].position).empty();
                $("#underStatsR" + charArray[j].row + "s" + charArray[j].position).empty();

                charArray[j].position = Number(charArray[j].position) + 1;
                
                if (charArray[j].position === 19) {
                    charArray[j].atBeans = true;
                }

                if ((charArray[j].range === 4 && charArray[j].position === 16) || (charArray[j].range === 4 && charArray[j].position === 17) || (charArray[j].range === 4 && charArray[j].position === 18) || (charArray[j].range === 4 && charArray[j].position === 19)) {
                    charArray[j].inRange = true;
                } else if ((charArray[j].range === 3 && charArray[j].position === 17) || (charArray[j].range === 3 && charArray[j].position === 18) || (charArray[j].range === 3 && charArray[j].position === 19)) {
                    charArray[j].inRange = true;
                } else if ((charArray[j].range === 2 && charArray[j].position === 18) || (charArray[j].range === 2 && charArray[j].position === 19)) {
                    charArray[j].inRange = true;
                }
           }
        }

        // CANNOT use same k as above as both charArray and enemyCharArray may be a different qty
        for (var k = 0; k < enemyCharArray.length; k++) {
            
            // This will be for the enemy harvesting beans
            if (enemyCharArray[k].atBeans === true) {
                let enemyScavenge = enemyCharArray[k].scav;
                // console.log("enemyScavenge = " + enemyScavenge);
                enemyBeansCollected = enemyBeansCollected + enemyScavenge;
                // console.log("enemyBeansCollected = " + enemyBeansCollected);
                $("#enemyBeans").html(enemyBeansCollected);
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
                $("#enemyr" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).attr("card", $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("card"));
                $("#enemyStatsR" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).append($('<img id="heart" src="images/fight.ico" />'));
                $("#enemyStatsR" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).append(enemyCharArray[k].attack);
                $("#underEnemyStatsR" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).html($('<img id="heart" src="images/heart.png" />'));
                $("#underEnemyStatsR" + enemyCharArray[k].row + "s" + (Number(enemyCharArray[k].position) + 1)).append(enemyCharArray[k].hp);

                // Empties the current box for the ENEMY
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("occupied", false);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("hp", 0);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("attack", 0);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("scav", 0);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("range", 0);
                $("#enemyr" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).attr("card", 0);
                $("#enemyStatsR" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).empty();
                $("#underEnemyStatsR" + enemyCharArray[k].row + "s" + enemyCharArray[k].position).empty();

                enemyCharArray[k].position = Number(enemyCharArray[k].position) + 1;

                if (enemyCharArray[k].position === 19) {
                    enemyCharArray[k].atBeans = true;
                }
                if ((enemyCharArray[k].range === 4 && enemyCharArray[k].position === 16) || (enemyCharArray[k].range === 4 && enemyCharArray[k].position === 17) || (enemyCharArray[k].range === 4 && enemyCharArray[k].position === 18) || (enemyCharArray[k].range === 4 && enemyCharArray[k].position === 19)) {
                    // console.log(enemyCharArray[k].char + " on row " + enemyCharArray[k].row + " spot " + enemyCharArray[k].position + " is within striking distance");
                    enemyCharArray[k].inRange = true;
                } else if ((enemyCharArray[k].range === 3 && enemyCharArray[k].position === 17) || (enemyCharArray[k].range === 3 && enemyCharArray[k].position === 18) || (enemyCharArray[k].range === 3 && enemyCharArray[k].position === 19)) {
                    // console.log(enemyCharArray[k].char + " on row " + enemyCharArray[k].row + " spot " + enemyCharArray[k].position + " is within striking distance");
                    enemyCharArray[k].inRange = true;
                } else if ((enemyCharArray[k].range === 2 && enemyCharArray[k].position === 18) || (enemyCharArray[k].range === 2 && enemyCharArray[k].position === 19)) {
                    // console.log(enemyCharArray[k].char + " on row " + enemyCharArray[k].row + " spot " + enemyCharArray[k].position + " is within striking distance");
                    enemyCharArray[k].inRange = true;
                }
           }
        }

        // This checks to see if the character is within range and attack
        checkIfFight();

        for (var i=0; i<allCharacters.length; i++) {
            if (char != allCharacters[i].char) {
                $("#" + allCharacters[i].char).fadeOut("slow");
            }
        }
        // $("#messages").html("Please select a row");
    }

    function enemyPlacesCharacter() {
        let enemyCharNumber = Math.floor((Math.random() * 3));
        // let enemyCharNumber = 1;
        let enemyRow = Math.floor((Math.random() * 4) + 1);
        // let enemyRow = 1;
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
            $("#enemyStatsR" + enemyRow + "s1").append($('<img id="heart" src="images/fight.ico" />'));
            $("#enemyStatsR" + enemyRow + "s1").append(allCharacters[enemyCharNumber].attack);
            $("#underEnemyStatsR" + enemyRow + "s1").html($('<img id="heart" src="images/heart.png" />'));
            $("#underEnemyStatsR" + enemyRow + "s1").append(allCharacters[enemyCharNumber].hp);
            enemyCard++;
            $("#enemyr" + enemyRow + "s1").attr("card", enemyCard);

            // Setting attributes to the newEnemyChar object
            newEnemyChar.char = allCharacters[enemyCharNumber].char;
            newEnemyChar.row = enemyRow;
            newEnemyChar.pic = 'images/' + allCharacters[enemyCharNumber].char + '.jpeg';
            newEnemyChar.attack = allCharacters[enemyCharNumber].attack;
            newEnemyChar.hp = allCharacters[enemyCharNumber].hp;
            newEnemyChar.scav = allCharacters[enemyCharNumber].scav;
            newEnemyChar.range = allCharacters[enemyCharNumber].range;
            newEnemyChar.position = 1;
            newEnemyChar.atBeans = false;
            newEnemyChar.inRange = false;
            newEnemyChar.card = enemyCard;
            enemyCharArray.push(newEnemyChar);
        }
    }











// fightPeeps = [charArray, enemyCharArray, charArray]; (i)
// fightKnowns = [enemyr, r, enemyStatsR, statsR, underEnemyStatsR, underStatsR]

    function checkIfFight() {
        if (charArray.length > 0 || enemyCharArray > 0) {

            for (var i = 0; i < 2; i++) {
                if (fightPeeps[i].length > 0) {
                    for (var j = 0; j < fightPeeps[i].length; j++) {
                        if (fightPeeps[i][j].inRange === true) {
                            let enemySpot19 = $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s19").attr("occupied");
                            let enemySpot18 = $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s18").attr("occupied");
                            let enemySpot17 = $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s17").attr("occupied");
                            let enemySpot16 = $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s16").attr("occupied");

                            if (enemySpot19 === "true") {
                                enemy = $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s19").attr("card");
                                spot = 19;
                            } else if (enemySpot18 === "true") {
                                enemy = $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s18").attr("card");
                                spot = 18;
                            } else if (enemySpot17 === "true") {
                                enemy = $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s17").attr("card");
                                spot = 17;
                            } else if (enemySpot16 === "true") {
                                enemy = $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s16").attr("card");
                                spot = 16;
                            }

                            if (fightPeeps[i][j].position === 19 && enemySpot19 === "true") {
                                prob = 100;
                                fight(i);
                            } else if (fightPeeps[i][j].range === 4 && (fightPeeps[i][j].position === 19 && enemySpot18 === "true" || fightPeeps[i][j].position === 18 && enemySpot19 === "true")) {
                                prob = 75;
                                fight(i);
                            } else if (fightPeeps[i][j].range === 4 && (fightPeeps[i][j].position === 19 && enemySpot17 === "true" || fightPeeps[i][j].position === 18 && enemySpot18 === "true" || fightPeeps[i][j].position === 17 && enemySpot19 === "true")) {
                                prob = 50;
                                fight(i);
                            } else if (fightPeeps[i][j].range === 4 && (fightPeeps[i][j].position === 19 && enemySpot16 === "true" || fightPeeps[i][j].position === 18 && enemySpot17 === "true" || fightPeeps[i][j].position === 17 && enemySpot18 === "true" || fightPeeps[i][j].position === 16 && enemySpot19 === "true")) {
                                prob = 25;
                                fight(i);
                            }
                        }
                    }

                    function fight(i) {
                        // This finds where the card on the object matches the card on the box
                        for (var k = 0; k < fightPeeps[i].length; k++) {
                            if (fightPeeps[i][k].card.toString() === $("#" + fightKnowns[i] + fightPeeps[i][j].row + "s" + spot).attr("card")) {
                                enemyPlace = k;
                            }
                        }
                        spot = 0;

                        let attackProb = Math.floor((Math.random() * 4) + 1);

    // fightPeeps = [charArray, enemyCharArray, charArray]; i
    // fightKnowns = [enemyr, r, enemyStatsR, statsR, underEnemyStatsR, underStatsR];

                        if (prob === 25 && attackProb === 1) {
                            // Enemy loses 1 point of health
                            fightPeeps[i+1][enemyPlace].hp = fightPeeps[i+1][enemyPlace].hp - 1;
                        } else if (prob === 50 && (attackProb === 1 || attackProb === 2)) {
                            // Enemy loses 1 point of health
                            fightPeeps[i+1][enemyPlace].hp = fightPeeps[i+1][enemyPlace].hp - 1;
                        } else if (prob === 75 && (attackProb === 1 || attackProb === 2 || attackProb === 3)) {
                            // Enemy loses 2 points of health
                            fightPeeps[i+1][enemyPlace].hp = fightPeeps[i+1][enemyPlace].hp - 2;
                        } else if (prob === 100) {
                            // Enemy loses 3 points of health
                            fightPeeps[i+1][enemyPlace].hp = fightPeeps[i+1][enemyPlace].hp - 3;
                        } else {
                            // console.log("MISS!");
                        }
                    }
                    
                    if (fightPeeps[i+1][enemyPlace].hp <= 0) {
                        // Eliminates the enemy from the screen and array
                        $("#" + fightKnowns[i] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).attr("src", "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
                        $("#" + fightKnowns[i] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).attr("occupied", false);
                        $("#" + fightKnowns[i] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).attr("hp", 0);
                        $("#" + fightKnowns[i] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).attr("attack", 0);
                        $("#" + fightKnowns[i] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).attr("scav", 0);
                        $("#" + fightKnowns[i] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).attr("range", 0);
                        $("#" + fightKnowns[i] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).attr("card", 0);
                        $("#" + fightKnowns[i+2] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).empty();
                        $("#" + fightKnowns[i+4] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).empty();
                        fightPeeps[i+1].splice(enemyPlace, 1);

                    } else {
                        // Updates stats to the enemy's character
                        $("#" + fightKnowns[i+4] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).empty();
                        $("#" + fightKnowns[i+4] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).html($('<img id="heart" src="images/heart.png" />'));
                        $("#" + fightKnowns[i+4] + fightPeeps[i+1][enemyPlace].row + "s" + fightPeeps[i+1][enemyPlace].position).append(fightPeeps[i+1][enemyPlace].hp);
                    }

                    prob = 0;

                }
            }
        }
    }

// fightPeeps = [charArray, enemyCharArray, charArray]; i
// fightKnowns = [enemyr, r, enemyStatsR, statsR, underEnemyStatsR, underStatsR]

});