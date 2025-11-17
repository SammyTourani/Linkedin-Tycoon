// ============================================================================
// LINKEDIN TYCOON - PIXEL ART EDITION
// A 2D pixel art game where you build your professional empire
// ============================================================================

// Game State Manager
class GameState {
    constructor() {
        this.data = this.loadGame() || this.createNewGame();
    }

    createNewGame() {
        return {
            player: {
                name: 'Alex Developer',
                title: 'Junior Software Engineer',
                level: 1,
                xp: 0,
                xpToNextLevel: 100,
                energy: 100,
                maxEnergy: 100,
                coins: 0,
                networking: 20,
                skills: 15,
                reputation: 10,
                connections: 5,
                followers: 12,
                postsCount: 0,
                badges: ['🎓 Student']
            },
            location: 'home',
            lastEnergyUpdate: Date.now(),
            posts: [],
            connections: [],
            events: [],
            completedChallenges: [],
            achievements: [],
            time: 'morning' // morning, afternoon, evening, night
        };
    }

    saveGame() {
        try {
            localStorage.setItem('linkedinTycoonPixelSave', JSON.stringify(this.data));
        } catch (e) {
            console.error('Failed to save game:', e);
        }
    }

    loadGame() {
        try {
            const saved = localStorage.getItem('linkedinTycoonPixelSave');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Failed to load game:', e);
            return null;
        }
    }

    useEnergy(amount) {
        if (this.data.player.energy >= amount) {
            this.data.player.energy -= amount;
            this.saveGame();
            return true;
        }
        return false;
    }

    gainXP(amount) {
        this.data.player.xp += amount;
        while (this.data.player.xp >= this.data.player.xpToNextLevel) {
            this.levelUp();
        }
        this.saveGame();
    }

    levelUp() {
        this.data.player.level++;
        this.data.player.xp -= this.data.player.xpToNextLevel;
        this.data.player.xpToNextLevel = Math.floor(this.data.player.xpToNextLevel * 1.5);
        this.data.player.maxEnergy += 10;
        this.data.player.energy = this.data.player.maxEnergy;
        this.data.player.coins += 50;
        this.updateTitle();
        showNotification(`🎉 Level Up! You're now level ${this.data.player.level}!`);
    }

    updateTitle() {
        const level = this.data.player.level;
        const titles = {
            1: 'Junior Software Engineer',
            5: 'Software Engineer',
            10: 'Senior Software Engineer',
            15: 'Lead Developer',
            20: 'Engineering Manager',
            25: 'Director of Engineering',
            30: 'VP of Engineering',
            40: 'CTO',
            50: 'Tech Industry Leader'
        };

        for (const [lvl, title] of Object.entries(titles).reverse()) {
            if (level >= parseInt(lvl)) {
                this.data.player.title = title;
                break;
            }
        }
    }
}

// Initialize game state
const gameState = new GameState();

// UI Update Functions
function updateUI() {
    const p = gameState.data.player;
    document.getElementById('player-name').textContent = p.name;
    document.getElementById('player-title').textContent = p.title;
    document.getElementById('level-display').textContent = p.level;
    document.getElementById('energy-display').textContent = Math.floor(p.energy);
    document.getElementById('coins-display').textContent = p.coins;
    document.getElementById('network-display').textContent = p.connections;
}

function showNotification(message) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.style.display = 'block';
    setTimeout(() => {
        notif.style.display = 'none';
    }, 3000);
}

function showInteractionPrompt(show) {
    document.getElementById('interaction-prompt').style.display = show ? 'block' : 'none';
}

