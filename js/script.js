window.onload = function(){
    // Refer to the SVG object in the DOM 
    // ! MAKE SURE contentDocument is declared for your parent 
    let characterObj = document.getElementById('characterObj').contentDocument

    // * refers to the parent layer (characterObj) of our SVG
    // let character = characterObj.getElementById('characterGroup');
    // let bMouth = characterObj.getElementById('bottom-mouth');
   

    // * target buttons to trigger function
    let neutralBtn = document.getElementById('neutral');
    let happyBtn = document.getElementById('happy');
    let deadBtn = document.getElementById('dead');

    // **************** SET TRANSFORM ORIGIN OF TARGETS FOR ROTATION ****************
    transformOriginSet(); 

    // **************** INTRO FADE ****************

    gsap.from(character, {
        duration: 2,
        autoAlpha: 0
    });

    // **************** BUTTON EVENTS ****************

    //  * Add event listener and run function when we click
    // neutralBtn.addEventListener('click', function() {
    //     console.log("Neutral");
    //     neutral();
    // });
    


    // **************** ANIMATION FUNCTIONS ****************
    function transformOriginSet() {
        gsap.set(lEar, {
            transformOrigin: "bottom center"
        });
    }

    function neutral(){

    }

    function happy() {

    }

    function dead(){
    
    }
}

