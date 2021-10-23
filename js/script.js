Swal.fire({
    title: '<strong class="titleFont">MEET WATS</strong>',
    html:
    '<p class="popup_text">Warfare Assistant Type 9S</p>' + 
    '<p class="popup_text">(He is totally friendly now, ahem, sometimes)</p>' + 
    '<br>' + 
    '<img id="wat9s_popup_img" style="height:30vh" src="../img/popup.svg"></img>',
    showCloseButton: true,
    confirmButtonText: "LET'S PLAY"
});

window.onload = function(){
    //Audio
    let audio = [new Audio('../audio/chainsaw.mp3'), new Audio('../audio/droplet.wav'), new Audio('../audio/cheerful.mp3'), 
                    new Audio('../audio/heartbeat.wav'), new Audio('../audio/metal_falling.mp3'), new Audio('../audio/metal_impact.mp3'),
                    new Audio('../audio/metals_falling.wav'), new Audio('../audio/electricity.wav')];
    //Animation arrays
    let animations = Array.from(Array(6), () => new Array()) //Two dimensional array with 6 elements. 
    let _gsapDelayedCall = [];
    let currentAnimation = '';
    let neutralIndex = 0;
    let happyIndex = 1;
    let angryIndex =2;
    let sadIndex = 3;
    let sickIndex = 4;
    let deadIndex = 5;

    let characterObj = document.getElementById('characterObj').contentDocument

    let character = characterObj.getElementById('WAT9S');
    let arms_conector = characterObj.getElementById('arms_conector');
    let body = characterObj.getElementById('body');
    let neck = characterObj.getElementById('neck');
    let leftEye = characterObj.getElementById('left_eye');
    let rightEye = characterObj.getElementById('right_eye');
    let leftEyeball = characterObj.getElementById('left_eyeball');
    let rightEyeball = characterObj.getElementById('right_eyeball');
    let leftPupil = characterObj.getElementById('left_pupil');
    let rightPupil = characterObj.getElementById('right_pupil');
    let leftDeadEye = characterObj.getElementById('left_dead_eye');
    let rightDeadEye = characterObj.getElementById('right_dead_eye');
    let wheel  = characterObj.getElementById('wheel');
    let leftArm = characterObj.getElementById('left_arm_group');
    let rightArm = characterObj.getElementById('right_arm_group');
    let lightningBolt = characterObj.getElementById('electric_current');
    let mouth = characterObj.getElementById('mouth');
    let happyMouth = characterObj.getElementById('happy_mouth');
    let leftSpikes = characterObj.getElementById('left_spikes');
    let rightSpikes = characterObj.getElementById('right_spikes');
    let left_tire_smoke_2 = characterObj.getElementById('left_x5F_smoke2');
    let left_tire_smoke_1 = characterObj.getElementById('left_x5F_smoke1');
    let right_tire_smoke_2 = characterObj.getElementById('right_x5F_smoke2');
    let right_tire_smoke_1 = characterObj.getElementById('right_x5F_smoke1');
    let tear1 = characterObj.getElementById('tear1');
    let tear2 = characterObj.getElementById('tear2');
    let sadMouth = characterObj.getElementById('sad_mouth');
    let termometer_fill = characterObj.getElementById('termometer_x5F_fill');
    let termometer_glass = characterObj.getElementById('termometer_x5F_glass');
    let termometer_fill_bars= characterObj.querySelectorAll("#termometer_x5F_fill rect");
    let head = characterObj.getElementById('head');
    let clothes = characterObj.getElementById('clothes');
    let battery = characterObj.getElementById('battery');
    let battery_level = characterObj.getElementById('battery_x5F_level');
    // * target buttons to trigger function
    let neutralBtn = document.getElementById('neutral');
    let happyBtn = document.getElementById('happy');
    let deadBtn = document.getElementById('dead');
    let angryBtn = document.getElementById('angry');
    let sadBtn = document.getElementById('sad');
    let sickBtn = document.getElementById('sick');

    let buttons = [neutralBtn, happyBtn, deadBtn, angryBtn, sadBtn, sickBtn];

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

    let pupils = [leftPupil, rightPupil];
    let eyes = [leftEyeball, rightEyeball];
    let left_tire_smoke = [left_tire_smoke_1, left_tire_smoke_2];
    let right_tire_smoke = [right_tire_smoke_1, right_tire_smoke_2];
    let tears = [tear1, tear2];
    let termometer = [termometer_fill, termometer_glass];
    let previousEyes = [leftEyeball, rightEyeball, pupils];
    let deadEyes = [leftDeadEye, rightDeadEye];

    // **************** INTRO FADE ****************

    gsap.from(character, {
        duration: 2,
        autoAlpha: 0
    });

    // **************** BUTTON EVENTS ****************

    //  * Add event listener and run function when we click
    neutralBtn.addEventListener('click', function() {
        reset();
        if (currentAnimation != 'neutral'){
            currentAnimation = 'neutral';
            resetBtns();
            clickedButton(this);
            neutral();
        }
    });

    happyBtn.addEventListener('click', function() {
        reset();
        if (currentAnimation != 'happy'){
            currentAnimation = 'happy';
            resetBtns();
            clickedButton(this);
            happy();
        }
    });

    angryBtn.addEventListener('click', function() {
        reset();
        if (currentAnimation != 'angry'){
            currentAnimation = 'angry';
            resetBtns();
            clickedButton(this);
            angry();
        }
    });

    sadBtn.addEventListener('click', function() {
        reset();
        if (currentAnimation != 'sad'){
            currentAnimation = 'sad';
            resetBtns();
            clickedButton(this);
            sad();
        }
    });
    sickBtn.addEventListener('click', function() {
        reset();
        if (currentAnimation != 'sick'){
            currentAnimation = 'sick';
            resetBtns();
            clickedButton(this);
            sick();
        }
    });
    deadBtn.addEventListener('click', function() {
        reset();
        if (currentAnimation != 'dead'){
            currentAnimation = 'dead';
            resetBtns();
            clickedButton(this);
            dead();
        }
    });

    // **************** ANIMATION FUNCTIONS ****************
    let resetBtns = function(){
        //Reactivate all buttons
        for (let i=0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            buttons[i].classList.remove("clickedButton");
        }
    }
    let clickedButton = function(button){
        button.disabled = true;
        button.classList.add("clickedButton");
    }
    let reset = function (){
        //Kill all delayed calls 
        for (let i = 0; i < _gsapDelayedCall; i++) {
            if(_gsapDelayedCall[i]){
                console.log(_gsapDelayedCall[i]);
                _gsapDelayedCall[i].kill();
            }
        }
        for (const state in animations) {
            for(anim in animations[state]){
                if(animations[state][anim]){
                    animations[state][anim].pause(); //Pause
                    animations[state][anim].time(0); //reset
                    animations[state][anim] = null; //destroy
                }
            };
        }
        //Pause all audios
        for (let i = 0; i < audio.length; i++) {
            audio[i].pause();
            audio[i].currentTime = 0;
        }
        //
        animations[neutralIndex][0] = gsap.set(pupils,{
            xPercent:0,
        });
        animations[angryIndex][3] = gsap.set([leftSpikes, rightSpikes],{
            fill: 'transparent',
        });
        animations[angryIndex][4] = gsap.set(lightningBolt,{
            stroke: 'transparent',
            strokeOpacity: 0
        });
        animations[sickIndex][4] =  gsap.set(termometer_fill_bars,{
            fill: 'transparent'
        });
        animations[deadIndex][3] = gsap.set(pupils, {
            yPercent: 0
        });
        animations[deadIndex][3] = gsap.set(previousEyes, {
            opacity: 1
        });
        animations[deadIndex][9] = gsap.set([head, leftArm, rightArm, body, battery, arms_conector, neck], {
            yPercent: 0,
            xPercent: 0,
            rotation: "0"
        });
        //This actually works...(?)
        characterObj.data = 'img/character.svg';
    }

    //For sounds that only play once.
    let playSound = function (soundIndex, interval, condition) {
        if (condition == currentAnimation){
            audio[soundIndex].play();
            _gsapDelayedCall[_gsapDelayedCall.length] = gsap.delayedCall(interval, ()=>{
                if (condition == currentAnimation){
                    playSound(soundIndex, interval, condition);
                }
            })
        }8
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
            stroke: 'blue',
            scaleY: 0,
            opacity: 1,
            autoRound: false,
        },{
            strokeOpacity: 1,
            scaleY: 1,
            filter: "blur(8px)" //Source: https://greensock.com/forums/topic/20180-motion-blur-with-svg-gaussianblur-tween-only-the-x-value/
        });
    }

    function happy() {
        reset();
        //Play audio
        audio[2].play();
        audio[2].loop = true;

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
        });
        animations[happyIndex][5] = gsap.to(happyMouth,{
            fill: 'black',
            duration:0.2
        });
    }

    function angry() {
        reset();
        audio[0].play();
        audio[0].loop = true;
        animations[angryIndex][1] = gsap.fromTo([pupils, mouth],{
            stroke: 'black',
            fill: 'black'
        },{
            fill: 'red',
            stroke: 'red',
        });
        animations[angryIndex][2] = gsap.to(eyes,{
            fill: 'black'
        },{
            fill: 'red'
        });
        animations[angryIndex][3] = gsap.to(mouth,{
            strokeWidth: 40
        });
        animations[angryIndex][4] = gsap.fromTo(leftSpikes,{
            transformOrigin: "50% 50%",
            duration: 1,
            fill: '#939598',
        }, {
            rotation: "300",
            scale: 1.5,
            ease: "none",
            repeat: -1
        })
        animations[angryIndex][5] = gsap.fromTo(rightSpikes,{
            transformOrigin: "50% 50%",
            duration: 1,
            fill: '#939598',
        }, {
            rotation: "-300",
            scale: 1.5,
            ease: "none",
            repeat: -1
        });
        //Lightning bolt
        animations[angryIndex][6] = gsap.timeline({repeat: -1, yoyo: true})
        .fromTo(lightningBolt, 1, {
        scaleY: 0,
        stroke: 'red',
        opacity: 1,
        autoRound: false,
        },{
        scaleY: 1,
        stroke: 'red',
        strokeOpacity: 1,
        filter: "blur(8px)" //Source: https://greensock.com/forums/topic/20180-motion-blur-with-svg-gaussianblur-tween-only-the-x-value/
        });

        animations[angryIndex][7] = gsap.timeline({repeat: -1, yoyo: false})
        .to(wheel, {
            rotation: "1000",
            transformOrigin: "50% 50%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(wheel, {
            rotation: "-500",
            transformOrigin: "50% 50%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        });

        animations[angryIndex][8]= gsap.timeline({repeat: -1, yoyo: false})
        .fromTo([right_tire_smoke, left_tire_smoke], {
            xPercent: +10,
            yPercent: +10,
            opacity: 0,
            duration: 1,
            fill: '#414245',
            filter: "blur(12px)"
        }, {
            xPercent: -10,
            yPercent: -50,
            duration: 2,
            opacity: 1,
            fill: '#333436'
        });
    }

    function sad(){
        reset();
        playSound(1, 1, 'sad');
        animations[sadIndex][1] = gsap.to(tears,{
            fill: '#27aae1'
        });
        animations[sadIndex][2] = gsap.timeline({repeat: -1, yoyo: false})
        .to(tear1,{
            yPercent: 300,
            opacity: 0,
            duration: 1
        })
        .to(tear2,{
            yPercent: 300,
            opacity: 0,
            duration: 1
        });
        animations[sadIndex][3] = gsap.to(mouth, {
            opacity: 0
        });
        animations[sadIndex][4] = gsap.to(sadMouth, {
            fill: 'black'
        });
        animations[sadIndex][5] = gsap.timeline({repeat: -1, yoyo: true})
        .set([rightArm, leftArm], {
            rotation: "-10",
            transformOrigin: "50% 10%",
        })
        .to([rightArm, leftArm], {
            rotation: "10", //Even if it is a timeline, this seems to start from the initial position and not the current location set by the first step on this sequence.
            transformOrigin: "50% 10%",
            duration: 1.5
        });
        animations[sadIndex][6] = gsap.timeline({repeat: -1, yoyo: true})
        .to(wheel, {
            scale: 0.9,
            transformOrigin: '50%, 0%',
            duration: 1.5,
        })
        .to(wheel, {
            scale: 1,
            transformOrigin: '50%, 0%',
            duration: 0.5,
        });
        animations[sadIndex][7] = gsap.to(pupils,{
            yPercent:90,
        });
        
    }
    //#sick
    function sick(){
        reset();
        //Play Audio
        audio[3].play();
        audio[3].loop = true;

        animations[sickIndex][1] =  gsap.timeline({repeat: -1, yoyo: false})
        .to(head, {
            rotation: "30",
            transformOrigin: "50% 100%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(head, {
            rotation: "-30",
            transformOrigin: "50% 100%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        });
        animations[sickIndex][2] =  gsap.to(eyes, {
            duration: 1,
            fill: 'green',
        });
        animations[sickIndex][3] =  gsap.to(termometer_glass,{
            fill: 'white'
        });
        animations[sickIndex][4] =  gsap.to(termometer_fill_bars,{
            fill: 'red',
            stagger: 0.3,
            repeat: -1,
            duration:1.5
        });
        animations[sickIndex][5] = gsap.to(sadMouth, {
            fill: 'black'
        });
        animations[sickIndex][6] = gsap.to(mouth, {
            opacity: 0
        });
        _gsapDelayedCall[_gsapDelayedCall.length]  = gsap.delayedCall(3, ()=>{
            if (currentAnimation == 'sick'){
                animations[sickIndex][7] = gsap.timeline({yoyo: false})
                .to(rightArm, {
                    yPercent: 100
                })
                .to(rightArm, {
                    transformOrigin: '50% 100%',
                    rotation:"-90",
                });
                //Play Audio
                _gsapDelayedCall[_gsapDelayedCall.length] = gsap.delayedCall(0.5, ()=>{
                audio[4].play();
                _gsapDelayedCall[_gsapDelayedCall.length] = gsap.delayedCall(0.4, ()=>{
                    audio[5].play();
                    });
                    audio[5].volume= 1;
                });
            }
        });
        animations[sadIndex][8] = gsap.to(pupils,{
            scale: 0.8,
            yoyo: true,
            repeat: -1
        });
    }

    function dead(){
        reset();
        animations[deadIndex][1] = gsap.to(sadMouth,{
            fill: 'black',
            duration: 0.2
        });
        animations[deadIndex][2] = gsap.to(mouth, {
            opacity: 0
        });
        animations[deadIndex][3] = gsap.timeline({yoyo: false})
        .to(pupils,{
            yPercent: 90,
            duration: 1.5
        })
        .to(previousEyes, {
            opacity: 0,
            duration: 1
        })
        .to(deadEyes, {
            opacity: 1,
            fill: 'black',
            duration: 1
        });
        animations[deadIndex][4] = gsap.to(clothes, {
            yPercent: 120,
            opacity: 0,
            duration: 1
        });
        animations[deadIndex][5] = gsap.fromTo(battery_level, {
            scaleX: 5,
        }, {
            scaleX: 0,
            duration: 3,
            fill: 'red'
        });
        _gsapDelayedCall[_gsapDelayedCall.length] = gsap.delayedCall(3, ()=>{
            //In case the current animation changes, only play if it is the right one.
            if (currentAnimation == 'dead'){
                animations[deadIndex][6] = gsap.to(head, {
                    yPercent: 125,
                    rotation: "40",
                    duration: 1
                });
                animations[deadIndex][7] = gsap.to(leftArm, {
                    yPercent: 90,
                    rotation: "80",
                    transformOrigin: '50% 100%',
                    duration: 1
                });
                animations[deadIndex][8] = gsap.to(rightArm, {
                    yPercent: 110,
                    rotation: "-60",
                    transformOrigin: '50% 100%',
                    duration: 2
                });
                animations[deadIndex][9] = gsap.to(battery, {
                    yPercent: 110,
                    rotation: "-10",
                    transformOrigin: '50% 100%',
                    duration: 1.5
                });
                animations[deadIndex][10] = gsap.to(body, {
                    yPercent: 130,
                    rotation: "-10",
                    duration: 1.2
                });
                animations[deadIndex][11] = gsap.to(arms_conector, {
                    yPercent: 10050,
                    rotation: "-60",
                    duration: 1.3
                });
                animations[deadIndex][12] = gsap.to(neck, {
                    yPercent: 350,
                    rotation: "0",
                    duration: 1.3
                });
                //Play Audio
                _gsapDelayedCall[_gsapDelayedCall.length] = gsap.delayedCall(0.5, ()=>{
                    if (currentAnimation == 'dead'){
                        audio[5].play();
                        audio[4].play();
                        audio[6].play();
                    }
                });
                _gsapDelayedCall[_gsapDelayedCall.length] = gsap.delayedCall(1.3, ()=>{
                    if (currentAnimation == 'dead'){
                        playSound(7, 3.3, 'dead');
                    }
                });
            }
        });
        animations[deadIndex][13] = gsap.timeline({repeat: -1, yoyo: true})
        .fromTo(lightningBolt, 1, {
        scaleY: 0,
        stroke: 'red',
        opacity: 1,
        autoRound: false,
        },{
        scaleY: 1,
        stroke: 'red',
        strokeOpacity: 1,
        duration: 3,
        filter: "blur(12px)" //Source: https://greensock.com/forums/topic/20180-motion-blur-with-svg-gaussianblur-tween-only-the-x-value/
        });
    }


    //On load
    neutral();
}

