$(document).ready(function() {
    let x = "";
    let y = "";
    let charCount = 0;
    $(".moe").hide();


    $("#messages").html("Please select a character");



    $("#mage").click(function() {
        charCount++;
        x = "picked";
        y = "mage";
        $("#ogre").fadeOut("slow");
        $("#elf").fadeOut("slow");
        $("#messages").html("Please select a row");
    });

    $("#ogre").click(function() {
        charCount++;
        x = "picked";
        y = "ogre";
        $("#mage").fadeOut("slow");
        $("#elf").fadeOut("slow");
        $("#messages").html("Please select a row");
    });

    $("#elf").click(function() {
        charCount++;
        x = "picked";
        y = "elf";
        $("#mage").fadeOut("slow");
        $("#ogre").fadeOut("slow");
        $("#messages").html("Please select a row");
    });

    $(".row1").click(function() {
        if (x === "picked") {
            $("#" + y + "Row1").fadeIn("slow");
            $("#" + y).fadeOut("slow");
            $(".moeChoices").fadeIn("slow");
            $("#messages").html("Please select a character");
            alert(charCount);
        }
    });

})