// Sprite Generator - Creates pixel art programmatically
class SpriteGenerator {
    static createPlayerSprite(scene) {
        const size = 16;
        const texture = scene.textures.createCanvas('player', size * 4, size * 4);
        const ctx = texture.getContext();

        // Create 4 frames for walking animation (down, left, right, up)
        const frames = [
            { name: 'down', colors: ['#FFD1B3', '#0066CC', '#003366', '#FFB380'] },
            { name: 'left', colors: ['#FFD1B3', '#0066CC', '#003366', '#FFB380'] },
            { name: 'right', colors: ['#FFD1B3', '#0066CC', '#003366', '#FFB380'] },
            { name: 'up', colors: ['#FFD1B3', '#0066CC', '#003366', '#FFB380'] }
        ];

        frames.forEach((frame, index) => {
            const offsetX = (index % 4) * size;
            
            // Skin color
            ctx.fillStyle = frame.colors[0];
            ctx.fillRect(offsetX + 6, 3, 4, 4); // Head
            
            // Hair
            ctx.fillStyle = '#4A4A4A';
            ctx.fillRect(offsetX + 5, 2, 6, 2);
            
            // Eyes
            ctx.fillStyle = '#000000';
            ctx.fillRect(offsetX + 6, 4, 1, 1);
            ctx.fillRect(offsetX + 9, 4, 1, 1);
            
            // Shirt
            ctx.fillStyle = frame.colors[1];
            ctx.fillRect(offsetX + 5, 7, 6, 4);
            
            // Arms
            ctx.fillStyle = frame.colors[2];
            if (frame.name === 'left') {
                ctx.fillRect(offsetX + 4, 8, 1, 3);
                ctx.fillRect(offsetX + 11, 8, 1, 3);
            } else if (frame.name === 'right') {
                ctx.fillRect(offsetX + 4, 8, 1, 3);
                ctx.fillRect(offsetX + 11, 8, 1, 3);
            } else {
                ctx.fillRect(offsetX + 4, 8, 1, 3);
                ctx.fillRect(offsetX + 11, 8, 1, 3);
            }
            
            // Pants
            ctx.fillStyle = '#2A2A2A';
            ctx.fillRect(offsetX + 5, 11, 3, 3);
            ctx.fillRect(offsetX + 8, 11, 3, 3);
            
            // Shoes
            ctx.fillStyle = '#1A1A1A';
            ctx.fillRect(offsetX + 5, 14, 2, 2);
            ctx.fillRect(offsetX + 9, 14, 2, 2);
        });

        texture.refresh();
        
        // Create animations
        scene.anims.create({
            key: 'walk-down',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'walk-left',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'walk-right',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'walk-up',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 8,
            repeat: -1
        });
    }

