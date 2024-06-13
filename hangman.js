// coded by Lovro Selic , (C) C00lSch00l 2014
//version 1.01.02 


$(document).ready(function () {
    MEDIUM_MODIFIER = 5;
    MAX_LIVES = 7;
    lives = MAX_LIVES;
    UN_CHAR = "_";
    alphaBET = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

    $("#start").click(function () {
        startGame();
    });
    $("#guess").click(function () {
        checkLetter();
    });
    $("#getLetter").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            checkLetter();
        }
    });
});

function checkLetter() {
    theLetter = $("#getLetter").val();
    theLetter = theLetter.toUpperCase();
    if (theLetter === "") {
        $("#message").html("Message: <span class='red'>please, enter a letter.</span>");
        return;
    }
    if (alphaBET.indexOf(theLetter) === -1) {
        $("#message").html("Message: <span class='red'>this was not a letter</span>");
        $("#getLetter").val("");
        return;
    }
    var whichLett = newSentence.indexOf(theLetter);
    if (whichLett === -1) {
        $("#leftovers").append(theLetter + ", ");
        $("#message").html("Message: <span class='red'>incorrect letter</span>");
        lives--;
		$("#story").html("<img src='/Images/hangman" + lives + ".png' width='440'>");
        if (lives === 0) {
            $("#message").html("Message: <span class='red'>You FAILED!<br> Solution was: </span>" + newSentence);
            tidy();
        }
    } else {
        addChar(theLetter);
        CS = colourLetter(theLetter);
        $("#buildSentence").html(CS);
        $("#message").html("Message: <span class='green'>correct letter</span>");
        var testEndOfGame = guessSentence.indexOf(UN_CHAR);
        if (testEndOfGame === -1) {
            $("#message").html("Message: <span class='green'>Great work. You have completed the sentence!</span>");
			$("#story").html("<img src='/Images/hangman_win.png' width='440'>");
            tidy();
        }
    }
    $("#getLetter").val("");
    setLives();
}

function tidy() {
    $("#guess").prop("disabled", true);
    $("#getLetter").prop("disabled", true);
    $("#start").prop("disabled", false);
    $("input[name='level']").prop("disabled", false);
}

function unTidy() {
    $("#guess").prop("disabled", false);
    $("#getLetter").prop("disabled", false);
    $("#start").prop("disabled", true);
    $("input[name='level']").prop("disabled", true);
    $("#message").html("Message: ");
    $("#leftovers").html("Incorrect letters: ");
    lives = MAX_LIVES;
}

function addChar(character) {
    var xix = newSentence.indexOf(character);
    guessSentence = guessSentence.split('');
    while (xix != -1) {
        guessSentence[xix] = newSentence[xix];
        xix = newSentence.indexOf(character, xix + 1);
    }
    guessSentence = guessSentence.join('');
}

function colourLetter(character) {
    var colouredSentence = guessSentence;
    colouredSentence = colouredSentence.split('');
    var ix = colouredSentence.indexOf(character);
    while (ix != -1) {
        colouredSentence[ix] = '<span class="blue">' + colouredSentence[ix] + '</span>';
        ix = colouredSentence.indexOf(character, ix + 1);
    }
    colouredSentence = colouredSentence.join('');
    return colouredSentence;
}

function startGame() {
    easy = false;
    medium = false;
    hard = false;
    unTidy();
    setUp();
    newSentence = createSentence();
    guessSentence = displaySentence(newSentence);
    console.log(newSentence); //DEBUG
    selectLevel();
    if (easy) {
        guessSentence = hintSentence(guessSentence, newSentence);
        completnessTest = guessSentence.indexOf(UN_CHAR);
        while (completnessTest === -1) {
            newSentence = createSentence();
            guessSentence = displaySentence(newSentence);
            guessSentence = hintSentence(guessSentence, newSentence);
            completnessTest = guessSentence.indexOf(UN_CHAR);
        }
    } else if (medium) {
        guessSentence = addFewLetters(guessSentence, newSentence, MEDIUM_MODIFIER);
        addChar("'");
    } else {
        addChar("'");
    }
    $("#buildSentence").html(guessSentence);
    setLives();
	$("#story").html("<img src='/Images/hangman7.png' width='440'>");
    $("#getLetter").focus();
}

function setLives() {
    var block = String.fromCharCode(9608);
    block = stringFill(block, lives);
    if (lives === 1) {
        block = "<span class='red'>" + block + "</span>";
    } else if (lives < 4) {
        block = "<span class='yellow'>" + block + "</span>";
    } else {
        block = "<span class='green'>" + block + "</span>";
    }    
    $("#lives").html("Forgiveness: " + block);
}

function stringFill(x, n) {
    var s = '';
    for (;;) {
        if (n & 1) s += x;
        n >>= 1;
        if (n) x += x;
        else break;
    }
    return s;
}

