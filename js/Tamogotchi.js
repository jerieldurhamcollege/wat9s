class Tamogotchi{
    constructor(htmlNode, dataSource){
        this.petName = 'WAT9S';
        this.ownerName = '';
        this.isAlive = false;
        this.characterObj = characterObj;
        this.initialFood = 60;
        this.metabolismRate = 1000;
        this.dataSource = dataSource;
        //Fetch data
        console.log(`Hi!  I'm ${this.petName}`);
        //Animation Variables
        //Audio
        this.audio = [new Audio('../audio/chainsaw.mp3'), new Audio('../audio/droplet.wav'), new Audio('../audio/cheerful.mp3'), 
        new Audio('../audio/heartbeat.wav'), new Audio('../audio/metal_falling.mp3'), new Audio('../audio/metal_impact.mp3'),
        new Audio('../audio/metals_falling.wav'), new Audio('../audio/electricity.wav'), new Audio('../audio/badumtss.wav')];
        //Animation arrays
        this.animations = Array.from(Array(7), () => new Array()) //Two dimensional array with 6 elements. 
        this._gsapDelayedCall = [];
        this.currentAnimation = '';
        this.neutralIndex = 0;
        this.happyIndex = 1;
        this.angryIndex =2;
        this.sadIndex = 3;
        this.sickIndex = 4;
        this.deadIndex = 5;
        this.jokeyIndex = 6;
        
        this.characterObj = htmlNode.querySelector('#characterObj').contentDocument;;
        this.character = this.characterObj.getElementById('WAT9S');
        this.arms_conector = this.characterObj.getElementById('arms_conector');
        this.body = this.characterObj.getElementById('body');
        this.neck = this.characterObj.getElementById('neck');
        this.leftEye = this.characterObj.getElementById('left_eye');
        this.rightEye = this.characterObj.getElementById('right_eye');
        this.leftEyeball = this.characterObj.getElementById('left_eyeball');
        this.rightEyeball = this.characterObj.getElementById('right_eyeball');
        this.leftPupil = this.characterObj.getElementById('left_pupil');
        this.rightPupil = this.characterObj.getElementById('right_pupil');
        this.leftDeadEye = this.characterObj.getElementById('left_dead_eye');
        this.rightDeadEye = this.characterObj.getElementById('right_dead_eye');
        this.wheel  = this.characterObj.getElementById('wheel');
        this.leftArm = this.characterObj.getElementById('left_arm_group');
        this.rightArm = this.characterObj.getElementById('right_arm_group');
        this.lightningBolt = this.characterObj.getElementById('electric_current');
        this.mouth = this.characterObj.getElementById('mouth');
        this.happyMouth = this.characterObj.getElementById('happy_mouth');
        this.leftSpikes = this.characterObj.getElementById('left_spikes');
        this.rightSpikes = this.characterObj.getElementById('right_spikes');
        this.left_tire_smoke_2 = this.characterObj.getElementById('left_x5F_smoke2');
        this.left_tire_smoke_1 = this.characterObj.getElementById('left_x5F_smoke1');
        this.right_tire_smoke_2 = this.characterObj.getElementById('right_x5F_smoke2');
        this.right_tire_smoke_1 = this.characterObj.getElementById('right_x5F_smoke1');
        this.tear1 = this.characterObj.getElementById('tear1');
        this.tear2 = this.characterObj.getElementById('tear2');
        this.sadMouth = this.characterObj.getElementById('sad_mouth');
        this.termometer_fill = this.characterObj.getElementById('termometer_x5F_fill');
        this.termometer_glass = this.characterObj.getElementById('termometer_x5F_glass');
        this.termometer_fill_bars= this.characterObj.querySelectorAll("#termometer_x5F_fill rect");
        this.head = this.characterObj.getElementById('head');
        this.clothes = this.characterObj.getElementById('clothes');
        this.battery = this.characterObj.getElementById('battery');
        this.battery_level = this.characterObj.getElementById('battery_x5F_level');

        this.pupils = [this.leftPupil, this.rightPupil];
        this.eyes = [this.leftEyeball, this.rightEyeball];
        this.left_tire_smoke = [this.left_tire_smoke_1, this.left_tire_smoke_2];
        this.right_tire_smoke = [this.right_tire_smoke_1, this.right_tire_smoke_2];
        this.tears = [this.tear1, this.tear2];
        this.termometer = [this.termometer_fill, this.termometer_glass];
        this.previousEyes = [this.leftEyeball, this.rightEyeball, this.pupils];
        this.deadEyes = [this.leftDeadEye, this.rightDeadEye];

        this.remainingEnergy = htmlNode.querySelector('#pointsContainerText');
        this.petTalks = htmlNode.querySelector('#petSaysText');
        this.timer = ms => new Promise(res => setTimeout(res, ms));
        this.feastModeActive = false;

        this.hatch();
    }

    fetchPetData(){
        fetch(this.dataSource)
            .then(response => response.json())
            .then(data => {
                this.moods = data.petMoods;
                this.foods = data.petFoods;
                this.compliments = data.compliments;
            })
            .catch(err =>console.log(err));
    }

    resetFood(){
        this.food=this.initialFood;
    }

    resetPet(){
        this.fetchPetData();
        this.metabolismRate = 1000;
        this.feastModeActive = false;
        clearInterval(this.metabolism);
        this.petTalks.innerText = "";
        this.resetFood();
        this.startMetabolism();
    }
    
    hatch(){
        this.fetchPetData();
        clearInterval(this.metabolism);
        this.resetFood();
        this.startMetabolism();
        this.petTalks.innerText = "";
    }
    die(){
        clearInterval(this.metabolism);
        this.isAlive = false;
        // console.log("I am dead!"); //This prints the message even if we are only changing the metabolism.
        this.petTalks.innerText = "Pet has died due to empty energy reserves. Please charge battery and restart.";
        this.food = 0;
    }
    startMetabolism(){
        this.metabolism = setInterval(()=> {
            this.food -=1;
    
            console.log(`${this.food} until I starve`);
            this.remainingEnergy.innerText = `Energy: ${this.food}`;
            if(this.food<=0){
                this.die();
                this.food = 0;
                //Play dead animation
                this.reset();
                if (this.currentAnimation != 'dead'){
                    this.currentAnimation = 'dead';
                    this.dead();
                }
            }
        },this.metabolismRate);
    }
    
    changeMetabolismRate(metabolismRate){
        clearInterval(this.metabolism);
        this.metabolismRate = metabolismRate;
        this.startMetabolism();
    }

    highPerformanceMode(){
        console.log('Changing metabolismRate: High Performance Mode');
        let foodPoints = this.food;
        this.changeMetabolismRate(300);
        this.food = foodPoints;
    }

    batterySaverMode(){
        console.log('Changing metabolismRate: Battery Saver Mode');
        let foodPoints = this.food;
        this.changeMetabolismRate(2000);
        this.food = foodPoints;
    }
    
    eatLasagna() {
        console.log(`can I see the food? ${this.food}`);
        this.food +=20;
    }
    removeEmptyFoodContainers(food){
        return food.quantity > 0; //Only keep if food is available for that category.
    }

    removeEmptyFood(){
        console.log('I am working');
        let tempArray = [];
        this.foods.forEach((food)=>{
            if (food.quantity > 0){
                tempArray.push(food); //Not using splice because I am not sure if I can modify the array length during runtime...
            }
        });
        this.foods = tempArray;
    }

    async feastMode(){
            this.foods = this.foods.filter(this.removeEmptyFoodContainers); //Remove empty food (quantity == 0)
            for (let i = 0; i < this.foods.length; i++){ //Does nothing when feast mode is disabled by starting the game, again.
                if(this.feastModeActive){
                    if(this.food> 0){
                        let currentFood = this.foods[i];
                    if (currentFood.quantity > 0){
                        this.foods[i].quantity -= 1;
                        //Get added or substracted points.
                        let badluck = Math.random();
                        let text = '';
                        if (badluck < currentFood.poisonFactor){
                            this.food -=currentFood.foodPoints;
                            this.food = (this.foods < 0) ? 0 : this.food; //Avoid negative health.
                            text = `FEAST MODE!! Eating ${currentFood.name}! Oh no! That was poisonous and I lost ${currentFood.foodPoints} points`;
                        }
                        else{
                            this.food +=currentFood.foodPoints;
                            text = `FEAST MODE!! Eating ${currentFood.name}! Yummy! I got ${currentFood.foodPoints} points`;
                        }
                        console.log(text);
                        this.petTalks.innerText = text;
                        this.talkAnimation();
                    }
                    await this.timer(500);
                    // else{
                    //     //No more of that food.
                    //     this.foods.splice(i, 1);
                    //     i--;
                    // }
                    }
                }
            }
            //I have two methods for the same thing. I will keep filter.
            this.foods = this.foods.filter(this.removeEmptyFoodContainers); //Remove empty food (quantity == 0)
            // this.removeEmptyFood(); 
            if (this.foods.length> 0 && this.food > 0){
                if(this.feastModeActive){
                this.feastMode(); //Start again
                }
                else{
                    return;
                }
            }
            else{
                if(this.foods.length == 0 ){
                    this.petTalks.innerText = 'OUT OF FOOD!!! FEAST MODE EMPTIED THE STORAGE';
                }
                if(this.food == 0 ){
                    this.petTalks.innerText = "Pet has died due to empty energy reserves. Please charge battery and restart.";
                }
            }
    }
    
    feedRandomFood() {
        this.feastModeActive = false;
        //Check if the food has been loaded/fetched first.
        this.foods = this.foods.filter(this.removeEmptyFoodContainers); //Remove empty food (quantity == 0)
        if (this.foods.length> 0){
            if (this.food <= 0){
                this.petTalks.innerText = 'OS Recovery System says: "Pet is dead. Please restart to attempt recovery"';
                this.food = (this.foods <= 0) ? 0 : this.food; //Avoid negative health.
                this.remainingEnergy.innerText = `Energy: ${this.food}`;
            }
            else{
                let foodIndex = Math.floor(this.foods.length*Math.random());
                let randomFood = this.foods[foodIndex];
                if (randomFood.quantity > 0){
                    this.foods[foodIndex].quantity -= 1;
                    //Get added or substracted points.
                    let badluck = Math.random();
                    let text = '';
                    if (badluck < randomFood.poisonFactor){
                        this.food -=randomFood.foodPoints;
                        this.food = (this.foods < 0) ? 0 : this.food; //Avoid negative health.
                        text = `Eating ${randomFood.name}! Oh no! That was poisonous and I lost ${randomFood.foodPoints} points`;
                    }
                    else{
                        this.food +=randomFood.foodPoints;
                        text = `Eating ${randomFood.name}! Yummy! I got ${randomFood.foodPoints} points`;
                    }
                    console.log(text);
                    this.petTalks.innerText = text;
                    this.talkAnimation();
                }
                else{
                    //No more of that food.
                    this.foods.splice(foodIndex, 1);
                    this.feedRandomFood(); //Look for something else;
                }
            }
        }
        else{
            this.petTalks.innerText = 'OUT OF FOOD!!!';
        }
    }
    talkAnimation(){
        gsap.fromTo([this.mouth],{
            scaleY: 0.5,
        },{
            scaleY: 7,
            repeat: 10,
            yoyo: true,
            duration: 0.2
        });
    }
    talk(){
        this.feastModeActive = false;
        let quotes = this.moods[this.currentAnimation];
        let randomQuote = quotes[Math.floor(quotes.length*Math.random())];
        //Replace flag for name.
        let finalText = randomQuote.replace("#NAME#", this.ownerName);
        this.talkAnimation();
        this.petTalks.innerText = finalText;
    }
    compliment(){
        this.feastModeActive = false;
        // if (this.currentAnimation != 'neutral'){
        //     this.neutral();
        // }
        let randomQuote = this.compliments[Math.floor(this.compliments.length*Math.random())];
        //Replace flag for name.
        let finalText = randomQuote.replace("#NAME#", this.ownerName);
        this.petTalks.innerText = finalText;
        this.talkAnimation();
    }
    introAnim(){
        gsap.from(this.character, {
            duration: 2,
            autoAlpha: 0
        });
    }

    resetBtns(buttons){
        //Reactivate all buttons
        for (let i=0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            buttons[i].classList.remove("clickedButton");
        }
    }
    clickedButton(button){
        button.disabled = true;
        button.classList.add("clickedButton");
    }
    reset(){
        //Kill all delayed calls 
        for (let i = 0; i < this._gsapDelayedCall; i++) {
            if(this._gsapDelayedCall[i]){
                console.log(this._gsapDelayedCall[i]);
                this._gsapDelayedCall[i].kill();
            }
        }
        for (const state in this.animations) {
            for(this.anim in this.animations[state]){
                if(this.animations[state][this.anim]){
                    this.animations[state][this.anim].pause(); //Pause
                    this.animations[state][this.anim].time(0); //reset
                    this.animations[state][this.anim] = null; //destroy
                }
            };
        }
        //Pause all audios
        for (let i = 0; i < this.audio.length; i++) {
            this.audio[i].pause();
            this.audio[i].currentTime = 0;
        }
        //
        this.animations[this.neutralIndex][0] = gsap.set(this.pupils,{
            xPercent:0,
        });
        this.animations[this.angryIndex][3] = gsap.set([this.leftSpikes, this.rightSpikes],{
            fill: 'transparent',
        });
        this.animations[this.angryIndex][4] = gsap.set(this.lightningBolt,{
            stroke: 'transparent',
            strokeOpacity: 0
        });
        this.animations[this.sickIndex][4] =  gsap.set(this.termometer_fill_bars,{
            fill: 'transparent'
        });
        this.animations[this.deadIndex][3] = gsap.set(this.pupils, {
            yPercent: 0
        });
        this.animations[this.deadIndex][3] = gsap.set(this.previousEyes, {
            opacity: 1
        });
        this.animations[this.deadIndex][9] = gsap.set([this.head, this.leftArm, this.rightArm, this.body, this.battery, this.arms_conector, this.neck], {
            yPercent: 0,
            xPercent: 0,
            rotation: "0"
        });
        //mouth
        gsap.set([this.mouth],{
            scaleY: 1,
        });
        //This actually works...(?)
        this.characterObj.data = 'img/character.svg';
    }

    //For sounds that only play once.
    playSound(soundIndex, interval, condition) {
        if (condition == this.currentAnimation){
            this.audio[soundIndex].play();
            this._gsapDelayedCall[this._gsapDelayedCall.length] = gsap.delayedCall(interval, ()=>{
                if (condition == this.currentAnimation){
                    this.playSound(soundIndex, interval, condition);
                }
            })
        }8
    }

    neutral(){
        this.reset();
        this.petTalks.innerText = "";
        let anim_duration = 2;
        this.animations[this.neutralIndex][0] = gsap.set(this.pupils,{
            xPercent:0,
        });
        //Setting eyes to the left
        this.animations[this.neutralIndex][1] = gsap.fromTo(this.pupils,{
            xPercent:-60,
        },{
            duration: anim_duration,
            xPercent:60,
            repeat: -1,
            yoyo: true
        }); 
        //Moving eyes left and right
        this.animations[this.neutralIndex][2] = gsap.timeline({repeat: -1, yoyo: false})
        .to(this.wheel, {
            rotation: "360",
            transformOrigin: "50% 50%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.wheel, {
            rotation: "-180",
            transformOrigin: "50% 50%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        });
        //Moving arm. Waving animation.
        this.animations[this.neutralIndex][3] = gsap.timeline({repeat: -1, yoyo: true})
        .set(this.rightArm, {
            rotation: "-130",
            transformOrigin: "50% 10%",
        })
        .to(this.rightArm, {
            rotation: "-170", //Even if it is a timeline, this seems to start from the initial position and not the current location set by the first step on this sequence.
            transformOrigin: "50% 10%",
            duration: 1.5
        });
        //Lightning bolt
        this.animations[this.neutralIndex][4] = gsap.timeline({repeat: -1, yoyo: true})
        .fromTo(this.lightningBolt, 1, {
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

    happy() {
        this.reset();
        this.feastModeActive = false;
        this.talk();
        //Play audio
        this.audio[2].play();
        this.audio[2].loop = true;

        //Moving arm. Waving animation.
        this.animations[this.happyIndex][0] = gsap.timeline({repeat: -1, yoyo: true})
        .set(this.rightArm, {
            rotation: "-130",
            transformOrigin: "50% 10%",
        })
        .to(this.rightArm, {
            rotation: "-170", //Even if it is a timeline, this seems to start from the initial position and not the current location set by the first step on this sequence.
            transformOrigin: "50% 10%",
            duration: 1.5
        });

        this.animations[this.happyIndex][1] = gsap.timeline({repeat: -1, yoyo: true})
        .set(this.leftArm, {
            rotation: "130",
            transformOrigin: "50% 10%",
        })
        .to(this.leftArm, {
            rotation: "170", //Even if it is a timeline, this seems to start from the initial position and not the current location set by the first step on this sequence.
            transformOrigin: "50% 10%",
            duration: 1.5
        });

        this.animations[this.happyIndex][2] = gsap.timeline({repeat: -1, yoyo: true})
        .to(this.pupils, {
            fill: 'black',
            duration: 2
        })
        .to(this.pupils, {
            fill: 'yellow',
            duration: 0.5
        });

        this.animations[this.neutralIndex][3] = gsap.timeline({repeat: -1, yoyo: false})
        .to(this.wheel, {
            rotation: "1000",
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.wheel, {
            rotation: "-1000",
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "none" //no easing because it is a continuous loop
        });

        this.animations[this.happyIndex][4] = gsap.timeline({repeat: -1, yoyo: true})
        .to(this.character, {
            xPercent: 20,
            duration: 1
        })
        .to(this.character, {
            xPercent: -20,
            duration: 1
        });
        // this.animations[this.happyIndex][6] = gsap.to(this.happyMouth,{
        //     fill: 'black',
        //     duration:0.2
        // });
        this.animations[this.happyIndex][5] = gsap.fromTo([this.mouth],{
            scaleY: 0.5,
        },{
            scaleY: 7,
            repeat: -1,
            yoyo: true,
            duration: 0.2
        });
    }

    angry() {
        this.reset();
        this.feastModeActive = false;
        this.talk();
        this.audio[0].play();
        this.audio[0].loop = true;
        this.animations[this.angryIndex][1] = gsap.fromTo([this.pupils, this.mouth],{
            stroke: 'black',
            fill: 'black'
        },{
            fill: 'red',
            stroke: 'red',
        });
        this.animations[this.angryIndex][2] = gsap.to(this.eyes,{
            fill: 'black'
        },{
            fill: 'red'
        });
        this.animations[this.angryIndex][3] = gsap.to(this.mouth,{
            strokeWidth: 40
        });
        this.animations[this.angryIndex][4] = gsap.fromTo(this.leftSpikes,{
            transformOrigin: "50% 50%",
            duration: 1,
            fill: '#939598',
        }, {
            rotation: "300",
            scale: 1.5,
            ease: "none",
            repeat: -1
        })
        this.animations[this.angryIndex][5] = gsap.fromTo(this.rightSpikes,{
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
        this.animations[this.angryIndex][6] = gsap.timeline({repeat: -1, yoyo: true})
        .fromTo(this.lightningBolt, 1, {
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

        this.animations[this.angryIndex][7] = gsap.timeline({repeat: -1, yoyo: false})
        .to(this.wheel, {
            rotation: "1000",
            transformOrigin: "50% 50%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.wheel, {
            rotation: "-500",
            transformOrigin: "50% 50%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        });

        this.animations[this.angryIndex][8]= gsap.timeline({repeat: -1, yoyo: false})
        .fromTo([this.right_tire_smoke, this.left_tire_smoke], {
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

        this.animations[this.angryIndex][9] = gsap.fromTo([this.mouth],{
            scaleY: 0.5,
        },{
            scaleY: 1.5,
            repeat: -1,
            yoyo: true,
            duration: 0.2
        });
    }

    sad(){
        this.reset();
        this.feastModeActive = false;
        this.talk();
        this.playSound(1, 1, 'sad');
        this.animations[this.sadIndex][1] = gsap.to(this.tears,{
            fill: '#27aae1'
        });
        this.animations[this.sadIndex][2] = gsap.timeline({repeat: -1, yoyo: false})
        .to(this.tear1,{
            yPercent: 300,
            opacity: 0,
            duration: 1
        })
        .to(this.tear2,{
            yPercent: 300,
            opacity: 0,
            duration: 1
        });
        // this.animations[this.sadIndex][3] = gsap.to(this.mouth, {
        //     opacity: 0
        // });
        this.animations[this.sadIndex][3] = gsap.fromTo([this.mouth],{
            scaleY: 0.5,
        },{
            scaleY: 7,
            repeat: -1,
            yoyo: true,
            duration: 0.2
        });
        // this.animations[this.sadIndex][7] = gsap.to(this.sadMouth, {
        //     fill: 'black'
        // });
        this.animations[this.sadIndex][4] = gsap.timeline({repeat: -1, yoyo: true})
        .set([this.rightArm, this.leftArm], {
            rotation: "-10",
            transformOrigin: "50% 10%",
        })
        .to([this.rightArm, this.leftArm], {
            rotation: "10", //Even if it is a timeline, this seems to start from the initial position and not the current location set by the first step on this sequence.
            transformOrigin: "50% 10%",
            duration: 1.5
        });
        this.animations[this.sadIndex][5] = gsap.timeline({repeat: -1, yoyo: true})
        .to(this.wheel, {
            scale: 0.9,
            transformOrigin: '50%, 0%',
            duration: 1.5,
        })
        .to(this.wheel, {
            scale: 1,
            transformOrigin: '50%, 0%',
            duration: 0.5,
        });
        this.animations[this.sadIndex][6] = gsap.to(this.pupils,{
            yPercent:90,
        });
        
    }
    //#sick
    sick(){
        this.reset();
        this.feastModeActive = false;
        this.talk();
        //Play Audio
        this.audio[3].play();
        this.audio[3].loop = true;

        this.animations[this.sickIndex][1] =  gsap.timeline({repeat: -1, yoyo: false})
        .to(this.head, {
            rotation: "30",
            transformOrigin: "50% 100%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.head, {
            rotation: "-30",
            transformOrigin: "50% 100%",
            duration: 1.5,
            ease: "none" //no easing because it is a continuous loop
        });
        this.animations[this.sickIndex][2] =  gsap.to(this.eyes, {
            duration: 1,
            fill: 'green',
        });
        this.animations[this.sickIndex][3] =  gsap.to(this.termometer_glass,{
            fill: 'white'
        });
        this.animations[sickIndex][4] =  gsap.to(this.termometer_fill_bars,{
            fill: 'red',
            stagger: 0.3,
            repeat: -1,
            duration:1.5
        });
        this.animations[this.sickIndex][5] = gsap.to(this.sadMouth, {
            fill: 'black'
        });
        this.animations[this.sickIndex][6] = gsap.to(this.mouth, {
            opacity: 0
        });
        this._gsapDelayedCall[this._gsapDelayedCall.length]  = gsap.delayedCall(3, ()=>{
            if (this.currentAnimation == 'sick'){
                this.animations[this.sickIndex][7] = gsap.timeline({yoyo: false})
                .to(this.rightArm, {
                    yPercent: 100
                })
                .to(this.rightArm, {
                    transformOrigin: '50% 100%',
                    rotation:"-90",
                });
                //Play Audio
                this._gsapDelayedCall[this._gsapDelayedCall.length] = gsap.delayedCall(0.5, ()=>{
                this.audio[4].play();
                this._gsapDelayedCall[this._gsapDelayedCall.length] = gsap.delayedCall(0.4, ()=>{
                    this.audio[5].play();
                    });
                    this.audio[5].volume= 1;
                });
            }
        });
        this.animations[this.sadIndex][8] = gsap.to(this.pupils,{
            scale: 0.8,
            yoyo: true,
            repeat: -1
        });
    }

    dead(){
        this.reset();
        this.feastModeActive = false;
        this.animations[this.deadIndex][1] = gsap.to(this.sadMouth,{
            fill: 'black',
            duration: 0.2
        });
        this.animations[this.deadIndex][2] = gsap.to(this.mouth, {
            opacity: 0
        });
        this.animations[this.deadIndex][3] = gsap.timeline({yoyo: false})
        .to(this.pupils,{
            yPercent: 90,
            duration: 1.5
        })
        .to(this.previousEyes, {
            opacity: 0,
            duration: 1
        })
        .to(this.deadEyes, {
            opacity: 1,
            fill: 'black',
            duration: 1
        });
        this.animations[this.deadIndex][4] = gsap.to(this.clothes, {
            yPercent: 120,
            opacity: 0,
            duration: 1
        });
        this.animations[this.deadIndex][5] = gsap.fromTo(this.battery_level, {
            scaleX: 5,
        }, {
            scaleX: 0,
            duration: 3,
            fill: 'red'
        });
        this._gsapDelayedCall[this._gsapDelayedCall.length] = gsap.delayedCall(3, ()=>{
            //In case the current animation changes, only play if it is the right one.
            if (this.currentAnimation == 'dead'){
                this.animations[this.deadIndex][6] = gsap.to(this.head, {
                    yPercent: 125,
                    rotation: "40",
                    duration: 1
                });
                this.animations[this.deadIndex][7] = gsap.to(this.leftArm, {
                    yPercent: 90,
                    rotation: "80",
                    transformOrigin: '50% 100%',
                    duration: 1
                });
                this.animations[this.deadIndex][8] = gsap.to(this.rightArm, {
                    yPercent: 110,
                    rotation: "-60",
                    transformOrigin: '50% 100%',
                    duration: 2
                });
                this.animations[this.deadIndex][9] = gsap.to(this.battery, {
                    yPercent: 110,
                    rotation: "-10",
                    transformOrigin: '50% 100%',
                    duration: 1.5
                });
                this.animations[this.deadIndex][10] = gsap.to(this.body, {
                    yPercent: 130,
                    rotation: "-10",
                    duration: 1.2
                });
                this.animations[this.deadIndex][11] = gsap.to(this.arms_conector, {
                    yPercent: 10050,
                    rotation: "-60",
                    duration: 1.3
                });
                this.animations[this.deadIndex][12] = gsap.to(this.neck, {
                    yPercent: 350,
                    rotation: "0",
                    duration: 1.3
                });
                //Play Audio
                this._gsapDelayedCall[this._gsapDelayedCall.length] = gsap.delayedCall(0.5, ()=>{
                    if (this.currentAnimation == 'dead'){
                        this.audio[5].play();
                        this.audio[4].play();
                        this.audio[6].play();
                    }
                });
                this._gsapDelayedCall[this._gsapDelayedCall.length] = gsap.delayedCall(1.3, ()=>{
                    if (this.currentAnimation == 'dead'){
                        this.playSound(7, 3.3, 'dead');
                    }
                });
            }
        });
        this.animations[this.deadIndex][13] = gsap.timeline({repeat: -1, yoyo: true})
        .fromTo(this.lightningBolt, 1, {
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

    jokey () {
        this.reset();
        this.feastModeActive = false;
        this.talk();
        this.playSound(8, 10, 'jokey');
        this.animations[this.jokeyIndex][0] = gsap.timeline({repeat: -1, yoyo: true})
        .to(this.leftPupil, {
            xPercent: 60,
            duration: 0.25,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.leftPupil, {
            yPercent: 60,
            duration: 0.25,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.leftPupil, {
            xPercent: -60,
            duration: 0.25,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.leftPupil, {
            yPercent: -60,
            duration: 0.25,
            ease: "none" //no easing because it is a continuous loop
        });
        this.animations[this.jokeyIndex][1] = gsap.timeline({repeat: -1, yoyo: true})
        .to(this.rightPupil, {
            xPercent: -60,
            duration: 0.25,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.rightPupil, {
            yPercent: -60,
            duration: 0.25,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.rightPupil, {
            xPercent: 60,
            duration: 0.25,
            ease: "none" //no easing because it is a continuous loop
        })
        .to(this.rightPupil, {
            yPercent: 60,
            duration: 0.25,
            ease: "none" //no easing because it is a continuous loop
        });
        this.animations[this.jokeyIndex][2] = gsap.fromTo([this.mouth],{
            scaleY: 0.5,
        },{
            scaleY: 7,
            repeat: -1,
            yoyo: true,
            duration: 0.2
        });
    }
}

export {Tamogotchi};