    static createTileTextures(scene) {
        // Floor tile
        const floorTexture = scene.textures.createCanvas('floor', 16, 16);
        const floorCtx = floorTexture.getContext();
        floorCtx.fillStyle = '#8B7355';
        floorCtx.fillRect(0, 0, 16, 16);
        floorCtx.fillStyle = '#6B5345';
        floorCtx.fillRect(0, 0, 8, 8);
        floorCtx.fillRect(8, 8, 8, 8);
        floorTexture.refresh();

        // Wall tile
        const wallTexture = scene.textures.createCanvas('wall', 16, 16);
        const wallCtx = wallTexture.getContext();
        wallCtx.fillStyle = '#4A4A4A';
        wallCtx.fillRect(0, 0, 16, 16);
        wallCtx.fillStyle = '#3A3A3A';
        wallCtx.fillRect(1, 1, 14, 14);
        wallTexture.refresh();

        // Grass tile
        const grassTexture = scene.textures.createCanvas('grass', 16, 16);
        const grassCtx = grassTexture.getContext();
        grassCtx.fillStyle = '#4CAF50';
        grassCtx.fillRect(0, 0, 16, 16);
        grassCtx.fillStyle = '#45A049';
        grassCtx.fillRect(2, 2, 2, 2);
        grassCtx.fillRect(8, 8, 2, 2);
        grassCtx.fillRect(12, 4, 2, 2);
        grassTexture.refresh();

        // Computer
        const computerTexture = scene.textures.createCanvas('computer', 32, 32);
        const compCtx = computerTexture.getContext();
        // Monitor
        compCtx.fillStyle = '#2A2A2A';
        compCtx.fillRect(4, 4, 24, 18);
        compCtx.fillStyle = '#0A66C2';
        compCtx.fillRect(6, 6, 20, 14);
        // Stand
        compCtx.fillStyle = '#3A3A3A';
        compCtx.fillRect(14, 22, 4, 6);
        compCtx.fillRect(10, 28, 12, 2);
        computerTexture.refresh();

        // Desk
        const deskTexture = scene.textures.createCanvas('desk', 48, 32);
        const deskCtx = deskTexture.getContext();
        deskCtx.fillStyle = '#8B7355';
        deskCtx.fillRect(0, 16, 48, 16);
        deskCtx.fillStyle = '#6B5345';
        deskCtx.fillRect(4, 20, 40, 8);
        deskTexture.refresh();

        // Door
        const doorTexture = scene.textures.createCanvas('door', 32, 48);
        const doorCtx = doorTexture.getContext();
        doorCtx.fillStyle = '#8B4513';
        doorCtx.fillRect(4, 0, 24, 44);
        doorCtx.fillStyle = '#A0522D';
        doorCtx.fillRect(6, 2, 20, 40);
        doorCtx.fillStyle = '#FFD700';
        doorCtx.fillRect(22, 22, 3, 3);
        doorTexture.refresh();

        // Bed
        const bedTexture = scene.textures.createCanvas('bed', 48, 64);
        const bedCtx = bedTexture.getContext();
        bedCtx.fillStyle = '#8B4513';
        bedCtx.fillRect(0, 32, 48, 32);
        bedCtx.fillStyle = '#E6E6FA';
        bedCtx.fillRect(2, 20, 44, 16);
        bedCtx.fillStyle = '#D8BFD8';
        bedCtx.fillRect(2, 10, 44, 10);
        bedTexture.refresh();

        // Person (for networking)
        const personTexture = scene.textures.createCanvas('person', 16, 16);
        const personCtx = personTexture.getContext();
        personCtx.fillStyle = '#FFD1B3';
        personCtx.fillRect(6, 3, 4, 4);
        personCtx.fillStyle = '#FF6B6B';
        personCtx.fillRect(5, 7, 6, 4);
        personCtx.fillStyle = '#2A2A2A';
        personCtx.fillRect(5, 11, 3, 3);
        personCtx.fillRect(8, 11, 3, 3);
        personTexture.refresh();
    }
}

// ============================================================================
// GAME SCENES
// ============================================================================

// Boot Scene - Loads assets
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create all pixel art sprites
        SpriteGenerator.createPlayerSprite(this);
        SpriteGenerator.createTileTextures(this);
    }

    create() {
        // Hide loading screen
        document.getElementById('loading').style.display = 'none';
        
        // Start the home scene
        this.scene.start('HomeScene');
    }
}