function selectLevel() {
    $level = $("input[name='level']");
    var loopLength = $level.length;
    for (var i = 0; i < loopLength; i++) {
        if ($level[i].checked === true) {
            lvl = $level[i].value;
        }
    }
    switch (lvl) {
        case "easy":
            easy = true;
            return;
        case "medium":
            medium = true;
            return;
        case "hard":
            hard = true;
            return;
        default:
            break;
    }
}

function setUp() {
    // who what where/when/how : My Dog is swimming in the garden
    //WHO
    who1 = ['a cat', 'a dog', 'a snail', 'a kitten', 'an elephant', 'a mouse', 'a bird', 'a zebra', 'a snake', 'a cow', 'a bull', 'a donkey', 'a duck', 'a horse', 'a pig'];
    who2 = ['my sister', 'his brother', 'my mother', 'your father', 'her grandmother', 'your grandfather', 'my pet', 'your wife', 'her husband', 'my daughter', 'her son'];
    who3 = ['John', 'Paul', 'George', 'Mary', 'Monica', 'Nina', 'a ghost', 'a little boy', 'a big girl', 'a bus driver', 'a fat cook', 'mad scientist','crazy scientist'];
    who4 = ['the teacher', 'the policeman', 'the postman', 'the undertaker', 'the baker', 'a sailor', 'a soldier', 'a tailor', 'melting snowman','brave knight'];
    who5 = ["Peter's kid", "Jonathan's brother", "Anne's sister", "Alexandra's cat", "Frank's aunt", "Dorothy's uncle",'merciless cat','sad clown'];
    who6 = ['my giraffe', 'her chicken', 'a gorilla', 'your monkey', 'Mrs Weasley', 'Lord Voldemort', 'King Joffrey', 'the prince', 'a princess'];
    who7 = ['a lion', 'a tiger', 'a taxi driver', 'a taxman', 'a doctor', 'an office worker', 'a farmer', 'a librarian', 'a pilot', 'A SHOP ASSISTANT', 'A SCIENTIST', 'AN ASTRONAUT'];
	who8 = ['A NURSE', 'A SCHOOL CARETAKER', 'A CLEANING LADY', 'a policeman', 'a clerk', 'an angel', 'a snowman','a farmer', 'a scientist', 'a caretaker', 'a doctor','a superhero', 'a cowboy', 'a knight', 'a fairy', 'a clown', 'a vampire', 'a mermaid', 'a witch', 'an indian', 'a dwarf', 'a devil', 'a teletubby', 'a pirate', 'a ghost'];
    Who = who1.concat(who2, who3, who4, who5, who6, who7, who8);
    //WHAT
    verb1 = ['is eating cake', 'is drinking beer', 'is walking', 'is swimming', 'is climbing mountains', 'is driving a lorry', 'is drawing pictures', 'is cleaning house', 'is breaking things'];
    verb2 = ['is sleeping', 'is talking', 'is shouting', 'is screaming', 'is sitting', 'is riding a bicycle', 'is shooting', 'is singing songs'];
    verb3 = ['is typing a letter', 'is writing a book', 'is playing games', 'is running', 'is standing', 'is picking apples', 'is sewing a dress', 'is printing newspaper'];
    verb4 = ['is kissing frogs', 'is shovelling dirt', 'is drinking juice', 'is licking ice cream', 'is crying', 'is laughing', 'is sneaking', 'is watching tv'];
    verb5 = ['is working', 'is questioning prisoners', 'is bathing', 'is blinking', 'is chewing gum', 'is concentrating', 'is counting mice', 'is dancing'];
    verb6 = ['is dressing', 'is exploding', 'is fighting trolls', 'is kneeling', 'is living', 'is measuring', 'is preaching', 'is racing', 'is smiling'];
    verb7 = ['is crawling', 'is flying', 'is jumping', 'is boxing', 'is fixing computer', 'is mixing paint', 'is explaining', 'is barking','is serving lunch'];
    verb1s = ['eats cakes', 'drinks water', 'walks', 'swims', 'climbs a tree', 'drives a car', 'draws pictures', 'sleeps', 'talks', 'shouts', 'sings songs'];
    verb2s = ['screams', 'sits', 'writes poems', 'plays guitar', 'runs', 'stands', 'works', 'experiments', 'lives', 'crawls', 'jumps', 'barks'];
    verb1p = ['ate', 'drank', 'walked', 'climbed the mountain', 'drove the car', 'drew a picture', 'slept', 'talked', 'shouted', 'screamed'];
    verb2p = ['typed letter', 'wrote poems', 'rode horse', 'played guitar', 'worked', 'crawled', 'jumped', 'barked'];
    What = verb1.concat(verb2, verb3, verb4, verb5, verb6, verb7, verb1s, verb2s, verb1p, verb2p);
    //WHERE
    where1 = ['in the garden', 'in the bathroom', 'in the kitchen', 'in the bedroom', 'at school', 'in the garage', 'in Africa', 'in the hallway', 'in the church'];
    where2 = ['in the supermarket', 'at the coast', 'in the office', 'in the living room', 'in the cellar', 'in the attic', 'in the space', 'at the airport', 'in the plane'];
    where3 = ['at the post office', 'at the police station', 'at the train station', 'at the pool', 'in the pool', 'on the moon', 'in the lake'];
    where4 = ['under the bridge', 'under bed', 'on the shelf', 'at the river', 'at the beach', 'under umbrella', 'on top of the mountain', 'at the bottom of the sea'];
    where5 = ['downstairs', 'outside', 'underground', 'upstairs', 'somewhere', 'in the factory', 'in the box', 'in the toilet'];
    Where = where1.concat(where2, where3, where4, where5);
    //WHEN
    when1 = ['in the afternoon', 'in the morning', 'on saturday evening', 'on sunday morning', 'on monday afternoon', 'in the summer', 'in the winter'];
    when2 = ["at five o'clock", "at seven o'clock", "at half past three", "in the spring", "in the autumn", 'in the sandbox'];
    When = when1.concat(when2);
    //HOW
    how1 = ['very slowly', 'quickly', 'madly', 'angrily', 'lovingly', 'quietly', 'patiently', 'loudly', 'carefully', 'urgently', 'awfully'];
    how2 = ['very fast', 'happily', 'sadly', 'badly', 'carelessly', 'helplessly', 'hungrily', 'joyfully', 'nervously', 'reluctantly', 'unhappily'];
    how3 = ['with a pickaxe', 'with an axe','beautifully','blindly','boldly','bravely','calmly','cautiously','cheerfully','daringly','foolishly','gently','gracefully'];
	how4 = ['greedily','hungrily','lazily','loudly','nervously','patiently','politely','recklessly','reluctantly','selfishly','sleepily','silently'];
    How = how1.concat(how2, how3, how4);
    //last part
    lastPart = Where.concat(When, How);
}

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function createSentence() {
    var first = Who[rnd(1, Who.length) - 1];
    var second = What[rnd(1, What.length) - 1];
    var third = lastPart[rnd(1, lastPart.length) - 1];
    console.log((Who.length * What.length * lastPart.length) + " combinations possible."); //debug
    return (first + " " + second + " " + third).toUpperCase();
}

