// ============================================================================
// LINKEDIN TYCOON - PIXEL ART EDITION - ENHANCED VERSION
// A fully immersive 2D pixel art RPG where you build your professional empire
// ============================================================================

// Story & Dialogue System
class StoryManager {
    constructor() {
        this.currentStory = 0;
        this.stories = [
            {
                title: "📖 Chapter 1: The Graduate",
                text: "You've just graduated from university with a Computer Science degree. Student loans loom, but so do opportunities. Your apartment is small, your network smaller. But you have a laptop, ambition, and LinkedIn. Your mission: Build a professional empire. Your journey starts now.",
                action: "Begin Your Journey"
            },
            {
                title: "📖 Chapter 2: First Impressions",
                text: "Morning light filters through your window. Your laptop beckons. Every influencer started somewhere - usually with a single post. What will yours say? Will it resonate? Will anyone notice? There's only one way to find out. Create your first post and step into the professional arena.",
                action: "Create My First Post"
            },
            {
                title: "📖 Chapter 3: The Network Effect",
                text: "Congratulations! Your first post is live. A few likes trickle in. But you realize something: in the digital age, you're invisible without connections. Your network is your net worth. Time to venture into LinkedIn City and meet real professionals. Each handshake is a door. Each conversation is an opportunity.",
                action: "Explore the City"
            },
            {
                title: "📖 Chapter 4: Growing Influence",
                text: "You're no longer a nobody. You have connections. Posts. A reputation building. People are starting to notice. Your followers grow. But this is just the beginning. Tech companies are watching. Recruiters are taking notes. Keep pushing. The path to becoming a thought leader has just begun.",
                action: "Continue Building"
            },
            {
                title: "📖 Chapter 5: The Influencer Path",
                text: "You're at a crossroads. You could play it safe - keep your 9-5, post occasionally, network moderately. Or you could go all in. Max out your skills. Attend every event. Connect with everyone. Build something bigger than yourself. The choice is yours. But remember: Fortune favors the bold.",
                action: "Go All In"
            }
        ];
        this.currentChapter = 0;
    }
    
    triggerChapter(chapterNum) {
        if (chapterNum <= this.currentChapter) return;
        this.currentChapter = chapterNum;
        this.showStory(chapterNum);
    }

    showStory(index) {
        if (index >= this.stories.length) return;
        
        const story = this.stories[index];
        const overlay = document.getElementById('story-overlay');
        document.getElementById('story-title').textContent = story.title;
        document.getElementById('story-text').textContent = story.text;
        document.getElementById('story-continue').textContent = story.action;
        overlay.style.display = 'flex';
        
        this.currentStory = index;
    }

    closeStory() {
        document.getElementById('story-overlay').style.display = 'none';
    }
}

class DialogueManager {
    constructor() {
        this.currentDialogue = null;
        this.npcs = {
            'Sarah Chen': {
                intro: "Hey! I'm Sarah, a product manager at a startup. Always looking to connect with talented engineers!",
                responses: {
                    networking: "Networking is everything in this industry. The more people you know, the more doors open!",
                    advice: "My advice? Post consistently and engage with others. Don't just broadcast - have real conversations.",
                    goodbye: "Let's stay connected! Feel free to reach out anytime."
                }
            },
            'Marcus Johnson': {
                intro: "Marcus here, Senior Developer. Been in the game for 10 years. What brings you here?",
                responses: {
                    networking: "At your level, quantity matters. Connect with everyone you can. Later, you can be selective.",
                    advice: "Learn TypeScript and React. Trust me, they're everywhere in job postings right now.",
                    goodbye: "Good luck out there. It's a jungle, but you'll make it!"
                }
            },
            'Emily Rodriguez': {
                intro: "Hi! Emily Rodriguez, Tech Recruiter. I help engineers find their dream jobs. Looking for opportunities?",
                responses: {
                    networking: "Your profile is your resume now. Make sure it tells a story. And connections? They're your references.",
                    advice: "Attend virtual events, contribute to discussions, and don't be afraid to reach out to people. Most folks are happy to chat!",
                    goodbye: "Let's connect officially! I'll keep you in mind for openings."
                }
            },
            'David Park': {
                intro: "What's up? David Park. I run a coding YouTube channel. Tech content is the future!",
                responses: {
                    networking: "Dude, LinkedIn is insane for growth. I went from 50 to 5000 followers in 6 months just by posting daily.",
                    advice: "Post about your projects, share what you're learning. People love authenticity over perfection.",
                    goodbye: "Follow me! And tag me in your posts - I'll share the good stuff!"
                }
            },
            'Dr. Jennifer Liu': {
                intro: "Hello, I'm Dr. Liu. I teach Computer Science and mentor young professionals. How can I help you?",
                responses: {
                    networking: "Networking isn't just about collecting connections. It's about building genuine relationships. Quality over quantity.",
                    advice: "Never stop learning. The industry changes fast. Invest in skills that compound - fundamentals, communication, and problem-solving.",
                    goodbye: "Feel free to reach out if you need mentorship. My door is always open."
                }
            }
        };
    }

    showDialogue(npcName, scene) {
        const npc = this.npcs[npcName];
        if (!npc) return;

        const box = document.getElementById('dialogue-box');
        const speaker = document.getElementById('dialogue-speaker');
        const text = document.getElementById('dialogue-text');
        const choices = document.getElementById('dialogue-choices');

        speaker.textContent = npcName;
        text.textContent = npc.intro;
        
        choices.innerHTML = '';
        const options = [
            { text: "💼 Tell me about networking", key: 'networking' },
            { text: "💡 Got any advice?", key: 'advice' },
            { text: "👋 Nice meeting you!", key: 'goodbye' }
        ];

        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'dialogue-choice';
            btn.textContent = option.text;
            btn.onclick = () => {
                if (option.key === 'goodbye') {
                    this.closeDialogue(scene);
                    if (scene && scene.networkWithPerson) {
                        scene.networkWithPerson(npcName, true);
                    }
                } else {
                    text.textContent = npc.responses[option.key];
                }
            };
            choices.appendChild(btn);
        });

        box.style.display = 'block';
        this.currentDialogue = npcName;
    }

    closeDialogue(scene) {
        document.getElementById('dialogue-box').style.display = 'none';
        this.currentDialogue = null;
    }
}

class QuestManager {
    constructor() {
        this.quests = [
            { id: 1, title: "Create your first post", completed: false, reward: { xp: 25, coins: 50 } },
            { id: 2, title: "Make 3 connections", completed: false, reward: { xp: 50, coins: 100 } },
            { id: 3, title: "Attend a virtual event", completed: false, reward: { xp: 75, coins: 150 } },
            { id: 4, title: "Reach 100 followers", completed: false, reward: { xp: 100, coins: 200 } },
            { id: 5, title: "Create a viral post (80+ likes)", completed: false, reward: { xp: 150, coins: 300 } },
            { id: 6, title: "Reach Level 5", completed: false, reward: { xp: 200, coins: 500 } },
            { id: 7, title: "Make 10 connections", completed: false, reward: { xp: 100, coins: 250 } },
            { id: 8, title: "Learn 3 new skills", completed: false, reward: { xp: 150, coins: 300 } }
        ];
        this.updateDisplay();
    }

    checkQuest(questId) {
        const quest = this.quests.find(q => q.id === questId);
        if (quest && !quest.completed) {
            quest.completed = true;
            gameState.data.player.coins += quest.reward.coins;
            gameState.gainXP(quest.reward.xp);
            showNotification(`🎯 Quest Complete! ${quest.title} (+${quest.reward.xp} XP, +${quest.reward.coins} 💰)`);
            showAchievement(quest.title);
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const tracker = document.getElementById('quest-tracker');
        const list = document.getElementById('quest-list');
        const activeQuests = this.quests.filter(q => !q.completed);
        
        if (activeQuests.length > 0) {
            tracker.style.display = 'block';
            list.innerHTML = activeQuests.slice(0, 3).map(q => 
                `<div class="quest-item">${q.title}</div>`
            ).join('');
        }
    }

    checkAllQuests(gameData) {
        // Check post quest
        if (gameData.player.postsCount >= 1) this.checkQuest(1);
        
        // Check connection quests
        if (gameData.player.connections >= 3) this.checkQuest(2);
        if (gameData.player.connections >= 10) this.checkQuest(7);
        
        // Check follower quest
        if (gameData.player.followers >= 100) this.checkQuest(4);
        
        // Check level quest
        if (gameData.player.level >= 5) this.checkQuest(6);
    }
}

// Item Database
class ItemManager {
    constructor() {
        this.itemDatabase = {
            'energy_drink': {
                name: 'Energy Drink',
                icon: '🥤',
                type: 'consumable',
                energyBoost: 50,
                effect: '+50 Energy',
                rarity: 'common'
            },
            'coffee': {
                name: 'Coffee',
                icon: '☕',
                type: 'consumable',
                energyBoost: 30,
                effect: '+30 Energy',
                rarity: 'common'
            },
            'protein_bar': {
                name: 'Protein Bar',
                icon: '🍫',
                type: 'consumable',
                energyBoost: 20,
                effect: '+20 Energy',
                rarity: 'common'
            },
            'lucky_coin': {
                name: 'Lucky Coin',
                icon: '🪙',
                type: 'consumable',
                coinBoost: 100,
                effect: '+100 Coins',
                rarity: 'uncommon'
            },
            'xp_boost': {
                name: 'XP Booster',
                icon: '⭐',
                type: 'consumable',
                xpBoost: 50,
                effect: '+50 XP',
                rarity: 'uncommon'
            },
            'basic_laptop': {
                name: 'Basic Laptop',
                icon: '💻',
                type: 'equipment',
                slot: 'laptop',
                effect: '+10% Post Quality',
                rarity: 'common'
            },
            'pro_laptop': {
                name: 'Pro Laptop',
                icon: '💻',
                type: 'equipment',
                slot: 'laptop',
                effect: '+25% Post Quality',
                rarity: 'rare'
            },
            'smartphone': {
                name: 'Smartphone',
                icon: '📱',
                type: 'equipment',
                slot: 'phone',
                effect: '+15% Networking',
                rarity: 'common'
            },
            'pro_phone': {
                name: 'Pro Phone',
                icon: '📱',
                type: 'equipment',
                slot: 'phone',
                effect: '+30% Networking',
                rarity: 'rare'
            },
            'leather_briefcase': {
                name: 'Leather Briefcase',
                icon: '💼',
                type: 'equipment',
                slot: 'briefcase',
                effect: '+20 Reputation',
                rarity: 'uncommon'
            },
            'designer_briefcase': {
                name: 'Designer Briefcase',
                icon: '💼',
                type: 'equipment',
                slot: 'briefcase',
                effect: '+50 Reputation',
                rarity: 'rare'
            },
            'business_suit': {
                name: 'Business Suit',
                icon: '👔',
                type: 'equipment',
                slot: 'outfit',
                effect: '+15 Reputation',
                rarity: 'uncommon'
            },
            'designer_suit': {
                name: 'Designer Suit',
                icon: '👔',
                type: 'equipment',
                slot: 'outfit',
                effect: '+40 Reputation',
                rarity: 'rare'
            }
        };
    }
    
    getItem(itemId) {
        return {...this.itemDatabase[itemId]};
    }
    
    addItemToInventory(itemId) {
        const item = this.getItem(itemId);
        if (item) {
            gameState.data.player.inventory.push(item);
            gameState.saveGame();
            return true;
        }
        return false;
    }
    
    spawnRandomItem() {
        const commonItems = ['energy_drink', 'coffee', 'protein_bar'];
        const uncommonItems = ['lucky_coin', 'xp_boost', 'leather_briefcase', 'business_suit'];
        const rareItems = ['pro_laptop', 'pro_phone', 'designer_briefcase', 'designer_suit'];
        
        const roll = Math.random();
        let itemId;
        
        if (roll < 0.6) {
            itemId = Phaser.Math.RND.pick(commonItems);
        } else if (roll < 0.9) {
            itemId = Phaser.Math.RND.pick(uncommonItems);
        } else {
            itemId = Phaser.Math.RND.pick(rareItems);
        }
        
        return itemId;
    }
}

// Global managers
const storyManager = new StoryManager();
const dialogueManager = new DialogueManager();
const questManager = new QuestManager();
const itemManager = new ItemManager();

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
                badges: ['🎓 Student'],
                inventory: [], // New inventory system
                equipment: { // Currently equipped items
                    laptop: null,
                    phone: null,
                    briefcase: null,
                    outfit: 'default'
                },
                job: null, // Current job
                salary: 0, // Income per day
                apartmentLevel: 1 // Apartment upgrade level
            },
            location: 'home',
            lastEnergyUpdate: Date.now(),
            posts: [],
            connections: [],
            events: [],
            completedChallenges: [],
            achievements: [],
            time: 'morning', // morning, afternoon, evening, night
            weather: 'sunny', // sunny, rain, cloudy
            gameTime: 0,
            tutorialComplete: false,
            emails: [] // Email inbox
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
        showAchievement(`Level ${this.data.player.level} Reached!`);
        
        // Milestone achievements
        if (this.data.player.level === 5) showAchievement('Rising Star 🌟');
        if (this.data.player.level === 10) showAchievement('Professional 💼');
        if (this.data.player.level === 20) showAchievement('Industry Leader 🏆');
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
    
    // Update time/weather display
    const timeMap = {
        morning: '☀️ Morning',
        afternoon: '🌤️ Afternoon', 
        evening: '🌆 Evening',
        night: '🌙 Night'
    };
    
    const weatherMap = {
        sunny: '☀️ Sunny',
        rain: '🌧️ Rainy',
        cloudy: '☁️ Cloudy'
    };
    
    document.getElementById('game-time').textContent = timeMap[gameState.data.time] || 'Morning';
    document.getElementById('game-weather').textContent = weatherMap[gameState.data.weather] || 'Sunny';
    
    // Update email count
    const emailCount = gameState.data.emails ? gameState.data.emails.filter(e => !e.read).length : 0;
    document.getElementById('email-count').textContent = emailCount;
}

function showNotification(message) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.style.display = 'block';
    setTimeout(() => {
        notif.style.display = 'none';
    }, 3000);
}

function showAchievement(title) {
    const popup = document.getElementById('achievement-popup');
    const text = document.getElementById('achievement-text');
    text.textContent = title;
    popup.classList.add('show');
    popup.style.display = 'block';
    
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 600);
    }, 3000);
}

function showInteractionPrompt(show) {
    document.getElementById('interaction-prompt').style.display = show ? 'block' : 'none';
}