// Home Scene - Player's home office
class HomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HomeScene' });
    }

    create() {
        gameState.data.location = 'home';
        
        // Create room
        this.createRoom();
        
        // Create player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setScale(2);
        this.player.setCollideWorldBounds(true);
        
        // Camera follows player
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        // Create interactive objects
        this.createInteractiveObjects();
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        // Update UI
        updateUI();
        
        // Energy regeneration
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                if (gameState.data.player.energy < gameState.data.player.maxEnergy) {
                    gameState.data.player.energy = Math.min(
                        gameState.data.player.maxEnergy,
                        gameState.data.player.energy + 1
                    );
                    updateUI();
                }
            },
            loop: true
        });

        // Auto-save
        this.time.addEvent({
            delay: 30000,
            callback: () => gameState.saveGame(),
            loop: true
        });

        showNotification('Welcome home! Use WASD/Arrows to move, E to interact');
    }

    createRoom() {
        const width = 800;
        const height = 600;
        
        // Floor
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }

        // Walls
        this.walls = this.physics.add.staticGroup();
        
        // Top wall
        for (let x = 0; x < width; x += 16) {
            const wall = this.walls.create(x, 0, 'wall').setOrigin(0);
            wall.refreshBody();
        }
        
        // Bottom wall
        for (let x = 0; x < width; x += 16) {
            const wall = this.walls.create(x, height - 16, 'wall').setOrigin(0);
            wall.refreshBody();
        }
        
        // Left wall
        for (let y = 16; y < height - 16; y += 16) {
            const wall = this.walls.create(0, y, 'wall').setOrigin(0);
            wall.refreshBody();
        }
        
        // Right wall
        for (let y = 16; y < height - 16; y += 16) {
            const wall = this.walls.create(width - 16, y, 'wall').setOrigin(0);
            wall.refreshBody();
        }
    }

    createInteractiveObjects() {
        this.interactables = this.physics.add.staticGroup();
        
        // Desk with computer
        const desk = this.add.image(200, 150, 'desk');
        this.physics.add.existing(desk, true);
        
        const computer = this.interactables.create(200, 130, 'computer');
        computer.setData('type', 'computer');
        computer.setData('name', 'Work Computer');
        computer.refreshBody();

        // Bed
        const bed = this.interactables.create(600, 150, 'bed');
        bed.setData('type', 'bed');
        bed.setData('name', 'Bed');
        bed.refreshBody();

        // Door to outside
        const door = this.interactables.create(400, 560, 'door');
        door.setData('type', 'door');
        door.setData('name', 'Exit to City');
        door.setData('target', 'CityScene');
        door.refreshBody();

        // Collisions
        this.physics.add.collider(this.player, this.walls);
    }

    update() {
        this.handleMovement();
        this.checkInteractions();
    }

    handleMovement() {
        const speed = 100;
        let velocityX = 0;
        let velocityY = 0;

        // Check input
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -speed;
            this.player.anims.play('walk-left', true);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = speed;
            this.player.anims.play('walk-right', true);
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -speed;
            this.player.anims.play('walk-up', true);
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = speed;
            this.player.anims.play('walk-down', true);
        }

        // Apply velocity
        this.player.setVelocity(velocityX, velocityY);

        // Stop animation if not moving
        if (velocityX === 0 && velocityY === 0) {
            this.player.anims.stop();
        }
    }

    checkInteractions() {
        let nearestObject = null;
        let minDistance = Infinity;

        this.interactables.children.entries.forEach(obj => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                obj.x, obj.y
            );

            if (distance < 60 && distance < minDistance) {
                minDistance = distance;
                nearestObject = obj;
            }
        });

        if (nearestObject) {
            showInteractionPrompt(true);
            
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                this.interact(nearestObject);
            }
        } else {
            showInteractionPrompt(false);
        }
    }

    interact(object) {
        const type = object.getData('type');
        
        switch (type) {
            case 'computer':
                this.openComputerMenu();
                break;
            case 'bed':
                this.sleep();
                break;
            case 'door':
                this.changeScene(object.getData('target'));
                break;
        }
    }

    openComputerMenu() {
        // Add click sound effect (visual feedback)
        this.cameras.main.flash(100, 255, 255, 255, false, null, 0.3);
        this.scene.pause();
        this.scene.launch('ComputerMenuScene');
    }

    sleep() {
        if (gameState.data.player.energy < gameState.data.player.maxEnergy) {
            gameState.data.player.energy = Math.min(
                gameState.data.player.maxEnergy,
                gameState.data.player.energy + 50
            );
            showNotification('💤 You slept and recovered 50 energy!');
            updateUI();
            
            // Add particle effect
            this.createParticleEffect(this.player.x, this.player.y, '✨');
            this.createParticleEffect(this.player.x, this.player.y, '💤');
            
            // Screen fade effect
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.cameras.main.fadeIn(1000);
            });
        } else {
            showNotification('⚡ Energy is already full!');
        }
    }

    changeScene(targetScene) {
        this.cameras.main.fadeOut(500);
        this.time.delayedCall(500, () => {
            this.scene.start(targetScene);
        });
    }

    createParticleEffect(x, y, emoji) {
        for (let i = 0; i < 10; i++) {
            const text = this.add.text(x + Phaser.Math.Between(-20, 20), y, emoji, {
                fontSize: '16px'
            });
            
            this.tweens.add({
                targets: text,
                y: y - 50,
                x: text.x + Phaser.Math.Between(-20, 20),
                alpha: 0,
                rotation: Phaser.Math.Between(-1, 1),
                scale: 0.5,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => text.destroy()
            });
        }
    }

    createXPEffect() {
        const xpText = this.add.text(this.player.x, this.player.y - 30, '+XP', {
            fontSize: '14px',
            color: '#FFD700',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: xpText,
            y: xpText.y - 40,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => xpText.destroy()
        });
    }
}

