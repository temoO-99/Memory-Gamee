document.querySelector(".control-info span").onclick = (function(){

    let name = prompt("Enter Your Name");

    if(name == null || name == ""){

        document.querySelector(".info .name span").textContent = "Un Knowen";

    }else{

        document.querySelector(".info .name span").textContent = name ;

    }

    document.querySelector(".control-info").remove();

});


let dioration = 1000 ,
    count = 0;

let blocksContainer = document.querySelector(".memory-game");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()]



console.log(blocks);
console.log(orderRange);

//random
shufffle(orderRange);

console.log(orderRange);

// shuffle

blocks.forEach((block,  index ) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function(){

        flipped(block);

    });

});



//check flipped blocks
function checkMatch(firstBlock, secoundBlock){
    let traies = document.querySelector(".traies span");

    if(firstBlock.dataset.game === secoundBlock.dataset.game){

        firstBlock.classList.remove('is-flip');
        secoundBlock.classList.remove('is-flip');
        firstBlock.classList.add('match');
        secoundBlock.classList.add('match');
        setTimeout(() => {
            document.getElementById("sucsses").play();
        }, 500);

        if(count === 9){
            setTimeout(() => {
                window.location.reload();
            }, 500);

        }else{
            count++;
            console.log("not yet")
        }


    }


    else{
        traies.innerHTML = parseInt(traies.innerHTML) + 1 ;

        setTimeout(()=>{
            firstBlock.classList.remove('is-flip');
            secoundBlock.classList.remove('is-flip');
        },dioration);

        setTimeout(() => {
            document.getElementById("fail").play();
        }, 500);


    }

}



// flipped 
function flipped(selected){

    selected.classList.add("is-flip");   

    let allFlipped = blocks.filter(flipBlock => flipBlock.classList.contains('is-flip'));


    if(allFlipped.length === 2){

        //stop clickable
        stoped();

        //check flipped blockes

        checkMatch(allFlipped[0], allFlipped[1]);

    }

}


// stoped clicking function
function stoped(){
    blocksContainer.classList.add('no-click');

    setTimeout(() => {
        blocksContainer.classList.remove('no-click');
    }, dioration);


}







// shuffle function

function shufffle (Array){

    let current = blocks.length,
        temp,
        random;

    while(current > 0){
        random = Math.floor(Math.random() * current);

        current--;

        temp = Array[current];

        Array[current] = Array[random];

        Array[random] = temp;
    }    

    return Array;

}