function displaySentence(longString) {
    var changedString = [];
    var loopLength = longString.length;
    for (var i = 0; i < loopLength; i++) {
        if (longString[i] != " ") {
            changedString[i] = UN_CHAR;
        } else {
            changedString[i] = longString[i];
        }
    }
    changedString = changedString.join('');
    return changedString;
}

function hintSentence(changedS, originalString) {
    changedS = changedS.split('');
    var xi = 0;
    changedS[xi] = originalString[xi];
    xi = changedS.indexOf(" ", xi);
    while (xi != -1) {
        changedS[xi - 1] = originalString[xi - 1];
        changedS[xi + 1] = originalString[xi + 1];
        xi = changedS.indexOf(" ", xi + 1);
    }
    xi = originalString.length;
    changedS[xi - 1] = originalString[xi - 1];
    xi = originalString.indexOf("'");
    if (xi != -1) {
        changedS[xi] = originalString[xi];
    }

    var knownLetters = [];
    var loopLength = changedS.length;
    for (i = 0; i < loopLength; i++) {
        if ("* '".indexOf(changedS[i]) === -1) {
            knownLetters.push(changedS[i]);
        }
    }
    knownLetters = knownLetters.join('');
    changedS = fillLetters(changedS, originalString, knownLetters);
    changedS = changedS.join('');
    return changedS;
}

function fillLetters(changedS, originalString, stringPool) {
    var loopLength = originalString.length;
    for (i = 0; i < loopLength; i++) {
        if (stringPool.indexOf(originalString[i]) != -1) {
            changedS[i] = originalString[i];
        }
    }
    return changedS;
}

function addFewLetters(changedS, originalString, xx) {
    changedS = changedS.split('');
    var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    alphabet = alphabet.split('');
    var temp = "";
    for (i = 1; i <= xx; i++) {
        NL = alphabet[rnd(1, alphabet.length) - 1];
        if (originalString.indexOf(NL) === -1) {
            xx++;
        } else {
            temp += NL;
        }
        idx = alphabet.indexOf(NL);
        alphabet.splice(idx, 1);
    }
    changedS = fillLetters(changedS, originalString, temp);
    changedS = changedS.join('');
    return changedS;
}