// City Scene - Outdoor area with multiple locations
class CityScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CityScene' });
    }

    create() {
        gameState.data.location = 'city';
        
        // Create outdoor environment
        this.createOutdoorArea();
        
        // Create player
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setScale(2);
        this.player.setCollideWorldBounds(true);
        
        // Camera
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        // Create locations
        this.createLocations();
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('Welcome to the city! Find people to network with');
    }

    createOutdoorArea() {
        const width = 1200;
        const height = 900;
        
        this.physics.world.setBounds(0, 0, width, height);
        
        // Grass ground
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'grass').setOrigin(0);
            }
        }

        // Add some decorative elements
        this.add.text(width/2, 50, '🏙️ LINKEDIN CITY', {
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
    }

    createLocations() {
        this.interactables = this.physics.add.staticGroup();
        
        // Home door (to go back)
        const homeDoor = this.interactables.create(400, 550, 'door');
        homeDoor.setData('type', 'door');
        homeDoor.setData('name', 'Your Home');
        homeDoor.setData('target', 'HomeScene');
        homeDoor.refreshBody();

        // Coffee shop
        const coffeeShop = this.add.rectangle(200, 300, 100, 100, 0x8B4513);
        this.physics.add.existing(coffeeShop, true);
        coffeeShop.setData('type', 'location');
        coffeeShop.setData('name', 'Coffee Shop');
        this.interactables.add(coffeeShop);
        this.add.text(200, 250, '☕ Coffee Shop', {
            fontSize: '12px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Conference center
        const conference = this.add.rectangle(600, 300, 120, 100, 0x0A66C2);
        this.physics.add.existing(conference, true);
        conference.setData('type', 'location');
        conference.setData('name', 'Conference Center');
        this.interactables.add(conference);
        this.add.text(600, 250, '🎯 Events', {
            fontSize: '12px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // People to network with
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(150, 450);
            const person = this.interactables.create(x, y, 'person');
            person.setScale(2);
            person.setData('type', 'person');
            person.setData('name', `Professional ${i + 1}`);
            person.refreshBody();
        }
    }

    update() {
        this.handleMovement();
        this.checkInteractions();
    }

    handleMovement() {
        const speed = 100;
        let velocityX = 0;
        let velocityY = 0;

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -speed;
            this.player.anims.play('walk-left', true);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = speed;
            this.player.anims.play('walk-right', true);
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -speed;
            this.player.anims.play('walk-up', true);
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = speed;
            this.player.anims.play('walk-down', true);
        }

        this.player.setVelocity(velocityX, velocityY);

        if (velocityX === 0 && velocityY === 0) {
            this.player.anims.stop();
        }
    }

    checkInteractions() {
        let nearestObject = null;
        let minDistance = Infinity;

        this.interactables.children.entries.forEach(obj => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                obj.x, obj.y
            );

            if (distance < 60 && distance < minDistance) {
                minDistance = distance;
                nearestObject = obj;
            }
        });

        if (nearestObject) {
            showInteractionPrompt(true);
            
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                this.interact(nearestObject);
            }
        } else {
            showInteractionPrompt(false);
        }
    }

    interact(object) {
        const type = object.getData('type');
        const name = object.getData('name');
        
        switch (type) {
            case 'person':
                this.networkWithPerson(name);
                break;
            case 'location':
                this.visitLocation(name);
                break;
            case 'door':
                this.changeScene(object.getData('target'));
                break;
        }
    }

    networkWithPerson(name) {
        if (gameState.useEnergy(10)) {
            const success = Math.random() > 0.3;
            
            if (success) {
                gameState.data.player.connections++;
                gameState.data.player.networking += 5;
                gameState.gainXP(15);
                showNotification(`🤝 Connected with ${name}!`);
                
                // Camera shake
                this.cameras.main.shake(200, 0.002);
                
                // Visual effects
                this.createFloatingText(this.player.x, this.player.y - 30, '+15 XP', '#FFD700');
                this.createParticleEffect(this.player.x, this.player.y, '🤝');
                this.cameras.main.flash(100, 0, 200, 0, false, null, 0.2);
            } else {
                showNotification(`❌ ${name} didn't respond`);
            }
            
            updateUI();
        } else {
            showNotification('⚡ Not enough energy!');
        }
    }

    createFloatingText(x, y, text, color) {
        const floatingText = this.add.text(x, y, text, {
            fontSize: '16px',
            color: color,
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: floatingText,
            y: y - 50,
            alpha: 0,
            scale: 1.5,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => floatingText.destroy()
        });
    }

    createParticleEffect(x, y, emoji) {
        for (let i = 0; i < 8; i++) {
            const text = this.add.text(x + Phaser.Math.Between(-20, 20), y, emoji, {
                fontSize: '16px'
            });
            
            this.tweens.add({
                targets: text,
                y: y - 40,
                x: text.x + Phaser.Math.Between(-30, 30),
                alpha: 0,
                rotation: Phaser.Math.Between(-2, 2),
                scale: 0.3,
                duration: 1200,
                ease: 'Power2',
                onComplete: () => text.destroy()
            });
        }
    }

    visitLocation(name) {
        if (name === 'Coffee Shop') {
            if (gameState.data.player.coins >= 20) {
                gameState.data.player.coins -= 20;
                gameState.data.player.energy = Math.min(
                    gameState.data.player.maxEnergy,
                    gameState.data.player.energy + 30
                );
                showNotification('☕ Coffee restored 30 energy!');
                this.createFloatingText(this.player.x, this.player.y - 30, '+30 ⚡', '#00FF88');
                this.createParticleEffect(this.player.x, this.player.y, '☕');
                updateUI();
            } else {
                showNotification('💰 Not enough coins!');
            }
        } else if (name === 'Conference Center') {
            this.attendEvent();
        }
    }

    attendEvent() {
        if (gameState.useEnergy(20)) {
            gameState.data.player.coins += 100;
            gameState.data.player.reputation += 10;
            gameState.gainXP(50);
            showNotification('🎯 Event completed! +100 coins, +10 reputation');
            
            // Visual effects
            this.createFloatingText(this.player.x, this.player.y - 30, '+100 💰', '#FFD700');
            this.createFloatingText(this.player.x, this.player.y - 50, '+50 XP', '#00FF88');
            this.createConfetti();
            this.cameras.main.shake(300, 0.003);
            this.cameras.main.flash(200, 255, 215, 0, false, null, 0.3);
            updateUI();
        } else {
            showNotification('⚡ Not enough energy!');
        }
    }

    createConfetti() {
        const emojis = ['🎉', '⭐', '✨', '🎊'];
        for (let i = 0; i < 20; i++) {
            const x = this.player.x + Phaser.Math.Between(-50, 50);
            const y = this.player.y - 50;
            const emoji = Phaser.Math.RND.pick(emojis);
            
            const text = this.add.text(x, y, emoji, { fontSize: '20px' });
            
            this.tweens.add({
                targets: text,
                y: y + Phaser.Math.Between(50, 100),
                x: x + Phaser.Math.Between(-30, 30),
                alpha: 0,
                duration: 1500,
                ease: 'Power2',
                onComplete: () => text.destroy()
            });
        }
    }

    changeScene(targetScene) {
        this.cameras.main.fadeOut(500);
        this.time.delayedCall(500, () => {
            this.scene.start(targetScene);
        });
    }
}

