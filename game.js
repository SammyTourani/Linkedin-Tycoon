// LinkedIn Tycoon Game Engine
// Main game class with all systems and mechanics

class LinkedInTycoon {
    constructor() {
        this.gameState = this.loadGame() || this.createNewGame();
        this.currentModal = null;
        this.selectedPerson = null;
        this.gameLoopInterval = null;
        this.init();
    }

    createNewGame() {
        return {
            player: {
                name: 'Alex Developer',
                headline: 'Junior Software Engineer',
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
                profilePicture: '👤',
                badges: ['🎓 Student']
            },
            connections: this.generateInitialConnections(),
            posts: [],
            pendingRequests: [],
            suggestions: [],
            events: [],
            completedChallenges: [],
            achievements: [],
            notifications: [],
            skillTree: this.createSkillTree(),
            shopItems: this.createShopItems(),
            leaderboard: this.generateLeaderboard(),
            lastEnergyUpdate: Date.now(),
            gameTime: 0
        };
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
        this.startGameLoop();
        this.generateInitialSuggestions();
        this.generateEvents();
        this.addNotification('Welcome to LinkedIn Tycoon! Start building your professional empire.', 'info');
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Auto-save every 30 seconds
        setInterval(() => this.saveGame(), 30000);

        // Handle page close
        window.addEventListener('beforeunload', () => this.saveGame());
    }

    switchTab(tabName) {
        // Update buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Refresh content
        if (tabName === 'network') {
            this.updateNetworkTab();
        } else if (tabName === 'feed') {
            this.updateFeed();
        } else if (tabName === 'events') {
            this.updateEventsTab();
        } else if (tabName === 'skills') {
            this.updateSkillsTab();
        }
    }

    // ===== ENERGY & TIME MANAGEMENT =====
    startGameLoop() {
        this.gameLoopInterval = setInterval(() => {
            this.gameLoop();
        }, 1000);
    }

    gameLoop() {
        const now = Date.now();
        const deltaTime = now - this.gameState.lastEnergyUpdate;
        
        // Regenerate energy (1 point every 10 seconds)
        if (deltaTime >= 10000) {
            const energyGain = Math.floor(deltaTime / 10000);
            this.gameState.player.energy = Math.min(
                this.gameState.player.maxEnergy,
                this.gameState.player.energy + energyGain
            );
            this.gameState.lastEnergyUpdate = now;
            this.updateEnergyDisplay();
        }

        // Update game time
        this.gameState.gameTime++;

        // Random events
        if (Math.random() < 0.01) { // 1% chance per second
            this.triggerRandomEvent();
        }

        // Update post engagement
        this.updatePostEngagement();
    }

    useEnergy(amount) {
        if (this.gameState.player.energy >= amount) {
            this.gameState.player.energy -= amount;
            this.updateEnergyDisplay();
            return true;
        }
        this.addNotification('Not enough energy! Wait for it to recharge.', 'error');
        return false;
    }

    // ===== NETWORKING SYSTEM =====
    generateInitialConnections() {
        const names = [
            'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'James Wilson', 'Lisa Anderson'
        ];
        return names.map((name, i) => ({
            id: `conn_${i}`,
            name: name,
            title: this.getRandomTitle(),
            connections: Math.floor(Math.random() * 500) + 50,
            mutualConnections: Math.floor(Math.random() * 5),
            level: Math.floor(Math.random() * 5) + 1
        }));
    }

    generateInitialSuggestions() {
        this.gameState.suggestions = [];
        for (let i = 0; i < 5; i++) {
            this.gameState.suggestions.push(this.generatePerson());
        }
        this.updateNetworkTab();
    }