// Sprite Generator - Creates pixel art programmatically
class SpriteGenerator {
    static createPlayerSprite(scene) {
        const size = 32; // Bigger, better detail
        const texture = scene.textures.createCanvas('player', size, size);
        const ctx = texture.getContext();
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(6, 28, 20, 3);
        
        // Shoes
        ctx.fillStyle = '#2C2C2C';
        ctx.fillRect(9, 24, 5, 4);
        ctx.fillRect(18, 24, 5, 4);
        
        // Pants
        ctx.fillStyle = '#1E3A8A';
        ctx.fillRect(8, 16, 7, 8);
        ctx.fillRect(17, 16, 7, 8);
        ctx.fillStyle = '#2563EB';
        ctx.fillRect(9, 17, 5, 6);
        ctx.fillRect(18, 17, 5, 6);
        
        // Belt
        ctx.fillStyle = '#4A4A4A';
        ctx.fillRect(8, 15, 16, 1);
        
        // Shirt (LinkedIn Blue)
        ctx.fillStyle = '#0A66C2';
        ctx.fillRect(7, 9, 18, 7);
        ctx.fillStyle = '#0E7FE8';
        ctx.fillRect(8, 10, 16, 5);
        
        // Collar
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(14, 9, 4, 2);
        
        // Arms
        ctx.fillStyle = '#0A66C2';
        ctx.fillRect(5, 10, 2, 6);
        ctx.fillRect(25, 10, 2, 6);
        ctx.fillStyle = '#FFD1B3';
        ctx.fillRect(5, 16, 2, 4);
        ctx.fillRect(25, 16, 2, 4);
        
        // Neck
        ctx.fillStyle = '#FFD1B3';
        ctx.fillRect(13, 7, 6, 3);
        
        // Head
        ctx.fillStyle = '#FFD1B3';
        ctx.fillRect(11, 1, 10, 8);
        ctx.fillStyle = '#FFB380';
        ctx.fillRect(12, 2, 8, 6);
        
        // Hair
        ctx.fillStyle = '#3D2817';
        ctx.fillRect(10, 0, 12, 3);
        ctx.fillRect(9, 1, 2, 4);
        ctx.fillRect(21, 1, 2, 4);
        ctx.fillStyle = '#5C4033';
        ctx.fillRect(11, 1, 10, 2);
        
        // Eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(13, 4, 2, 2);
        ctx.fillRect(17, 4, 2, 2);
        ctx.fillStyle = '#2C2C2C';
        ctx.fillRect(14, 4, 1, 2);
        ctx.fillRect(18, 4, 1, 2);
        
        // Smile
        ctx.fillStyle = '#E87E7E';
        ctx.fillRect(14, 6, 4, 1);
        ctx.fillRect(13, 7, 1, 1);
        ctx.fillRect(18, 7, 1, 1);
        
        texture.refresh();
        
        // Single sprite, no animation needed for now - cleaner look
        scene.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 1
        });
    }

    static createTileTextures(scene) {
        // Enhanced Floor tile with wood grain
        const floorTexture = scene.textures.createCanvas('floor', 16, 16);
        const floorCtx = floorTexture.getContext();
        floorCtx.fillStyle = '#8B7355';
        floorCtx.fillRect(0, 0, 16, 16);
        floorCtx.fillStyle = '#6B5345';
        floorCtx.fillRect(0, 0, 8, 8);
        floorCtx.fillRect(8, 8, 8, 8);
        floorCtx.fillStyle = '#7B6355';
        floorCtx.fillRect(4, 0, 1, 16);
        floorCtx.fillRect(12, 0, 1, 16);
        floorTexture.refresh();

        // Enhanced Wall tile with texture
        const wallTexture = scene.textures.createCanvas('wall', 16, 16);
        const wallCtx = wallTexture.getContext();
        wallCtx.fillStyle = '#4A4A4A';
        wallCtx.fillRect(0, 0, 16, 16);
        wallCtx.fillStyle = '#3A3A3A';
        wallCtx.fillRect(1, 1, 14, 14);
        wallCtx.fillStyle = '#5A5A5A';
        wallCtx.fillRect(2, 2, 1, 1);
        wallCtx.fillRect(8, 8, 1, 1);
        wallCtx.fillRect(14, 4, 1, 1);
        wallTexture.refresh();

        // PROFESSIONAL grass tile with depth and detail
        const grassTexture = scene.textures.createCanvas('grass', 16, 16);
        const grassCtx = grassTexture.getContext();
        // Base layers - multiple green tones for depth
        grassCtx.fillStyle = '#3A8F3E';
        grassCtx.fillRect(0, 0, 16, 16);
        grassCtx.fillStyle = '#4CAF50';
        grassCtx.fillRect(0, 0, 8, 8);
        grassCtx.fillRect(8, 8, 8, 8);
        grassCtx.fillStyle = '#45A049';
        grassCtx.fillRect(4, 4, 4, 4);
        grassCtx.fillRect(12, 12, 4, 4);
        // Dark grass blades for depth
        grassCtx.fillStyle = '#2E7D32';
        grassCtx.fillRect(1, 1, 1, 2);
        grassCtx.fillRect(4, 6, 1, 2);
        grassCtx.fillRect(10, 3, 1, 2);
        grassCtx.fillRect(14, 9, 1, 2);
        grassCtx.fillRect(7, 13, 1, 2);
        // Medium grass blades
        grassCtx.fillStyle = '#45A049';
        grassCtx.fillRect(2, 3, 1, 2);
        grassCtx.fillRect(6, 8, 1, 2);
        grassCtx.fillRect(11, 5, 1, 2);
        grassCtx.fillRect(8, 11, 1, 2);
        grassCtx.fillRect(13, 1, 1, 2);
        // Light grass highlights
        grassCtx.fillStyle = '#66BB6A';
        grassCtx.fillRect(3, 2, 1, 1);
        grassCtx.fillRect(7, 7, 1, 1);
        grassCtx.fillRect(12, 4, 1, 1);
        grassCtx.fillRect(9, 12, 1, 1);
        grassCtx.fillRect(14, 10, 1, 1);
        // Small flowers occasionally
        grassCtx.fillStyle = '#FFEB3B';
        grassCtx.fillRect(5, 5, 1, 1);
        grassCtx.fillStyle = '#FF9800';
        grassCtx.fillRect(11, 11, 1, 1);
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

        // UNIQUE CHARACTER SPRITES - Different bodies, hairstyles, outfits
        
        // Sarah Chen - Female, long hair, professional dress
        const sarah = scene.textures.createCanvas('npc1', 32, 32);
        const sCtx = sarah.getContext();
        sCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        sCtx.fillRect(6, 28, 20, 3);
        // Heels
        sCtx.fillStyle = '#C41E3A';
        sCtx.fillRect(9, 25, 4, 3);
        sCtx.fillRect(19, 25, 4, 3);
        // Dress (red)
        sCtx.fillStyle = '#E63946';
        sCtx.fillRect(7, 10, 18, 15);
        sCtx.fillStyle = '#FF6B6B';
        sCtx.fillRect(8, 11, 16, 13);
        // Arms (slim)
        sCtx.fillStyle = '#FFD1B3';
        sCtx.fillRect(5, 12, 2, 8);
        sCtx.fillRect(25, 12, 2, 8);
        // Neck
        sCtx.fillStyle = '#FFD1B3';
        sCtx.fillRect(13, 8, 6, 3);
        // Head (slightly smaller)
        sCtx.fillStyle = '#FFD1B3';
        sCtx.fillRect(11, 2, 10, 7);
        sCtx.fillStyle = '#FFB380';
        sCtx.fillRect(12, 3, 8, 5);
        // Long hair (dark brown)
        sCtx.fillStyle = '#2C1810';
        sCtx.fillRect(9, 1, 14, 3);
        sCtx.fillRect(9, 3, 3, 8);
        sCtx.fillRect(20, 3, 3, 8);
        sCtx.fillRect(10, 9, 2, 3);
        sCtx.fillRect(20, 9, 2, 3);
        // Eyes
        sCtx.fillStyle = '#FFFFFF';
        sCtx.fillRect(13, 5, 2, 2);
        sCtx.fillRect(17, 5, 2, 2);
        sCtx.fillStyle = '#4A2C2A';
        sCtx.fillRect(14, 5, 1, 2);
        sCtx.fillRect(18, 5, 1, 2);
        // Lipstick
        sCtx.fillStyle = '#C41E3A';
        sCtx.fillRect(14, 7, 4, 1);
        sarah.refresh();
        
        // Create mentor badge sprite
        const mentorBadge = scene.textures.createCanvas('mentor_badge', 16, 16);
        const mbCtx = mentorBadge.getContext();
        mbCtx.fillStyle = '#FFD700';
        mbCtx.beginPath();
        mbCtx.arc(8, 8, 7, 0, Math.PI * 2);
        mbCtx.fill();
        mbCtx.fillStyle = '#000000';
        mbCtx.fillText('M', 5, 11);
        mentorBadge.refresh();
        
        // Marcus Johnson - Male, bald/short hair, athletic build
        const marcus = scene.textures.createCanvas('npc2', 32, 32);
        const mCtx = marcus.getContext();
        mCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        mCtx.fillRect(6, 28, 20, 3);
        // Sneakers
        mCtx.fillStyle = '#FFFFFF';
        mCtx.fillRect(9, 24, 5, 4);
        mCtx.fillRect(18, 24, 5, 4);
        mCtx.fillStyle = '#000000';
        mCtx.fillRect(9, 24, 5, 2);
        mCtx.fillRect(18, 24, 5, 2);
        // Athletic pants
        mCtx.fillStyle = '#2C2C2C';
        mCtx.fillRect(8, 16, 7, 8);
        mCtx.fillRect(17, 16, 7, 8);
        // Belt
        mCtx.fillStyle = '#654321';
        mCtx.fillRect(8, 15, 16, 1);
        // Polo shirt (blue)
        mCtx.fillStyle = '#457B9D';
        mCtx.fillRect(6, 9, 20, 7);
        mCtx.fillStyle = '#5B9ABD';
        mCtx.fillRect(7, 10, 18, 5);
        // Collar
        mCtx.fillStyle = '#FFFFFF';
        mCtx.fillRect(13, 9, 6, 2);
        // Muscular arms (thicker)
        mCtx.fillStyle = '#A0826D';
        mCtx.fillRect(4, 11, 3, 8);
        mCtx.fillRect(25, 11, 3, 8);
        // Neck (broader)
        mCtx.fillStyle = '#A0826D';
        mCtx.fillRect(12, 7, 8, 3);
        // Head (darker skin)
        mCtx.fillStyle = '#A0826D';
        mCtx.fillRect(10, 1, 12, 8);
        mCtx.fillStyle = '#8B6F47';
        mCtx.fillRect(11, 2, 10, 6);
        // Very short hair/bald
        mCtx.fillStyle = '#1A1A1A';
        mCtx.fillRect(10, 0, 12, 2);
        // Eyes
        mCtx.fillStyle = '#FFFFFF';
        mCtx.fillRect(13, 4, 2, 2);
        mCtx.fillRect(17, 4, 2, 2);
        mCtx.fillStyle = '#2C2C2C';
        mCtx.fillRect(14, 4, 1, 2);
        mCtx.fillRect(18, 4, 1, 2);
        // Beard
        mCtx.fillStyle = '#1A1A1A';
        mCtx.fillRect(12, 7, 8, 2);
        marcus.refresh();
        
        // Emily Rodriguez - Female, medium build, business casual
        const emily = scene.textures.createCanvas('npc3', 32, 32);
        const eCtx = emily.getContext();
        eCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        eCtx.fillRect(6, 28, 20, 3);
        // Flats
        eCtx.fillStyle = '#2A2A2A';
        eCtx.fillRect(9, 25, 5, 3);
        eCtx.fillRect(18, 25, 5, 3);
        // Pants
        eCtx.fillStyle = '#2C2C2C';
        eCtx.fillRect(8, 16, 7, 9);
        eCtx.fillRect(17, 16, 7, 9);
        eCtx.fillStyle = '#3A3A3A';
        eCtx.fillRect(9, 17, 5, 7);
        eCtx.fillRect(18, 17, 5, 7);
        // Blazer (teal)
        eCtx.fillStyle = '#2A9D8F';
        eCtx.fillRect(6, 9, 20, 7);
        eCtx.fillStyle = '#3ABDA9';
        eCtx.fillRect(7, 10, 18, 5);
        // Lapels
        eCtx.fillStyle = '#1A7D6F';
        eCtx.fillRect(7, 10, 3, 5);
        eCtx.fillRect(22, 10, 3, 5);
        // Arms
        eCtx.fillStyle = '#FFD1B3';
        eCtx.fillRect(5, 12, 2, 7);
        eCtx.fillRect(25, 12, 2, 7);
        // Neck
        eCtx.fillStyle = '#FFD1B3';
        eCtx.fillRect(13, 7, 6, 3);
        // Head
        eCtx.fillStyle = '#FFD1B3';
        eCtx.fillRect(11, 1, 10, 8);
        eCtx.fillStyle = '#FFB380';
        eCtx.fillRect(12, 2, 8, 6);
        // Medium wavy hair
        eCtx.fillStyle = '#4A2C2A';
        eCtx.fillRect(9, 0, 14, 4);
        eCtx.fillRect(8, 2, 3, 5);
        eCtx.fillRect(21, 2, 3, 5);
        eCtx.fillStyle = '#6A4C4A';
        eCtx.fillRect(10, 1, 12, 2);
        // Eyes
        eCtx.fillStyle = '#FFFFFF';
        eCtx.fillRect(13, 4, 2, 2);
        eCtx.fillRect(17, 4, 2, 2);
        eCtx.fillStyle = '#2C2C2C';
        eCtx.fillRect(14, 4, 1, 2);
        eCtx.fillRect(18, 4, 1, 2);
        // Smile
        eCtx.fillStyle = '#E87E7E';
        eCtx.fillRect(14, 6, 4, 1);
        emily.refresh();
        
        // David Park - Male, casual style, hoodie
        const david = scene.textures.createCanvas('npc4', 32, 32);
        const dCtx = david.getContext();
        dCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        dCtx.fillRect(6, 28, 20, 3);
        // Sneakers (colorful)
        dCtx.fillStyle = '#F4A261';
        dCtx.fillRect(8, 24, 6, 4);
        dCtx.fillRect(18, 24, 6, 4);
        dCtx.fillStyle = '#FFFFFF';
        dCtx.fillRect(8, 24, 6, 2);
        dCtx.fillRect(18, 24, 6, 2);
        // Jeans
        dCtx.fillStyle = '#4169E1';
        dCtx.fillRect(8, 16, 7, 8);
        dCtx.fillRect(17, 16, 7, 8);
        dCtx.fillStyle = '#6495ED';
        dCtx.fillRect(9, 17, 5, 6);
        dCtx.fillRect(18, 17, 5, 6);
        // Hoodie (orange)
        dCtx.fillStyle = '#F4A261';
        dCtx.fillRect(6, 9, 20, 8);
        dCtx.fillStyle = '#F6B98A';
        dCtx.fillRect(7, 10, 18, 6);
        // Hood strings
        dCtx.fillStyle = '#FFFFFF';
        dCtx.fillRect(13, 10, 1, 3);
        dCtx.fillRect(18, 10, 1, 3);
        // Arms in hoodie
        dCtx.fillStyle = '#F4A261';
        dCtx.fillRect(4, 10, 3, 7);
        dCtx.fillRect(25, 10, 3, 7);
        // Hands
        dCtx.fillStyle = '#FFD1B3';
        dCtx.fillRect(4, 17, 2, 3);
        dCtx.fillRect(26, 17, 2, 3);
        // Neck
        dCtx.fillStyle = '#FFD1B3';
        dCtx.fillRect(13, 7, 6, 3);
        // Head
        dCtx.fillStyle = '#FFD1B3';
        dCtx.fillRect(11, 1, 10, 8);
        dCtx.fillStyle = '#FFB380';
        dCtx.fillRect(12, 2, 8, 6);
        // Messy/spiky hair
        dCtx.fillStyle = '#3D2817';
        dCtx.fillRect(10, 0, 3, 3);
        dCtx.fillRect(13, 0, 3, 2);
        dCtx.fillRect(16, 0, 3, 3);
        dCtx.fillRect(19, 0, 3, 2);
        dCtx.fillRect(9, 1, 2, 3);
        dCtx.fillRect(21, 1, 2, 3);
        // Eyes
        dCtx.fillStyle = '#FFFFFF';
        dCtx.fillRect(13, 4, 2, 2);
        dCtx.fillRect(17, 4, 2, 2);
        dCtx.fillStyle = '#2C2C2C';
        dCtx.fillRect(14, 4, 1, 2);
        dCtx.fillRect(18, 4, 1, 2);
        // Grin
        dCtx.fillStyle = '#E87E7E';
        dCtx.fillRect(13, 7, 6, 1);
        dCtx.fillRect(12, 6, 1, 1);
        dCtx.fillRect(19, 6, 1, 1);
        david.refresh();
        
        // Dr. Jennifer Liu - Female, glasses, formal attire
        const liu = scene.textures.createCanvas('npc5', 32, 32);
        const lCtx = liu.getContext();
        lCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        lCtx.fillRect(6, 28, 20, 3);
        // Professional shoes
        lCtx.fillStyle = '#1A1A1A';
        lCtx.fillRect(9, 25, 5, 3);
        lCtx.fillRect(18, 25, 5, 3);
        // Dress pants
        lCtx.fillStyle = '#2C2C2C';
        lCtx.fillRect(8, 16, 7, 9);
        lCtx.fillRect(17, 16, 7, 9);
        lCtx.fillStyle = '#3A3A3A';
        lCtx.fillRect(9, 17, 5, 7);
        lCtx.fillRect(18, 17, 5, 7);
        // Suit jacket (purple)
        lCtx.fillStyle = '#9D4EDD';
        lCtx.fillRect(6, 9, 20, 7);
        lCtx.fillStyle = '#B57FED';
        lCtx.fillRect(7, 10, 18, 5);
        // White blouse underneath
        lCtx.fillStyle = '#FFFFFF';
        lCtx.fillRect(12, 9, 8, 2);
        // Arms
        lCtx.fillStyle = '#FFD1B3';
        lCtx.fillRect(5, 11, 2, 7);
        lCtx.fillRect(25, 11, 2, 7);
        // Neck
        lCtx.fillStyle = '#FFD1B3';
        lCtx.fillRect(13, 7, 6, 3);
        // Head
        lCtx.fillStyle = '#FFD1B3';
        lCtx.fillRect(11, 1, 10, 8);
        lCtx.fillStyle = '#FFB380';
        lCtx.fillRect(12, 2, 8, 6);
        // Hair in bun
        lCtx.fillStyle = '#5C4033';
        lCtx.fillRect(10, 0, 12, 3);
        lCtx.fillRect(9, 1, 2, 3);
        lCtx.fillRect(21, 1, 2, 3);
        // Bun at back
        lCtx.fillRect(20, 0, 4, 4);
        // Glasses (important!)
        lCtx.fillStyle = '#000000';
        lCtx.fillRect(12, 4, 4, 1);
        lCtx.fillRect(18, 4, 4, 1);
        lCtx.fillRect(12, 4, 1, 3);
        lCtx.fillRect(15, 4, 1, 3);
        lCtx.fillRect(18, 4, 1, 3);
        lCtx.fillRect(21, 4, 1, 3);
        // Eyes behind glasses
        lCtx.fillStyle = '#FFFFFF';
        lCtx.fillRect(13, 5, 2, 2);
        lCtx.fillRect(19, 5, 2, 2);
        lCtx.fillStyle = '#2C2C2C';
        lCtx.fillRect(14, 5, 1, 1);
        lCtx.fillRect(20, 5, 1, 1);
        // Slight smile
        lCtx.fillStyle = '#E87E7E';
        lCtx.fillRect(14, 7, 4, 1);
        liu.refresh();

        // Plant
        const plantTexture = scene.textures.createCanvas('plant', 24, 32);
        const plantCtx = plantTexture.getContext();
        // Pot
        plantCtx.fillStyle = '#8B4513';
        plantCtx.fillRect(6, 24, 12, 8);
        plantCtx.fillStyle = '#A0522D';
        plantCtx.fillRect(7, 25, 10, 6);
        // Leaves
        plantCtx.fillStyle = '#228B22';
        plantCtx.fillRect(10, 16, 4, 8);
        plantCtx.fillRect(8, 18, 8, 6);
        plantCtx.fillRect(6, 20, 12, 4);
        plantCtx.fillStyle = '#32CD32';
        plantCtx.fillRect(9, 17, 2, 2);
        plantCtx.fillRect(13, 19, 2, 2);
        plantTexture.refresh();

        // Bookshelf
        const bookshelfTexture = scene.textures.createCanvas('bookshelf', 48, 64);
        const bookshelfCtx = bookshelfTexture.getContext();
        // Frame
        bookshelfCtx.fillStyle = '#654321';
        bookshelfCtx.fillRect(0, 0, 48, 64);
        bookshelfCtx.fillStyle = '#8B6914';
        bookshelfCtx.fillRect(2, 2, 44, 60);
        // Shelves
        bookshelfCtx.fillStyle = '#654321';
        bookshelfCtx.fillRect(2, 20, 44, 2);
        bookshelfCtx.fillRect(2, 40, 44, 2);
        // Books (colorful)
        const bookColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        for (let shelf = 0; shelf < 3; shelf++) {
            for (let i = 0; i < 8; i++) {
                bookshelfCtx.fillStyle = bookColors[Math.floor(Math.random() * bookColors.length)];
                bookshelfCtx.fillRect(4 + i * 5, 4 + shelf * 20, 4, 14);
            }
        }
        bookshelfTexture.refresh();

        // Window
        const windowTexture = scene.textures.createCanvas('window', 48, 48);
        const windowCtx = windowTexture.getContext();
        // Frame
        windowCtx.fillStyle = '#8B7355';
        windowCtx.fillRect(0, 0, 48, 48);
        // Glass panes
        windowCtx.fillStyle = '#87CEEB';
        windowCtx.fillRect(4, 4, 18, 18);
        windowCtx.fillRect(26, 4, 18, 18);
        windowCtx.fillRect(4, 26, 18, 18);
        windowCtx.fillRect(26, 26, 18, 18);
        // Reflections
        windowCtx.fillStyle = '#B0E0E6';
        windowCtx.fillRect(6, 6, 8, 8);
        windowCtx.fillRect(28, 6, 8, 8);
        windowCtx.fillRect(6, 28, 8, 8);
        windowCtx.fillRect(28, 28, 8, 8);
        // Cross frame
        windowCtx.fillStyle = '#654321';
        windowCtx.fillRect(22, 0, 4, 48);
        windowCtx.fillRect(0, 22, 48, 4);
        windowTexture.refresh();

        // Rug
        const rugTexture = scene.textures.createCanvas('rug', 64, 48);
        const rugCtx = rugTexture.getContext();
        rugCtx.fillStyle = '#8B0000';
        rugCtx.fillRect(0, 0, 64, 48);
        rugCtx.fillStyle = '#A52A2A';
        rugCtx.fillRect(4, 4, 56, 40);
        // Pattern
        rugCtx.fillStyle = '#CD5C5C';
        for (let x = 8; x < 60; x += 8) {
            for (let y = 8; y < 44; y += 8) {
                rugCtx.fillRect(x, y, 4, 4);
            }
        }
        rugTexture.refresh();

        // Coffee cup
        const coffeeTexture = scene.textures.createCanvas('coffee', 16, 16);
        const coffeeCtx = coffeeTexture.getContext();
        // Cup
        coffeeCtx.fillStyle = '#FFFFFF';
        coffeeCtx.fillRect(4, 6, 8, 8);
        coffeeCtx.fillStyle = '#F5F5F5';
        coffeeCtx.fillRect(5, 7, 6, 6);
        // Coffee
        coffeeCtx.fillStyle = '#654321';
        coffeeCtx.fillRect(5, 8, 6, 4);
        // Handle
        coffeeCtx.fillStyle = '#FFFFFF';
        coffeeCtx.fillRect(12, 9, 2, 4);
        // Steam
        coffeeCtx.fillStyle = '#CCCCCC';
        coffeeCtx.fillRect(7, 4, 1, 2);
        coffeeCtx.fillRect(9, 3, 1, 3);
        coffeeTexture.refresh();

        // Laptop
        const laptopTexture = scene.textures.createCanvas('laptop', 32, 24);
        const laptopCtx = laptopTexture.getContext();
        laptopCtx.fillStyle = '#2A2A2A';
        laptopCtx.fillRect(2, 16, 28, 6);
        laptopCtx.fillStyle = '#1A1A1A';
        laptopCtx.fillRect(4, 2, 24, 14);
        laptopCtx.fillStyle = '#0A66C2';
        laptopCtx.fillRect(6, 4, 20, 10);
        laptopCtx.fillStyle = '#3A3A3A';
        for (let i = 0; i < 12; i++) {
            laptopCtx.fillRect(4 + i * 2, 18, 1, 3);
        }
        laptopTexture.refresh();

        // TV/Monitor
        const tvTexture = scene.textures.createCanvas('tv', 80, 60);
        const tvCtx = tvTexture.getContext();
        tvCtx.fillStyle = '#1A1A1A';
        tvCtx.fillRect(0, 0, 80, 50);
        tvCtx.fillStyle = '#2A2A2A';
        tvCtx.fillRect(2, 2, 76, 46);
        tvCtx.fillStyle = '#0A66C2';
        tvCtx.fillRect(4, 4, 72, 42);
        tvCtx.fillStyle = '#0E7FE8';
        tvCtx.fillRect(10, 10, 60, 30);
        // Stand
        tvCtx.fillStyle = '#3A3A3A';
        tvCtx.fillRect(35, 50, 10, 6);
        tvCtx.fillRect(30, 56, 20, 4);
        tvTexture.refresh();

        // Couch
        const couchTexture = scene.textures.createCanvas('couch', 80, 48);
        const couchCtx = couchTexture.getContext();
        // Seat
        couchCtx.fillStyle = '#8B4513';
        couchCtx.fillRect(0, 20, 80, 20);
        couchCtx.fillStyle = '#A0522D';
        couchCtx.fillRect(2, 22, 76, 16);
        // Back
        couchCtx.fillStyle = '#8B4513';
        couchCtx.fillRect(0, 0, 80, 22);
        couchCtx.fillStyle = '#A0522D';
        couchCtx.fillRect(2, 2, 76, 18);
        // Arms
        couchCtx.fillStyle = '#654321';
        couchCtx.fillRect(0, 10, 10, 30);
        couchCtx.fillRect(70, 10, 10, 30);
        // Cushions
        couchCtx.fillStyle = '#CD853F';
        couchCtx.fillRect(15, 24, 20, 12);
        couchCtx.fillRect(45, 24, 20, 12);
        couchTexture.refresh();

        // Clock
        const clockTexture = scene.textures.createCanvas('clock', 24, 24);
        const clockCtx = clockTexture.getContext();
        // Frame
        clockCtx.fillStyle = '#8B7355';
        clockCtx.fillRect(0, 0, 24, 24);
        // Face
        clockCtx.fillStyle = '#FFFFFF';
        clockCtx.fillRect(2, 2, 20, 20);
        // Center
        clockCtx.fillStyle = '#000000';
        clockCtx.fillRect(11, 11, 2, 2);
        // Hour hand
        clockCtx.fillRect(12, 7, 1, 5);
        // Minute hand
        clockCtx.fillRect(12, 5, 1, 7);
        // Numbers
        clockCtx.fillRect(11, 4, 2, 1);
        clockCtx.fillRect(11, 18, 2, 1);
        clockCtx.fillRect(4, 11, 1, 2);
        clockCtx.fillRect(18, 11, 1, 2);
        clockTexture.refresh();

        // Lamp
        const lampTexture = scene.textures.createCanvas('lamp', 24, 40);
        const lampCtx = lampTexture.getContext();
        // Base
        lampCtx.fillStyle = '#4A4A4A';
        lampCtx.fillRect(8, 34, 8, 6);
        // Pole
        lampCtx.fillRect(11, 10, 2, 24);
        // Shade
        lampCtx.fillStyle = '#FFD700';
        lampCtx.fillRect(4, 0, 16, 12);
        lampCtx.fillStyle = '#FFF8DC';
        lampCtx.fillRect(6, 2, 12, 8);
        lampTexture.refresh();

        // Picture Frame
        const pictureTexture = scene.textures.createCanvas('picture', 40, 32);
        const pictureCtx = pictureTexture.getContext();
        // Frame
        pictureCtx.fillStyle = '#8B7355';
        pictureCtx.fillRect(0, 0, 40, 32);
        // Picture (abstract art)
        pictureCtx.fillStyle = '#87CEEB';
        pictureCtx.fillRect(4, 4, 32, 24);
        pictureCtx.fillStyle = '#228B22';
        pictureCtx.fillRect(4, 18, 32, 10);
        pictureCtx.fillStyle = '#FFD700';
        pictureCtx.fillRect(28, 8, 6, 6);
        pictureTexture.refresh();
    }
}