// Computer Menu Scene - For creating posts and managing profile
class ComputerMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ComputerMenuScene' });
    }

    create() {
        const width = 800;
        const height = 600;
        
        // Dark overlay
        const overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.8);
        
        // Menu background
        const menuBg = this.add.rectangle(width/2, height/2, 500, 400, 0x0A66C2);
        menuBg.setStrokeStyle(4, 0xffffff);
        
        // Title
        this.add.text(width/2, 150, '💻 LINKEDIN DASHBOARD', {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Create buttons
        this.createButton(width/2, 250, '✍️ Create Post (15⚡)', () => this.createPost());
        this.createButton(width/2, 320, '📚 Learn Skills (50💰)', () => this.learnSkills());
        this.createButton(width/2, 390, '👁️ View Profile', () => this.viewProfile());
        this.createButton(width/2, 460, '❌ Close', () => this.closeMenu());

        // ESC to close
        this.input.keyboard.on('keydown-ESC', () => this.closeMenu());
    }

    createButton(x, y, text, callback) {
        const button = this.add.rectangle(x, y, 400, 50, 0x004182);
        button.setStrokeStyle(2, 0xffffff);
        button.setInteractive();
        
        const buttonText = this.add.text(x, y, text, {
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(0.5);

        button.on('pointerover', () => {
            button.setFillStyle(0x0066CC);
            button.setScale(1.05);
        });

        button.on('pointerout', () => {
            button.setFillStyle(0x004182);
            button.setScale(1);
        });

        button.on('pointerdown', callback);
    }

    createPost() {
        if (gameState.useEnergy(15)) {
            const likes = Phaser.Math.Between(10, 100);
            const viral = likes > 80;
            
            gameState.data.player.postsCount++;
            gameState.data.player.reputation += viral ? 20 : 5;
            gameState.data.player.followers += Math.floor(likes / 10);
            gameState.data.player.coins += likes;
            gameState.gainXP(viral ? 100 : 20);
            
            if (viral) {
                showNotification(`🔥 Your post went VIRAL! ${likes} likes!`);
                this.cameras.main.shake(400, 0.005);
                this.cameras.main.flash(300, 255, 100, 0);
            } else {
                showNotification(`✍️ Post published! ${likes} likes`);
                this.cameras.main.flash(200, 10, 102, 194, false, null, 0.3);
            }
            
            updateUI();
            this.closeMenu();
        } else {
            showNotification('⚡ Not enough energy!');
        }
    }

    learnSkills() {
        if (gameState.data.player.coins >= 50) {
            gameState.data.player.coins -= 50;
            gameState.data.player.skills += 10;
            gameState.gainXP(25);
            showNotification('📚 Skills improved! +10 skills');
            this.cameras.main.flash(200, 0, 150, 255, false, null, 0.3);
            updateUI();
            this.closeMenu();
        } else {
            showNotification('💰 Not enough coins!');
        }
    }

    viewProfile() {
        const p = gameState.data.player;
        showNotification(`${p.name} | ${p.title} | Lvl ${p.level} | ${p.connections} connections`);
    }

    closeMenu() {
        this.scene.stop();
        this.scene.resume('HomeScene');
    }
}

// ============================================================================
// PHASER GAME CONFIGURATION
// ============================================================================

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2a2a2a',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, HomeScene, CityScene, ComputerMenuScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Initialize the game
const game = new Phaser.Game(config);

// Update UI periodically
setInterval(updateUI, 1000);

