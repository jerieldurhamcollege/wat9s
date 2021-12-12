import { Tamogotchi } from './Tamogotchi.js';

// Swal.fire({
//     title: '<strong class="titleFont">MEET WATS</strong>',
//     html:
//     '<p class="popup_text">Warfare Assistant Type 9S</p>' + 
//     '<p class="popup_text">(He is totally friendly now, ahem, sometimes)</p>' + 
//     '<br>' + 
//     '<img id="wat9s_popup_img" style="height:30vh" src="../img/popup.svg"></img>',
//     showCloseButton: true,
//     confirmButtonText: "LET'S PLAY"
// });

window.onload = function(){
    

    let htmlNode = document.getElementById('mainContainer');
    let pet = new Tamogotchi(htmlNode, 'data.json');
    // * target buttons to trigger function
    let neutralBtn = document.getElementById('neutral');
    let happyBtn = document.getElementById('happy');
    // let deadBtn = document.getElementById('dead');
    let angryBtn = document.getElementById('angry');
    let sadBtn = document.getElementById('sad');
    let jokeyBtn = document.getElementById('jokey');
    // let sickBtn = document.getElementById('sick');
    let feedBtn = document.getElementById('feed');

    let buttons = [neutralBtn, happyBtn, angryBtn, sadBtn, jokeyBtn, feedBtn];

    let audioAuthors = document.getElementById('footer_link_1');
    audioAuthors.addEventListener('click', function(){
        Swal.fire({
            title: '<strong class="white_text">Authors</strong>',
            html:
            '<div id="authors_div"' + 
            '<p class="popup_text">Chainsaw: <a target="_blank" href="https://freesound.org/people/domiscz/sounds/461734/">FreeSound.org</a></p>' + 
            '<p class="popup_text">Cheerful: <a target="_blank" href="https://freesound.org/people/Setuniman/sounds/171394/">FreeSound.org</a></p>' + 
            '<p class="popup_text">Droplet: <a target="_blank" href="https://freesound.org/people/gkillhour/sounds/267221///">FreeSound.org</a></p>' + 
            '<p class="popup_text">Electric Current: <a target="_blank" href="https://freesound.org/people/FlashTrauma/sounds/398274/">FreeSound.org</a></p>' + 
            '<p class="popup_text">Heartbeat: <a target="_blank" href="https://freesound.org/people/andres_marcos/sounds/74701/">FreeSound.org</a></p>' + 
            '<p class="popup_text">Metals falling: <a target="_blank" href="https://freesound.org/people/manimato2/sounds/429998/">FreeSound.org</a></p>' + 
            '<p class="popup_text">Metal impact: <a target="_blank" href="https://freesound.org/people/Rickplayer/sounds/530486/">FreeSound.org</a></p>' + 
            '<p class="popup_text">Metal hit: <a target="_blank" href="https://freesound.org/people/Rickplayer/sounds/530486/">FreeSound.org</a></p>' + 
            '</div>' +
            '<br>' + 
            '<img id="wat9s_popup_img" style="height:20vh" src="/img/popup.svg"></img>',
            showCloseButton: true,
            confirmButtonText: "BACK TO PLAYING"
        });
    });

    // **************** INTRO FADE ****************

    // **************** BUTTON EVENTS ****************

    //  * Add event listener and run function when we click
    neutralBtn.addEventListener('click', function() {
    if (pet.currentAnimation != 'dead'){
        pet.reset();
        if (pet.currentAnimation != 'neutral'){
            pet.currentAnimation = 'neutral';
            pet.resetBtns(buttons);
            pet.clickedButton(this);
            pet.neutral();
        }
    }
    });

    happyBtn.addEventListener('click', function() {
        if (pet.currentAnimation != 'dead'){
            pet.reset();
            if (pet.currentAnimation != 'happy'){
                pet.currentAnimation = 'happy';
                pet.resetBtns(buttons);
                pet.clickedButton(this);
                pet.happy();
                backToNeutral();
            }
        }
    });

    angryBtn.addEventListener('click', function() {
        if (pet.currentAnimation != 'dead'){
            pet.reset();
            if (pet.currentAnimation != 'angry'){
                pet.currentAnimation = 'angry';
                pet.resetBtns(buttons);
                pet.clickedButton(this);
                pet.angry();
                backToNeutral();
            }
        }
    });

    sadBtn.addEventListener('click', function() {
        if (pet.currentAnimation != 'dead'){
            pet.reset();
            if (pet.currentAnimation != 'sad'){
                pet.currentAnimation = 'sad';
                pet.resetBtns(buttons);
                pet.clickedButton(this);
                pet.sad();
                backToNeutral();
            }
        }
    });

    jokeyBtn.addEventListener('click', function() {
        if (pet.currentAnimation != 'dead'){
            pet.reset();
            if (pet.currentAnimation != 'jokey'){
                pet.currentAnimation = 'jokey';
                pet.resetBtns(buttons);
                pet.clickedButton(this);
                pet.jokey();
                backToNeutral();
            }
        }
    });
    // sickBtn.addEventListener('click', function() {
    //     reset();
    //     if (currentAnimation != 'sick'){
    //         currentAnimation = 'sick';
    //         resetBtns(buttons);
    //         clickedButton(this);
    //         sick();
    //     }
    // });
    // deadBtn.addEventListener('click', function() {
    //     pet.reset();
    //     if (pet.currentAnimation != 'dead'){
    //         pet.currentAnimation = 'dead';
    //         pet.resetBtns(buttons);
    //         pet.clickedButton(this);
    //         pet.dead();
    //     }
    // });
    feed.addEventListener('click', function() {
        pet.resetBtns(buttons);
        // pet.clickedButton(this);
        pet.feedRandomFood();
    });
    // **************** ANIMATION FUNCTIONS ****************
    let backToNeutral = function (){
        //Reset back to neutral after x seconds.
        let animation = pet.currentAnimation; //Capture animation at the moment of method call.
        setTimeout(function(){
            if (pet.currentAnimation != 'dead' && pet.currentAnimation == animation){
                pet.reset();
                if (pet.currentAnimation != 'neutral'){
                    pet.currentAnimation = 'neutral';
                    pet.resetBtns(buttons);
                    pet.neutral();
                }
            }
        }, 4000);
    }


    //On load
    pet.neutral();
    setTimeout(function(){
        console.log(pet.moods);
        console.log(pet.foods);
        console.log(pet.compliments);
    }, 2000);

}