// ============================================================================
// GAME SCENES
// ============================================================================

// Animated Intro Scene
class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Black background
        this.cameras.main.setBackgroundColor('#000000');
        
        // Title animation
        const title = this.add.text(width / 2, height / 2 - 100, 'LINKEDIN TYCOON', {
            fontSize: '64px',
            fontFamily: 'Arial Black',
            color: '#0A66C2',
            stroke: '#FFFFFF',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);
        
        // Subtitle
        const subtitle = this.add.text(width / 2, height / 2, 'Build Your Professional Empire', {
            fontSize: '24px',
            color: '#FFFFFF'
        }).setOrigin(0.5).setAlpha(0);
        
        // Press any key
        const pressKey = this.add.text(width / 2, height / 2 + 100, 'Press Any Key to Start', {
            fontSize: '20px',
            color: '#00FF88'
        }).setOrigin(0.5).setAlpha(0);
        
        // LinkedIn logo particles
        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(0, height);
            const particle = this.add.text(x, y, '💼', {
                fontSize: '20px'
            }).setAlpha(0);
            
            this.tweens.add({
                targets: particle,
                alpha: 0.6,
                y: y - 100,
                duration: 3000 + Math.random() * 2000,
                delay: Math.random() * 2000,
                ease: 'Power2',
                yoyo: true,
                repeat: -1
            });
        }
        
        // Animate title
        this.tweens.add({
            targets: title,
            alpha: 1,
            scale: 1.2,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => {
                // Pulse animation
                this.tweens.add({
                    targets: title,
                    scale: 1.1,
                    duration: 1000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        });
        
        // Animate subtitle
        this.tweens.add({
            targets: subtitle,
            alpha: 1,
            y: height / 2 + 20,
            duration: 1500,
            delay: 800,
            ease: 'Power2'
        });
        
        // Animate press key
        this.tweens.add({
            targets: pressKey,
            alpha: 1,
            duration: 1000,
            delay: 2000,
            ease: 'Power2',
            onComplete: () => {
                // Blink animation
                this.tweens.add({
                    targets: pressKey,
                    alpha: 0.3,
                    duration: 800,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        });
        
        // Skip to game on any key
        this.input.keyboard.once('keydown', () => {
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.start('BootScene');
            });
        });
        
        // Also allow click/tap
        this.input.once('pointerdown', () => {
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.start('BootScene');
            });
        });
    }
}

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
        
        // Check if player has completed tutorial
        if (!gameState.data.tutorialComplete) {
            this.scene.start('TutorialScene');
        } else if (gameState.data.player.postsCount === 0 && gameState.data.player.connections <= 5) {
            storyManager.showStory(0);
            document.getElementById('story-continue').onclick = () => {
                storyManager.closeStory();
                this.scene.start('HomeScene');
            };
        } else {
            this.scene.start('HomeScene');
        }
    }
}

