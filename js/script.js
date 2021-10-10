window.onload = function(){
    //Animation arrays
    let animations = Array.from(Array(6), () => new Array()) //Two dimensional array with 6 elements. 
    // let animations = {
    //     neutral : [],
    //     sad : [],
    //     happy : [],
    //     angry : [],
    //     sick : [],
    //     dead : []
    // };
    //let animations = Array.from(['neutral', 'sad', 'angry', 'happy', 'sick', 'dead'], () => new Array()) //Two dimensional array with 6 elements. 
    // Refer to the SVG object in the DOM 

    let neutralIndex = 0;
    let happyIndex = 1;


    // ! MAKE SURE contentDocument is declared for your parent 
    let characterObj = document.getElementById('characterObj').contentDocument

    // * refers to the parent layer (characterObj) of our SVG
    let character = characterObj.getElementById('WAT9S');
    let leftEye = characterObj.getElementById('left_eye');
    let rightEye = characterObj.getElementById('right_eye');
    let leftEyeball = characterObj.getElementById('left_eyeball');
    let rightEyeball = characterObj.getElementById('right_eyeball');
    let leftPupil = characterObj.getElementById('left_pupil');
    let rightPupil = characterObj.getElementById('right_pupil');
    let wheel  = characterObj.getElementById('wheel');
    let leftArm = characterObj.getElementById('left_arm_group');
    let rightArm = characterObj.getElementById('right_arm_group');
    let lightningBolt = characterObj.getElementById('electric_current');

    // * target buttons to trigger function
    let neutralBtn = document.getElementById('neutral');
    let happyBtn = document.getElementById('happy');
    let deadBtn = document.getElementById('dead');

    // // ! EXAMPLE OF TARGETTING MULTIPLE SELECTORS NOTE THAT WE CAN STORE
    // // ! VARIABLES INTO AN ARRAY AND TARGET THE ARRAY IN GSAP3!!!
    let pupils = [leftPupil, rightPupil];
    // let previousEyes = [lPupil, rPupil];
    // let deadEyes = [lDeadEye, rDeadEye];
    // let rotateReset = [lEar,rEar, lWhisker, rWhisker]; // Contains all layers that we want to reset rotation to 0

    // **************** INTRO FADE ****************

    gsap.from(character, {
        duration: 2,
        autoAlpha: 0
    });

    // **************** BUTTON EVENTS ****************

    //  * Add event listener and run function when we click
    neutralBtn.addEventListener('click', function() {
        console.log("Neutral");
        neutral();
    });

    happyBtn.addEventListener('click', function() {
        console.log("Happy");
        happy();
    });
    


    // **************** ANIMATION FUNCTIONS ****************
    // function transformOriginSet() {
    //     gsap.set(lEar, {
    //         transformOrigin: "bottom center"
    //     });
    // }

    let reset = function (){
        for (const state in animations) {
            for(anim in animations[state]){
                if(animations[state][anim]){
                    animations[state][anim].pause(); //Pause
                    animations[state][anim].time(0); //reset
                    animations[state][anim] = null; //destroy
                }
            };
        }
        //
        animations[neutralIndex][0] = gsap.set(pupils,{
            xPercent:0,
        });
    }

    function neutral(){
        reset();
        let anim_duration = 2;
        animations[neutralIndex][0] = gsap.set(pupils,{
            xPercent:0,
        });
        //Setting eyes to the left
        animations[neutralIndex][1] = gsap.fromTo(pupils,{
            xPercent:-60,
        },{
            duration: anim_duration,
            xPercent:60,
            repeat: -1,
            yoyo: true
        }); 
        //Moving eyes left and right
        animations[neutralIndex][2] = gsap.timeline({repeat: -1, yoyo: false})
        .to(wheel, {
            rotation: "360",
            transformOrigin: "50% 50%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(wheel, {
            rotation: "-180",
            transformOrigin: "50% 50%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        });
        //Moving arm. Waving animation.
        animations[neutralIndex][3] = gsap.timeline({repeat: -1, yoyo: true})
        .set(rightArm, {
            rotation: "-130",
            transformOrigin: "50% 10%",
        })
        .to(rightArm, {
            rotation: "-170", //Even if it is a timeline, this seems to start from the initial position and not the current location set by the first step on this sequence.
            transformOrigin: "50% 10%",
            duration: 1.5
        });
        //Lightning bolt
        animations[neutralIndex][4] = gsap.timeline({repeat: -1, yoyo: true})
        .fromTo(lightningBolt, 1, {
            scaleY: 0,
            opacity: 1,
            autoRound: false,
        },{
            scaleY: 1,
            filter: "blur(8px)" //Source: https://greensock.com/forums/topic/20180-motion-blur-with-svg-gaussianblur-tween-only-the-x-value/
        });
    }

    function happy() {
        reset();

        //Moving arm. Waving animation.
        animations[happyIndex][0] = gsap.timeline({repeat: -1, yoyo: true})
        .set(rightArm, {
            rotation: "-130",
            transformOrigin: "50% 10%",
        })
        .to(rightArm, {
            rotation: "-170", //Even if it is a timeline, this seems to start from the initial position and not the current location set by the first step on this sequence.
            transformOrigin: "50% 10%",
            duration: 1.5
        });

        animations[happyIndex][1] = gsap.timeline({repeat: -1, yoyo: true})
        .set(leftArm, {
            rotation: "130",
            transformOrigin: "50% 10%",
        })
        .to(leftArm, {
            rotation: "170", //Even if it is a timeline, this seems to start from the initial position and not the current location set by the first step on this sequence.
            transformOrigin: "50% 10%",
            duration: 1.5
        });

        animations[happyIndex][2] = gsap.timeline({repeat: -1, yoyo: true})
        .to(pupils, {
            fill: 'black',
            duration: 2
        })
        .to(pupils, {
            fill: 'yellow',
            duration: 0.5
        });
        gsap.to(wheel, {morphSVG: "#mouth", duration: 1}, "+=1");

        animations[neutralIndex][3] = gsap.timeline({repeat: -1, yoyo: false})
        .to(wheel, {
            rotation: "1000",
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(wheel, {
            rotation: "-1000",
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "none" //no easing because it is a continuous loop
        });

        animations[happyIndex][4] = gsap.timeline({repeat: -1, yoyo: true})
        .to(character, {
            xPercent: 20,
            duration: 1
        })
        .to(character, {
            xPercent: -20,
            duration: 1
        })
    }

    function dead(){
    
    }
}