    generatePerson() {
        const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Drew', 'Quinn', 'Jamie', 'Avery'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Lopez'];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        return {
            id: `person_${Date.now()}_${Math.random()}`,
            name: `${firstName} ${lastName}`,
            title: this.getRandomTitle(),
            connections: Math.floor(Math.random() * 1000) + 100,
            mutualConnections: Math.floor(Math.random() * 10),
            level: Math.floor(Math.random() * 10) + 1,
            interests: this.getRandomInterests()
        };
    }

    getRandomTitle() {
        const titles = [
            'Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
            'Marketing Manager', 'Sales Director', 'HR Specialist', 'Business Analyst',
            'DevOps Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
            'CEO', 'CTO', 'VP of Engineering', 'Senior Consultant'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getRandomInterests() {
        const interests = ['AI', 'Web Development', 'Cloud Computing', 'Mobile Apps', 'Blockchain', 'Cybersecurity'];
        const count = Math.floor(Math.random() * 3) + 1;
        return interests.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    findNewConnections() {
        if (!this.useEnergy(10)) return;

        this.generateInitialSuggestions();
        this.addNotification('Found new connection suggestions!', 'success');
        this.gainXP(5);
    }

    openConnectionModal(personId) {
        const person = this.gameState.suggestions.find(p => p.id === personId);
        if (!person) return;

        this.selectedPerson = person;
        const modal = document.getElementById('connection-modal');
        const overlay = document.getElementById('modal-overlay');
        const personInfo = document.getElementById('connection-person-info');

        personInfo.innerHTML = `
            <div class="person-card">
                <h3>${person.name}</h3>
                <p>${person.title}</p>
                <p>👥 ${person.connections} connections • ${person.mutualConnections} mutual</p>
                <p>🏷️ ${person.interests.join(', ')}</p>
            </div>
        `;

        document.getElementById('connection-message').value = this.generateConnectionMessage(person);
        
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    generateConnectionMessage(person) {
        const templates = [
            `Hi ${person.name.split(' ')[0]}, I'd love to connect! I see we both have an interest in ${person.interests[0]}.`,
            `Hello ${person.name.split(' ')[0]}, I'm impressed by your work as a ${person.title}. Let's connect!`,
            `Hi ${person.name.split(' ')[0]}, I came across your profile and would love to add you to my professional network.`,
            `Hello! I noticed we share ${person.mutualConnections} mutual connections. Would love to connect!`
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    sendConnectionRequest() {
        if (!this.selectedPerson) return;
        if (!this.useEnergy(10)) return;

        const message = document.getElementById('connection-message').value;
        const person = this.selectedPerson;

        // Acceptance chance based on player stats and message quality
        const baseChance = 0.5;
        const networkingBonus = this.gameState.player.networking / 500;
        const reputationBonus = this.gameState.player.reputation / 500;
        const messageBonus = message.length > 50 ? 0.2 : 0;
        
        const acceptanceChance = Math.min(0.95, baseChance + networkingBonus + reputationBonus + messageBonus);

        if (Math.random() < acceptanceChance) {
            // Accepted!
            this.gameState.connections.push(person);
            this.gameState.player.connections++;
            this.gameState.player.networking += 5;
            this.gameState.suggestions = this.gameState.suggestions.filter(p => p.id !== person.id);
            this.addNotification(`${person.name} accepted your connection request!`, 'success');
            this.gainXP(15);
            this.checkAchievements();
        } else {
            // Pending or rejected
            if (Math.random() < 0.5) {
                this.addNotification(`${person.name} hasn't responded yet.`, 'info');
            } else {
                this.gameState.suggestions = this.gameState.suggestions.filter(p => p.id !== person.id);
                this.addNotification(`${person.name} declined your request.`, 'error');
            }
        }

        this.closeModal();
        this.updateUI();
    }

    autoConnect() {
        if (this.gameState.player.coins < 50) {
            this.addNotification('Not enough coins for Auto-Connect!', 'error');
            return;
        }

        this.gameState.player.coins -= 50;
        
        // Auto-connect to random suggestions
        const connectCount = Math.min(3, this.gameState.suggestions.length);
        for (let i = 0; i < connectCount; i++) {
            const person = this.gameState.suggestions[i];
            this.gameState.connections.push(person);
            this.gameState.player.connections++;
        }

        this.gameState.suggestions.splice(0, connectCount);
        this.gameState.player.networking += connectCount * 3;
        
        this.addNotification(`Auto-connected with ${connectCount} professionals!`, 'success');
        this.gainXP(connectCount * 10);
        this.generateInitialSuggestions();
        this.updateUI();
    }

    // ===== CONTENT CREATION SYSTEM =====
    generatePostIdea() {
        const ideas = [
            "🚀 Excited to announce I've completed a new certification in Cloud Computing! #AlwaysLearning #CloudComputing",
            "💡 5 tips for better time management as a developer:\n1. Use the Pomodoro Technique\n2. Prioritize ruthlessly\n3. Batch similar tasks\n4. Learn to say no\n5. Take breaks!",
            "🎯 Just shipped a major feature at work! Feeling proud of what our team accomplished. #SoftwareEngineering #TeamWork",
            "📚 What's the best programming book you've read this year? Looking for recommendations!",
            "🌟 Grateful for my amazing network! Thank you all for the support and inspiration.",
            "💻 Debugging is like being a detective in a crime movie where you are also the murderer. #DeveloperHumor",
            "🔥 Hot take: Code reviews are the most valuable part of the development process. Change my mind.",
            "📈 Sharing my thoughts on the future of AI in software development..."
        ];
        
        const idea = ideas[Math.floor(Math.random() * ideas.length)];
        document.getElementById('post-content').value = idea;
        this.addNotification('Post idea generated!', 'success');
    }

    suggestHashtags() {
        const hashtags = [
            '#SoftwareEngineering', '#CareerGrowth', '#TechLife', '#Productivity',
            '#Leadership', '#Innovation', '#AI', '#MachineLearning', '#WebDevelopment',
            '#Career', '#ProfessionalDevelopment', '#Networking', '#Technology'
        ];
        
        const selectedHashtags = hashtags.sort(() => 0.5 - Math.random()).slice(0, 3).join(' ');
        const currentContent = document.getElementById('post-content').value;
        
        if (currentContent) {
            document.getElementById('post-content').value = currentContent + '\n\n' + selectedHashtags;
        } else {
            document.getElementById('post-content').value = selectedHashtags;
        }
        
        this.addNotification('Hashtags added!', 'success');
    }

    publishPost() {
        const content = document.getElementById('post-content').value;
        const postType = document.getElementById('post-type').value;

        if (!content.trim()) {
            this.addNotification('Please write something first!', 'error');
            return;
        }

        if (!this.useEnergy(15)) return;

        const post = {
            id: `post_${Date.now()}`,
            content: content,
            type: postType,
            timestamp: Date.now(),
            likes: 0,
            comments: 0,
            shares: 0,
            views: 0,
            engagement: 0
        };

        // Calculate initial engagement based on stats and post quality
        const baseEngagement = Math.floor(this.gameState.player.followers * 0.3);
        const hashtagCount = (content.match(/#/g) || []).length;
        const hashtagBonus = hashtagCount * 5;
        const reputationBonus = Math.floor(this.gameState.player.reputation / 10);
        
        post.views = baseEngagement + hashtagBonus + reputationBonus;
        post.likes = Math.floor(post.views * (Math.random() * 0.3 + 0.1));
        post.comments = Math.floor(post.likes * (Math.random() * 0.2));
        post.shares = Math.floor(post.likes * (Math.random() * 0.1));

        this.gameState.posts.unshift(post);
        this.gameState.player.postsCount++;
        this.gameState.player.reputation += 3;

        // Check for viral post
        if (post.likes > 100) {
            this.addNotification('🔥 Your post went viral!', 'success');
            this.gameState.player.followers += 50;
            this.gameState.player.reputation += 20;
            this.gameState.player.coins += 100;
            this.unlockBadge('🔥 Viral Content Creator');
            this.gainXP(100);
        } else {
            this.gainXP(20);
        }

        // Gain followers based on post quality
        const followerGain = Math.floor(post.likes / 10);
        this.gameState.player.followers += followerGain;

        document.getElementById('post-content').value = '';
        this.addNotification('Post published successfully!', 'success');
        this.updateUI();
        this.switchTab('feed');
        this.checkAchievements();
    }

    updatePostEngagement() {
        // Gradually increase engagement on recent posts
        const now = Date.now();
        this.gameState.posts.forEach(post => {
            const age = now - post.timestamp;
            if (age < 300000) { // Active for 5 minutes
                if (Math.random() < 0.1) {
                    post.likes += Math.floor(Math.random() * 3);
                    post.views += Math.floor(Math.random() * 5);
                    if (Math.random() < 0.3) {
                        post.comments++;
                    }
                }
            }
        });
    }

    // ===== VIRTUAL EVENTS & CHALLENGES =====
    generateEvents() {
        const eventTypes = [
            {
                name: 'Tech Conference 2024',
                type: 'conference',
                description: 'Join industry leaders discussing the future of technology',
                duration: 120,
                reward: { xp: 50, coins: 100, reputation: 10 },
                cost: 20
            },
            {
                name: 'AI Webinar',
                type: 'webinar',
                description: 'Learn about the latest developments in artificial intelligence',
                duration: 60,
                reward: { xp: 30, coins: 50, skills: 5 },
                cost: 15
            },
            {
                name: 'Hackathon Challenge',
                type: 'hackathon',
                description: 'Build a project in 24 hours and win prizes!',
                duration: 180,
                reward: { xp: 100, coins: 200, skills: 15, reputation: 15 },
                cost: 30
            },
            {
                name: 'Networking Mixer',
                type: 'networking',
                description: 'Meet and connect with professionals in your field',
                duration: 90,
                reward: { xp: 40, coins: 75, networking: 20 },
                cost: 10
            },
            {
                name: 'Career Development Workshop',
                type: 'workshop',
                description: 'Level up your professional skills',
                duration: 75,
                reward: { xp: 35, coins: 60, skills: 10 },
                cost: 15
            }
        ];

        this.gameState.events = [];
        const eventCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < eventCount; i++) {
            const eventTemplate = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            this.gameState.events.push({
                ...eventTemplate,
                id: `event_${Date.now()}_${i}`,
                startTime: Date.now() + Math.random() * 3600000
            });
        }

        this.updateEventsTab();
    }

    attendEvent(eventId) {
        const event = this.gameState.events.find(e => e.id === eventId);
        if (!event) return;

        if (!this.useEnergy(event.cost)) return;

        // Simulate event attendance with mini-game
        const success = Math.random() < 0.8; // 80% success rate

        if (success) {
            // Apply rewards
            if (event.reward.xp) this.gainXP(event.reward.xp);
            if (event.reward.coins) this.gameState.player.coins += event.reward.coins;
            if (event.reward.reputation) this.gameState.player.reputation += event.reward.reputation;
            if (event.reward.networking) this.gameState.player.networking += event.reward.networking;
            if (event.reward.skills) this.gameState.player.skills += event.reward.skills;

            this.gameState.completedChallenges.push({
                name: event.name,
                completedAt: Date.now()
            });

            this.addNotification(`Successfully completed ${event.name}!`, 'success');
            this.gameState.events = this.gameState.events.filter(e => e.id !== eventId);
            
            // Chance to unlock special badge
            if (event.type === 'hackathon' && Math.random() < 0.5) {
                this.unlockBadge('🏆 Hackathon Winner');
            }
        } else {
            this.addNotification(`Event didn't go as planned, but you learned something!`, 'info');
            this.gainXP(event.reward.xp / 2);
        }

        this.updateUI();
        this.checkAchievements();
    }

    refreshEvents() {
        this.generateEvents();
        this.addNotification('Events refreshed!', 'success');
    }

    // ===== SKILL TREE SYSTEM =====
    createSkillTree() {
        return {
            technical: [
                { id: 'js', name: 'JavaScript', level: 0, maxLevel: 10, cost: 50 },
                { id: 'python', name: 'Python', level: 0, maxLevel: 10, cost: 50 },
                { id: 'cloud', name: 'Cloud Computing', level: 0, maxLevel: 10, cost: 75 },
                { id: 'ai', name: 'AI/ML', level: 0, maxLevel: 10, cost: 100 }
            ],
            soft: [
                { id: 'leadership', name: 'Leadership', level: 0, maxLevel: 10, cost: 60 },
                { id: 'communication', name: 'Communication', level: 0, maxLevel: 10, cost: 50 },
                { id: 'teamwork', name: 'Teamwork', level: 0, maxLevel: 10, cost: 50 },
                { id: 'problem-solving', name: 'Problem Solving', level: 0, maxLevel: 10, cost: 70 }
            ],
            marketing: [
                { id: 'content', name: 'Content Marketing', level: 0, maxLevel: 10, cost: 60 },
                { id: 'seo', name: 'SEO', level: 0, maxLevel: 10, cost: 70 },
                { id: 'social', name: 'Social Media', level: 0, maxLevel: 10, cost: 50 },
                { id: 'analytics', name: 'Analytics', level: 0, maxLevel: 10, cost: 80 }
            ]
        };
    }

    upgradeSkill(category, skillId) {
        const skill = this.gameState.skillTree[category].find(s => s.id === skillId);
        if (!skill) return;

        if (skill.level >= skill.maxLevel) {
            this.addNotification('Skill already at max level!', 'info');
            return;
        }

        const cost = skill.cost + (skill.level * 10);

        if (this.gameState.player.coins < cost) {
            this.addNotification('Not enough coins!', 'error');
            return;
        }

        this.gameState.player.coins -= cost;
        skill.level++;
        this.gameState.player.skills += 5;
        
        this.addNotification(`Upgraded ${skill.name} to level ${skill.level}!`, 'success');
        this.gainXP(25);

        // Check for mastery badge
        if (skill.level === skill.maxLevel) {
            this.unlockBadge(`⭐ ${skill.name} Master`);
        }

        this.updateUI();
        this.checkAchievements();
    }

    // ===== MONETIZATION SYSTEM =====
    createShopItems() {
        return [
            {
                id: 'profile_boost',
                name: 'Profile Boost',
                description: 'Increase profile visibility for 24h',
                cost: 200,
                effect: 'visibility'
            },
            {
                id: 'energy_drink',
                name: 'Energy Drink',
                description: 'Restore 50 energy instantly',
                cost: 100,
                effect: 'energy'
            },
            {
                id: 'sponsored_post',
                name: 'Sponsored Post',
                description: 'Boost your next post reach by 5x',
                cost: 300,
                effect: 'post_boost'
            },
            {
                id: 'premium_profile',
                name: 'Premium Profile',
                description: 'Unlock premium profile features',
                cost: 1000,
                effect: 'premium'
            }
        ];
    }

    buyShopItem(itemId) {
        const item = this.gameState.shopItems.find(i => i.id === itemId);
        if (!item) return;

        if (this.gameState.player.coins < item.cost) {
            this.addNotification('Not enough coins!', 'error');
            return;
        }

        this.gameState.player.coins -= item.cost;

        switch (item.effect) {
            case 'visibility':
                this.gameState.player.reputation += 10;
                this.addNotification('Profile boosted! Your visibility has increased.', 'success');
                break;
            case 'energy':
                this.gameState.player.energy = Math.min(
                    this.gameState.player.maxEnergy,
                    this.gameState.player.energy + 50
                );
                this.addNotification('Energy restored!', 'success');
                break;
            case 'post_boost':
                this.addNotification('Next post will have 5x reach!', 'success');
                break;
            case 'premium':
                this.unlockBadge('💎 Premium Member');
                this.gameState.player.maxEnergy += 50;
                this.addNotification('Premium features unlocked!', 'success');
                break;
        }

        this.updateUI();
    }

    // ===== PROGRESSION & ACHIEVEMENTS =====
    gainXP(amount) {
        this.gameState.player.xp += amount;
        
        while (this.gameState.player.xp >= this.gameState.player.xpToNextLevel) {
            this.levelUp();
        }
        
        this.updateUI();
    }

    levelUp() {
        this.gameState.player.level++;
        this.gameState.player.xp -= this.gameState.player.xpToNextLevel;
        this.gameState.player.xpToNextLevel = Math.floor(this.gameState.player.xpToNextLevel * 1.5);
        this.gameState.player.maxEnergy += 10;
        this.gameState.player.energy = this.gameState.player.maxEnergy;
        this.gameState.player.coins += 50;

        this.addNotification(`🎉 Level Up! You're now level ${this.gameState.player.level}!`, 'success');
        
        // Update headline based on level
        this.updateHeadline();
        this.checkAchievements();
    }

    updateHeadline() {
        const level = this.gameState.player.level;
        const headlines = {
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

        for (const [lvl, headline] of Object.entries(headlines).reverse()) {
            if (level >= parseInt(lvl)) {
                this.gameState.player.headline = headline;
                break;
            }
        }
    }

    checkAchievements() {
        const achievements = [
            {
                id: 'first_connection',
                name: 'First Connection',
                description: 'Made your first connection',
                condition: () => this.gameState.player.connections >= 10,
                badge: '🤝 Connector'
            },
            {
                id: 'super_networker',
                name: 'Super Networker',
                description: 'Reached 50 connections',
                condition: () => this.gameState.player.connections >= 50,
                badge: '🌟 Super Connector'
            },
            {
                id: 'content_creator',
                name: 'Content Creator',
                description: 'Published 10 posts',
                condition: () => this.gameState.player.postsCount >= 10,
                badge: '✍️ Content Creator'
            },
            {
                id: 'influencer',
                name: 'Influencer',
                description: 'Reached 100 followers',
                condition: () => this.gameState.player.followers >= 100,
                badge: '📢 Influencer'
            },
            {
                id: 'event_master',
                name: 'Event Master',
                description: 'Completed 5 events',
                condition: () => this.gameState.completedChallenges.length >= 5,
                badge: '🎯 Event Master'
            }
        ];

        achievements.forEach(achievement => {
            const alreadyUnlocked = this.gameState.achievements.some(a => a.id === achievement.id);
            if (!alreadyUnlocked && achievement.condition()) {
                this.unlockAchievement(achievement);
            }
        });
    }

    unlockAchievement(achievement) {
        this.gameState.achievements.push({
            id: achievement.id,
            name: achievement.name,
            unlockedAt: Date.now()
        });
        
        this.unlockBadge(achievement.badge);
        this.addNotification(`🏆 Achievement Unlocked: ${achievement.name}!`, 'success');
        this.gainXP(50);
        this.gameState.player.coins += 100;
    }

    unlockBadge(badge) {
        if (!this.gameState.player.badges.includes(badge)) {
            this.gameState.player.badges.push(badge);
            this.updateBadges();
        }
    }

    // ===== LEADERBOARD =====
    generateLeaderboard() {
        const leaders = [];
        for (let i = 0; i < 10; i++) {
            leaders.push({
                name: this.generatePerson().name,
                connections: Math.floor(Math.random() * 500) + 100,
                level: Math.floor(Math.random() * 30) + 1,
                reputation: Math.floor(Math.random() * 200) + 50
            });
        }
        return leaders.sort((a, b) => b.connections - a.connections);
    }

    // ===== RANDOM EVENTS =====
    triggerRandomEvent() {
        const events = [
            {
                message: 'Someone viewed your profile!',
                effect: () => this.gameState.player.reputation += 1
            },
            {
                message: 'You gained a new follower!',
                effect: () => this.gameState.player.followers += 1
            },
            {
                message: 'One of your posts got shared!',
                effect: () => {
                    this.gameState.player.reputation += 2;
                    this.gameState.player.followers += 2;
                }
            },
            {
                message: 'You received a job offer inquiry!',
                effect: () => this.gameState.player.coins += 50
            }
        ];

        if (Math.random() < 0.3) {
            const event = events[Math.floor(Math.random() * events.length)];
            this.addNotification(event.message, 'info');
            event.effect();
            this.updateUI();
        }
    }

    // ===== UI UPDATE METHODS =====
    updateUI() {
        this.updatePlayerStats();
        this.updateEnergyDisplay();
        this.updateBadges();
        this.updateLeaderboard();
        this.updateShop();
    }

    updatePlayerStats() {
        const p = this.gameState.player;
        
        document.getElementById('player-level').textContent = p.level;
        document.getElementById('player-coins').textContent = p.coins;
        document.getElementById('player-name').textContent = p.name;
        document.getElementById('player-headline').textContent = p.headline;
        document.getElementById('connections-count').textContent = p.connections;
        document.getElementById('followers-count').textContent = p.followers;
        document.getElementById('posts-count').textContent = p.postsCount;

        this.updateStatBar('networking', p.networking, 100);
        this.updateStatBar('skills', p.skills, 100);
        this.updateStatBar('reputation', p.reputation, 100);
    }

    updateStatBar(stat, value, max) {
        const percentage = Math.min(100, (value / max) * 100);
        document.getElementById(`${stat}-bar`).style.width = percentage + '%';
        document.getElementById(`${stat}-value`).textContent = `${Math.floor(value)}/${max}`;
    }

    updateEnergyDisplay() {
        const p = this.gameState.player;
        document.getElementById('player-energy').textContent = 
            `${Math.floor(p.energy)}/${p.maxEnergy}`;
    }

    updateBadges() {
        const badgeList = document.getElementById('badge-list');
        badgeList.innerHTML = this.gameState.player.badges
            .map(badge => `<span class="badge">${badge}</span>`)
            .join('');
    }

    updateNetworkTab() {
        // Update suggestions
        const suggestionsList = document.getElementById('suggestions-list');
        suggestionsList.innerHTML = this.gameState.suggestions.map(person => `
            <div class="person-card">
                <h4>${person.name}</h4>
                <p>${person.title}</p>
                <p>👥 ${person.connections} connections • ${person.mutualConnections} mutual</p>
                <button class="btn btn-sm btn-primary" onclick="game.openConnectionModal('${person.id}')">
                    Connect
                </button>
            </div>
        `).join('');

        // Update connections list
        const connectionsList = document.getElementById('connections-list');
        connectionsList.innerHTML = this.gameState.connections.slice(0, 10).map(conn => `
            <div class="connection-item">
                <span>${conn.name}</span>
                <span class="connection-title">${conn.title}</span>
            </div>
        `).join('');

        document.getElementById('connection-total').textContent = this.gameState.player.connections;
    }

    updateFeed() {
        const feedPosts = document.getElementById('feed-posts');
        
        if (this.gameState.posts.length === 0) {
            feedPosts.innerHTML = '<div class="empty-state">No posts yet. Create your first post!</div>';
            return;
        }

        feedPosts.innerHTML = this.gameState.posts.map(post => {
            const timeAgo = this.getTimeAgo(post.timestamp);
            return `
                <div class="post-card">
                    <div class="post-header">
                        <div class="post-author">
                            <span class="author-pic">${this.gameState.player.profilePicture}</span>
                            <div>
                                <h4>${this.gameState.player.name}</h4>
                                <p>${this.gameState.player.headline} • ${timeAgo}</p>
                            </div>
                        </div>
                        <span class="post-type-badge">${post.type}</span>
                    </div>
                    <div class="post-content">
                        ${post.content}
                    </div>
                    <div class="post-engagement">
                        <span>👁️ ${post.views} views</span>
                        <span>👍 ${post.likes} likes</span>
                        <span>💬 ${post.comments} comments</span>
                        <span>🔄 ${post.shares} shares</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateEventsTab() {
        const activeEvents = document.getElementById('active-events');
        
        if (this.gameState.events.length === 0) {
            activeEvents.innerHTML = '<div class="empty-state">No events available. Check back later!</div>';
            return;
        }

        activeEvents.innerHTML = '<h3>Available Events</h3>' + this.gameState.events.map(event => `
            <div class="event-card">
                <h4>${event.name}</h4>
                <p>${event.description}</p>
                <div class="event-details">
                    <span>⏱️ ${event.duration} minutes</span>
                    <span>⚡ ${event.cost} energy</span>
                </div>
                <div class="event-rewards">
                    <strong>Rewards:</strong>
                    ${event.reward.xp ? `${event.reward.xp} XP` : ''}
                    ${event.reward.coins ? `${event.reward.coins} 💰` : ''}
                    ${event.reward.reputation ? `${event.reward.reputation} ⭐` : ''}
                </div>
                <button class="btn btn-primary" onclick="game.attendEvent('${event.id}')">
                    Attend Event
                </button>
            </div>
        `).join('');

        const challengesList = document.getElementById('challenges-list');
        if (this.gameState.completedChallenges.length > 0) {
            challengesList.innerHTML = this.gameState.completedChallenges.slice(0, 5).map(challenge => `
                <div class="challenge-item">
                    <span>✅ ${challenge.name}</span>
                </div>
            `).join('');
        } else {
            challengesList.innerHTML = '<p class="empty-state">No completed challenges yet.</p>';
        }
    }

    updateSkillsTab() {
        const categories = ['technical', 'soft', 'marketing'];
        
        categories.forEach(category => {
            const container = document.getElementById(`${category}-skills`);
            const skills = this.gameState.skillTree[category];
            
            container.innerHTML = skills.map(skill => {
                const cost = skill.cost + (skill.level * 10);
                const progress = (skill.level / skill.maxLevel) * 100;
                
                return `
                    <div class="skill-item">
                        <div class="skill-header">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level">Level ${skill.level}/${skill.maxLevel}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <button class="btn btn-sm btn-primary" 
                                onclick="game.upgradeSkill('${category}', '${skill.id}')"
                                ${skill.level >= skill.maxLevel ? 'disabled' : ''}>
                            Upgrade (${cost} 💰)
                        </button>
                    </div>
                `;
            }).join('');
        });
    }

    updateLeaderboard() {
        const leaderboard = document.getElementById('leaderboard');
        leaderboard.innerHTML = this.gameState.leaderboard.slice(0, 5).map((leader, index) => `
            <div class="leaderboard-item">
                <span class="rank">#${index + 1}</span>
                <div class="leader-info">
                    <strong>${leader.name}</strong>
                    <span>${leader.connections} connections</span>
                </div>
            </div>
        `).join('');
    }

    updateShop() {
        const shopItems = document.getElementById('shop-items');
        shopItems.innerHTML = this.gameState.shopItems.map(item => `
            <div class="shop-item">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <button class="btn btn-sm btn-primary" onclick="game.buyShopItem('${item.id}')">
                    Buy (${item.cost} 💰)
                </button>
            </div>
        `).join('');
    }

    addNotification(message, type = 'info') {
        const notification = {
            id: Date.now(),
            message: message,
            type: type,
            timestamp: Date.now()
        };

        this.gameState.notifications.unshift(notification);
        
        // Keep only last 10 notifications
        if (this.gameState.notifications.length > 10) {
            this.gameState.notifications = this.gameState.notifications.slice(0, 10);
        }

        this.updateNotifications();
    }

    updateNotifications() {
        const container = document.getElementById('notifications');
        container.innerHTML = this.gameState.notifications.map(notif => {
            const icon = {
                success: '✅',
                error: '❌',
                info: 'ℹ️'
            }[notif.type] || 'ℹ️';
            
            return `
                <div class="notification notification-${notif.type}">
                    <span>${icon} ${notif.message}</span>
                </div>
            `;
        }).join('');
    }

    // ===== MODAL MANAGEMENT =====
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.getElementById('modal-overlay').classList.remove('active');
        this.selectedPerson = null;
    }

    // ===== UTILITY METHODS =====
    getTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        return Math.floor(seconds / 86400) + 'd ago';
    }

    // ===== SAVE/LOAD SYSTEM =====
    saveGame() {
        try {
            localStorage.setItem('linkedinTycoonSave', JSON.stringify(this.gameState));
            console.log('Game saved successfully');
        } catch (e) {
            console.error('Failed to save game:', e);
        }
    }

    loadGame() {
        try {
            const saved = localStorage.getItem('linkedinTycoonSave');
            if (saved) {
                console.log('Game loaded successfully');
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load game:', e);
        }
        return null;
    }

    resetGame() {
        if (confirm('Are you sure you want to reset your progress?')) {
            localStorage.removeItem('linkedinTycoonSave');
            location.reload();
        }
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new LinkedInTycoon();
});