// Tutorial Scene - Comprehensive guided introduction
class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }

    create() {
        const width = 640;
        const height = 480;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Tutorial stage
        this.tutorialStep = 0;
        this.hasMovedLeft = false;
        this.hasMovedRight = false;
        this.hasMovedUp = false;
        this.hasMovedDown = false;
        
        // Simple room
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        // Walls
        this.walls = this.physics.add.staticGroup();
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
        
        // Tutorial helper NPC
        this.helper = this.add.sprite(320, 200, 'npc3');
        this.helper.setScale(2);
        
        // Helper name
        this.add.text(320, 155, 'Tutorial Guide', {
            fontSize: '14px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(320, 350, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        // Computer for final step
        this.computer = this.add.image(500, 150, 'computer');
        this.computer.setScale(2);
        this.computer.setAlpha(0);
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        this.physics.add.collider(this.player, this.walls);
        
        // Start tutorial
        this.showTutorialStep(0);
    }
    
    showTutorialStep(step) {
        this.tutorialStep = step;
        
        const steps = [
            {
                text: "Welcome to LinkedIn Tycoon! I'm your guide. Let me show you how to build your professional empire. First, let's learn movement. Try pressing the W, A, S, D keys or Arrow keys to move around!",
                requirement: "Move in all 4 directions"
            },
            {
                text: "Great job! You can move! Now, in this game, your goal is to grow your LinkedIn presence. You'll create posts, network with professionals, attend events, and level up your career. Let's learn about interactions...",
                requirement: "Listen and continue"
            },
            {
                text: "See that computer? Walk up to it and press E to interact. The E key is how you interact with objects, talk to people, and enter buildings. Give it a try!",
                requirement: "Interact with the computer"
            },
            {
                text: "Perfect! You've mastered the basics! Now you're ready for the real world. In your apartment, you can: Use your computer to create posts, Sleep in bed to restore energy, and Exit to explore the city. In the city, you'll find NPCs to network with and buildings to explore. Ready to begin your journey?",
                requirement: "Press E to start game"
            }
        ];
        
        if (step < steps.length) {
            const currentStep = steps[step];
            dialogueManager.currentDialogue = 'tutorial';
            const box = document.getElementById('dialogue-box');
            const speaker = document.getElementById('dialogue-speaker');
            const text = document.getElementById('dialogue-text');
            const choices = document.getElementById('dialogue-choices');
            
            speaker.textContent = '📚 Tutorial Guide';
            text.textContent = currentStep.text;
            choices.innerHTML = '';
            
            if (step === 1 || step === 3) {
                const btn = document.createElement('button');
                btn.className = 'dialogue-choice';
                btn.textContent = step === 1 ? '➡️ Continue' : '🚀 Start Game!';
                btn.onclick = () => {
                    if (step === 3) {
                        this.completeTutorial();
                    } else {
                        document.getElementById('dialogue-box').style.display = 'none';
                        this.showTutorialStep(step + 1);
                    }
                };
                choices.appendChild(btn);
            }
            
            box.style.display = 'block';
        }
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            vX = -speed;
            this.hasMovedLeft = true;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            vX = speed;
            this.hasMovedRight = true;
        }
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            vY = -speed;
            this.hasMovedUp = true;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            vY = speed;
            this.hasMovedDown = true;
        }
        
        this.player.setVelocity(vX, vY);
        
        // Check if player moved in all directions
        if (this.tutorialStep === 0 && this.hasMovedLeft && this.hasMovedRight && 
            this.hasMovedUp && this.hasMovedDown) {
            document.getElementById('dialogue-box').style.display = 'none';
            setTimeout(() => {
                this.showTutorialStep(1);
            }, 500);
        }
        
        // Show computer for step 2
        if (this.tutorialStep === 2) {
            this.computer.setAlpha(1);
            
            // Check proximity to computer
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, 500, 150
            );
            
            if (dist < 60) {
                showInteractionPrompt(true);
                if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                    document.getElementById('dialogue-box').style.display = 'none';
                    showInteractionPrompt(false);
                    setTimeout(() => {
                        this.showTutorialStep(3);
                    }, 500);
                }
            } else {
                showInteractionPrompt(false);
            }
        }
    }
    
    completeTutorial() {
        gameState.data.tutorialComplete = true;
        gameState.saveGame();
        document.getElementById('dialogue-box').style.display = 'none';
        showNotification('Tutorial complete! Welcome to LinkedIn Tycoon!');
        
        this.cameras.main.fadeOut(1000);
        this.time.delayedCall(1000, () => {
            storyManager.showStory(0);
            document.getElementById('story-continue').onclick = () => {
                storyManager.closeStory();
                this.scene.start('HomeScene');
            };
        });
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
        this.player = this.physics.add.sprite(320, 240, 'player');
        this.player.setScale(1.5);
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
                
                // Progress game time
                gameState.data.gameTime++;
                if (gameState.data.gameTime % 6 === 0) {
                    this.cycleTimeOfDay();
                    
                    // Collect salary if employed
                    if (gameState.data.player.job && gameState.data.player.salary > 0) {
                        gameState.data.player.coins += gameState.data.player.salary;
                        showNotification(`💰 Daily salary: +${gameState.data.player.salary} coins`);
                        updateUI();
                    }
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
        
        // Check quests
        questManager.checkAllQuests(gameState.data);
        
        // Show controls hint for new players
        if (gameState.data.player.postsCount === 0) {
            const hint = document.getElementById('controls-hint');
            hint.style.display = 'block';
            setTimeout(() => {
                hint.style.display = 'none';
            }, 8000);
        }
    }
    
    cycleTimeOfDay() {
        const times = ['morning', 'afternoon', 'evening', 'night'];
        const currentIndex = times.indexOf(gameState.data.time);
        gameState.data.time = times[(currentIndex + 1) % times.length];
        updateUI();
        
        // Chance to change weather
        if (Math.random() < 0.3) {
            const weathers = ['sunny', 'cloudy', 'rain'];
            gameState.data.weather = Phaser.Math.RND.pick(weathers);
            updateUI();
        }
    }

    createRoom() {
        const width = 640;  // MUCH smaller, more cozy
        const height = 480;
        
        this.physics.world.setBounds(0, 0, width, height);
        
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
        this.obstacles = this.physics.add.staticGroup(); // NEW: For collision objects
        
        // Add rug first (layer beneath everything)
        this.add.image(320, 250, 'rug');
        
        // LIVING ROOM AREA (LEFT SIDE)
        // Bookshelf (LEFT WALL TOP)
        const bookshelf1 = this.obstacles.create(70, 120, 'bookshelf');
        bookshelf1.refreshBody();
        
        // Bookshelf 2 (LEFT WALL BOTTOM)
        const bookshelf2 = this.obstacles.create(70, 240, 'bookshelf');
        bookshelf2.refreshBody();
        
        // Couch (LEFT CENTER)
        const couch = this.obstacles.create(180, 200, 'couch');
        couch.refreshBody();
        
        // TV (facing couch)
        const tv = this.obstacles.create(180, 300, 'tv');
        tv.refreshBody();
        
        // Coffee table (in front of couch)
        this.add.image(180, 240, 'coffee');
        
        // WORK AREA (TOP RIGHT)
        // Desk with computer
        const desk = this.obstacles.create(480, 100, 'desk');
        desk.refreshBody();
        
        const computer = this.interactables.create(480, 80, 'computer');
        computer.setData('type', 'computer');
        computer.setData('name', 'Work Computer');
        computer.refreshBody();
        
        // Laptop on desk
        this.add.image(460, 95, 'laptop');
        
        // Coffee cup on desk
        this.add.image(500, 95, 'coffee');
        
        // Desk lamp
        this.add.image(520, 85, 'lamp');

        // BEDROOM AREA (BOTTOM RIGHT)
        const bed = this.interactables.create(520, 360, 'bed');
        bed.setData('type', 'bed');
        bed.setData('name', 'Bed');
        bed.refreshBody();
        
        // Create collision body for bed
        const bedCollision = this.obstacles.create(520, 360, 'bed');
        bedCollision.setAlpha(0);
        bedCollision.refreshBody();
        
        // Nightstand
        const nightstand = this.obstacles.create(580, 360, 'desk');
        nightstand.setScale(0.5);
        nightstand.refreshBody();
        this.add.image(580, 355, 'lamp');
        
        // Plants in corners (decorative, no collision)
        this.add.image(40, 50, 'plant');
        this.add.image(600, 50, 'plant');
        this.add.image(40, 430, 'plant');
        this.add.image(600, 430, 'plant');
        
        // Windows (TOP WALL)
        this.add.image(260, 40, 'window');
        this.add.image(380, 40, 'window');
        
        // Clock (TOP CENTER WALL)
        this.add.image(320, 50, 'clock');
        
        // Pictures on walls
        this.add.image(150, 50, 'picture');
        this.add.image(490, 50, 'picture');
        this.add.image(30, 240, 'picture');
        this.add.image(610, 240, 'picture');

        // Door to outside (BOTTOM CENTER)
        const door = this.interactables.create(320, 450, 'door');
        door.setData('type', 'door');
        door.setData('name', 'Exit to City');
        door.setData('target', 'CityScene');
        door.refreshBody();

        // CRITICAL: Add collisions for EVERYTHING
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
        this.physics.add.collider(this.player, this.interactables);
        
        // Add ambient animations
        this.createAmbientAnimations();
    }
    
    createAmbientAnimations() {
        // Floating dust particles
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                const x = Phaser.Math.Between(50, 750);
                const y = Phaser.Math.Between(50, 550);
                const dust = this.add.text(x, y, '·', {
                    fontSize: '8px',
                    color: '#CCCCCC',
                    alpha: 0.3
                });
                
                this.tweens.add({
                    targets: dust,
                    y: y - 50,
                    alpha: 0,
                    duration: 5000,
                    ease: 'Linear',
                    onComplete: () => dust.destroy()
                });
            },
            loop: true
        });
    }

    update() {
        this.handleMovement();
        this.checkInteractions();
    }

    handleMovement() {
        const speed = 120;
        let velocityX = 0;
        let velocityY = 0;

        // Check input
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -speed;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = speed;
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -speed;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = speed;
        }

        // Apply velocity
        this.player.setVelocity(velocityX, velocityY);
        
        // Play idle animation
        if (!this.player.anims.isPlaying) {
            this.player.anims.play('idle', true);
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
    
    createDetailedTree(x, y) {
        // Detailed tree with depth and shading
        // Trunk with texture
        const trunk = this.add.rectangle(x, y, 16, 35, 0x654321);
        trunk.setStrokeStyle(2, 0x4A3010);
        this.add.rectangle(x - 3, y - 5, 3, 10, 0x8B4513); // Branch left
        this.add.rectangle(x + 3, y + 5, 3, 10, 0x8B4513); // Branch right
        
        // Canopy - multiple layers for depth
        // Dark layer (back)
        this.add.circle(x, y - 30, 35, 0x1B5E20);
        // Medium layer
        this.add.circle(x - 18, y - 25, 30, 0x2E7D32);
        this.add.circle(x + 18, y - 25, 30, 0x2E7D32);
        // Light layer (front)
        this.add.circle(x, y - 35, 32, 0x4CAF50);
        this.add.circle(x - 12, y - 32, 28, 0x66BB6A);
        this.add.circle(x + 12, y - 32, 28, 0x66BB6A);
        // Highlights
        this.add.circle(x - 8, y - 38, 12, 0x81C784);
        this.add.circle(x + 10, y - 40, 10, 0x81C784);
        
        // Collision
        const treeCollision = this.obstacles.create(x, y, null);
        treeCollision.setSize(45, 50);
        treeCollision.setAlpha(0);
        treeCollision.refreshBody();
    }
    
    createBuilding(x, y, width, height, color, label) {
        // Building body
        const building = this.add.rectangle(x, y, width, height, color);
        building.setStrokeStyle(4, 0x000000);
        this.physics.add.existing(building, true);
        
        // Windows
        const windowColor = 0x87CEEB;
        const windowRows = Math.floor(height / 30);
        const windowCols = Math.floor(width / 30);
        
        for (let row = 0; row < windowRows; row++) {
            for (let col = 0; col < windowCols; col++) {
                const winX = x - width/2 + 15 + col * 30;
                const winY = y - height/2 + 15 + row * 30;
                this.add.rectangle(winX, winY, 15, 20, windowColor);
            }
        }
        
        // Door area (darker)
        this.add.rectangle(x, y + height/2 - 20, 30, 40, 0x654321);
        
        // Label
        this.add.text(x, y - height/2 - 20, label, {
            fontSize: '16px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Add collision
        const collision = this.obstacles.create(x, y, null);
        collision.setSize(width, height);
        collision.setAlpha(0);
        collision.refreshBody();
    }

    createOutdoorArea() {
        const width = 1600;
        const height = 1200;
        
        this.physics.world.setBounds(0, 0, width, height);
        this.obstacles = this.physics.add.staticGroup();
        
        // Time-based lighting
        const timeColors = {
            morning: { bg: 0x87CEEB, grass: 0x4CAF50 },
            afternoon: { bg: 0xFFA500, grass: 0x45A049 },
            evening: { bg: 0xFF6347, grass: 0x3A8A3E },
            night: { bg: 0x191970, grass: 0x2E7D32 }
        };
        
        const currentTime = gameState.data.time || 'morning';
        const colors = timeColors[currentTime];
        
        // Sky background
        this.add.rectangle(width/2, height/2, width, height, colors.bg).setDepth(-1);
        
        // Grass ground with variation
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                const grassTile = this.add.image(x, y, 'grass').setOrigin(0);
                grassTile.setTint(colors.grass);
                // Add slight random tint variation for organic look
                if (Math.random() > 0.7) {
                    grassTile.setAlpha(0.9);
                }
            }
        }
        
        // Weather effects
        this.createWeatherEffects();
        
        // PLANNED CITY LAYOUT - Main Boulevard
        for (let y = 450; y < 550; y += 16) {
            for (let x = 0; x < width; x += 16) {
                const path = this.add.rectangle(x, y, 16, 16, 0x696969).setOrigin(0);
            }
        }
        
        // Boulevard divider line
        for (let x = 0; x < width; x += 32) {
            this.add.rectangle(x, 498, 16, 4, 0xFFFF00).setOrigin(0);
        }
        
        // North-South Avenue  
        for (let y = 0; y < height; y += 16) {
            for (let x = 350; x < 450; x += 16) {
                const path = this.add.rectangle(x, y, 16, 16, 0x696969).setOrigin(0);
            }
        }
        
        // Second North-South Avenue
        for (let y = 0; y < height; y += 16) {
            for (let x = 1100; x < 1200; x += 16) {
                const path = this.add.rectangle(x, y, 16, 16, 0x696969).setOrigin(0);
            }
        }

        // City sign with enhanced styling
        this.add.text(width/2, 50, '🏙️ LINKEDIN CITY', {
            fontSize: '36px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 5,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(width/2, 85, 'Your Professional World Awaits', {
            fontSize: '16px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // BETTER TREES - Professional, detailed, planned placement
        // Trees lining Main Boulevard (north side)
        for (let x = 250; x < width - 250; x += 120) {
            this.createDetailedTree(x, 420);
        }
        // Trees lining Main Boulevard (south side)
        for (let x = 280; x < width - 250; x += 120) {
            this.createDetailedTree(x, 580);
        }
        // Trees lining North-South Avenue (west side)
        for (let y = 150; y < height - 150; y += 100) {
            if (y < 420 || y > 580) { // Don't overlap with boulevard
                this.createDetailedTree(330, y);
            }
        }
        // Trees lining East Avenue
        for (let y = 150; y < height - 150; y += 100) {
            if (y < 420 || y > 580) {
                this.createDetailedTree(1220, y);
            }
        }
        // Park area trees (random organic placement)
        const parkTreeSpots = [
            {x: 150, y: 200}, {x: 200, y: 250}, {x: 180, y: 150},
            {x: width - 150, y: 200}, {x: width - 200, y: 250},
            {x: 600, y: 150}, {x: 900, y: 150},
            {x: 600, y: 750}, {x: 900, y: 750}
        ];
        parkTreeSpots.forEach(pos => this.createDetailedTree(pos.x, pos.y));
        
        // Benches
        const benchPositions = [
            {x: 350, y: 420}, {x: 550, y: 460},
            {x: 850, y: 420}, {x: 1050, y: 460}
        ];
        
        benchPositions.forEach(pos => {
            // Bench
            this.add.rectangle(pos.x, pos.y, 40, 20, 0x8B4513);
            this.add.rectangle(pos.x, pos.y - 15, 40, 5, 0xA0522D);
        });
        
        // Street lamps
        const lampPositions = [
            {x: 320, y: 380}, {x: 600, y: 380},
            {x: 800, y: 380}, {x: 1080, y: 380}
        ];
        
        lampPositions.forEach(pos => {
            const streetLamp = this.add.image(pos.x, pos.y, 'lamp').setScale(2);
            
            // Glow effect at night
            if (gameState.data.time === 'night' || gameState.data.time === 'evening') {
                const glow = this.add.circle(pos.x, pos.y - 20, 30, 0xFFFF00, 0.3);
            }
        });
    }
    
    createWeatherEffects() {
        const weather = gameState.data.weather || 'sunny';
        
        if (weather === 'rain') {
            // Rain particles
            this.time.addEvent({
                delay: 50,
                callback: () => {
                    const x = Phaser.Math.Between(0, 1400);
                    const y = -10;
                    const raindrop = this.add.line(0, 0, 0, 0, 0, 15, 0x6B9BD1, 0.6);
                    raindrop.setPosition(x, y);
                    
                    this.tweens.add({
                        targets: raindrop,
                        y: 1000,
                        duration: 1000,
                        onComplete: () => raindrop.destroy()
                    });
                },
                loop: true
            });
        } else if (weather === 'cloudy') {
            // Clouds
            for (let i = 0; i < 5; i++) {
                const cloud = this.add.ellipse(
                    Phaser.Math.Between(100, 1300),
                    Phaser.Math.Between(50, 200),
                    80, 40, 0xFFFFFF, 0.7
                );
                
                this.tweens.add({
                    targets: cloud,
                    x: cloud.x + 200,
                    duration: 30000,
                    repeat: -1,
                    yoyo: true
                });
            }
        } else {
            // Sunny - Add sun
            const sun = this.add.circle(1300, 100, 40, 0xFFD700);
            const sunGlow = this.add.circle(1300, 100, 60, 0xFFFF00, 0.3);
            
            this.tweens.add({
                targets: [sun, sunGlow],
                scale: 1.1,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }

    createLocations() {
        this.interactables = this.physics.add.staticGroup();
        
        // PLANNED CITY LAYOUT - Logical zoning
        
        // RESIDENTIAL DISTRICT (Northwest)
        this.createBuilding(200, 250, 120, 160, 0x8B7355, '🏠 Your Apartment');
        const homeDoor = this.interactables.create(200, 325, 'door');
        homeDoor.setData('type', 'door');
        homeDoor.setData('name', 'Your Home');
        homeDoor.setData('target', 'HomeScene');
        homeDoor.refreshBody();

        // FOOD & RETAIL DISTRICT (North Center)
        this.createBuilding(550, 250, 110, 140, 0x8B4513, '☕ Coffee Shop');
        const coffeeShopDoor = this.interactables.create(550, 315, 'door');
        coffeeShopDoor.setData('type', 'location');
        coffeeShopDoor.setData('name', 'Coffee Shop');
        coffeeShopDoor.refreshBody();

        this.createBuilding(750, 250, 120, 130, 0xFFD700, '🍽️ Restaurant');
        const restaurantDoor = this.interactables.create(750, 310, 'door');
        restaurantDoor.setData('type', 'location');
        restaurantDoor.setData('name', 'Restaurant');
        restaurantDoor.refreshBody();
        
        this.createBuilding(950, 250, 110, 120, 0xFF1744, '🛍️ Shop');
        const shopDoor = this.interactables.create(950, 305, 'door');
        shopDoor.setData('type', 'location');
        shopDoor.setData('name', 'Shop');
        shopDoor.refreshBody();

        // BUSINESS DISTRICT (Northeast - Tall buildings!)
        this.createBuilding(1300, 200, 160, 300, 0x4A4A4A, '🏢 Tech Corp Tower');
        const officeDoor = this.interactables.create(1300, 345, 'door');
        officeDoor.setData('type', 'location');
        officeDoor.setData('name', 'Office Building');
        officeDoor.refreshBody();
        
        this.createBuilding(1300, 650, 150, 220, 0x1E3A8A, '🏦 LinkedIn HQ');
        const hqDoor = this.interactables.create(1300, 755, 'door');
        hqDoor.setData('type', 'location');
        hqDoor.setData('name', 'LinkedIn Headquarters');
        hqDoor.refreshBody();

        // FITNESS & WELLNESS DISTRICT (Southwest)
        this.createBuilding(200, 700, 130, 140, 0xFF6B6B, '💪 Fitness Center');
        const gymDoor = this.interactables.create(200, 765, 'door');
        gymDoor.setData('type', 'location');
        gymDoor.setData('name', 'Gym');
        gymDoor.refreshBody();
        
        this.createBuilding(200, 950, 110, 100, 0x9C27B0, '🧘 Yoga Studio');
        const yogaDoor = this.interactables.create(200, 995, 'door');
        yogaDoor.setData('type', 'location');
        yogaDoor.setData('name', 'Yoga Studio');
        yogaDoor.refreshBody();
        
        // EVENT & NETWORKING DISTRICT (South Center)
        this.createBuilding(550, 700, 160, 150, 0x0A66C2, '🎯 Event Center');
        const conferenceDoor = this.interactables.create(550, 770, 'door');
        conferenceDoor.setData('type', 'location');
        conferenceDoor.setData('name', 'Conference Center');
        conferenceDoor.refreshBody();
        
        this.createBuilding(750, 700, 140, 130, 0x2A9D8F, '💼 Co-Work Hub');
        const coworkDoor = this.interactables.create(750, 760, 'door');
        coworkDoor.setData('type', 'location');
        coworkDoor.setData('name', 'Co-working Space');
        coworkDoor.refreshBody();
        
        // EDUCATION & CULTURE DISTRICT (Southeast)
        this.createBuilding(950, 850, 150, 180, 0x7B1FA2, '📚 Public Library');
        const libraryDoor = this.interactables.create(950, 935, 'door');
        libraryDoor.setData('type', 'location');
        libraryDoor.setData('name', 'Library');
        libraryDoor.refreshBody();
        
        this.createBuilding(950, 1050, 140, 120, 0xE91E63, '🎓 Tech University');
        const uniDoor = this.interactables.create(950, 1105, 'door');
        uniDoor.setData('type', 'location');
        uniDoor.setData('name', 'University');
        uniDoor.refreshBody();
        
        // RECREATION (West)
        this.createBuilding(550, 1000, 130, 110, 0x228B22, '🌳 City Park');
        const parkDoor = this.interactables.create(550, 1050, 'door');
        parkDoor.setData('type', 'door');
        parkDoor.setData('name', 'Park');
        parkDoor.setData('target', 'ParkScene');
        parkDoor.refreshBody();

        // Spawn collectible items around city
        this.spawnCityItems();
        
        // Named NPCs to network with (using new detailed sprites)
        const npcData = [
            { name: 'Sarah Chen', sprite: 'npc1', x: 300, y: 350 },
            { name: 'Marcus Johnson', sprite: 'npc2', x: 700, y: 400 },
            { name: 'Emily Rodriguez', sprite: 'npc3', x: 500, y: 280 },
            { name: 'David Park', sprite: 'npc4', x: 850, y: 350 },
            { name: 'Dr. Jennifer Liu', sprite: 'npc5', x: 400, y: 500 }
        ];

        this.npcs = [];
        npcData.forEach(npc => {
            // Convert to dynamic sprite
            const person = this.physics.add.sprite(npc.x, npc.y, npc.sprite);
            person.setScale(1.5);
            person.setData('type', 'person');
            person.setData('name', npc.name);
            person.setCollideWorldBounds(true);
            
            // Add name label
            const label = this.add.text(npc.x, npc.y - 35, npc.name.split(' ')[0], {
                fontSize: '12px',
                color: '#FFD700',
                stroke: '#000000',
                strokeThickness: 3,
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            // Store NPC data for AI
            this.npcs.push({
                sprite: person,
                label: label,
                name: npc.name,
                targetX: npc.x,
                targetY: npc.y,
                moveTimer: 0
            });
            
            // Make them interactable
            this.interactables.add(person);
        });
        
        // NPCs collide with obstacles
        this.npcs.forEach(npc => {
            this.physics.add.collider(npc.sprite, this.obstacles);
        });
    }
    
    spawnCityItems() {
        this.cityItems = [];
        
        // Spawn 10 random items around the city
        for (let i = 0; i < 10; i++) {
            const x = Phaser.Math.Between(200, 1400);
            const y = Phaser.Math.Between(150, 1000);
            
            const itemId = itemManager.spawnRandomItem();
            const itemData = itemManager.getItem(itemId);
            
            // Create visual item
            const itemSprite = this.add.text(x, y, itemData.icon, {
                fontSize: '24px'
            });
            
            // Add glow effect
            const glow = this.add.circle(x, y, 20, 0xFFFF00, 0.3);
            
            // Bobbing animation
            this.tweens.add({
                targets: [itemSprite, glow],
                y: y - 10,
                duration: 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.cityItems.push({
                sprite: itemSprite,
                glow: glow,
                itemId: itemId,
                x: x,
                y: y
            });
        }
    }
    
    checkItemPickup() {
        if (!this.cityItems) return;
        
        this.cityItems.forEach((item, index) => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                item.x, item.y
            );
            
            if (dist < 40) {
                // Pick up item
                itemManager.addItemToInventory(item.itemId);
                const itemData = itemManager.getItem(item.itemId);
                showNotification(`Found ${itemData.name}! ${itemData.effect}`);
                
                // Remove from world
                item.sprite.destroy();
                item.glow.destroy();
                this.cityItems.splice(index, 1);
                
                // Spawn new item elsewhere after 10 seconds
                this.time.delayedCall(10000, () => {
                    if (this.scene.isActive()) {
                        this.spawnCityItems();
                    }
                });
            }
        });
    }

    update() {
        this.handleMovement();
        this.checkInteractions();
        this.updateNPCAI();
        this.checkItemPickup();
    }
    
    updateNPCAI() {
        if (!this.npcs) return;
        
        this.npcs.forEach(npc => {
            npc.moveTimer++;
            
            // Every 3 seconds, pick new random target
            if (npc.moveTimer >= 180) {
                npc.moveTimer = 0;
                npc.targetX = Phaser.Math.Between(300, 1100);
                npc.targetY = Phaser.Math.Between(200, 800);
            }
            
            // Move towards target
            const angle = Phaser.Math.Angle.Between(
                npc.sprite.x, npc.sprite.y,
                npc.targetX, npc.targetY
            );
            const distance = Phaser.Math.Distance.Between(
                npc.sprite.x, npc.sprite.y,
                npc.targetX, npc.targetY
            );
            
            if (distance > 20) {
                const speed = 40;
                npc.sprite.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
            } else {
                npc.sprite.setVelocity(0, 0);
            }
            
            // Update label position
            npc.label.setPosition(npc.sprite.x, npc.sprite.y - 35);
        });
    }

    handleMovement() {
        const speed = 100;
        let velocityX = 0;
        let velocityY = 0;

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -speed;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = speed;
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -speed;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = speed;
        }

        this.player.setVelocity(velocityX, velocityY);
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
                // Show dialogue instead of instant connection
                dialogueManager.showDialogue(name, this);
                break;
            case 'location':
                // Handle location-specific interactions
                const target = object.getData('target');
                if (name === 'Coffee Shop') {
                    this.changeScene('CoffeeShopScene');
                } else if (name === 'Gym') {
                    this.changeScene('GymScene');
                } else if (name === 'Conference Center') {
                    this.attendEvent();
                } else if (name === 'Co-working Space') {
                    this.changeScene('CoworkingScene');
                } else if (name === 'Office Building') {
                    this.changeScene('CoworkingScene'); // Use coworking for now
                } else if (name === 'Restaurant') {
                    this.changeScene('RestaurantScene');
                } else if (name === 'Library') {
                    this.changeScene('LibraryScene');
                } else if (name === 'University') {
                    this.changeScene('UniversityScene');
                } else if (name === 'Shop') {
                    this.changeScene('ShopScene');
                } else if (name === 'LinkedIn Headquarters') {
                    this.changeScene('JobInterviewScene');
                } else {
                    this.visitLocation(name);
                }
                break;
            case 'door':
                this.changeScene(object.getData('target'));
                break;
        }
    }

    networkWithPerson(name, skipEnergyCost = false) {
        if (skipEnergyCost || gameState.useEnergy(10)) {
            const success = Math.random() > 0.2; // Increased success rate after dialogue
            
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
                
                // Check quests
                questManager.checkAllQuests(gameState.data);
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
            
            // Check quest
            questManager.checkQuest(3);
            questManager.checkAllQuests(gameState.data);
            
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

// Gym Scene - Work out and build stats
class GymScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GymScene' });
    }

    create() {
        gameState.data.location = 'gym';
        
        // Background
        for (let x = 0; x < 640; x += 16) {
            for (let y = 0; y < 480; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        // Walls
        this.createWalls();
        
        // Title
        this.add.text(320, 30, '💪 FITNESS CENTER', {
            fontSize: '24px',
            color: '#FF6B6B',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Create player
        this.player = this.physics.add.sprite(320, 400, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        // Camera
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        // Equipment
        this.createGymEquipment();
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('Work out to boost your skills!');
    }
    
    createWalls() {
        const width = 640;
        const height = 480;
        this.physics.world.setBounds(0, 0, width, height);
        this.walls = this.physics.add.staticGroup();
        
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
    }
    
    createGymEquipment() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Treadmills (left side)
        for (let i = 0; i < 2; i++) {
            const treadmill = this.add.rectangle(100, 100 + i * 80, 60, 40, 0x4A4A4A);
            treadmill.setStrokeStyle(2, 0xFF0000);
            this.physics.add.existing(treadmill, true);
            
            const interactive = this.interactables.create(100, 100 + i * 80, null);
            interactive.setSize(60, 40);
            interactive.setData('type', 'equipment');
            interactive.setData('name', 'Treadmill');
            interactive.setData('stat', 'energy');
            interactive.refreshBody();
            
            const obstacle = this.obstacles.create(100, 100 + i * 80, null);
            obstacle.setSize(60, 40);
            obstacle.setAlpha(0);
            obstacle.refreshBody();
        }
        
        // Weight benches (right side)
        for (let i = 0; i < 2; i++) {
            const bench = this.add.rectangle(540, 100 + i * 80, 60, 50, 0x8B4513);
            this.physics.add.existing(bench, true);
            
            const interactive = this.interactables.create(540, 100 + i * 80, null);
            interactive.setSize(60, 50);
            interactive.setData('type', 'equipment');
            interactive.setData('name', 'Weight Bench');
            interactive.setData('stat', 'skills');
            interactive.refreshBody();
            
            const obstacle = this.obstacles.create(540, 100 + i * 80, null);
            obstacle.setSize(60, 50);
            obstacle.setAlpha(0);
            obstacle.refreshBody();
        }
        
        // Yoga mats (center)
        for (let i = 0; i < 3; i++) {
            this.add.rectangle(320, 150 + i * 60, 80, 30, 0x9D4EDD);
        }
        
        // Trainer NPC
        const trainer = this.add.sprite(320, 280, 'npc4');
        trainer.setScale(1.5);
        this.add.text(320, 245, 'Coach Mike', {
            fontSize: '12px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Exit door
        const door = this.interactables.create(320, 450, 'door');
        door.setData('type', 'door');
        door.setData('name', 'Exit');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        // Collisions
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
    }
    
    update() {
        this.handleMovement();
        this.checkInteractions();
    }
    
    handleMovement() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
    }
    
    checkInteractions() {
        let nearest = null;
        let minDist = Infinity;
        
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                this.interact(nearest);
            }
        } else {
            showInteractionPrompt(false);
        }
    }
    
    interact(obj) {
        const type = obj.getData('type');
        if (type === 'door') {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start(obj.getData('target'));
            });
        } else if (type === 'equipment') {
            const name = obj.getData('name');
            const stat = obj.getData('stat');
            if (gameState.useEnergy(15)) {
                if (stat === 'skills') {
                    gameState.data.player.skills += 10;
                    showNotification(`💪 Worked out! +10 skills`);
                } else {
                    gameState.data.player.maxEnergy += 2;
                    showNotification(`⚡ Trained stamina! +2 max energy`);
                }
                gameState.gainXP(20);
                updateUI();
            }
        }
    }
}

// Park Scene - Relax and network
class ParkScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ParkScene' });
    }

    create() {
        gameState.data.location = 'park';
        
        const width = 800;
        const height = 600;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Sky
        this.add.rectangle(width/2, height/2, width, height, 0x87CEEB).setDepth(-2);
        
        // Grass everywhere
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'grass').setOrigin(0);
            }
        }
        
        // Dirt path
        for (let y = 200; y < 400; y += 16) {
            for (let x = 0; x < width; x += 16) {
                this.add.rectangle(x, y, 16, 16, 0x8B7355).setOrigin(0);
            }
        }
        
        // Pond (center)
        const pond = this.add.ellipse(400, 300, 120, 80, 0x4682B4);
        pond.setStrokeStyle(4, 0x5F9EA0);
        
        // Pond shimmer effect
        this.tweens.add({
            targets: pond,
            alpha: 0.7,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        
        // Trees around pond
        const treeSpots = [
            {x: 300, y: 250}, {x: 500, y: 250},
            {x: 300, y: 350}, {x: 500, y: 350},
            {x: 150, y: 100}, {x: 650, y: 100},
            {x: 150, y: 500}, {x: 650, y: 500}
        ];
        
        this.obstacles = this.physics.add.staticGroup();
        
        treeSpots.forEach(pos => {
            this.add.rectangle(pos.x, pos.y, 20, 30, 0x8B4513);
            this.add.circle(pos.x, pos.y - 25, 35, 0x228B22);
            this.add.circle(pos.x - 18, pos.y - 22, 28, 0x32CD32);
            this.add.circle(pos.x + 18, pos.y - 22, 28, 0x32CD32);
            
            const treeCol = this.obstacles.create(pos.x, pos.y, null);
            treeCol.setSize(50, 50);
            treeCol.setAlpha(0);
            treeCol.refreshBody();
        });
        
        // Benches
        for (let i = 0; i < 4; i++) {
            const x = 200 + i * 150;
            this.add.rectangle(x, 180, 50, 20, 0x8B4513);
        }
        
        // Flowers
        const flowers = ['🌸', '🌺', '🌻', '🌷'];
        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(50, 550);
            // Avoid pond
            if (Math.abs(x - 400) > 80 || Math.abs(y - 300) > 60) {
                this.add.text(x, y, Phaser.Math.RND.pick(flowers), { fontSize: '16px' });
            }
        }
        
        // Player
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        // NPCs walking
        this.createParkNPCs();
        
        // Exit
        this.interactables = this.physics.add.staticGroup();
        const door = this.interactables.create(400, 580, 'door');
        door.setData('type', 'door');
        door.setData('name', 'Exit Park');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        this.physics.add.collider(this.player, this.obstacles);
        
        showNotification('🌳 Relax in the park! Walk around to restore energy slowly');
    }
    
    createParkNPCs() {
        // Joggers and people walking
        this.parkNPCs = [];
        for (let i = 0; i < 3; i++) {
            const sprite = ['npc1', 'npc2', 'npc5'][i];
            const x = Phaser.Math.Between(200, 600);
            const y = Phaser.Math.Between(100, 500);
            
            const npc = this.physics.add.sprite(x, y, sprite);
            npc.setScale(1.2);
            npc.setCollideWorldBounds(true);
            
            this.parkNPCs.push({
                sprite: npc,
                targetX: x,
                targetY: y,
                speed: 50 + Math.random() * 30
            });
            
            this.physics.add.collider(npc, this.obstacles);
        }
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        // Park NPCs wander
        this.parkNPCs.forEach(npc => {
            if (Math.random() < 0.01) {
                npc.targetX = Phaser.Math.Between(100, 700);
                npc.targetY = Phaser.Math.Between(100, 500);
            }
            
            const angle = Phaser.Math.Angle.Between(
                npc.sprite.x, npc.sprite.y, npc.targetX, npc.targetY
            );
            const dist = Phaser.Math.Distance.Between(
                npc.sprite.x, npc.sprite.y, npc.targetX, npc.targetY
            );
            
            if (dist > 20) {
                npc.sprite.setVelocity(
                    Math.cos(angle) * npc.speed,
                    Math.sin(angle) * npc.speed
                );
            } else {
                npc.sprite.setVelocity(0, 0);
            }
        });
        
        // Passive energy regen in park
        if (Math.random() < 0.02) {
            gameState.data.player.energy = Math.min(
                gameState.data.player.maxEnergy,
                gameState.data.player.energy + 1
            );
            updateUI();
        }
        
        // Check interactions
        let nearest = null;
        let minDist = Infinity;
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                if (nearest.getData('type') === 'door') {
                    this.cameras.main.fadeOut(500);
                    this.time.delayedCall(500, () => {
                        this.scene.start(nearest.getData('target'));
                    });
                }
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// Restaurant Scene
class RestaurantScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RestaurantScene' });
    }

    create() {
        const width = 640;
        const height = 480;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Background
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        this.createWalls(width, height);
        
        // Title
        this.add.text(320, 30, '🍽️ RESTAURANT', {
            fontSize: '24px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(320, 400, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createRestaurant();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('🍽️ Grab a meal to restore energy and network!');
    }
    
    createWalls(width, height) {
        this.walls = this.physics.add.staticGroup();
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
    }
    
    createRestaurant() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Tables (4x3 grid)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                const x = 120 + col * 130;
                const y = 140 + row * 100;
                
                const table = this.add.circle(x, y, 30, 0xA0522D);
                table.setStrokeStyle(2, 0x654321);
                
                const tableCol = this.obstacles.create(x, y, null);
                tableCol.setSize(60, 60);
                tableCol.setAlpha(0);
                tableCol.refreshBody();
                
                // Plates on some tables
                if (Math.random() > 0.5) {
                    this.add.circle(x, y, 10, 0xFFFFFF);
                }
            }
        }
        
        // NPCs at tables
        const dinerSpots = [
            {x: 120, y: 140, sprite: 'npc1'},
            {x: 380, y: 240, sprite: 'npc3'},
            {x: 510, y: 340, sprite: 'npc5'}
        ];
        
        dinerSpots.forEach(spot => {
            this.add.sprite(spot.x, spot.y, spot.sprite).setScale(1.2);
        });
        
        // Plants
        this.add.image(60, 80, 'plant');
        this.add.image(580, 80, 'plant');
        
        // Exit
        const door = this.interactables.create(320, 450, 'door');
        door.setData('type', 'door');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        // Check door
        let nearest = null;
        let minDist = Infinity;
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                this.cameras.main.fadeOut(500);
                this.time.delayedCall(500, () => {
                    this.scene.start(nearest.getData('target'));
                });
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// Co-working Space Scene
class CoworkingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CoworkingScene' });
    }

    create() {
        const width = 640;
        const height = 480;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Background
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        this.createWalls(width, height);
        
        // Title
        this.add.text(320, 30, '💼 CO-WORKING SPACE', {
            fontSize: '24px',
            color: '#2A9D8F',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(320, 400, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createCoworking();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('💼 Work and network with other professionals!');
    }
    
    createWalls(width, height) {
        this.walls = this.physics.add.staticGroup();
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
    }
    
    createCoworking() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Work desks (grid of 3x2)
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 3; col++) {
                const x = 140 + col * 180;
                const y = 130 + row * 140;
                
                const desk = this.obstacles.create(x, y, 'desk');
                desk.refreshBody();
                
                this.add.image(x, y, 'laptop');
                
                // Some desks have people working
                if (Math.random() > 0.4) {
                    const sprites = ['npc1', 'npc2', 'npc3', 'npc4', 'npc5'];
                    this.add.sprite(x, y - 20, Phaser.Math.RND.pick(sprites)).setScale(1.2);
                }
            }
        }
        
        // Coffee station
        const coffeeStation = this.obstacles.create(550, 350, null);
        coffeeStation.setSize(60, 40);
        coffeeStation.setAlpha(0);
        coffeeStation.refreshBody();
        this.add.rectangle(550, 350, 60, 40, 0x8B4513);
        this.add.image(550, 350, 'coffee').setScale(2);
        
        // Plants
        this.add.image(50, 80, 'plant');
        this.add.image(590, 80, 'plant');
        this.add.image(50, 400, 'plant');
        this.add.image(590, 400, 'plant');
        
        // Exit
        const door = this.interactables.create(320, 450, 'door');
        door.setData('type', 'door');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        // Proximity networking boost
        if (Math.random() < 0.01) {
            gameState.data.player.networking += 1;
            updateUI();
        }
        
        // Check door
        let nearest = null;
        let minDist = Infinity;
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                this.cameras.main.fadeOut(500);
                this.time.delayedCall(500, () => {
                    this.scene.start(nearest.getData('target'));
                });
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// Library Scene - Learn and research
class LibraryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LibraryScene' });
    }

    create() {
        const width = 800;
        const height = 600;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Background
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        this.createWalls(width, height);
        
        // Title
        this.add.text(400, 40, '📚 PUBLIC LIBRARY', {
            fontSize: '28px',
            color: '#7B1FA2',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.add.text(400, 70, '"Knowledge is Power"', {
            fontSize: '14px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2,
            fontStyle: 'italic'
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createLibrary();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('📚 Read books to gain skills and wisdom!');
    }
    
    createWalls(width, height) {
        this.walls = this.physics.add.staticGroup();
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
    }
    
    createLibrary() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Rows of bookshelves
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 5; col++) {
                const x = 140 + col * 120;
                const y = 150 + row * 120;
                
                const bookshelf = this.obstacles.create(x, y, 'bookshelf');
                bookshelf.refreshBody();
                
                // Make some shelves interactive (reading spots)
                if (col % 2 === 0) {
                    const readSpot = this.interactables.create(x, y + 40, null);
                    readSpot.setSize(40, 40);
                    readSpot.setData('type', 'book');
                    readSpot.setData('name', `Bookshelf ${row * 5 + col + 1}`);
                    readSpot.refreshBody();
                }
            }
        }
        
        // Reading tables
        const tablePositions = [
            {x: 200, y: 480}, {x: 400, y: 480}, {x: 600, y: 480}
        ];
        
        tablePositions.forEach(pos => {
            const table = this.add.rectangle(pos.x, pos.y, 80, 50, 0x8B4513);
            table.setStrokeStyle(2, 0x654321);
            
            const tableCol = this.obstacles.create(pos.x, pos.y, null);
            tableCol.setSize(80, 50);
            tableCol.setAlpha(0);
            tableCol.refreshBody();
            
            // Books on table
            this.add.rectangle(pos.x - 15, pos.y, 20, 15, 0x8B0000);
            this.add.rectangle(pos.x + 15, pos.y, 20, 15, 0x0000CD);
        });
        
        // Librarian NPC
        const librarian = this.add.sprite(400, 120, 'npc5');
        librarian.setScale(1.5);
        this.add.text(400, 85, 'Librarian', {
            fontSize: '12px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Plants
        this.add.image(60, 100, 'plant');
        this.add.image(740, 100, 'plant');
        
        // Exit
        const door = this.interactables.create(400, 570, 'door');
        door.setData('type', 'door');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        // Check interactions
        let nearest = null;
        let minDist = Infinity;
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                const type = nearest.getData('type');
                if (type === 'door') {
                    this.cameras.main.fadeOut(500);
                    this.time.delayedCall(500, () => {
                        this.scene.start(nearest.getData('target'));
                    });
                } else if (type === 'book') {
                    // Read book
                    if (gameState.data.player.coins >= 30) {
                        gameState.data.player.coins -= 30;
                        gameState.data.player.skills += 15;
                        gameState.data.player.reputation += 5;
                        gameState.gainXP(40);
                        showNotification('📖 Finished reading! +15 skills, +5 reputation');
                        updateUI();
                    } else {
                        showNotification('💰 Need 30 coins to check out this book');
                    }
                }
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// University Scene - Advanced learning
class UniversityScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UniversityScene' });
    }

    create() {
        const width = 800;
        const height = 600;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Background
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        this.createWalls(width, height);
        
        // Title
        this.add.text(400, 40, '🎓 TECH UNIVERSITY', {
            fontSize: '28px',
            color: '#E91E63',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createUniversity();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('🎓 Enroll in courses to master new skills!');
    }
    
    createWalls(width, height) {
        this.walls = this.physics.add.staticGroup();
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
    }
    
    createUniversity() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Lecture hall desks
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 6; col++) {
                const x = 120 + col * 100;
                const y = 150 + row * 100;
                
                const desk = this.obstacles.create(x, y, 'desk');
                desk.setScale(0.8);
                desk.refreshBody();
                
                // Some seats have students
                if (Math.random() > 0.4) {
                    const sprites = ['npc1', 'npc2', 'npc3', 'npc4', 'npc5'];
                    this.add.sprite(x, y - 10, Phaser.Math.RND.pick(sprites)).setScale(1.2);
                }
            }
        }
        
        // Professor at front
        const professor = this.add.sprite(400, 110, 'npc5');
        professor.setScale(1.8);
        this.add.text(400, 70, 'Professor Chen', {
            fontSize: '14px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Enrollment desk (interactive)
        const enrollDesk = this.interactables.create(400, 480, null);
        enrollDesk.setSize(100, 60);
        enrollDesk.setData('type', 'enroll');
        enrollDesk.setData('name', 'Course Enrollment');
        enrollDesk.refreshBody();
        
        this.add.rectangle(400, 480, 100, 60, 0x8B4513);
        this.add.text(400, 480, 'ENROLL\nHERE', {
            fontSize: '12px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        
        // Exit
        const door = this.interactables.create(400, 570, 'door');
        door.setData('type', 'door');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        // Check interactions
        let nearest = null;
        let minDist = Infinity;
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                const type = nearest.getData('type');
                if (type === 'door') {
                    this.cameras.main.fadeOut(500);
                    this.time.delayedCall(500, () => {
                        this.scene.start(nearest.getData('target'));
                    });
                } else if (type === 'enroll') {
                    // Enroll in course
                    if (gameState.data.player.coins >= 100) {
                        gameState.data.player.coins -= 100;
                        gameState.data.player.skills += 30;
                        gameState.data.player.reputation += 15;
                        gameState.gainXP(100);
                        showNotification('🎓 Course completed! +30 skills, +15 reputation, +100 XP');
                        showAchievement('Lifelong Learner 📚');
                        updateUI();
                    } else {
                        showNotification('💰 Need 100 coins for university course');
                    }
                }
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// Shop Scene - Buy items and equipment
class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
    }

    create() {
        const width = 640;
        const height = 480;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Background
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        this.createWalls(width, height);
        
        // Title
        this.add.text(320, 40, '🛍️ PROFESSIONAL SHOP', {
            fontSize: '26px',
            color: '#FF6B6B',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.add.text(320, 70, 'Gear Up for Success', {
            fontSize: '14px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(320, 400, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createShop();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('🛍️ Shop for equipment to boost your stats!');
    }
    
    createWalls(width, height) {
        this.walls = this.physics.add.staticGroup();
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
    }
    
    createShop() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Shop keeper
        const keeper = this.add.sprite(320, 120, 'npc4');
        keeper.setScale(1.6);
        this.add.text(320, 85, 'Shop Owner', {
            fontSize: '12px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Counter
        const counter = this.add.rectangle(320, 150, 200, 50, 0x8B4513);
        counter.setStrokeStyle(3, 0x654321);
        const counterCol = this.obstacles.create(320, 150, null);
        counterCol.setSize(200, 50);
        counterCol.setAlpha(0);
        counterCol.refreshBody();
        
        // Shop items on display
        const shopItems = [
            { icon: '💻', x: 150, y: 250, itemId: 'pro_laptop', price: 500 },
            { icon: '📱', x: 250, y: 250, itemId: 'pro_phone', price: 300 },
            { icon: '💼', x: 350, y: 250, itemId: 'designer_briefcase', price: 400 },
            { icon: '👔', x: 450, y: 250, itemId: 'designer_suit', price: 600 },
            { icon: '🥤', x: 200, y: 330, itemId: 'energy_drink', price: 50 },
            { icon: '⭐', x: 320, y: 330, itemId: 'xp_boost', price: 75 },
            { icon: '🪙', x: 440, y: 330, itemId: 'lucky_coin', price: 80 }
        ];
        
        shopItems.forEach(item => {
            // Display item
            const itemText = this.add.text(item.x, item.y, item.icon, {
                fontSize: '32px'
            }).setOrigin(0.5);
            
            // Price label
            this.add.text(item.x, item.y + 30, `${item.price} 💰`, {
                fontSize: '12px',
                color: '#FFD700',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);
            
            // Create interactive zone
            const shopSpot = this.interactables.create(item.x, item.y, null);
            shopSpot.setSize(50, 50);
            shopSpot.setData('type', 'shop_item');
            shopSpot.setData('itemId', item.itemId);
            shopSpot.setData('price', item.price);
            shopSpot.refreshBody();
        });
        
        // Plants
        this.add.image(60, 200, 'plant');
        this.add.image(580, 200, 'plant');
        
        // Exit
        const door = this.interactables.create(320, 450, 'door');
        door.setData('type', 'door');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        // Check interactions
        let nearest = null;
        let minDist = Infinity;
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                const type = nearest.getData('type');
                if (type === 'door') {
                    this.cameras.main.fadeOut(500);
                    this.time.delayedCall(500, () => {
                        this.scene.start(nearest.getData('target'));
                    });
                } else if (type === 'shop_item') {
                    const itemId = nearest.getData('itemId');
                    const price = nearest.getData('price');
                    
                    if (gameState.data.player.coins >= price) {
                        gameState.data.player.coins -= price;
                        itemManager.addItemToInventory(itemId);
                        const item = itemManager.getItem(itemId);
                        showNotification(`Purchased ${item.name}! Check inventory (I)`);
                        this.cameras.main.flash(200, 0, 255, 0, false, null, 0.3);
                        updateUI();
                    } else {
                        showNotification(`💰 Need ${price} coins! (You have ${gameState.data.player.coins})`);
                    }
                }
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// Job Interview Scene
class JobInterviewScene extends Phaser.Scene {
    constructor() {
        super({ key: 'JobInterviewScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Dark office setting
        this.add.rectangle(width/2, height/2, width, height, 0x1A1A2E);
        
        // Conference table
        this.add.rectangle(width/2, height/2, 400, 200, 0x8B4513);
        
        // Interviewer
        const interviewer = this.add.sprite(width/2, height/2 - 80, 'npc5');
        interviewer.setScale(2.5);
        
        this.add.text(width/2, height/2 - 150, 'HR Manager', {
            fontSize: '20px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Title
        this.add.text(width/2, height/2 - 200, '💼 JOB INTERVIEW', {
            fontSize: '32px',
            color: '#00FF88',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Interview questions
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        
        this.questions = [
            {
                q: "What's your greatest strength?",
                answers: [
                    { text: "Problem solving & adaptability", correct: true },
                    { text: "I work too hard", correct: false },
                    { text: "I'm perfect", correct: false }
                ]
            },
            {
                q: "Why do you want this position?",
                answers: [
                    { text: "Money", correct: false },
                    { text: "Growth opportunity & team", correct: true },
                    { text: "It's close to home", correct: false }
                ]
            },
            {
                q: "Tell me about a challenge you overcame",
                answers: [
                    { text: "I debugged a complex issue", correct: true },
                    { text: "I woke up on time", correct: false },
                    { text: "Never had challenges", correct: false }
                ]
            }
        ];
        
        this.showQuestion();
    }
    
    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endInterview();
            return;
        }
        
        const q = this.questions[this.currentQuestion];
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Question text
        if (this.questionText) this.questionText.destroy();
        this.questionText = this.add.text(width/2, height/2 + 50, q.q, {
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'center',
            wordWrap: { width: 500 }
        }).setOrigin(0.5);
        
        // Answer buttons
        if (this.answerButtons) {
            this.answerButtons.forEach(btn => {
                btn.text.destroy();
                btn.rect.destroy();
            });
        }
        
        this.answerButtons = [];
        q.answers.forEach((answer, i) => {
            const y = height/2 + 120 + i * 60;
            
            const rect = this.add.rectangle(width/2, y, 500, 50, 0x0A66C2);
            rect.setStrokeStyle(2, 0x00FF88);
            rect.setInteractive();
            
            const text = this.add.text(width/2, y, answer.text, {
                fontSize: '16px',
                color: '#FFFFFF'
            }).setOrigin(0.5);
            
            rect.on('pointerover', () => {
                rect.setFillStyle(0x0E7FE8);
                rect.setScale(1.02);
            });
            
            rect.on('pointerout', () => {
                rect.setFillStyle(0x0A66C2);
                rect.setScale(1);
            });
            
            rect.on('pointerdown', () => {
                if (answer.correct) {
                    this.correctAnswers++;
                    this.cameras.main.flash(200, 0, 255, 0, false, null, 0.3);
                    showNotification('✓ Good answer!');
                } else {
                    this.cameras.main.shake(200, 0.003);
                    showNotification('✗ Could be better...');
                }
                
                this.currentQuestion++;
                this.time.delayedCall(800, () => {
                    this.showQuestion();
                });
            });
            
            this.answerButtons.push({ rect, text });
        });
    }
    
    endInterview() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Clear everything
        if (this.questionText) this.questionText.destroy();
        if (this.answerButtons) {
            this.answerButtons.forEach(btn => {
                btn.text.destroy();
                btn.rect.destroy();
            });
        }
        
        const passed = this.correctAnswers >= 2;
        
        if (passed) {
            // Hired!
            const jobTitles = ['Junior Dev', 'Software Engineer', 'Senior Dev', 'Lead Developer'];
            const salaries = [100, 200, 350, 500];
            const jobLevel = Math.min(3, Math.floor(gameState.data.player.level / 5));
            
            gameState.data.player.job = jobTitles[jobLevel];
            gameState.data.player.salary = salaries[jobLevel];
            gameState.data.player.coins += 200; // Signing bonus
            gameState.gainXP(150);
            
            this.add.text(width/2, height/2, `🎉 YOU'RE HIRED!\n\nPosition: ${jobTitles[jobLevel]}\nSalary: ${salaries[jobLevel]} coins/day\nSigning Bonus: 200 coins`, {
                fontSize: '24px',
                color: '#00FF88',
                align: 'center',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            showAchievement(`Hired as ${jobTitles[jobLevel]}!`);
            
            this.cameras.main.flash(500, 0, 255, 0);
            
            // Confetti
            for (let i = 0; i < 30; i++) {
                const confetti = this.add.text(
                    Phaser.Math.Between(width/2 - 200, width/2 + 200),
                    height/2 - 100,
                    Phaser.Math.RND.pick(['🎉', '⭐', '✨']),
                    { fontSize: '20px' }
                );
                
                this.tweens.add({
                    targets: confetti,
                    y: height/2 + 200,
                    x: confetti.x + Phaser.Math.Between(-100, 100),
                    alpha: 0,
                    rotation: Phaser.Math.Between(-3, 3),
                    duration: 2000,
                    onComplete: () => confetti.destroy()
                });
            }
        } else {
            // Rejected
            this.add.text(width/2, height/2, `Unfortunately, we've decided to go\nwith another candidate.\n\nKeep improving your skills!`, {
                fontSize: '20px',
                color: '#FF6B6B',
                align: 'center'
            }).setOrigin(0.5);
            
            gameState.data.player.coins += 25; // Consolation
            showNotification('Better luck next time! +25 coins for trying');
        }
        
        updateUI();
        
        // Return to city
        this.time.delayedCall(4000, () => {
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.start('CityScene');
            });
        });
    }
}

// Email Scene - Check emails and respond
class EmailScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EmailScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        this.add.rectangle(width/2, height/2, width, height, 0x1A1A2E);
        
        // Email interface
        const emailBox = this.add.rectangle(width/2, height/2, 800, 600, 0x2C2C2C);
        emailBox.setStrokeStyle(4, 0x0A66C2);
        
        // Title bar
        this.add.rectangle(width/2, height/2 - 270, 800, 60, 0x0A66C2);
        this.add.text(width/2, height/2 - 270, '📧 LINKEDIN MESSAGES', {
            fontSize: '24px',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Generate emails if empty
        if (gameState.data.emails.length === 0) {
            this.generateEmails();
        }
        
        // Display emails
        this.displayEmails();
        
        // Close button
        const closeBtn = this.add.rectangle(width/2, height/2 + 270, 200, 50, 0xFF6B6B);
        closeBtn.setStrokeStyle(2, 0xFFFFFF);
        closeBtn.setInteractive();
        
        const closeText = this.add.text(width/2, height/2 + 270, 'Close (ESC)', {
            fontSize: '18px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        closeBtn.on('pointerdown', () => {
            this.scene.stop();
        });
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop();
        });
    }
    
    generateEmails() {
        const emailTemplates = [
            {
                from: 'LinkedIn Recruiter',
                subject: 'Job Opportunity - Software Engineer',
                body: 'Hi! I came across your profile. We have an opening that matches your skills. Interested in interviewing?',
                action: 'interview',
                reward: { type: 'interview' }
            },
            {
                from: 'Sarah Chen',
                subject: 'Great connecting with you!',
                body: 'Thanks for connecting! I love your recent post about career growth. Let\'s collaborate!',
                action: 'reply',
                reward: { xp: 25, reputation: 5 }
            },
            {
                from: 'Tech Conference',
                subject: '🎯 You\'re Invited to Tech Summit 2024',
                body: 'We noticed your engagement on LinkedIn. Join us at the Tech Summit next month!',
                action: 'accept',
                reward: { xp: 50, coins: 100 }
            },
            {
                from: 'Marcus Johnson',
                subject: 'Mentorship Opportunity',
                body: 'I\'d like to offer you mentorship. I\'ve been in the industry for 10 years. Let me know if interested!',
                action: 'accept',
                reward: { skills: 20, reputation: 10 }
            },
            {
                from: 'LinkedIn',
                subject: 'Your post is trending!',
                body: 'Congratulations! Your post has received 500 impressions in the last 24 hours.',
                action: 'acknowledge',
                reward: { followers: 10, coins: 50 }
            }
        ];
        
        // Add 3-5 random emails
        const emailCount = Phaser.Math.Between(3, 5);
        for (let i = 0; i < emailCount; i++) {
            const template = Phaser.Math.RND.pick(emailTemplates);
            gameState.data.emails.push({
                id: Date.now() + i,
                ...template,
                read: false
            });
        }
        
        gameState.saveGame();
    }
    
    displayEmails() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const startY = height/2 - 210;
        
        gameState.data.emails.slice(0, 5).forEach((email, index) => {
            const y = startY + index * 100;
            
            // Email item
            const emailBg = this.add.rectangle(width/2, y, 750, 90, email.read ? 0x3A3A3A : 0x0A66C2);
            emailBg.setStrokeStyle(2, email.read ? 0x5A5A5A : 0x00FF88);
            emailBg.setInteractive();
            
            // From
            this.add.text(width/2 - 360, y - 30, `From: ${email.from}`, {
                fontSize: '14px',
                color: email.read ? '#999999' : '#FFD700',
                fontStyle: 'bold'
            });
            
            // Subject
            this.add.text(width/2 - 360, y - 5, email.subject, {
                fontSize: '16px',
                color: '#FFFFFF'
            });
            
            // Action button
            const actionBtn = this.add.rectangle(width/2 + 300, y, 100, 40, 0x00FF88);
            actionBtn.setInteractive();
            
            const actionText = this.add.text(width/2 + 300, y, email.action.toUpperCase(), {
                fontSize: '12px',
                color: '#000000',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            actionBtn.on('pointerdown', () => {
                this.handleEmail Action(email);
            });
            
            emailBg.on('pointerover', () => {
                emailBg.setFillStyle(email.read ? 0x4A4A4A : 0x0E7FE8);
            });
            
            emailBg.on('pointerout', () => {
                emailBg.setFillStyle(email.read ? 0x3A3A3A : 0x0A66C2);
            });
        });
        
        if (gameState.data.emails.length === 0) {
            this.add.text(width/2, height/2, 'No new messages', {
                fontSize: '18px',
                color: '#666666'
            }).setOrigin(0.5);
        }
    }
    
    handleEmailAction(email) {
        email.read = true;
        
        if (email.action === 'interview') {
            this.scene.stop();
            this.scene.start('JobInterviewScene');
            return;
        }
        
        // Apply rewards
        const reward = email.reward;
        if (reward.xp) gameState.gainXP(reward.xp);
        if (reward.coins) gameState.data.player.coins += reward.coins;
        if (reward.reputation) gameState.data.player.reputation += reward.reputation;
        if (reward.skills) gameState.data.player.skills += reward.skills;
        if (reward.followers) gameState.data.player.followers += reward.followers;
        
        showNotification(`Email responded! Rewards received!`);
        updateUI();
        gameState.saveGame();
        
        // Remove email
        gameState.data.emails = gameState.data.emails.filter(e => e.id !== email.id);
        
        // Refresh display
        this.scene.restart();
    }
}

// Mentor Scene - Get guidance from experienced professionals
class MentorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MentorScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Office background
        this.add.rectangle(width/2, height/2, width, height, 0x2C2C2C);
        
        // Title
        this.add.text(width/2, 100, '🎓 MENTORSHIP SESSION', {
            fontSize: '32px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Mentor
        const mentor = this.add.sprite(width/2, height/2 - 50, 'npc2');
        mentor.setScale(3);
        
        this.add.text(width/2, height/2 - 140, 'Senior Mentor', {
            fontSize: '20px',
            color: '#00FF88',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Mentorship options
        const options = [
            { text: '💼 Career Advice', cost: 100, reward: { reputation: 25, xp: 75 } },
            { text: '📚 Skill Training', cost: 150, reward: { skills: 40, xp: 100 } },
            { text: '🤝 Network Introduction', cost: 200, reward: { networking: 30, connections: 3, xp: 125 } },
            { text: '🎯 Job Referral', cost: 300, reward: { coins: 500, reputation: 40, xp: 200 } }
        ];
        
        options.forEach((option, i) => {
            const y = height/2 + 80 + i * 70;
            
            const btn = this.add.rectangle(width/2, y, 500, 60, 0x0A66C2);
            btn.setStrokeStyle(3, 0xFFD700);
            btn.setInteractive();
            
            const text = this.add.text(width/2, y - 10, option.text, {
                fontSize: '18px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            const cost = this.add.text(width/2, y + 15, `Cost: ${option.cost} 💰`, {
                fontSize: '14px',
                color: '#FFD700'
            }).setOrigin(0.5);
            
            btn.on('pointerover', () => {
                btn.setFillStyle(0x0E7FE8);
                btn.setScale(1.02);
            });
            
            btn.on('pointerout', () => {
                btn.setFillStyle(0x0A66C2);
                btn.setScale(1);
            });
            
            btn.on('pointerdown', () => {
                if (gameState.data.player.coins >= option.cost) {
                    gameState.data.player.coins -= option.cost;
                    
                    // Apply rewards
                    const r = option.reward;
                    if (r.reputation) gameState.data.player.reputation += r.reputation;
                    if (r.skills) gameState.data.player.skills += r.skills;
                    if (r.networking) gameState.data.player.networking += r.networking;
                    if (r.connections) gameState.data.player.connections += r.connections;
                    if (r.coins) gameState.data.player.coins += r.coins;
                    if (r.xp) gameState.gainXP(r.xp);
                    
                    showNotification(`✨ Mentorship completed! Rewards received`);
                    showAchievement('Mentored by Expert!');
                    this.cameras.main.flash(300, 255, 215, 0, false, null, 0.4);
                    updateUI();
                    
                    this.time.delayedCall(2000, () => {
                        this.cameras.main.fadeOut(1000);
                        this.time.delayedCall(1000, () => {
                            this.scene.start('CityScene');
                        });
                    });
                } else {
                    showNotification(`💰 Need ${option.cost} coins`);
                }
            });
        });
        
        // Cancel button
        const cancelBtn = this.add.rectangle(width/2, height/2 + 380, 200, 50, 0xFF6B6B);
        cancelBtn.setStrokeStyle(2, 0xFFFFFF);
        cancelBtn.setInteractive();
        
        this.add.text(width/2, height/2 + 380, 'Leave', {
            fontSize: '18px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        cancelBtn.on('pointerdown', () => {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start('CityScene');
            });
        });
    }
}

// Dating/Social Scene - Build relationships
class DatingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DatingScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Romantic setting
        this.add.rectangle(width/2, height/2, width, height, 0xFF6B9D, 0.3);
        this.add.rectangle(width/2, height/2, width, height, 0x1A1A2E, 0.7);
        
        // Hearts floating
        for (let i = 0; i < 20; i++) {
            const heart = this.add.text(
                Phaser.Math.Between(100, width - 100),
                Phaser.Math.Between(100, height - 100),
                '💕',
                { fontSize: '24px', alpha: 0.3 }
            );
            
            this.tweens.add({
                targets: heart,
                y: heart.y - 100,
                alpha: 0,
                duration: 3000 + Math.random() * 2000,
                repeat: -1,
                delay: Math.random() * 2000
            });
        }
        
        // Title
        this.add.text(width/2, 100, '💕 SOCIAL CONNECTION', {
            fontSize: '32px',
            color: '#FF69B4',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.add.text(width/2, 140, 'Build meaningful relationships', {
            fontSize: '16px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Potential connections
        const people = [
            { name: 'Sarah Chen', sprite: 'npc1', bio: 'Product Manager who loves hiking' },
            { name: 'David Park', sprite: 'npc4', bio: 'Content creator and coffee enthusiast' }
        ];
        
        people.forEach((person, i) => {
            const x = width/2 - 200 + i * 400;
            const y = height/2;
            
            // Card
            const card = this.add.rectangle(x, y, 300, 400, 0x2C2C2C);
            card.setStrokeStyle(4, 0xFF69B4);
            
            // Profile pic
            this.add.sprite(x, y - 100, person.sprite).setScale(2.5);
            
            // Name
            this.add.text(x, y + 20, person.name, {
                fontSize: '20px',
                color: '#FFD700',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            // Bio
            this.add.text(x, y + 60, person.bio, {
                fontSize: '14px',
                color: '#FFFFFF',
                align: 'center',
                wordWrap: { width: 260 }
            }).setOrigin(0.5);
            
            // Connect button
            const connectBtn = this.add.rectangle(x, y + 140, 200, 50, 0xFF69B4);
            connectBtn.setStrokeStyle(2, 0xFFFFFF);
            connectBtn.setInteractive();
            
            const btnText = this.add.text(x, y + 140, '💬 Start Chat', {
                fontSize: '16px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            connectBtn.on('pointerover', () => {
                connectBtn.setFillStyle(0xFF8AC0);
                connectBtn.setScale(1.05);
            });
            
            connectBtn.on('pointerout', () => {
                connectBtn.setFillStyle(0xFF69B4);
                connectBtn.setScale(1);
            });
            
            connectBtn.on('pointerdown', () => {
                // Start relationship
                gameState.data.player.connections++;
                gameState.data.player.networking += 10;
                gameState.data.player.reputation += 15;
                gameState.gainXP(50);
                
                showNotification(`💕 Started relationship with ${person.name}!`);
                showAchievement('Social Butterfly 💕');
                this.cameras.main.flash(500, 255, 105, 180, false, null, 0.5);
                updateUI();
                
                // Hearts explosion
                for (let j = 0; j < 20; j++) {
                    const heart = this.add.text(x, y - 100, '💕', { fontSize: '20px' });
                    this.tweens.add({
                        targets: heart,
                        y: y - 200,
                        x: x + Phaser.Math.Between(-100, 100),
                        alpha: 0,
                        rotation: Phaser.Math.Between(-2, 2),
                        duration: 1500,
                        onComplete: () => heart.destroy()
                    });
                }
                
                this.time.delayedCall(2000, () => {
                    this.cameras.main.fadeOut(1000);
                    this.time.delayedCall(1000, () => {
                        this.scene.start('CityScene');
                    });
                });
            });
        });
        
        // Back button
        const backBtn = this.add.rectangle(width/2, height - 100, 200, 50, 0x4A4A4A);
        backBtn.setStrokeStyle(2, 0xFFFFFF);
        backBtn.setInteractive();
        
        this.add.text(width/2, height - 100, 'Back to City', {
            fontSize: '16px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        backBtn.on('pointerdown', () => {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start('CityScene');
            });
        });
    }
}

// Conference Room Scene - Meetings and presentations
class ConferenceRoomScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ConferenceRoomScene' });
    }

    create() {
        const width = 640;
        const height = 480;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Background
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        this.createWalls(width, height);
        
        // Title
        this.add.text(320, 40, '📊 CONFERENCE ROOM', {
            fontSize: '24px',
            color: '#0A66C2',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(320, 400, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createConferenceRoom();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('📊 Attend meetings and give presentations!');
    }
    
    createWalls(width, height) {
        this.walls = this.physics.add.staticGroup();
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
    }
    
    createConferenceRoom() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Conference table (large, center)
        const table = this.add.ellipse(320, 240, 280, 150, 0x654321);
        table.setStrokeStyle(4, 0x8B4513);
        const tableCol = this.obstacles.create(320, 240, null);
        tableCol.setSize(280, 150);
        tableCol.setAlpha(0);
        tableCol.refreshBody();
        
        // Chairs around table with attendees
        const chairPositions = [
            { x: 320, y: 180, hasAttendee: true, sprite: 'npc1' },
            { x: 260, y: 200, hasAttendee: true, sprite: 'npc2' },
            { x: 380, y: 200, hasAttendee: false },
            { x: 240, y: 260, hasAttendee: true, sprite: 'npc3' },
            { x: 400, y: 260, hasAttendee: true, sprite: 'npc5' },
            { x: 280, y: 300, hasAttendee: false },
            { x: 360, y: 300, hasAttendee: false }
        ];
        
        chairPositions.forEach(chair => {
            // Chair
            this.add.rectangle(chair.x, chair.y, 30, 30, 0x8B4513);
            
            // Attendee
            if (chair.hasAttendee) {
                this.add.sprite(chair.x, chair.y, chair.sprite).setScale(1.3);
            }
        });
        
        // Presentation screen
        const screen = this.add.rectangle(320, 100, 200, 120, 0xFFFFFF);
        screen.setStrokeStyle(4, 0x000000);
        
        // Projector content
        this.add.text(320, 100, '📊 Q4 Results\n+350% Growth', {
            fontSize: '16px',
            color: '#0A66C2',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Podium (interactive - present)
        const podium = this.interactables.create(320, 340, null);
        podium.setSize(60, 40);
        podium.setData('type', 'podium');
        podium.setData('name', 'Present');
        podium.refreshBody();
        
        this.add.rectangle(320, 340, 60, 40, 0x8B4513);
        this.add.text(320, 340, '🎤', {
            fontSize: '24px'
        }).setOrigin(0.5);
        
        // Exit
        const door = this.interactables.create(320, 450, 'door');
        door.setData('type', 'door');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        // Check interactions
        let nearest = null;
        let minDist = Infinity;
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                const type = nearest.getData('type');
                if (type === 'door') {
                    this.cameras.main.fadeOut(500);
                    this.time.delayedCall(500, () => {
                        this.scene.start(nearest.getData('target'));
                    });
                } else if (type === 'podium') {
                    // Give presentation
                    if (gameState.useEnergy(25)) {
                        const quality = Phaser.Math.Between(50, 100);
                        const coins = quality * 2;
                        const rep = quality / 5;
                        
                        gameState.data.player.coins += coins;
                        gameState.data.player.reputation += rep;
                        gameState.data.player.followers += Math.floor(quality / 10);
                        gameState.gainXP(quality);
                        
                        showNotification(`📊 Presentation success! +${coins} coins, +${rep} reputation`);
                        showAchievement('Public Speaker 🎤');
                        
                        // Applause effect
                        this.cameras.main.flash(500, 255, 255, 255, false, null, 0.3);
                        for (let i = 0; i < 15; i++) {
                            const applause = this.add.text(
                                Phaser.Math.Between(200, 440),
                                Phaser.Math.Between(160, 300),
                                '👏',
                                { fontSize: '20px' }
                            );
                            
                            this.tweens.add({
                                targets: applause,
                                scale: 1.5,
                                alpha: 0,
                                duration: 1000,
                                onComplete: () => applause.destroy()
                            });
                        }
                        
                        updateUI();
                    } else {
                        showNotification('⚡ Need 25 energy to present!');
                    }
                }
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// Coffee Shop Scene
class CoffeeShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CoffeeShopScene' });
    }

    create() {
        gameState.data.location = 'coffee';
        
        // Background
        for (let x = 0; x < 640; x += 16) {
            for (let y = 0; y < 480; y += 16) {
                this.add.image(x, y, 'floor').setOrigin(0);
            }
        }
        
        this.createWalls();
        
        // Title
        this.add.text(320, 30, '☕ COFFEE SHOP', {
            fontSize: '24px',
            color: '#8B4513',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(320, 400, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createCoffeeShop();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('Buy coffee to restore energy!');
    }
    
    createWalls() {
        const width = 640;
        const height = 480;
        this.physics.world.setBounds(0, 0, width, height);
        this.walls = this.physics.add.staticGroup();
        
        for (let x = 0; x < width; x += 16) {
            this.walls.create(x, 0, 'wall').setOrigin(0).refreshBody();
            this.walls.create(x, height - 16, 'wall').setOrigin(0).refreshBody();
        }
        for (let y = 16; y < height - 16; y += 16) {
            this.walls.create(0, y, 'wall').setOrigin(0).refreshBody();
            this.walls.create(width - 16, y, 'wall').setOrigin(0).refreshBody();
        }
    }
    
    createCoffeeShop() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Counter (top center)
        const counter = this.add.rectangle(320, 120, 200, 60, 0x8B4513);
        counter.setStrokeStyle(3, 0x654321);
        const counterCol = this.obstacles.create(320, 120, null);
        counterCol.setSize(200, 60);
        counterCol.setAlpha(0);
        counterCol.refreshBody();
        
        // Barista
        const barista = this.add.sprite(320, 100, 'npc3');
        barista.setScale(1.5);
        this.add.text(320, 65, 'Barista Emma', {
            fontSize: '12px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        // Cash register (interactive)
        const register = this.interactables.create(320, 150, null);
        register.setSize(40, 40);
        register.setData('type', 'register');
        register.setData('name', 'Order Coffee');
        register.refreshBody();
        
        // Tables with chairs
        const tables = [
            {x: 150, y: 240}, {x: 490, y: 240},
            {x: 150, y: 340}, {x: 490, y: 340}
        ];
        
        tables.forEach(pos => {
            this.add.circle(pos.x, pos.y, 25, 0xA0522D);
            this.add.image(pos.x, pos.y, 'coffee').setScale(0.8);
        });
        
        // Plants
        this.add.image(80, 80, 'plant');
        this.add.image(560, 80, 'plant');
        
        // Exit
        const door = this.interactables.create(320, 450, 'door');
        door.setData('type', 'door');
        door.setData('name', 'Exit');
        door.setData('target', 'CityScene');
        door.refreshBody();
        
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.obstacles);
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        let nearest = null;
        let minDist = Infinity;
        this.interactables.children.entries.forEach(obj => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, obj.x, obj.y
            );
            if (dist < 60 && dist < minDist) {
                minDist = dist;
                nearest = obj;
            }
        });
        
        if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                const type = nearest.getData('type');
                if (type === 'door') {
                    this.cameras.main.fadeOut(500);
                    this.time.delayedCall(500, () => {
                        this.scene.start(nearest.getData('target'));
                    });
                } else if (type === 'register') {
                    if (gameState.data.player.coins >= 20) {
                        gameState.data.player.coins -= 20;
                        gameState.data.player.energy = Math.min(
                            gameState.data.player.maxEnergy,
                            gameState.data.player.energy + 40
                        );
                        showNotification('☕ Coffee purchased! +40 energy');
                        updateUI();
                    } else {
                        showNotification('💰 Not enough coins! Need 20 coins');
                    }
                }
            }
        } else {
            showInteractionPrompt(false);
        }
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
        this.createButton(width/2, 160, '✍️ Create Post (15⚡)', () => this.createPost());
        this.createButton(width/2, 210, '📚 Learn Skills (50💰)', () => this.learnSkills());
        this.createButton(width/2, 260, '🎮 Skill Minigame (Free)', () => this.startMinigame());
        this.createButton(width/2, 310, '🌳 View Skill Tree', () => this.showSkillTree());
        this.createButton(width/2, 360, '🏠 Upgrade Apartment', () => this.upgradeApartment());
        this.createButton(width/2, 410, '⚙️ Customize Character', () => this.customize());
        this.createButton(width/2, 460, '👁️ View Profile', () => this.viewProfile());
        this.createButton(width/2, 510, '❌ Close', () => this.closeMenu());

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
                questManager.checkQuest(5); // Viral post quest
            } else {
                showNotification(`✍️ Post published! ${likes} likes`);
                this.cameras.main.flash(200, 10, 102, 194, false, null, 0.3);
            }
            
            // Check quests
            questManager.checkAllQuests(gameState.data);
            
            // Story progression
            if (gameState.data.player.postsCount === 1) {
                setTimeout(() => {
                    storyManager.triggerChapter(2);
                    document.getElementById('story-continue').onclick = () => {
                        storyManager.closeStory();
                    };
                }, 2000);
            }
            
            // More story triggers
            if (gameState.data.player.connections >= 5 && gameState.data.player.postsCount >= 3) {
                setTimeout(() => {
                    storyManager.triggerChapter(3);
                    document.getElementById('story-continue').onclick = () => {
                        storyManager.closeStory();
                    };
                }, 2000);
            }
            
            if (gameState.data.player.level >= 5) {
                storyManager.triggerChapter(4);
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
    
    startMinigame() {
        this.closeMenu();
        this.scene.launch('SkillMinigameScene');
    }
    
    customize() {
        document.getElementById('customization-menu').style.display = 'block';
    }
    
    showSkillTree() {
        document.getElementById('skill-tree-menu').style.display = 'block';
        // Update skill levels based on player stats
        const skillLevels = {
            js: Math.floor(gameState.data.player.skills / 20),
            python: Math.floor(gameState.data.player.skills / 25),
            leadership: Math.floor(gameState.data.player.networking / 20),
            comm: Math.floor(gameState.data.player.reputation / 20),
            content: Math.floor(gameState.data.player.postsCount / 2),
            seo: Math.floor(gameState.data.player.followers / 20)
        };
        
        Object.keys(skillLevels).forEach(skill => {
            const lvl = Math.min(10, skillLevels[skill]);
            const elem = document.getElementById(`skill-${skill}`);
            const bar = document.getElementById(`skill-${skill}-bar`);
            if (elem) elem.textContent = `Lvl ${lvl}`;
            if (bar) bar.style.width = `${lvl * 10}%`;
        });
    }
    
    upgradeApartment() {
        const currentLevel = gameState.data.player.apartmentLevel;
        const upgradeCost = currentLevel * 500;
        
        if (currentLevel >= 5) {
            showNotification('🏠 Apartment is fully upgraded!');
            return;
        }
        
        if (gameState.data.player.coins >= upgradeCost) {
            gameState.data.player.coins -= upgradeCost;
            gameState.data.player.apartmentLevel++;
            gameState.data.player.maxEnergy += 20;
            gameState.data.player.reputation += 10;
            gameState.gainXP(100);
            
            showNotification(`🏠 Apartment upgraded to Level ${gameState.data.player.apartmentLevel}! +20 max energy`);
            showAchievement(`Apartment Level ${gameState.data.player.apartmentLevel}`);
            this.cameras.main.flash(500, 0, 200, 255, false, null, 0.4);
            updateUI();
            this.closeMenu();
        } else {
            showNotification(`💰 Need ${upgradeCost} coins to upgrade apartment`);
        }
    }

    closeMenu() {
        this.scene.stop();
        this.scene.resume('HomeScene');
    }
}

// Skill Minigame Scene - Typing challenge
class SkillMinigameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SkillMinigameScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Dark overlay
        this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.9);
        
        // Game background
        const bg = this.add.rectangle(width/2, height/2, 600, 400, 0x1E3A8A);
        bg.setStrokeStyle(4, 0x00FF88);
        
        // Title
        this.add.text(width/2, height/2 - 150, '⚡ CODING CHALLENGE', {
            fontSize: '32px',
            color: '#00FF88',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Instructions
        this.add.text(width/2, height/2 - 100, 'Type the code snippet correctly!', {
            fontSize: '18px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        // Code to type
        const codeSnippets = [
            'function hello()',
            'const user = data',
            'return result',
            'if (x > 0) {}',
            'let count = 0'
        ];
        
        this.targetCode = Phaser.Math.RND.pick(codeSnippets);
        this.typedCode = '';
        this.startTime = Date.now();
        
        // Display target
        this.add.text(width/2, height/2 - 40, 'Type This:', {
            fontSize: '14px',
            color: '#FFD700'
        }).setOrigin(0.5);
        
        this.targetText = this.add.text(width/2, height/2, this.targetCode, {
            fontSize: '24px',
            color: '#00FF88',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);
        
        // Your input
        this.add.text(width/2, height/2 + 60, 'Your Input:', {
            fontSize: '14px',
            color: '#FFD700'
        }).setOrigin(0.5);
        
        this.inputText = this.add.text(width/2, height/2 + 90, '', {
            fontSize: '24px',
            color: '#FFFFFF',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);
        
        // Listen for typing
        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeMinigame();
                return;
            }
            
            if (event.key === 'Backspace') {
                this.typedCode = this.typedCode.slice(0, -1);
            } else if (event.key.length === 1) {
                this.typedCode += event.key;
            }
            
            this.inputText.setText(this.typedCode);
            
            // Check if correct
            if (this.typedCode === this.targetCode) {
                this.completeMinigame();
            }
        });
        
        // Time remaining
        this.timerText = this.add.text(width/2, height/2 + 140, 'Time: 10s', {
            fontSize: '18px',
            color: '#FF6B6B'
        }).setOrigin(0.5);
        
        this.timeLimit = 10000;
        this.time.delayedCall(this.timeLimit, () => {
            if (this.scene.isActive()) {
                showNotification('⏰ Time\'s up! Try again');
                this.closeMinigame();
            }
        });
    }
    
    update() {
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(0, Math.ceil((this.timeLimit - elapsed) / 1000));
        this.timerText.setText(`Time: ${remaining}s`);
    }
    
    completeMinigame() {
        const elapsed = Date.now() - this.startTime;
        const timeBonus = Math.floor((10000 - elapsed) / 100);
        
        gameState.data.player.skills += 15 + timeBonus;
        gameState.data.player.coins += 50 + timeBonus;
        gameState.gainXP(30 + timeBonus);
        
        showNotification(`🎮 Challenge Complete! +${15 + timeBonus} skills, +${50 + timeBonus} coins!`);
        updateUI();
        
        this.closeMinigame();
    }
    
    closeMinigame() {
        this.input.keyboard.off('keydown');
        this.scene.stop();
    }
}

// ============================================================================
// PHASER GAME CONFIGURATION
// ============================================================================

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [IntroScene, BootScene, TutorialScene, HomeScene, CityScene, GymScene, CoffeeShopScene, ParkScene, RestaurantScene, CoworkingScene, LibraryScene, UniversityScene, ShopScene, JobInterviewScene, MentorScene, DatingScene, ConferenceRoomScene, ComputerMenuScene, SkillMinigameScene, EmailScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%'
    }
};

// Initialize the game
const game = new Phaser.Game(config);
window.game = game; // Expose globally for fullscreen toggle
window.gameState = gameState; // Expose for customization

// Update UI periodically
setInterval(updateUI, 1000);

