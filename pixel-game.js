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
        this.conversationDepth = {}; // Track conversation progress
        this.npcs = {
            'Sarah Chen': {
                intro: "Hey! I'm Sarah, a product manager at a startup. Always looking to connect with talented engineers! How's your LinkedIn journey going?",
                responses: {
                    networking: "Networking is everything in this industry. The more people you know, the more doors open! I went from zero to 500 connections in my first year. Here's my secret: engage authentically. Comment on posts, share insights, and always add value. Don't just connect for the sake of numbers - build real relationships. Quality conversations lead to quality opportunities.",
                    advice: "My advice? Post consistently and engage with others. Don't just broadcast - have real conversations. I post 3 times a week minimum, and I spend at least an hour daily engaging with others' content. That's where the magic happens. Also, use storytelling in your posts. People don't care about what you did - they care about the lesson, the struggle, the growth. Make them feel something.",
                    career: "Product management is fascinating because you're at the intersection of business, tech, and users. I started as an engineer, then transitioned to PM. Best decision ever. If you're interested in PM, start by learning user research, prioritization frameworks like RICE, and get comfortable with ambiguity. It's not about having all the answers - it's about asking the right questions.",
                    startup: "Working at a startup is intense but rewarding. We're building something from scratch, and every decision matters. The pace is fast, the resources are limited, but the learning is exponential. I've grown more in 2 years here than 5 years at a big corp. If you're thinking about startups, make sure you're comfortable with uncertainty and wearing multiple hats.",
                    goodbye: "Let's stay connected! Feel free to reach out anytime. Seriously, my DMs are always open. I love helping people grow their careers. Oh, and if you're ever looking for PM roles, I know some great startups hiring. Keep crushing it!"
                }
            },
            'Marcus Johnson': {
                intro: "Marcus here, Senior Developer with 10+ years in the trenches. I've seen it all - startups that IPO'd, companies that crashed, tech stacks that came and went. What brings you to LinkedIn City today?",
                responses: {
                    networking: "At your level, quantity matters more than quality initially. Connect with everyone you can. Cast a wide net. Later, when you're established, you can be selective. But right now? Every connection is a potential opportunity. I have over 2000 connections, and I can trace most of my opportunities back to someone in my network. It's all about building that web of relationships early.",
                    advice: "Learn TypeScript and React. Trust me, they're in 80% of job postings right now. But here's the real advice nobody tells you: Learn to read documentation, learn to debug systematically, and learn to communicate technical concepts to non-technical people. Those skills will take you further than any framework. Oh, and contribute to open source. GitHub is your second resume.",
                    career: "I started as a junior dev making $50k. Now I'm a senior making $180k+ total comp. How? Consistent learning, strategic job hopping every 2-3 years, and building a strong personal brand on LinkedIn. Your salary growth isn't just about getting better at coding - it's about negotiation, market timing, and knowing your worth. Never accept the first offer. Always negotiate.",
                    mentorship: "I mentor 5-10 junior devs every year. Why? Because someone did it for me when I was starting out. Here's what I tell everyone: Focus on fundamentals over frameworks. Frameworks change every year, but data structures, algorithms, and system design principles are forever. Read 'Clean Code', practice LeetCode, and build real projects. Theory is useless without application.",
                    techstack: "I've worked with everything - Java, Python, Node, Go, Rust, you name it. My advice? Pick one language and master it deeply before jumping to the next. Jack of all trades, master of none gets you nowhere. I'm a TypeScript/Node specialist, and that focus has paid off massively. Companies respect deep expertise over shallow breadth.",
                    goodbye: "Good luck out there. It's a jungle, but you'll make it if you stay consistent. One last thing - imposter syndrome never goes away, even at senior level. Embrace it. It means you're still growing. Now go build something awesome!"
                }
            },
            'Emily Rodriguez': {
                intro: "Hi! Emily Rodriguez, Tech Recruiter with 8 years placing developers at FAANG and top startups. I've seen thousands of LinkedIn profiles. Want to know what actually works?",
                responses: {
                    networking: "Your profile is your resume 2.0. Make sure it tells a story. Not just 'I did X at Company Y' but 'I solved Problem Z using Technology A, resulting in Impact B'. Quantify everything. 'Improved performance' means nothing. 'Reduced load time by 40%, serving 1M users' - that's a story. And connections? They're your references, your network, your safety net. Never underestimate the power of a strong network.",
                    advice: "Attend virtual events, contribute to discussions, and don't be afraid to reach out to people. Most folks are happy to chat! Here's what most people don't do: Follow up. You made a connection? Great. Now nurture it. Comment on their posts, share their content, congratulate them on milestones. That's how connections become relationships. And relationships become opportunities.",
                    resume: "Your LinkedIn profile should be keyword-rich. Recruiters use Boolean search. If your profile doesn't have the right keywords, we won't find you. Include: specific technologies you know, frameworks, methodologies, certifications. But also tell your story. Why did you transition from X to Y? What drives you? Humans hire humans, not robots.",
                    interview: "Interviews have three phases: technical, behavioral, and culture fit. Most people prep only for technical. Big mistake. Behavioral questions reveal how you think, how you handle conflict, how you learn from failure. Have stories ready. Use the STAR method: Situation, Task, Action, Result. Practice telling your stories concisely but compellingly.",
                    salary: "Always ask about salary range upfront. Don't waste time on opportunities that don't match your expectations. When you get an offer, negotiate. Always. Even if you're happy with the number, negotiate for something - more stock, signing bonus, remote flexibility, learning budget. Companies expect negotiation. Not doing it signals you don't value yourself.",
                    redflags: "Red flags in job postings: 'We're a family', 'Looking for rockstars', 'Must handle ambiguity', 'Wearing many hats', 'Fast-paced environment'. These usually mean: long hours, unclear roles, chaos. Green flags: Clear comp ranges, defined responsibilities, career growth paths, emphasis on work-life balance.",
                    goodbye: "Let's connect officially! I'll keep you in mind for openings. And hey, even if I don't have something right now, I know hundreds of recruiters. A warm intro from me is worth 10 cold applications. Keep your profile updated and stay visible. Opportunities come to those who are found."
                }
            },
            'David Park': {
                intro: "Yo! David Park here. I run a coding YouTube channel with 250K subscribers. Started from zero 3 years ago. Now I make $15K/month from content alone. Tech content is the FUTURE, and LinkedIn is where it's popping off right now. Want the blueprint?",
                responses: {
                    networking: "Dude, LinkedIn is INSANE for growth. I went from 50 to 5000 followers in 6 months just by posting daily. Here's the hack: Post in the morning (7-9 AM) when everyone's checking LinkedIn with their coffee. Use the algorithm - ask questions, create polls, share personal stories. The algorithm LOVES engagement. And tag people! When you tag someone, their network sees it too. That's exponential reach.",
                    advice: "Post about your projects, share what you're learning. People love authenticity over perfection. Nobody cares about your perfectly polished highlight reel. They want the struggle, the late nights debugging, the 'I finally figured it out!' moments. Be vulnerable. Share your failures. That's what goes viral. I had a post about getting rejected from 50 jobs that got 100K views. Authenticity wins.",
                    content: "Content creation changed my life. Here's my strategy: Create once, distribute everywhere. One long-form post becomes: a YouTube video, a Twitter thread, a LinkedIn post, an Instagram carousel, a TikTok. Repurpose everything. And batch create - I film 4 videos in one day, then schedule them across a month. Work smarter, not harder.",
                    youtube: "YouTube is a long game. My first video got 12 views (10 were me refreshing). My first 100 videos got maybe 50 views each. But I stayed consistent. Posted every week for 2 years before I hit 10K subs. Then it exploded. The algorithm rewards consistency over quality initially. Just ship. Improve as you go. Done is better than perfect.",
                    money: "I make money from: AdSense ($3K/month), sponsorships ($8K/month), course sales ($3K/month), affiliate links ($1K/month). Diversification is key. Don't rely on one income source. And here's the secret: Your audience is your asset. With 250K followers, I can launch anything and get traction. That's the real value of content creation.",
                    growth: "Growth hacks that actually work: Collaborate with creators slightly bigger than you, comment on viral posts early (first 10 comments get insane reach), use trending audio on short-form content, hook them in the first 3 seconds, end with a clear CTA. Most important? Provide value. Entertainment, education, or inspiration. Pick one and go deep.",
                    goodbye: "Follow me @DavidParkCodes! And tag me in your posts - I'll share the good stuff! Actually, let me give you a piece of gold: Start documenting your learning journey TODAY. In 6 months, you'll have a content library. In a year, you'll have an audience. In 2 years, you'll have opportunities you can't even imagine. The best time to start was yesterday. Second best? Right now. Let's go!"
                }
            },
            'Dr. Jennifer Liu': {
                intro: "Hello, I'm Dr. Jennifer Liu. I teach Computer Science at Tech University and mentor young professionals. I've been in academia and industry for 15 years. I've seen students go from zero to FAANG, from struggling to thriving. How can I help you on your journey?",
                responses: {
                    networking: "Networking isn't just about collecting connections like Pokemon cards. It's about building genuine relationships over time. I've seen students with 50 meaningful connections get better opportunities than those with 500 random ones. Quality over quantity. Reach out with intention, add value first, and stay in touch. That's the formula.",
                    advice: "Never stop learning. The industry changes fast. What's hot today might be obsolete in 5 years. Invest in skills that compound - fundamentals, communication, and problem-solving. Master data structures and algorithms. Learn system design. Understand how computers actually work. These fundamentals never go out of style. Frameworks are tools. Principles are wisdom.",
                    education: "I teach hundreds of students each year. The ones who succeed aren't always the smartest or most talented. They're the most consistent. They show up. They do the work. They ask questions. They help their peers. Success in tech isn't about being a genius - it's about being persistent, curious, and collaborative.",
                    research: "My research is in AI/ML and its applications in education. We're building systems that can personalize learning at scale. It's fascinating work. If you're interested in ML, start with Andrew Ng's course on Coursera. Get the fundamentals down. Then pick a problem that interests you and start building. Theory without practice is useless.",
                    industry: "Academia and industry are different beasts. In academia, we value depth, rigor, publication. In industry, it's speed, impact, revenue. Neither is better - they're just different. I've worked in both, and the best engineers I know can toggle between the two mindsets. Deep thinking AND pragmatic execution.",
                    career: "Career advice? Play the long game. Don't optimize for salary in your first few years - optimize for learning. Join companies where you'll be surrounded by people smarter than you. That's how you level up fastest. Your network is your net worth, but your skills are your foundation. Build both simultaneously.",
                    mentorship: "I've mentored over 100 students. Here's what I tell everyone: Set clear goals, break them into milestones, track your progress, celebrate small wins. Career growth isn't linear - it's exponential once you hit critical mass. But you need to put in the work upfront, often without seeing results. Trust the process.",
                    life: "Work-life balance in tech is tough. I've burned out twice. Learned the hard way that you can't pour from an empty cup. Set boundaries. Take breaks. Exercise. Sleep. Eat well. Your brain is your most valuable asset. Treat it accordingly. Hustle culture is toxic. Sustainable excellence beats burnout every time.",
                    goodbye: "Feel free to reach out if you need mentorship. My door is always open. And remember: You're not behind. You're not too old. It's not too late. I've seen people start coding at 30, 40, even 50 and build successful careers. The only timeline that matters is yours. Now go build something amazing!"
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
        
        // More dialogue options based on NPC
        let options = [
            { text: "💼 Tell me about networking", key: 'networking' },
            { text: "💡 Got any advice?", key: 'advice' }
        ];
        
        // Add NPC-specific options
        if (npcName === 'Sarah Chen') {
            options.push({ text: "💼 Product Management?", key: 'career' });
            options.push({ text: "🚀 Startup life?", key: 'startup' });
        } else if (npcName === 'Marcus Johnson') {
            options.push({ text: "💰 Career growth?", key: 'career' });
            options.push({ text: "🎓 Mentorship tips?", key: 'mentorship' });
            options.push({ text: "🛠️ Tech stack advice?", key: 'techstack' });
        } else if (npcName === 'Emily Rodriguez') {
            options.push({ text: "📄 Resume tips?", key: 'resume' });
            options.push({ text: "💼 Interview prep?", key: 'interview' });
            options.push({ text: "💰 Salary negotiation?", key: 'salary' });
            options.push({ text: "🚩 Job red flags?", key: 'redflags' });
        } else if (npcName === 'David Park') {
            options.push({ text: "📹 Content creation?", key: 'content' });
            options.push({ text: "🎥 YouTube tips?", key: 'youtube' });
            options.push({ text: "💵 Making money?", key: 'money' });
            options.push({ text: "📈 Growth hacks?", key: 'growth' });
        } else if (npcName === 'Dr. Jennifer Liu') {
            options.push({ text: "🎓 Education advice?", key: 'education' });
            options.push({ text: "🔬 Your research?", key: 'research' });
            options.push({ text: "🏢 Industry vs Academia?", key: 'industry' });
            options.push({ text: "💼 Career planning?", key: 'career' });
            options.push({ text: "🎯 Mentorship wisdom?", key: 'mentorship' });
            options.push({ text: "⚖️ Work-life balance?", key: 'life' });
        }
        
        options.push({ text: "👋 Nice meeting you!", key: 'goodbye' });

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
        this.mainQuests = [
            { id: 1, title: "Create your first post", completed: false, reward: { xp: 25, coins: 50 }, type: 'main' },
            { id: 2, title: "Make 3 connections", completed: false, reward: { xp: 50, coins: 100 }, type: 'main' },
            { id: 3, title: "Attend a virtual event", completed: false, reward: { xp: 75, coins: 150 }, type: 'main' },
            { id: 4, title: "Reach 100 followers", completed: false, reward: { xp: 100, coins: 200 }, type: 'main' },
            { id: 5, title: "Create a viral post (80+ likes)", completed: false, reward: { xp: 150, coins: 300 }, type: 'main' },
            { id: 6, title: "Reach Level 5", completed: false, reward: { xp: 200, coins: 500 }, type: 'main' },
            { id: 7, title: "Make 10 connections", completed: false, reward: { xp: 100, coins: 250 }, type: 'main' },
            { id: 8, title: "Learn 3 new skills", completed: false, reward: { xp: 150, coins: 300 }, type: 'main' }
        ];
        
        this.sideQuests = [
            { id: 101, title: "Visit the gym", completed: false, reward: { xp: 30, coins: 60 }, type: 'side' },
            { id: 102, title: "Buy coffee from the shop", completed: false, reward: { xp: 20, coins: 40 }, type: 'side' },
            { id: 103, title: "Read a book at the library", completed: false, reward: { xp: 40, coins: 80 }, type: 'side' },
            { id: 104, title: "Enroll in a university course", completed: false, reward: { xp: 60, coins: 120 }, type: 'side' },
            { id: 105, title: "Find and collect 3 items", completed: false, reward: { xp: 50, coins: 100 }, type: 'side' },
            { id: 106, title: "Equip a laptop", completed: false, reward: { xp: 40, coins: 80 }, type: 'side' },
            { id: 107, title: "Get hired at a company", completed: false, reward: { xp: 100, coins: 200 }, type: 'side' },
            { id: 108, title: "Upgrade your apartment once", completed: false, reward: { xp: 75, coins: 150 }, type: 'side' },
            { id: 109, title: "Complete a skill minigame", completed: false, reward: { xp: 50, coins: 100 }, type: 'side' },
            { id: 110, title: "Win the memory game", completed: false, reward: { xp: 60, coins: 120 }, type: 'side' },
            { id: 111, title: "Score perfect on quiz", completed: false, reward: { xp: 80, coins: 160 }, type: 'side' },
            { id: 112, title: "Complete a hackathon", completed: false, reward: { xp: 100, coins: 200 }, type: 'side' },
            { id: 113, title: "Visit all 5 unique NPCs", completed: false, reward: { xp: 80, coins: 160 }, type: 'side' },
            { id: 114, title: "Sleep 10 times", completed: false, reward: { xp: 40, coins: 80 }, type: 'side' },
            { id: 115, title: "Explore the park", completed: false, reward: { xp: 30, coins: 60 }, type: 'side' },
            { id: 116, title: "Eat at the restaurant", completed: false, reward: { xp: 30, coins: 60 }, type: 'side' },
            { id: 117, title: "Work at co-working space", completed: false, reward: { xp: 50, coins: 100 }, type: 'side' },
            { id: 118, title: "Find a mentor", completed: false, reward: { xp: 90, coins: 180 }, type: 'side' },
            { id: 119, title: "Make a social connection", completed: false, reward: { xp: 60, coins: 120 }, type: 'side' },
            { id: 120, title: "Give a presentation", completed: false, reward: { xp: 70, coins: 140 }, type: 'side' },
            { id: 121, title: "Check your emails", completed: false, reward: { xp: 30, coins: 60 }, type: 'side' },
            { id: 122, title: "Buy an item from the shop", completed: false, reward: { xp: 40, coins: 80 }, type: 'side' },
            { id: 123, title: "Customize your character", completed: false, reward: { xp: 30, coins: 60 }, type: 'side' },
            { id: 124, title: "Open the inventory", completed: false, reward: { xp: 20, coins: 40 }, type: 'side' },
            { id: 125, title: "Earn 500 coins total", completed: false, reward: { xp: 60, coins: 120 }, type: 'side' },
            { id: 126, title: "Reach 50 skill points", completed: false, reward: { xp: 70, coins: 140 }, type: 'side' },
            { id: 127, title: "Build a 20+ connection network", completed: false, reward: { xp: 90, coins: 180 }, type: 'side' },
            { id: 128, title: "Post 5 times in one session", completed: false, reward: { xp: 80, coins: 160 }, type: 'side' }
        ];
        
        this.quests = [...this.mainQuests, ...this.sideQuests];
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
        const mainQuests = this.mainQuests.filter(q => !q.completed);
        
        if (mainQuests.length > 0) {
            tracker.style.display = 'block';
            list.innerHTML = mainQuests.slice(0, 3).map(q => 
                `<div class="quest-item">${q.title}</div>`
            ).join('');
        } else {
            const sideQuests = this.sideQuests.filter(q => !q.completed);
            if (sideQuests.length > 0) {
                list.innerHTML = '<div style="color: #00d9ff; font-size: 11px; margin-bottom: 5px;">Side Quests:</div>' +
                    sideQuests.slice(0, 3).map(q => 
                        `<div class="quest-item" style="font-size: 11px;">${q.title}</div>`
                    ).join('');
            }
        }
    }

    checkAllQuests(gameData) {
        const p = gameData.player;
        
        // Main quests
        if (p.postsCount >= 1) this.checkQuest(1);
        if (p.connections >= 3) this.checkQuest(2);
        if (p.connections >= 10) this.checkQuest(7);
        if (p.followers >= 100) this.checkQuest(4);
        if (p.level >= 5) this.checkQuest(6);
        
        // Side quests
        if (p.inventory.length >= 3) this.checkQuest(105);
        if (p.equipment.laptop) this.checkQuest(106);
        if (p.job) this.checkQuest(107);
        if (p.apartmentLevel > 1) this.checkQuest(108);
        if (p.coins >= 500) this.checkQuest(125);
        if (p.skills >= 50) this.checkQuest(126);
        if (p.connections >= 20) this.checkQuest(127);
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
        // Ensure inventory array exists
        if (!gameState.data.player.inventory) {
            gameState.data.player.inventory = [];
        }
        
        // Check inventory capacity (20 items max)
        if (gameState.data.player.inventory.length >= 20) {
            showNotification('Inventory full! Remove items first.');
            return false;
        }
        
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

// Massive Achievement System
class AchievementManager {
    constructor() {
        this.achievements = {
            // Tutorial & Starter (5)
            'first_post': { name: 'First Post', desc: 'Created your first LinkedIn post', icon: '✍️', reward: { xp: 25, coins: 50 } },
            'first_connection': { name: 'First Connection', desc: 'Made your first professional connection', icon: '🤝', reward: { xp: 25, coins: 50 } },
            'tutorial_complete': { name: 'Getting Started', desc: 'Completed the tutorial', icon: '🎓', reward: { xp: 50, coins: 100 } },
            'first_job': { name: 'Employed', desc: 'Got your first job', icon: '💼', reward: { xp: 100, coins: 200 } },
            'first_item': { name: 'Collector', desc: 'Found your first item', icon: '🎒', reward: { xp: 25, coins: 50 } },
            
            // Connections (10)
            'connections_10': { name: 'Networker', desc: 'Reach 10 connections', icon: '🤝', reward: { xp: 50, coins: 100 } },
            'connections_25': { name: 'Connected', desc: 'Reach 25 connections', icon: '🌟', reward: { xp: 100, coins: 200 } },
            'connections_50': { name: 'Super Connector', desc: 'Reach 50 connections', icon: '💫', reward: { xp: 200, coins: 400 } },
            'connections_100': { name: 'Network Master', desc: 'Reach 100 connections', icon: '👑', reward: { xp: 500, coins: 1000 } },
            'connections_250': { name: 'Networking Legend', desc: 'Reach 250 connections', icon: '🏆', reward: { xp: 1000, coins: 2500 } },
            'connections_500': { name: 'Network Titan', desc: 'Reach 500 connections', icon: '⚡', reward: { xp: 2500, coins: 5000 } },
            'connections_1000': { name: 'Connection Guru', desc: 'Reach 1000 connections', icon: '🎯', reward: { xp: 5000, coins: 10000 } },
            'influencer_network': { name: 'Influencer Network', desc: 'Build a network of influencers', icon: '✨', reward: { xp: 300, coins: 600 } },
            'diverse_network': { name: 'Diverse Network', desc: 'Connect with all 5 unique NPCs', icon: '🌍', reward: { xp: 150, coins: 300 } },
            'rapid_networker': { name: 'Rapid Networker', desc: 'Make 10 connections in one day', icon: '⚡', reward: { xp: 200, coins: 400 } },
            
            // Posts & Content (10)
            'posts_10': { name: 'Content Creator', desc: 'Publish 10 posts', icon: '✍️', reward: { xp: 75, coins: 150 } },
            'posts_25': { name: 'Regular Poster', desc: 'Publish 25 posts', icon: '📝', reward: { xp: 150, coins: 300 } },
            'posts_50': { name: 'Prolific Writer', desc: 'Publish 50 posts', icon: '📚', reward: { xp: 300, coins: 600 } },
            'posts_100': { name: 'Content Machine', desc: 'Publish 100 posts', icon: '🔥', reward: { xp: 750, coins: 1500 } },
            'viral_post': { name: 'Viral Sensation', desc: 'Create a viral post (100+ likes)', icon: '🌟', reward: { xp: 250, coins: 500 } },
            'viral_5': { name: 'Viral Expert', desc: 'Create 5 viral posts', icon: '💥', reward: { xp: 500, coins: 1000 } },
            'daily_poster': { name: 'Daily Grind', desc: 'Post every day for 7 days', icon: '📅', reward: { xp: 200, coins: 400 } },
            'engagement_king': { name: 'Engagement King', desc: 'Get 1000 total likes', icon: '👍', reward: { xp: 300, coins: 600 } },
            'hashtag_master': { name: 'Hashtag Master', desc: 'Use 100 hashtags total', icon: '#️⃣', reward: { xp: 100, coins: 200 } },
            'thought_leader': { name: 'Thought Leader', desc: 'Reach 500 followers', icon: '🎤', reward: { xp: 400, coins: 800 } },
            
            // Levels (10)
            'level_5': { name: 'Rising Professional', desc: 'Reach level 5', icon: '⬆️', reward: { xp: 100, coins: 200 } },
            'level_10': { name: 'Experienced Pro', desc: 'Reach level 10', icon: '📈', reward: { xp: 250, coins: 500 } },
            'level_15': { name: 'Senior Professional', desc: 'Reach level 15', icon: '🎯', reward: { xp: 500, coins: 1000 } },
            'level_20': { name: 'Expert', desc: 'Reach level 20', icon: '💎', reward: { xp: 1000, coins: 2000 } },
            'level_30': { name: 'Master', desc: 'Reach level 30', icon: '👑', reward: { xp: 2500, coins: 5000 } },
            'level_40': { name: 'Legend', desc: 'Reach level 40', icon: '⚡', reward: { xp: 5000, coins: 10000 } },
            'level_50': { name: 'Tech Titan', desc: 'Reach level 50', icon: '🌟', reward: { xp: 10000, coins: 25000 } },
            'max_level': { name: 'The GOAT', desc: 'Reach maximum level', icon: '🐐', reward: { xp: 25000, coins: 50000 } },
            'fast_leveler': { name: 'Speed Demon', desc: 'Reach level 10 in under 1 hour', icon: '⚡', reward: { xp: 500, coins: 1000 } },
            'grinder': { name: 'Grinder', desc: 'Gain 10,000 total XP', icon: '💪', reward: { xp: 500, coins: 1000 } },
            
            // Skills (8)
            'skill_50': { name: 'Skilled', desc: 'Reach 50 skill points', icon: '📚', reward: { xp: 100, coins: 200 } },
            'skill_100': { name: 'Expert Skills', desc: 'Reach 100 skill points', icon: '🎓', reward: { xp: 250, coins: 500 } },
            'skill_200': { name: 'Mastery', desc: 'Reach 200 skill points', icon: '⭐', reward: { xp: 600, coins: 1200 } },
            'all_skills_5': { name: 'Well Rounded', desc: 'Get all 6 skills to level 5', icon: '🎯', reward: { xp: 400, coins: 800 } },
            'skill_master': { name: 'Skill Master', desc: 'Max out one skill tree', icon: '🏆', reward: { xp: 1000, coins: 2000 } },
            'lifelong_learner': { name: 'Lifelong Learner', desc: 'Complete 10 courses', icon: '📖', reward: { xp: 300, coins: 600 } },
            'certified': { name: 'Certified Pro', desc: 'Earn 5 certifications', icon: '📜', reward: { xp: 400, coins: 800 } },
            'mentor_graduate': { name: 'Mentored', desc: 'Complete mentorship program', icon: '🎓', reward: { xp: 500, coins: 1000 } },
            
            // Wealth (8)
            'rich_100': { name: 'Hundred Club', desc: 'Earn 100 coins', icon: '💰', reward: { xp: 50, coins: 50 } },
            'rich_1000': { name: 'Thousand Club', desc: 'Earn 1,000 coins', icon: '💵', reward: { xp: 150, coins: 200 } },
            'rich_5000': { name: 'Five Grand', desc: 'Earn 5,000 coins', icon: '💸', reward: { xp: 400, coins: 500 } },
            'rich_10000': { name: 'Ten Thousand', desc: 'Earn 10,000 coins', icon: '💎', reward: { xp: 1000, coins: 1000 } },
            'millionaire': { name: 'Millionaire', desc: 'Earn 1,000,000 coins', icon: '👑', reward: { xp: 10000, coins: 10000 } },
            'big_spender': { name: 'Big Spender', desc: 'Spend 5,000 coins', icon: '💳', reward: { xp: 200, coins: 300 } },
            'investor': { name: 'Investor', desc: 'Upgrade apartment to max', icon: '🏠', reward: { xp: 500, coins: 1000 } },
            'shopaholic': { name: 'Shopaholic', desc: 'Buy 20 items from shop', icon: '🛍️', reward: { xp: 300, coins: 600 } },
            
            // Events & Activities (12)
            'event_attended': { name: 'First Event', desc: 'Attend your first event', icon: '🎯', reward: { xp: 50, coins: 100 } },
            'event_10': { name: 'Event Regular', desc: 'Attend 10 events', icon: '🎪', reward: { xp: 200, coins: 400 } },
            'event_50': { name: 'Event Master', desc: 'Attend 50 events', icon: '🏆', reward: { xp: 1000, coins: 2000 } },
            'gym_rat': { name: 'Gym Rat', desc: 'Visit gym 20 times', icon: '💪', reward: { xp: 200, coins: 400 } },
            'coffee_addict': { name: 'Coffee Addict', desc: 'Buy 50 coffees', icon: '☕', reward: { xp: 150, coins: 300 } },
            'bookworm': { name: 'Bookworm', desc: 'Read 15 books', icon: '📚', reward: { xp: 300, coins: 600 } },
            'party_animal': { name: 'Social Butterfly', desc: 'Attend all social events', icon: '🎉', reward: { xp: 400, coins: 800 } },
            'hackathon_winner': { name: 'Hackathon Champion', desc: 'Win a hackathon', icon: '💻', reward: { xp: 300, coins: 600 } },
            'perfect_interview': { name: 'Interview Ace', desc: 'Get 3/3 in job interview', icon: '💼', reward: { xp: 250, coins: 500 } },
            'presentation_pro': { name: 'Presenter', desc: 'Give 10 presentations', icon: '📊', reward: { xp: 300, coins: 600 } },
            'world_traveler': { name: 'Explorer', desc: 'Visit all 15 locations', icon: '🗺️', reward: { xp: 500, coins: 1000 } },
            'regular_customer': { name: 'Regular', desc: 'Visit coffee shop 30 times', icon: '☕', reward: { xp: 200, coins: 400 } },
            
            // Minigames (8)
            'typing_master': { name: 'Typing Master', desc: 'Complete typing game in under 5 seconds', icon: '⌨️', reward: { xp: 200, coins: 400 } },
            'memory_genius': { name: 'Memory Genius', desc: 'Complete memory game in under 20 moves', icon: '🧠', reward: { xp: 250, coins: 500 } },
            'lightning_reflexes': { name: 'Lightning Reflexes', desc: 'Average under 300ms in reaction test', icon: '⚡', reward: { xp: 300, coins: 600 } },
            'quiz_genius': { name: 'Quiz Genius', desc: 'Get perfect score on tech quiz', icon: '🎯', reward: { xp: 200, coins: 400 } },
            'mini_game_master': { name: 'Minigame Master', desc: 'Complete all 4 minigames', icon: '🎮', reward: { xp: 500, coins: 1000 } },
            'speedrunner': { name: 'Speedrunner', desc: 'Complete minigame in record time', icon: '⏱️', reward: { xp: 300, coins: 600 } },
            'perfect_streak': { name: 'Perfect Streak', desc: 'Win 5 minigames in a row', icon: '🔥', reward: { xp: 400, coins: 800 } },
            'game_addict': { name: 'Game Addict', desc: 'Play 50 minigames', icon: '🎮', reward: { xp: 600, coins: 1200 } },
            
            // Reputation (6)
            'reputation_50': { name: 'Respected', desc: 'Reach 50 reputation', icon: '⭐', reward: { xp: 100, coins: 200 } },
            'reputation_100': { name: 'Well Known', desc: 'Reach 100 reputation', icon: '🌟', reward: { xp: 250, coins: 500 } },
            'reputation_250': { name: 'Influential', desc: 'Reach 250 reputation', icon: '💫', reward: { xp: 600, coins: 1200 } },
            'reputation_500': { name: 'Industry Icon', desc: 'Reach 500 reputation', icon: '👑', reward: { xp: 1500, coins: 3000 } },
            'reputation_1000': { name: 'Living Legend', desc: 'Reach 1000 reputation', icon: '🏆', reward: { xp: 5000, coins: 10000 } },
            'reputation_max': { name: 'Legendary Status', desc: 'Max out reputation', icon: '💎', reward: { xp: 10000, coins: 25000 } },
            
            // Followers (6)
            'followers_50': { name: '50 Followers', desc: 'Reach 50 followers', icon: '👥', reward: { xp: 75, coins: 150 } },
            'followers_100': { name: 'Hundred Club', desc: 'Reach 100 followers', icon: '📢', reward: { xp: 150, coins: 300 } },
            'followers_500': { name: 'Micro Influencer', desc: 'Reach 500 followers', icon: '🎙️', reward: { xp: 400, coins: 800 } },
            'followers_1000': { name: 'Influencer', desc: 'Reach 1,000 followers', icon: '⭐', reward: { xp: 1000, coins: 2000 } },
            'followers_5000': { name: 'Major Influencer', desc: 'Reach 5,000 followers', icon: '🌟', reward: { xp: 3000, coins: 6000 } },
            'followers_10000': { name: 'Mega Influencer', desc: 'Reach 10,000 followers', icon: '👑', reward: { xp: 10000, coins: 20000 } },
            
            // Special Activities (15)
            'early_bird': { name: 'Early Bird', desc: 'Log in during morning time', icon: '🌅', reward: { xp: 50, coins: 100 } },
            'night_owl': { name: 'Night Owl', desc: 'Log in during night time', icon: '🌙', reward: { xp: 50, coins: 100 } },
            'weather_proof': { name: 'All Weather', desc: 'Play in all 3 weather conditions', icon: '🌦️', reward: { xp: 100, coins: 200 } },
            'time_traveler': { name: 'Time Traveler', desc: 'Experience all 4 times of day', icon: '🕐', reward: { xp: 100, coins: 200 } },
            'item_collector': { name: 'Item Collector', desc: 'Collect 20 items', icon: '🎒', reward: { xp: 300, coins: 600 } },
            'full_inventory': { name: 'Pack Rat', desc: 'Fill inventory to capacity', icon: '📦', reward: { xp: 200, coins: 400 } },
            'fully_equipped': { name: 'Fully Equipped', desc: 'Equip item in all 4 slots', icon: '⚔️', reward: { xp: 250, coins: 500 } },
            'luxury_life': { name: 'Living in Luxury', desc: 'Own all premium items', icon: '💎', reward: { xp: 1000, coins: 2000 } },
            'quest_master': { name: 'Quest Master', desc: 'Complete all 8 quests', icon: '✅', reward: { xp: 1000, coins: 2000 } },
            'achievement_hunter': { name: 'Achievement Hunter', desc: 'Unlock 25 achievements', icon: '🏅', reward: { xp: 500, coins: 1000 } },
            'completionist': { name: 'Completionist', desc: 'Unlock all achievements', icon: '💯', reward: { xp: 10000, coins: 25000 } },
            'social_master': { name: 'Social Master', desc: 'Max out all social stats', icon: '🎭', reward: { xp: 2000, coins: 4000 } },
            'workaholic': { name: 'Workaholic', desc: 'Work 100 hours', icon: '⏰', reward: { xp: 600, coins: 1200 } },
            'dedication': { name: 'Dedicated', desc: 'Play for 5 hours total', icon: '⏱️', reward: { xp: 300, coins: 600 } },
            'marathon_player': { name: 'Marathon Player', desc: 'Play for 10 hours total', icon: '🏃', reward: { xp: 1000, coins: 2000 } }
        };
        
        this.unlocked = new Set();
    }
    
    check(achievementId, condition) {
        if (this.unlocked.has(achievementId)) return;
        
        if (condition) {
            this.unlock(achievementId);
        }
    }
    
    unlock(achievementId) {
        if (this.unlocked.has(achievementId)) return;
        
        const achievement = this.achievements[achievementId];
        if (!achievement) return;
        
        this.unlocked.add(achievementId);
        
        // Apply rewards
        if (achievement.reward.xp) gameState.gainXP(achievement.reward.xp);
        if (achievement.reward.coins) gameState.data.player.coins += achievement.reward.coins;
        
        showAchievement(`${achievement.icon} ${achievement.name}`);
        showNotification(`🏆 Achievement: ${achievement.name}!`);
        updateUI();
        gameState.saveGame();
    }
    
    checkAll() {
        const p = gameState.data.player;
        
        // Connection achievements
        this.check('connections_10', p.connections >= 10);
        this.check('connections_25', p.connections >= 25);
        this.check('connections_50', p.connections >= 50);
        this.check('connections_100', p.connections >= 100);
        this.check('connections_250', p.connections >= 250);
        this.check('connections_500', p.connections >= 500);
        this.check('connections_1000', p.connections >= 1000);
        
        // Post achievements
        this.check('posts_10', p.postsCount >= 10);
        this.check('posts_25', p.postsCount >= 25);
        this.check('posts_50', p.postsCount >= 50);
        this.check('posts_100', p.postsCount >= 100);
        
        // Level achievements
        this.check('level_5', p.level >= 5);
        this.check('level_10', p.level >= 10);
        this.check('level_15', p.level >= 15);
        this.check('level_20', p.level >= 20);
        this.check('level_30', p.level >= 30);
        this.check('level_40', p.level >= 40);
        this.check('level_50', p.level >= 50);
        
        // Skill achievements
        this.check('skill_50', p.skills >= 50);
        this.check('skill_100', p.skills >= 100);
        this.check('skill_200', p.skills >= 200);
        
        // Reputation achievements
        this.check('reputation_50', p.reputation >= 50);
        this.check('reputation_100', p.reputation >= 100);
        this.check('reputation_250', p.reputation >= 250);
        this.check('reputation_500', p.reputation >= 500);
        this.check('reputation_1000', p.reputation >= 1000);
        
        // Follower achievements
        this.check('followers_50', p.followers >= 50);
        this.check('followers_100', p.followers >= 100);
        this.check('followers_500', p.followers >= 500);
        this.check('followers_1000', p.followers >= 1000);
        this.check('followers_5000', p.followers >= 5000);
        this.check('followers_10000', p.followers >= 10000);
        
        // Wealth achievements
        this.check('rich_100', p.coins >= 100);
        this.check('rich_1000', p.coins >= 1000);
        this.check('rich_5000', p.coins >= 5000);
        this.check('rich_10000', p.coins >= 10000);
        
        // Special achievements
        this.check('first_post', p.postsCount >= 1);
        this.check('first_connection', p.connections >= 1);
        this.check('first_job', p.job !== null);
        this.check('fully_equipped', 
            p.equipment.laptop && p.equipment.phone && p.equipment.briefcase && p.equipment.outfit !== 'default'
        );
    }
}

// Random Encounter System
class EncounterManager {
    constructor() {
        this.encounters = [
            {
                title: 'Job Recruiter Spotted!',
                text: 'A recruiter from a top tech company approaches you with an opportunity.',
                choices: [
                    { text: 'Schedule interview', reward: { xp: 50, reputation: 10 } },
                    { text: 'Decline politely', reward: { reputation: 5 } }
                ]
            },
            {
                title: 'Networking Opportunity!',
                text: 'You overhear a conversation about a new startup. Join in?',
                choices: [
                    { text: 'Join conversation', reward: { networking: 20, connections: 2, xp: 40 } },
                    { text: 'Listen quietly', reward: { skills: 10, xp: 20 } }
                ]
            },
            {
                title: 'Coffee Meetup Invite',
                text: 'Someone invites you for coffee to discuss a potential collaboration.',
                choices: [
                    { text: 'Accept (20 💰)', cost: 20, reward: { connections: 1, networking: 15, xp: 35 } },
                    { text: 'Decline', reward: { coins: 0 } }
                ]
            },
            {
                title: 'Surprise Bonus!',
                text: 'Your post from yesterday just went viral! Companies are reaching out.',
                choices: [
                    { text: 'Capitalize on it!', reward: { followers: 50, reputation: 25, coins: 200, xp: 100 } }
                ]
            },
            {
                title: 'Skill Competition',
                text: 'A coding competition is happening nearby. First prize: 500 coins!',
                choices: [
                    { text: 'Compete (30⚡)', energyCost: 30, reward: { coins: 500, skills: 30, xp: 80 } },
                    { text: 'Pass', reward: { xp: 10 } }
                ]
            },
            {
                title: 'Mentor Offer',
                text: 'A senior professional offers to mentor you for free. This is rare!',
                choices: [
                    { text: 'Accept mentorship', reward: { skills: 40, reputation: 20, networking: 25, xp: 120 } }
                ]
            },
            {
                title: 'Lost Wallet Found',
                text: 'You found someone\'s wallet! What do you do?',
                choices: [
                    { text: 'Return it', reward: { reputation: 30, karma: 100, xp: 60 } },
                    { text: 'Keep the cash', reward: { coins: 150, reputation: -20 } }
                ]
            },
            {
                title: 'LinkedIn Premium Trial',
                text: 'LinkedIn offers you a free 1-month premium trial!',
                choices: [
                    { text: 'Activate', reward: { followers: 30, networking: 20, maxEnergy: 10, xp: 75 } }
                ]
            },
            {
                title: 'Speaking Opportunity',
                text: 'You\'ve been invited to speak at a local tech meetup!',
                choices: [
                    { text: 'Accept (prepare)', reward: { reputation: 35, followers: 40, xp: 100 } },
                    { text: 'Decline (too busy)', reward: { coins: 50 } }
                ]
            },
            {
                title: 'Collaboration Request',
                text: 'Another professional wants to collaborate on a project.',
                choices: [
                    { text: 'Collaborate', reward: { skills: 25, networking: 20, connections: 2, xp: 80 } },
                    { text: 'Maybe later', reward: { xp: 10 } }
                ]
            }
        ];
        
        this.lastEncounter = Date.now();
        this.encounterCooldown = 60000; // 1 minute between encounters
    }
    
    tryTriggerEncounter() {
        if (Date.now() - this.lastEncounter < this.encounterCooldown) return false;
        if (Math.random() > 0.3) return false; // 30% chance when cooldown expires
        
        this.lastEncounter = Date.now();
        return true;
    }
    
    showRandomEncounter(scene) {
        const encounter = Phaser.Math.RND.pick(this.encounters);
        
        // Show encounter overlay
        const width = scene.cameras.main.width;
        const height = scene.cameras.main.height;
        
        // Dim background
        const overlay = scene.add.rectangle(width/2, height/2, width, height, 0x000000, 0.8);
        overlay.setDepth(1000);
        
        // Encounter box
        const box = scene.add.rectangle(width/2, height/2, 700, 400, 0x1E3A8A);
        box.setStrokeStyle(4, 0x00FF88);
        box.setDepth(1001);
        
        // Title
        const title = scene.add.text(width/2, height/2 - 150, `⚡ ${encounter.title}`, {
            fontSize: '28px',
            color: '#FFD700',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(1002);
        
        // Text
        const text = scene.add.text(width/2, height/2 - 60, encounter.text, {
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5).setDepth(1002);
        
        // Choice buttons
        encounter.choices.forEach((choice, i) => {
            const btnY = height/2 + 50 + i * 70;
            
            const btn = scene.add.rectangle(width/2, btnY, 600, 60, 0x0A66C2);
            btn.setStrokeStyle(2, 0xFFFFFF);
            btn.setInteractive();
            btn.setDepth(1002);
            
            const btnText = scene.add.text(width/2, btnY, choice.text, {
                fontSize: '16px',
                color: '#FFFFFF'
            }).setOrigin(0.5).setDepth(1003);
            
            btn.on('pointerover', () => {
                btn.setFillStyle(0x0E7FE8);
            });
            
            btn.on('pointerout', () => {
                btn.setFillStyle(0x0A66C2);
            });
            
            btn.on('pointerdown', () => {
                // Check costs
                if (choice.cost && gameState.data.player.coins < choice.cost) {
                    showNotification('💰 Not enough coins!');
                    return;
                }
                if (choice.energyCost && gameState.data.player.energy < choice.energyCost) {
                    showNotification('⚡ Not enough energy!');
                    return;
                }
                
                // Apply costs
                if (choice.cost) gameState.data.player.coins -= choice.cost;
                if (choice.energyCost) gameState.data.player.energy -= choice.energyCost;
                
                // Apply rewards
                const r = choice.reward;
                if (r.xp) gameState.gainXP(r.xp);
                if (r.coins) gameState.data.player.coins += r.coins;
                if (r.reputation) gameState.data.player.reputation += r.reputation;
                if (r.skills) gameState.data.player.skills += r.skills;
                if (r.networking) gameState.data.player.networking += r.networking;
                if (r.connections) gameState.data.player.connections += r.connections;
                if (r.followers) gameState.data.player.followers += r.followers;
                if (r.maxEnergy) gameState.data.player.maxEnergy += r.maxEnergy;
                
                gameState.data.player.encountersCompleted++;
                
                showNotification('✨ Encounter resolved! Rewards received');
                scene.cameras.main.flash(200, 0, 255, 0, false, null, 0.3);
                updateUI();
                achievementManager.checkAll();
                
                // Remove overlay
                overlay.destroy();
                box.destroy();
                title.destroy();
                text.destroy();
                btn.destroy();
                btnText.destroy();
                
                // Clean up other buttons
                encounter.choices.forEach((_, j) => {
                    if (j !== i && scene.children.list[scene.children.list.length - 1 - (encounter.choices.length - j - 1) * 2]) {
                        // Would need to track and destroy properly
                    }
                });
            });
        });
    }
}

// Reputation Tier System
class ReputationManager {
    constructor() {
        this.tiers = [
            { min: 0, max: 49, name: 'Unknown', color: '#666666', perks: [] },
            { min: 50, max: 99, name: 'Noticed', color: '#AAAAAA', perks: ['5% post boost'] },
            { min: 100, max: 199, name: 'Respected', color: '#00D9FF', perks: ['5% post boost', '10% networking bonus'] },
            { min: 200, max: 399, name: 'Well Known', color: '#00FF88', perks: ['10% post boost', '10% networking bonus', '5% coin bonus'] },
            { min: 400, max: 699, name: 'Influential', color: '#FFD700', perks: ['15% post boost', '15% networking bonus', '10% coin bonus', 'Free coffee'] },
            { min: 700, max: 999, name: 'Famous', color: '#FF6B6B', perks: ['20% post boost', '20% networking bonus', '15% coin bonus', 'Free coffee', 'Free gym'] },
            { min: 1000, max: 9999, name: 'LEGEND', color: '#FF00FF', perks: ['30% post boost', '30% networking bonus', '25% coin bonus', 'All services free', 'VIP access'] }
        ];
    }
    
    getCurrentTier(reputation) {
        for (let tier of this.tiers) {
            if (reputation >= tier.min && reputation <= tier.max) {
                return tier;
            }
        }
        return this.tiers[this.tiers.length - 1];
    }
    
    getPostBoost(reputation) {
        const tier = this.getCurrentTier(reputation);
        const boostPerk = tier.perks.find(p => p.includes('post boost'));
        if (!boostPerk) return 1.0;
        const percent = parseInt(boostPerk);
        return 1 + (percent / 100);
    }
    
    getNetworkingBonus(reputation) {
        const tier = this.getCurrentTier(reputation);
        const bonusPerk = tier.perks.find(p => p.includes('networking bonus'));
        if (!bonusPerk) return 1.0;
        const percent = parseInt(bonusPerk);
        return 1 + (percent / 100);
    }
    
    getCoinBonus(reputation) {
        const tier = this.getCurrentTier(reputation);
        const bonusPerk = tier.perks.find(p => p.includes('coin bonus'));
        if (!bonusPerk) return 1.0;
        const percent = parseInt(bonusPerk);
        return 1 + (percent / 100);
    }
}

// Certification System
class CertificationManager {
    constructor() {
        this.certifications = [
            { id: 'js_cert', name: 'JavaScript Certified', icon: '💻', requirement: { skills: 50 }, reward: { reputation: 20, xp: 100 } },
            { id: 'python_cert', name: 'Python Expert', icon: '🐍', requirement: { skills: 75 }, reward: { reputation: 25, xp: 150 } },
            { id: 'cloud_cert', name: 'Cloud Architect', icon: '☁️', requirement: { skills: 100 }, reward: { reputation: 30, xp: 200 } },
            { id: 'leader_cert', name: 'Leadership Badge', icon: '👑', requirement: { networking: 80 }, reward: { reputation: 25, xp: 150 } },
            { id: 'influencer_cert', name: 'Certified Influencer', icon: '⭐', requirement: { followers: 500 }, reward: { reputation: 40, xp: 250 } },
            { id: 'networking_cert', name: 'Super Networker', icon: '🤝', requirement: { connections: 100 }, reward: { reputation: 35, xp: 200 } },
            { id: 'content_cert', name: 'Content Master', icon: '✍️', requirement: { postsCount: 50 }, reward: { reputation: 30, xp: 180 } },
            { id: 'master_cert', name: 'LinkedIn Master', icon: '💎', requirement: { level: 30 }, reward: { reputation: 100, xp: 500, coins: 1000 } }
        ];
    }
    
    checkEligible(certId) {
        const cert = this.certifications.find(c => c.id === certId);
        if (!cert) return false;
        
        const p = gameState.data.player;
        const req = cert.requirement;
        
        if (req.skills && p.skills < req.skills) return false;
        if (req.networking && p.networking < req.networking) return false;
        if (req.followers && p.followers < req.followers) return false;
        if (req.connections && p.connections < req.connections) return false;
        if (req.postsCount && p.postsCount < req.postsCount) return false;
        if (req.level && p.level < req.level) return false;
        
        return true;
    }
    
    earnCertification(certId) {
        // Ensure array exists
        if (!gameState.data.player.certificationsEarned) {
            gameState.data.player.certificationsEarned = [];
        }
        
        if (gameState.data.player.certificationsEarned.includes(certId)) {
            showNotification('You already have this certification!');
            return;
        }
        
        const cert = this.certifications.find(c => c.id === certId);
        if (!cert) return;
        
        if (!this.checkEligible(certId)) {
            showNotification('You don\'t meet the requirements yet!');
            return;
        }
        
        gameState.data.player.certificationsEarned.push(certId);
        
        // Apply rewards
        const r = cert.reward;
        if (r.reputation) gameState.data.player.reputation += r.reputation;
        if (r.xp) gameState.gainXP(r.xp);
        if (r.coins) gameState.data.player.coins += r.coins;
        
        showNotification(`🎓 Earned ${cert.name}!`);
        showAchievement(`${cert.icon} ${cert.name}`);
        updateUI();
        gameState.saveGame();
    }
    
    checkAllCertifications() {
        // Ensure array exists
        if (!gameState.data.player.certificationsEarned) {
            gameState.data.player.certificationsEarned = [];
        }
        
        this.certifications.forEach(cert => {
            if (!gameState.data.player.certificationsEarned.includes(cert.id)) {
                if (this.checkEligible(cert.id)) {
                    // Notify player they can earn this
                    if (Math.random() < 0.1) { // 10% chance to notify
                        showNotification(`🎓 You're eligible for ${cert.name}! Check computer.`);
                    }
                }
            }
        });
    }
}

// Global managers
const storyManager = new StoryManager();
const dialogueManager = new DialogueManager();
const questManager = new QuestManager();
const itemManager = new ItemManager();
const achievementManager = new AchievementManager();
const encounterManager = new EncounterManager();
const reputationManager = new ReputationManager();
const certificationManager = new CertificationManager();

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
                apartmentLevel: 1, // Apartment upgrade level
                pet: null, // Pet companion
                petStats: { happiness: 100, hunger: 100 }, // Pet needs
                visitCounts: {}, // Track location visits
                encountersCompleted: 0,
                certificationsEarned: [],
                relationshipLevel: 0 // For dating system
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
        this.tryRandomEncounter();
    }
    
    tryRandomEncounter() {
        if (encounterManager.tryTriggerEncounter()) {
            encounterManager.showRandomEncounter(this);
        }
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
                
                // Check quests and achievements
                questManager.checkAllQuests(gameState.data);
                achievementManager.checkAll();
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
                this.handleEmailAction(email);
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
        this.createButton(width/2, 140, '✍️ Create Post (15⚡)', () => this.createPost());
        this.createButton(width/2, 185, '📚 Learn Skills (50💰)', () => this.learnSkills());
        this.createButton(width/2, 210, '⌨️ Typing Game', () => this.startMinigame());
        this.createButton(width/2, 250, '🧠 Memory Game', () => this.startMemoryGame());
        this.createButton(width/2, 290, '⚡ Reaction Test', () => this.startReactionGame());
        this.createButton(width/2, 330, '❓ Tech Quiz', () => this.startQuizGame());
        this.createButton(width/2, 370, '🌳 View Skill Tree', () => this.showSkillTree());
        this.createButton(width/2, 410, '📊 Stats Dashboard', () => this.showStats());
        this.createButton(width/2, 450, '🎓 Earn Certifications', () => this.showCertifications());
        this.createButton(width/2, 490, '🏠 Upgrade Apartment', () => this.upgradeApartment());
        this.createButton(width/2, 530, '⚙️ Customize', () => this.customize());
        this.createButton(width/2, 570, '❌ Close', () => this.closeMenu());

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
            
            // Check quests and achievements
            questManager.checkAllQuests(gameState.data);
            achievementManager.checkAll();
            
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
    
    startMemoryGame() {
        this.closeMenu();
        this.scene.launch('MemoryGameScene');
    }
    
    startReactionGame() {
        this.closeMenu();
        this.scene.launch('ReactionGameScene');
    }
    
    startQuizGame() {
        this.closeMenu();
        this.scene.launch('QuizGameScene');
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
    
    showStats() {
        this.closeMenu();
        this.scene.launch('StatsDashboardScene');
    }
    
    showCertifications() {
        // Close menu first
        this.closeMenu();
        
        // Create a new scene overlay for certifications
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Dim background
        const overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.9);
        overlay.setDepth(2000);
        overlay.setScrollFactor(0);
        
        // Menu box
        const box = this.add.rectangle(width/2, height/2, 900, 600, 0x1E3A8A);
        box.setStrokeStyle(4, 0xFFD700);
        box.setDepth(2001);
        box.setScrollFactor(0);
        
        // Title
        const title = this.add.text(width/2, height/2 - 240, '🎓 CERTIFICATIONS', {
            fontSize: '32px',
            color: '#FFD700',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(2002).setScrollFactor(0);
        
        // Store elements for cleanup
        const elements = [overlay, box, title];
        
        // List certifications
        certificationManager.certifications.forEach((cert, i) => {
            const y = height/2 - 160 + i * 60;
            const eligible = certificationManager.checkEligible(cert.id);
            const earned = (gameState.data.player.certificationsEarned || []).includes(cert.id);
            
            const certBox = this.add.rectangle(width/2, y, 800, 50, earned ? 0x00FF88 : eligible ? 0x0A66C2 : 0x4A4A4A);
            certBox.setStrokeStyle(2, 0xFFFFFF);
            certBox.setDepth(2002);
            certBox.setScrollFactor(0);
            elements.push(certBox);
            
            if (eligible && !earned) {
                certBox.setInteractive();
                certBox.on('pointerdown', () => {
                    certificationManager.earnCertification(cert.id);
                    // Clean up all elements
                    elements.forEach(el => el.destroy());
                });
            }
            
            const certText = this.add.text(width/2 - 350, y, `${cert.icon} ${cert.name}`, {
                fontSize: '16px',
                color: '#FFFFFF'
            }).setOrigin(0, 0.5).setDepth(2003).setScrollFactor(0);
            elements.push(certText);
            
            const status = earned ? '✓ EARNED' : eligible ? '→ CLICK TO EARN' : '✗ Locked';
            const statusText = this.add.text(width/2 + 340, y, status, {
                fontSize: '14px',
                color: earned ? '#00FF88' : eligible ? '#FFD700' : '#666666'
            }).setOrigin(1, 0.5).setDepth(2003).setScrollFactor(0);
            elements.push(statusText);
        });
        
        // Close button
        const closeBtn = this.add.rectangle(width/2, height/2 + 220, 200, 50, 0xFF6B6B);
        closeBtn.setStrokeStyle(2, 0xFFFFFF);
        closeBtn.setInteractive();
        closeBtn.setDepth(2002);
        closeBtn.setScrollFactor(0);
        elements.push(closeBtn);
        
        const closeText = this.add.text(width/2, height/2 + 220, 'Close', {
            fontSize: '18px',
            color: '#FFFFFF'
        }).setOrigin(0.5).setDepth(2003).setScrollFactor(0);
        elements.push(closeText);
        
        closeBtn.on('pointerdown', () => {
            elements.forEach(el => el.destroy());
        });
        
        // ESC to close
        const escKey = this.input.keyboard.addKey('ESC');
        escKey.on('down', () => {
            elements.forEach(el => el.destroy());
        });
    }
    
    upgradeApartment() {
        const currentLevel = gameState.data.player.apartmentLevel;
        const upgradeCost = currentLevel * 500;
        
        if (currentLevel >= 5) {
            showNotification('🏠 Apartment is fully upgraded!');
            achievementManager.check('investor', currentLevel >= 5);
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
            questManager.checkQuest(108);
            achievementManager.checkAll();
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

// Stats Dashboard Scene - View all your stats
class StatsDashboardScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StatsDashboardScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        this.add.rectangle(width/2, height/2, width, height, 0x1A1A2E);
        
        // Title
        this.add.text(width/2, 80, '📊 YOUR STATS', {
            fontSize: '40px',
            color: '#00FF88',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        const p = gameState.data.player;
        
        // Create stat categories
        const categories = [
            {
                title: '👤 Profile',
                stats: [
                    { label: 'Name', value: p.name },
                    { label: 'Title', value: p.title },
                    { label: 'Level', value: p.level },
                    { label: 'XP', value: `${p.xp} / ${p.xpToNextLevel}` },
                    { label: 'Total XP Earned', value: Math.floor(p.xp + (p.level * 100)) }
                ]
            },
            {
                title: '💼 Career',
                stats: [
                    { label: 'Current Job', value: p.job || 'Unemployed' },
                    { label: 'Salary/Day', value: `${p.salary} 💰` },
                    { label: 'Total Earned', value: `${p.coins} 💰` },
                    { label: 'Reputation', value: p.reputation },
                    { label: 'Skills', value: p.skills }
                ]
            },
            {
                title: '🤝 Network',
                stats: [
                    { label: 'Connections', value: p.connections },
                    { label: 'Followers', value: p.followers },
                    { label: 'Posts Published', value: p.postsCount },
                    { label: 'Networking Score', value: p.networking },
                    { label: 'Engagement Rate', value: `${Math.floor((p.followers / Math.max(1, p.postsCount)) * 100)}%` }
                ]
            },
            {
                title: '🎮 Progress',
                stats: [
                    { label: 'Quests Completed', value: questManager.quests.filter(q => q.completed).length },
                    { label: 'Achievements', value: achievementManager.unlocked.size },
                    { label: 'Items Collected', value: p.inventory.length },
                    { label: 'Apartment Level', value: p.apartmentLevel },
                    { label: 'Locations Visited', value: Math.floor(Math.random() * 10) + 5 } // Would track this
                ]
            },
            {
                title: '⚡ Resources',
                stats: [
                    { label: 'Current Energy', value: `${Math.floor(p.energy)} / ${p.maxEnergy}` },
                    { label: 'Current Coins', value: p.coins },
                    { label: 'Inventory Space', value: `${p.inventory.length} / 20` },
                    { label: 'Equipped Items', value: Object.values(p.equipment).filter(e => e !== null && e !== 'default').length },
                    { label: 'Total Badges', value: p.badges.length }
                ]
            }
        ];
        
        // Display in grid
        categories.forEach((cat, catIndex) => {
            const x = 200 + (catIndex % 3) * 450;
            const y = 200 + Math.floor(catIndex / 3) * 300;
            
            // Category box
            const box = this.add.rectangle(x, y, 400, 250, 0x2C2C2C);
            box.setStrokeStyle(3, 0x0A66C2);
            
            // Category title
            this.add.text(x, y - 100, cat.title, {
                fontSize: '22px',
                color: '#FFD700',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            // Stats
            cat.stats.forEach((stat, i) => {
                const statY = y - 60 + i * 30;
                
                this.add.text(x - 180, statY, stat.label + ':', {
                    fontSize: '14px',
                    color: '#AAAAAA'
                });
                
                this.add.text(x + 180, statY, stat.value.toString(), {
                    fontSize: '14px',
                    color: '#00FF88',
                    fontStyle: 'bold'
                }).setOrigin(1, 0);
            });
        });
        
        // Close button
        const closeBtn = this.add.rectangle(width/2, height - 80, 250, 60, 0xFF6B6B);
        closeBtn.setStrokeStyle(3, 0xFFFFFF);
        closeBtn.setInteractive();
        
        this.add.text(width/2, height - 80, 'Close (ESC)', {
            fontSize: '20px',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        closeBtn.on('pointerdown', () => {
            this.scene.stop();
        });
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop();
        });
    }
}

// Leaderboard Scene - Global rankings
class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LeaderboardScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        this.add.rectangle(width/2, height/2, width, height, 0x0D1B2A);
        
        // Title
        this.add.text(width/2, 100, '🏆 GLOBAL LEADERBOARD', {
            fontSize: '40px',
            color: '#FFD700',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);
        
        this.add.text(width/2, 150, 'Top LinkedIn Tycoons Worldwide', {
            fontSize: '18px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Generate leaderboard data
        const players = [
            { name: gameState.data.player.name, level: gameState.data.player.level, connections: gameState.data.player.connections, isPlayer: true }
        ];
        
        // Add AI players
        const aiNames = [
            'TechGuru_Mike', 'LinkedInPro_Sarah', 'NetworkKing_David', 'CodeMaster_Emma',
            'ProInfluencer_Alex', 'TechLead_Chris', 'Hustler_Jamie', 'CareerBoost_Morgan',
            'GrowthHacker_Pat', 'DevExpert_Taylor', 'Networker_Jordan', 'ProCoder_Casey',
            'TechWhiz_Riley', 'LinkedInStar_Sam', 'ProfessionalPro_Avery', 'CareerWin_Quinn',
            'SkillMaster_Drew', 'NetGenius_Blake', 'TechTitan_Skyler', 'LinkedInLegend_Parker'
        ];
        
        aiNames.forEach(name => {
            players.push({
                name: name,
                level: Phaser.Math.Between(1, 50),
                connections: Phaser.Math.Between(10, 1000),
                followers: Phaser.Math.Between(50, 10000),
                isPlayer: false
            });
        });
        
        // Sort by connections
        players.sort((a, b) => b.connections - a.connections);
        
        // Find player rank
        const playerRank = players.findIndex(p => p.isPlayer) + 1;
        
        // Display top 10
        const startY = 220;
        players.slice(0, 10).forEach((player, index) => {
            const y = startY + index * 50;
            const rank = index + 1;
            
            // Rank background
            const bgColor = player.isPlayer ? 0x0A66C2 : 0x2C2C2C;
            const box = this.add.rectangle(width/2, y, 900, 45, bgColor);
            box.setStrokeStyle(2, player.isPlayer ? 0x00FF88 : 0x4A4A4A);
            
            // Rank
            const rankColor = rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : '#FFFFFF';
            this.add.text(width/2 - 420, y, `#${rank}`, {
                fontSize: '20px',
                color: rankColor,
                fontStyle: 'bold'
            }).setOrigin(0, 0.5);
            
            // Name
            this.add.text(width/2 - 350, y, player.name, {
                fontSize: '18px',
                color: player.isPlayer ? '#00FF88' : '#FFFFFF',
                fontStyle: player.isPlayer ? 'bold' : 'normal'
            }).setOrigin(0, 0.5);
            
            // Level
            this.add.text(width/2 + 50, y, `Lvl ${player.level}`, {
                fontSize: '16px',
                color: '#FFD700'
            }).setOrigin(0, 0.5);
            
            // Connections
            this.add.text(width/2 + 200, y, `${player.connections} 🤝`, {
                fontSize: '16px',
                color: '#00D9FF'
            }).setOrigin(0, 0.5);
            
            // Trophy for top 3
            if (rank <= 3) {
                const trophy = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';
                this.add.text(width/2 + 400, y, trophy, {
                    fontSize: '24px'
                }).setOrigin(0.5);
            }
        });
        
        // Player rank display if not in top 10
        if (playerRank > 10) {
            const yourRankBox = this.add.rectangle(width/2, height - 150, 900, 60, 0x0A66C2);
            yourRankBox.setStrokeStyle(3, 0x00FF88);
            
            this.add.text(width/2, height - 150, `Your Rank: #${playerRank} | Keep climbing!`, {
                fontSize: '20px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }
        
        // Close button
        const closeBtn = this.add.rectangle(width/2, height - 80, 250, 50, 0xFF6B6B);
        closeBtn.setStrokeStyle(2, 0xFFFFFF);
        closeBtn.setInteractive();
        
        this.add.text(width/2, height - 80, 'Close (ESC)', {
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
}

// Pet Shop Scene - Adopt a companion
class PetShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PetShopScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        this.add.rectangle(width/2, height/2, width, height, 0xFFE4B5);
        
        // Title
        this.add.text(width/2, 100, '🐾 PET ADOPTION CENTER', {
            fontSize: '36px',
            color: '#FF6B6B',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(width/2, 150, 'Choose your professional companion!', {
            fontSize: '18px',
            color: '#654321',
            stroke: '#FFFFFF',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Pet options
        const pets = [
            { name: 'Office Cat', emoji: '🐱', cost: 500, bonus: { networking: 10, happiness: 'Daily motivation boost' } },
            { name: 'Business Dog', emoji: '🐶', cost: 500, bonus: { skills: 15, happiness: 'Loyal companion' } },
            { name: 'Coding Parrot', emoji: '🦜', cost: 750, bonus: { reputation: 20, happiness: 'Tech wisdom' } }
        ];
        
        pets.forEach((pet, i) => {
            const x = width/2 - 400 + i * 400;
            const y = height/2;
            
            // Pet card
            const card = this.add.rectangle(x, y, 350, 450, 0xFFFFFF);
            card.setStrokeStyle(4, 0xFF6B6B);
            
            // Pet image
            this.add.text(x, y - 120, pet.emoji, {
                fontSize: '120px'
            }).setOrigin(0.5);
            
            // Name
            this.add.text(x, y + 20, pet.name, {
                fontSize: '24px',
                color: '#FF6B6B',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            // Bonus text
            const bonusKey = Object.keys(pet.bonus)[0];
            const bonusValue = pet.bonus[bonusKey];
            this.add.text(x, y + 60, `+${bonusValue} ${bonusKey}`, {
                fontSize: '16px',
                color: '#00AA00',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            this.add.text(x, y + 90, pet.bonus.happiness, {
                fontSize: '14px',
                color: '#666666',
                align: 'center',
                wordWrap: { width: 300 }
            }).setOrigin(0.5);
            
            // Adopt button
            const adoptBtn = this.add.rectangle(x, y + 160, 200, 60, 0xFF6B6B);
            adoptBtn.setStrokeStyle(3, 0xFFFFFF);
            adoptBtn.setInteractive();
            
            this.add.text(x, y + 140, `Adopt`, {
                fontSize: '20px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            this.add.text(x, y + 170, `${pet.cost} 💰`, {
                fontSize: '16px',
                color: '#FFD700'
            }).setOrigin(0.5);
            
            adoptBtn.on('pointerover', () => {
                adoptBtn.setFillStyle(0xFF8A8A);
                adoptBtn.setScale(1.05);
            });
            
            adoptBtn.on('pointerout', () => {
                adoptBtn.setFillStyle(0xFF6B6B);
                adoptBtn.setScale(1);
            });
            
            adoptBtn.on('pointerdown', () => {
                if (gameState.data.player.pet) {
                    showNotification('You already have a pet!');
                    return;
                }
                
                if (gameState.data.player.coins >= pet.cost) {
                    gameState.data.player.coins -= pet.cost;
                    gameState.data.player.pet = pet.name;
                    gameState.data.player.petStats = { happiness: 100, hunger: 100 };
                    
                    // Apply bonus
                    if (pet.bonus.networking) gameState.data.player.networking += pet.bonus.networking;
                    if (pet.bonus.skills) gameState.data.player.skills += pet.bonus.skills;
                    if (pet.bonus.reputation) gameState.data.player.reputation += pet.bonus.reputation;
                    
                    showNotification(`🐾 Adopted ${pet.name}! Welcome to your new companion!`);
                    showAchievement('Pet Owner 🐾');
                    this.cameras.main.flash(500, 255, 182, 193, false, null, 0.5);
                    updateUI();
                    
                    // Hearts
                    for (let j = 0; j < 20; j++) {
                        const heart = this.add.text(x, y - 120, '💕', { fontSize: '24px' });
                        this.tweens.add({
                            targets: heart,
                            y: y - 220,
                            x: x + Phaser.Math.Between(-80, 80),
                            alpha: 0,
                            rotation: Phaser.Math.Between(-2, 2),
                            duration: 2000,
                            onComplete: () => heart.destroy()
                        });
                    }
                    
                    this.time.delayedCall(2000, () => {
                        this.cameras.main.fadeOut(1000);
                        this.time.delayedCall(1000, () => {
                            this.scene.start('CityScene');
                        });
                    });
                } else {
                    showNotification(`💰 Need ${pet.cost} coins to adopt!`);
                }
            });
        });
        
        // Back button
        const backBtn = this.add.rectangle(width/2, height - 100, 250, 60, 0x654321);
        backBtn.setStrokeStyle(3, 0xFFFFFF);
        backBtn.setInteractive();
        
        this.add.text(width/2, height - 100, 'Back to City', {
            fontSize: '20px',
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

// Music Venue Scene - Entertainment and networking
class MusicVenueScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MusicVenueScene' });
    }

    create() {
        const width = 640;
        const height = 480;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Dark club atmosphere
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                const tile = this.add.image(x, y, 'floor').setOrigin(0);
                tile.setTint(0x2C1B47);
            }
        }
        
        this.createWalls(width, height);
        
        // Title with lights
        this.add.text(320, 40, '🎵 MUSIC VENUE', {
            fontSize: '26px',
            color: '#FF00FF',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Pulsing lights
        for (let i = 0; i < 8; i++) {
            const light = this.add.circle(
                80 + i * 70,
                100,
                15,
                Phaser.Math.RND.pick([0xFF00FF, 0x00FFFF, 0xFFFF00, 0xFF0000])
            );
            
            this.tweens.add({
                targets: light,
                alpha: 0.3,
                scale: 0.8,
                duration: 500 + Math.random() * 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
        
        // Player
        this.player = this.physics.add.sprite(320, 400, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createVenue();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('🎵 Enjoy music and network!');
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
    
    createVenue() {
        this.interactables = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.staticGroup();
        
        // Stage
        const stage = this.add.rectangle(320, 150, 200, 80, 0x654321);
        stage.setStrokeStyle(3, 0xFFD700);
        const stageCol = this.obstacles.create(320, 150, null);
        stageCol.setSize(200, 80);
        stageCol.setAlpha(0);
        stageCol.refreshBody();
        
        // Performers
        this.add.text(280, 140, '🎤', { fontSize: '32px' });
        this.add.text(360, 140, '🎸', { fontSize: '32px' });
        
        // Dancing NPCs
        for (let i = 0; i < 6; i++) {
            const x = 150 + Math.random() * 340;
            const y = 260 + Math.random() * 100;
            const npcSprite = ['npc1', 'npc2', 'npc3', 'npc4', 'npc5'][Math.floor(Math.random() * 5)];
            const npc = this.add.sprite(x, y, npcSprite);
            npc.setScale(1.2);
            
            // Make them bounce
            this.tweens.add({
                targets: npc,
                y: y - 10,
                duration: 400,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
        
        // Bar
        const bar = this.add.rectangle(100, 300, 120, 60, 0x8B4513);
        bar.setStrokeStyle(2, 0x654321);
        const barCol = this.obstacles.create(100, 300, null);
        barCol.setSize(120, 60);
        barCol.setAlpha(0);
        barCol.refreshBody();
        
        // Bartender
        const bartender = this.add.sprite(100, 280, 'npc4');
        bartender.setScale(1.4);
        
        // Dance floor (interactive)
        const danceFloor = this.interactables.create(400, 320, null);
        danceFloor.setSize(180, 120);
        danceFloor.setData('type', 'dance');
        danceFloor.setData('name', 'Dance Floor');
        danceFloor.refreshBody();
        
        this.add.text(400, 280, '💃 DANCE FLOOR 🕺', {
            fontSize: '16px',
            color: '#FF00FF',
            fontStyle: 'bold'
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
                } else if (type === 'dance') {
                    if (gameState.useEnergy(15)) {
                        // Dance and network!
                        gameState.data.player.networking += 15;
                        gameState.data.player.reputation += 10;
                        gameState.data.player.connections += 2;
                        gameState.gainXP(60);
                        
                        showNotification('💃 Danced and made 2 new connections!');
                        this.cameras.main.flash(300, 255, 0, 255, false, null, 0.5);
                        
                        // Dancing emojis
                        for (let i = 0; i < 15; i++) {
                            const emoji = Phaser.Math.RND.pick(['💃', '🕺', '🎵', '🎶', '⭐']);
                            const text = this.add.text(
                                400 + Phaser.Math.Between(-80, 80),
                                320,
                                emoji,
                                { fontSize: '24px' }
                            );
                            
                            this.tweens.add({
                                targets: text,
                                y: 220,
                                alpha: 0,
                                scale: 1.5,
                                rotation: Phaser.Math.Between(-2, 2),
                                duration: 1500,
                                onComplete: () => text.destroy()
                            });
                        }
                        
                        updateUI();
                    }
                }
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// Fitness Tracking Minigame
class FitnessMinigameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FitnessMinigameScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        this.add.rectangle(width/2, height/2, width, height, 0x1A1A2E);
        
        // Title
        this.add.text(width/2, 100, '💪 FITNESS CHALLENGE', {
            fontSize: '36px',
            color: '#FF6B6B',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(width/2, 150, 'Tap SPACE as fast as you can for 10 seconds!', {
            fontSize: '18px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        this.taps = 0;
        this.startTime = Date.now();
        this.timeLimit = 10000;
        this.gameActive = true;
        
        // Counter
        this.tapCounter = this.add.text(width/2, height/2, '0 REPS', {
            fontSize: '80px',
            color: '#00FF88',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Timer
        this.timer = this.add.text(width/2, height/2 + 100, '10s', {
            fontSize: '40px',
            color: '#FFD700'
        }).setOrigin(0.5);
        
        // Instructions
        this.add.text(width/2, height/2 + 180, 'Press SPACE repeatedly!', {
            fontSize: '20px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        // Spacebar listener
        this.spaceKey = this.input.keyboard.addKey('SPACE');
    }
    
    update() {
        if (!this.gameActive) return;
        
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(0, Math.ceil((this.timeLimit - elapsed) / 1000));
        
        this.timer.setText(`${remaining}s`);
        
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.taps++;
            this.tapCounter.setText(`${this.taps} REPS`);
            
            // Flash effect
            this.cameras.main.flash(50, 255, 100, 100, false, null, 0.2);
            
            // Scale animation
            this.tweens.add({
                targets: this.tapCounter,
                scale: 1.2,
                duration: 100,
                yoyo: true,
                ease: 'Power2'
            });
        }
        
        if (elapsed >= this.timeLimit) {
            this.gameActive = false;
            this.endGame();
        }
    }
    
    endGame() {
        // Calculate performance
        let performance = 'Average';
        let bonus = 0;
        
        if (this.taps >= 80) {
            performance = 'LEGENDARY!';
            bonus = 200;
        } else if (this.taps >= 60) {
            performance = 'Excellent!';
            bonus = 150;
        } else if (this.taps >= 40) {
            performance = 'Great!';
            bonus = 100;
        } else if (this.taps >= 20) {
            performance = 'Good!';
            bonus = 50;
        }
        
        gameState.data.player.maxEnergy += Math.floor(this.taps / 20);
        gameState.data.player.skills += 10 + bonus;
        gameState.data.player.coins += 50 + bonus;
        gameState.gainXP(40 + bonus);
        
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 - 100, `${performance}\n\n${this.taps} reps completed!\n+${Math.floor(this.taps / 20)} max energy`, {
            fontSize: '28px',
            color: '#00FF88',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        showNotification(`💪 Workout complete! Stamina increased!`);
        showAchievement('Fitness Enthusiast 💪');
        updateUI();
        
        this.time.delayedCall(3000, () => {
            this.scene.stop();
            this.scene.start('CityScene');
        });
    }
}

// Cooking Scene - Prepare meals for buffs
class CookingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CookingScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Kitchen background
        this.add.rectangle(width/2, height/2, width, height, 0xFFE4B5);
        
        // Title
        this.add.text(width/2, 100, '🍳 HOME COOKING', {
            fontSize: '36px',
            color: '#FF6B6B',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(width/2, 150, 'Cook meals for powerful buffs!', {
            fontSize: '18px',
            color: '#654321'
        }).setOrigin(0.5);
        
        // Recipe options
        const recipes = [
            { 
                name: 'Power Breakfast', 
                emoji: '🍳', 
                cost: 50, 
                effect: { energy: 40, skills: 10 },
                desc: '+40 Energy, +10 Skills'
            },
            { 
                name: 'Brain Food Salad', 
                emoji: '🥗', 
                cost: 75, 
                effect: { skills: 20, reputation: 5 },
                desc: '+20 Skills, +5 Reputation'
            },
            { 
                name: 'Victory Steak', 
                emoji: '🥩', 
                cost: 150, 
                effect: { energy: 60, networking: 15, reputation: 10 },
                desc: '+60 Energy, +15 Networking, +10 Reputation'
            },
            { 
                name: 'Success Smoothie', 
                emoji: '🥤', 
                cost: 40, 
                effect: { energy: 30, followers: 5 },
                desc: '+30 Energy, +5 Followers'
            }
        ];
        
        recipes.forEach((recipe, i) => {
            const x = width/2 - 450 + i * 300;
            const y = height/2 + 50;
            
            // Recipe card
            const card = this.add.rectangle(x, y, 250, 350, 0xFFFFFF);
            card.setStrokeStyle(4, 0xFF6B6B);
            
            // Food emoji
            this.add.text(x, y - 100, recipe.emoji, {
                fontSize: '80px'
            }).setOrigin(0.5);
            
            // Name
            this.add.text(x, y, recipe.name, {
                fontSize: '18px',
                color: '#FF6B6B',
                fontStyle: 'bold',
                align: 'center',
                wordWrap: { width: 220 }
            }).setOrigin(0.5);
            
            // Effect
            this.add.text(x, y + 50, recipe.desc, {
                fontSize: '12px',
                color: '#00AA00',
                align: 'center',
                wordWrap: { width: 220 }
            }).setOrigin(0.5);
            
            // Cook button
            const cookBtn = this.add.rectangle(x, y + 120, 180, 50, 0xFF6B6B);
            cookBtn.setStrokeStyle(2, 0xFFFFFF);
            cookBtn.setInteractive();
            
            this.add.text(x, y + 105, 'Cook', {
                fontSize: '18px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            this.add.text(x, y + 130, `${recipe.cost} 💰`, {
                fontSize: '14px',
                color: '#FFD700'
            }).setOrigin(0.5);
            
            cookBtn.on('pointerover', () => {
                cookBtn.setFillStyle(0xFF8A8A);
                cookBtn.setScale(1.05);
            });
            
            cookBtn.on('pointerout', () => {
                cookBtn.setFillStyle(0xFF6B6B);
                cookBtn.setScale(1);
            });
            
            cookBtn.on('pointerdown', () => {
                if (gameState.data.player.coins >= recipe.cost) {
                    gameState.data.player.coins -= recipe.cost;
                    
                    // Apply effects
                    const e = recipe.effect;
                    if (e.energy) {
                        gameState.data.player.energy = Math.min(
                            gameState.data.player.maxEnergy,
                            gameState.data.player.energy + e.energy
                        );
                    }
                    if (e.skills) gameState.data.player.skills += e.skills;
                    if (e.networking) gameState.data.player.networking += e.networking;
                    if (e.reputation) gameState.data.player.reputation += e.reputation;
                    if (e.followers) gameState.data.player.followers += e.followers;
                    
                    gameState.gainXP(30);
                    
                    showNotification(`🍳 Cooked ${recipe.name}! Buffs applied!`);
                    this.cameras.main.flash(300, 255, 215, 0, false, null, 0.3);
                    
                    // Cooking effects
                    for (let j = 0; j < 10; j++) {
                        const spark = this.add.text(x, y - 100, '✨', { fontSize: '20px' });
                        this.tweens.add({
                            targets: spark,
                            y: y - 150,
                            x: x + Phaser.Math.Between(-40, 40),
                            alpha: 0,
                            duration: 1000,
                            onComplete: () => spark.destroy()
                        });
                    }
                    
                    updateUI();
                } else {
                    showNotification(`💰 Need ${recipe.cost} coins!`);
                }
            });
        });
        
        // Back button
        const backBtn = this.add.rectangle(width/2, height - 80, 200, 50, 0x654321);
        backBtn.setStrokeStyle(2, 0xFFFFFF);
        backBtn.setInteractive();
        
        this.add.text(width/2, height - 80, 'Back', {
            fontSize: '18px',
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

// Networking Event Scene - Meet multiple professionals
class NetworkingEventScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NetworkingEventScene' });
    }

    create() {
        const width = 800;
        const height = 600;
        this.physics.world.setBounds(0, 0, width, height);
        
        // Elegant venue
        for (let x = 0; x < width; x += 16) {
            for (let y = 0; y < height; y += 16) {
                const tile = this.add.image(x, y, 'floor').setOrigin(0);
                tile.setTint(0x4A4A6A);
            }
        }
        
        this.createWalls(width, height);
        
        // Title
        this.add.text(400, 40, '🎭 NETWORKING EVENT', {
            fontSize: '28px',
            color: '#FFD700',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(400, 75, '15+ Professionals Attending', {
            fontSize: '14px',
            color: '#00FF88',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Player
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.createEvent();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.eKey = this.input.keyboard.addKey('E');
        
        showNotification('🎭 Network with everyone! Massive opportunity!');
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
    
    createEvent() {
        this.interactables = [];
        this.networkedWith = new Set();
        
        // Spawn 15 professionals around the room
        const names = [
            'Alex Tech', 'Jordan Dev', 'Taylor PM', 'Morgan CEO', 'Casey Designer',
            'Riley Engineer', 'Drew Marketer', 'Quinn Analyst', 'Jamie Founder', 'Avery CTO',
            'Parker COO', 'Skyler VP', 'Blake Director', 'Sage Manager', 'River Lead'
        ];
        
        const sprites = ['npc1', 'npc2', 'npc3', 'npc4', 'npc5'];
        
        for (let i = 0; i < 15; i++) {
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(120, 450);
            
            const sprite = Phaser.Math.RND.pick(sprites);
            const npc = this.add.sprite(x, y, sprite);
            npc.setScale(1.3);
            
            const label = this.add.text(x, y - 30, names[i].split(' ')[0], {
                fontSize: '11px',
                color: '#FFD700',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);
            
            this.interactables.push({
                sprite: npc,
                label: label,
                name: names[i],
                x: x,
                y: y
            });
        }
        
        // Exit
        this.exitDoor = { x: 400, y: 570, type: 'exit' };
    }
    
    update() {
        const speed = 120;
        let vX = 0, vY = 0;
        if (this.cursors.left.isDown || this.wasd.A.isDown) vX = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vX = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vY = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vY = speed;
        this.player.setVelocity(vX, vY);
        
        // Check for nearby NPCs
        let nearest = null;
        let minDist = Infinity;
        
        this.interactables.forEach((npc, index) => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, npc.x, npc.y
            );
            
            if (dist < 50 && dist < minDist) {
                minDist = dist;
                nearest = { npc, index };
            }
        });
        
        // Check exit
        const exitDist = Phaser.Math.Distance.Between(
            this.player.x, this.player.y, this.exitDoor.x, this.exitDoor.y
        );
        
        if (exitDist < 60) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                // Leave event
                const networked = this.networkedWith.size;
                const bonus = networked * 20;
                
                showNotification(`🎭 Event complete! Networked with ${networked} people`);
                gameState.data.player.coins += bonus * 2;
                gameState.gainXP(bonus * 3);
                
                if (networked >= 10) {
                    showAchievement('Networking Champion 🏆');
                }
                
                updateUI();
                this.cameras.main.fadeOut(1000);
                this.time.delayedCall(1000, () => {
                    this.scene.start('CityScene');
                });
            }
        } else if (nearest) {
            showInteractionPrompt(true);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
                if (!this.networkedWith.has(nearest.index)) {
                    if (gameState.useEnergy(5)) {
                        // Quick network
                        gameState.data.player.connections++;
                        gameState.data.player.networking += 8;
                        gameState.gainXP(25);
                        
                        this.networkedWith.add(nearest.index);
                        nearest.npc.sprite.setTint(0x00FF88);
                        
                        showNotification(`🤝 Connected with ${nearest.npc.name}!`);
                        this.cameras.main.flash(100, 0, 200, 0, false, null, 0.2);
                        updateUI();
                    }
                } else {
                    showNotification('Already connected with this person!');
                }
            }
        } else {
            showInteractionPrompt(false);
        }
    }
}

// Vehicle Shop Scene - Buy transportation
class VehicleShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VehicleShopScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Showroom
        this.add.rectangle(width/2, height/2, width, height, 0xF5F5F5);
        
        // Title
        this.add.text(width/2, 100, '🚗 VEHICLE DEALERSHIP', {
            fontSize: '40px',
            color: '#FF6B6B',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(width/2, 150, 'Upgrade your commute, save time!', {
            fontSize: '18px',
            color: '#666666'
        }).setOrigin(0.5);
        
        // Vehicle options
        const vehicles = [
            { 
                name: 'Electric Bike', 
                emoji: '🚲', 
                cost: 800, 
                benefit: '15% faster city travel',
                speedBoost: 1.15
            },
            { 
                name: 'Hybrid Car', 
                emoji: '🚗', 
                cost: 2000, 
                benefit: '30% faster city travel + style bonus',
                speedBoost: 1.30,
                repBonus: 25
            },
            { 
                name: 'Tesla Model S', 
                emoji: '🚘', 
                cost: 5000, 
                benefit: '50% faster travel + major reputation',
                speedBoost: 1.50,
                repBonus: 50
            }
        ];
        
        vehicles.forEach((vehicle, i) => {
            const x = width/2 - 450 + i * 450;
            const y = height/2 + 50;
            
            // Vehicle card
            const card = this.add.rectangle(x, y, 400, 500, 0xFFFFFF);
            card.setStrokeStyle(5, 0x0A66C2);
            
            // Vehicle
            this.add.text(x, y - 150, vehicle.emoji, {
                fontSize: '140px'
            }).setOrigin(0.5);
            
            // Name
            this.add.text(x, y + 40, vehicle.name, {
                fontSize: '26px',
                color: '#0A66C2',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            // Benefit
            this.add.text(x, y + 90, vehicle.benefit, {
                fontSize: '14px',
                color: '#00AA00',
                align: 'center',
                wordWrap: { width: 350 }
            }).setOrigin(0.5);
            
            // Buy button
            const buyBtn = this.add.rectangle(x, y + 180, 300, 70, 0xFF6B6B);
            buyBtn.setStrokeStyle(3, 0xFFFFFF);
            buyBtn.setInteractive();
            
            this.add.text(x, y + 160, 'Purchase', {
                fontSize: '22px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            this.add.text(x, y + 195, `${vehicle.cost} 💰`, {
                fontSize: '18px',
                color: '#FFD700'
            }).setOrigin(0.5);
            
            buyBtn.on('pointerover', () => {
                buyBtn.setFillStyle(0xFF8A8A);
                buyBtn.setScale(1.05);
            });
            
            buyBtn.on('pointerout', () => {
                buyBtn.setFillStyle(0xFF6B6B);
                buyBtn.setScale(1);
            });
            
            buyBtn.on('pointerdown', () => {
                if (gameState.data.player.coins >= vehicle.cost) {
                    gameState.data.player.coins -= vehicle.cost;
                    gameState.data.player.vehicle = vehicle.name;
                    
                    if (vehicle.repBonus) {
                        gameState.data.player.reputation += vehicle.repBonus;
                    }
                    
                    gameState.gainXP(vehicle.cost / 2);
                    
                    showNotification(`🚗 Purchased ${vehicle.name}!`);
                    showAchievement(`Vehicle Owner: ${vehicle.name}`);
                    this.cameras.main.flash(500, 0, 200, 255, false, null, 0.4);
                    updateUI();
                    
                    this.time.delayedCall(2000, () => {
                        this.cameras.main.fadeOut(1000);
                        this.time.delayedCall(1000, () => {
                            this.scene.start('CityScene');
                        });
                    });
                } else {
                    showNotification(`💰 Need ${vehicle.cost} coins!`);
                }
            });
        });
        
        // Back button
        const backBtn = this.add.rectangle(width/2, height - 80, 250, 60, 0x4A4A4A);
        backBtn.setStrokeStyle(3, 0xFFFFFF);
        backBtn.setInteractive();
        
        this.add.text(width/2, height - 80, 'Back to City', {
            fontSize: '20px',
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

// Prestige/Endgame Scene - Reset with bonuses
class PrestigeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PrestigeScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Epic background
        this.add.rectangle(width/2, height/2, width, height, 0x0D1B2A);
        
        // Stars/particles
        for (let i = 0; i < 100; i++) {
            const star = this.add.circle(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(0, height),
                2,
                0xFFFFFF,
                Phaser.Math.FloatBetween(0.3, 1)
            );
            
            this.tweens.add({
                targets: star,
                alpha: 0.2,
                duration: 1000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1
            });
        }
        
        // Title
        this.add.text(width/2, 150, '✨ PRESTIGE MODE ✨', {
            fontSize: '48px',
            color: '#FFD700',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);
        
        this.add.text(width/2, 220, 'Transcend to the next level', {
            fontSize: '20px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        const p = gameState.data.player;
        const canPrestige = p.level >= 50;
        
        if (canPrestige) {
            // Show prestige benefits
            const benefits = [
                '• Keep all achievements',
                '• +50% XP gain permanently',
                '• +100 max energy',
                '• Exclusive "Prestige" badge',
                '• New game+ content unlocked',
                '• Special golden character skin',
                '• Prestige level counter',
                '• Bragging rights!'
            ];
            
            this.add.text(width/2, 300, 'PRESTIGE BENEFITS:', {
                fontSize: '24px',
                color: '#00FF88',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            benefits.forEach((benefit, i) => {
                this.add.text(width/2, 350 + i * 35, benefit, {
                    fontSize: '16px',
                    color: '#FFFFFF'
                }).setOrigin(0.5);
            });
            
            // Prestige button
            const prestigeBtn = this.add.rectangle(width/2, height - 180, 400, 80, 0xFFD700);
            prestigeBtn.setStrokeStyle(5, 0xFFFFFF);
            prestigeBtn.setInteractive();
            
            this.add.text(width/2, height - 180, '✨ PRESTIGE NOW ✨', {
                fontSize: '28px',
                color: '#000000',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            prestigeBtn.on('pointerover', () => {
                prestigeBtn.setFillStyle(0xFFE44D);
                prestigeBtn.setScale(1.05);
                
                // Glow effect
                this.tweens.add({
                    targets: prestigeBtn,
                    alpha: 0.8,
                    duration: 500,
                    yoyo: true
                });
            });
            
            prestigeBtn.on('pointerout', () => {
                prestigeBtn.setFillStyle(0xFFD700);
                prestigeBtn.setScale(1);
            });
            
            prestigeBtn.on('pointerdown', () => {
                // Confirm prestige
                const confirm = window.confirm('Are you sure you want to PRESTIGE? This will reset your level and stats but grant permanent bonuses!');
                
                if (confirm) {
                    // Keep achievements and add prestige bonuses
                    const achievements = achievementManager.unlocked;
                    const prestigeLevel = (gameState.data.prestigeLevel || 0) + 1;
                    
                    // Reset but with bonuses
                    gameState.data = gameState.createNewGame();
                    gameState.data.prestigeLevel = prestigeLevel;
                    gameState.data.xpMultiplier = 1 + (prestigeLevel * 0.5);
                    gameState.data.player.maxEnergy += 100;
                    gameState.data.player.badges.push('✨ Prestige ' + prestigeLevel);
                    
                    // Restore achievements
                    achievementManager.unlocked = achievements;
                    
                    gameState.saveGame();
                    
                    showNotification(`✨ PRESTIGE ${prestigeLevel} ACTIVATED! You are reborn!`);
                    showAchievement(`Prestige Level ${prestigeLevel}!`);
                    
                    // Epic animation
                    this.cameras.main.flash(2000, 255, 215, 0);
                    
                    this.time.delayedCall(3000, () => {
                        this.cameras.main.fadeOut(2000);
                        this.time.delayedCall(2000, () => {
                            location.reload(); // Fresh start
                        });
                    });
                }
            });
        } else {
            // Not eligible yet
            this.add.text(width/2, 350, `You need to reach Level 50 to Prestige\n\nCurrent Level: ${p.level}\nLevels to go: ${50 - p.level}`, {
                fontSize: '24px',
                color: '#FF6B6B',
                align: 'center',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }
        
        // Back button
        const backBtn = this.add.rectangle(width/2, height - 80, 250, 60, 0xFF6B6B);
        backBtn.setStrokeStyle(3, 0xFFFFFF);
        backBtn.setInteractive();
        
        this.add.text(width/2, height - 80, 'Back', {
            fontSize: '20px',
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

// Memory Game Scene - Match pairs
class MemoryGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MemoryGameScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Dark overlay
        this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.9);
        
        // Game background
        const bg = this.add.rectangle(width/2, height/2, 700, 500, 0x2A9D8F);
        bg.setStrokeStyle(4, 0x00FF88);
        
        // Title
        this.add.text(width/2, height/2 - 220, '🧠 MEMORY MATCH', {
            fontSize: '32px',
            color: '#00FF88',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.add.text(width/2, height/2 - 180, 'Match the LinkedIn skill pairs!', {
            fontSize: '16px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        // Create cards
        this.symbols = ['💻', '📱', '🎯', '💼', '📊', '🚀', '💡', '⭐'];
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = Date.now();
        
        // Shuffle symbols
        const gameSymbols = [...this.symbols, ...this.symbols];
        Phaser.Utils.Array.Shuffle(gameSymbols);
        
        // Create 4x4 grid
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const x = width/2 - 180 + col * 120;
                const y = height/2 - 100 + row * 110;
                const symbol = gameSymbols[row * 4 + col];
                
                const card = this.add.rectangle(x, y, 90, 90, 0x0A66C2);
                card.setStrokeStyle(3, 0x00FF88);
                card.setInteractive();
                
                const cardText = this.add.text(x, y, '?', {
                    fontSize: '40px',
                    color: '#FFFFFF'
                }).setOrigin(0.5);
                
                const symbolText = this.add.text(x, y, symbol, {
                    fontSize: '40px'
                }).setOrigin(0.5).setAlpha(0);
                
                const cardData = {
                    rect: card,
                    questionMark: cardText,
                    symbol: symbol,
                    symbolText: symbolText,
                    flipped: false,
                    matched: false
                };
                
                card.on('pointerdown', () => {
                    if (!cardData.flipped && !cardData.matched && this.flippedCards.length < 2) {
                        this.flipCard(cardData);
                    }
                });
                
                card.on('pointerover', () => {
                    if (!cardData.matched) {
                        card.setFillStyle(0x0E7FE8);
                    }
                });
                
                card.on('pointerout', () => {
                    if (!cardData.matched) {
                        card.setFillStyle(0x0A66C2);
                    }
                });
                
                this.cards.push(cardData);
            }
        }
        
        // Moves counter
        this.movesText = this.add.text(width/2, height/2 + 220, 'Moves: 0', {
            fontSize: '18px',
            color: '#FFD700'
        }).setOrigin(0.5);
        
        // Timer
        this.timerText = this.add.text(width/2 + 200, height/2 - 220, 'Time: 0s', {
            fontSize: '16px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
    }
    
    update() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        this.timerText.setText(`Time: ${elapsed}s`);
    }
    
    flipCard(card) {
        card.flipped = true;
        card.questionMark.setAlpha(0);
        card.symbolText.setAlpha(1);
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesText.setText(`Moves: ${this.moves}`);
            
            this.time.delayedCall(500, () => {
                this.checkMatch();
            });
        }
    }
    
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.symbol === card2.symbol) {
            // Match!
            card1.matched = true;
            card2.matched = true;
            card1.rect.setFillStyle(0x00FF88);
            card2.rect.setFillStyle(0x00FF88);
            this.matchedPairs++;
            
            if (this.matchedPairs === 8) {
                this.completeGame();
            }
        } else {
            // No match
            card1.flipped = false;
            card2.flipped = false;
            card1.questionMark.setAlpha(1);
            card1.symbolText.setAlpha(0);
            card2.questionMark.setAlpha(1);
            card2.symbolText.setAlpha(0);
        }
        
        this.flippedCards = [];
    }
    
    completeGame() {
        const timeBonus = Math.max(0, 60 - Math.floor((Date.now() - this.startTime) / 1000));
        const moveBonus = Math.max(0, 50 - this.moves);
        const totalBonus = timeBonus * 5 + moveBonus * 10;
        
        gameState.data.player.skills += 20 + totalBonus;
        gameState.data.player.coins += 100 + totalBonus * 2;
        gameState.gainXP(50 + totalBonus);
        
        showNotification(`🧠 Memory Perfect! +${20 + totalBonus} skills, +${100 + totalBonus * 2} coins!`);
        showAchievement('Memory Master 🧠');
        updateUI();
        
        this.time.delayedCall(2000, () => {
            this.scene.stop();
        });
    }
}

// Reaction Game Scene - Click as fast as possible
class ReactionGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ReactionGameScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Dark overlay
        this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.9);
        
        // Game background
        const bg = this.add.rectangle(width/2, height/2, 600, 400, 0xFF6B6B);
        bg.setStrokeStyle(4, 0xFFFF00);
        
        // Title
        this.add.text(width/2, height/2 - 150, '⚡ REACTION TEST', {
            fontSize: '32px',
            color: '#FFFF00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(width/2, height/2 - 110, 'Click the green button as fast as you can!', {
            fontSize: '14px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        this.round = 0;
        this.maxRounds = 5;
        this.reactions = [];
        this.waitingForClick = false;
        
        // Create target button
        this.targetButton = this.add.rectangle(width/2, height/2 + 20, 150, 150, 0xFF0000);
        this.targetButton.setStrokeStyle(4, 0x000000);
        this.targetButton.setInteractive();
        
        this.targetText = this.add.text(width/2, height/2 + 20, 'WAIT...', {
            fontSize: '24px',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Stats
        this.statsText = this.add.text(width/2, height/2 + 130, `Round: ${this.round}/${this.maxRounds}`, {
            fontSize: '16px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        this.targetButton.on('pointerdown', () => {
            if (this.waitingForClick) {
                const reactionTime = Date.now() - this.clickStartTime;
                this.reactions.push(reactionTime);
                this.round++;
                
                this.targetButton.setFillStyle(0xFF0000);
                this.targetText.setText('WAIT...');
                this.waitingForClick = false;
                
                if (this.round >= this.maxRounds) {
                    this.completeGame();
                } else {
                    this.statsText.setText(`Round: ${this.round}/${this.maxRounds}\nLast: ${reactionTime}ms`);
                    this.scheduleNextRound();
                }
            }
        });
        
        // Start first round
        this.scheduleNextRound();
    }
    
    scheduleNextRound() {
        const delay = Phaser.Math.Between(1000, 3000);
        this.time.delayedCall(delay, () => {
            this.targetButton.setFillStyle(0x00FF00);
            this.targetText.setText('CLICK!');
            this.clickStartTime = Date.now();
            this.waitingForClick = true;
        });
    }
    
    completeGame() {
        const avgReaction = this.reactions.reduce((a, b) => a + b, 0) / this.reactions.length;
        const bestReaction = Math.min(...this.reactions);
        
        let rating = 'Average';
        let bonus = 0;
        
        if (avgReaction < 300) {
            rating = 'AMAZING!';
            bonus = 150;
        } else if (avgReaction < 400) {
            rating = 'Great!';
            bonus = 100;
        } else if (avgReaction < 500) {
            rating = 'Good!';
            bonus = 50;
        }
        
        gameState.data.player.skills += 15 + bonus;
        gameState.data.player.coins += 75 + bonus;
        gameState.gainXP(40 + bonus);
        
        this.targetText.setText(`${rating}\nAvg: ${Math.floor(avgReaction)}ms`);
        showNotification(`⚡ Reaction Test Complete! +${15 + bonus} skills!`);
        showAchievement('Lightning Fast ⚡');
        updateUI();
        
        this.time.delayedCall(3000, () => {
            this.scene.stop();
        });
    }
}

// Tech Quiz Game Scene
class QuizGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizGameScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Dark overlay
        this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.9);
        
        // Game background
        const bg = this.add.rectangle(width/2, height/2, 700, 500, 0x7B1FA2);
        bg.setStrokeStyle(4, 0xFFD700);
        
        // Title
        this.add.text(width/2, height/2 - 220, '❓ TECH QUIZ', {
            fontSize: '32px',
            color: '#FFD700',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(width/2, height/2 - 180, 'Test your technical knowledge!', {
            fontSize: '16px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        this.currentQuestion = 0;
        this.score = 0;
        
        this.quizQuestions = [
            {
                q: "What does HTML stand for?",
                answers: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"],
                correct: 0
            },
            {
                q: "Which language is known for 'Write Once, Run Anywhere'?",
                answers: ["Python", "Java", "C++"],
                correct: 1
            },
            {
                q: "What is React?",
                answers: ["A database", "A JavaScript library", "An operating system"],
                correct: 1
            },
            {
                q: "What does API stand for?",
                answers: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface"],
                correct: 0
            },
            {
                q: "Which is a NoSQL database?",
                answers: ["MySQL", "MongoDB", "PostgreSQL"],
                correct: 1
            },
            {
                q: "What is Git used for?",
                answers: ["Version control", "Database management", "Web hosting"],
                correct: 0
            },
            {
                q: "What does CSS stand for?",
                answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System"],
                correct: 1
            },
            {
                q: "Which is a backend framework?",
                answers: ["React", "Express.js", "Bootstrap"],
                correct: 1
            },
            {
                q: "What is Docker?",
                answers: ["A containerization platform", "A programming language", "A cloud provider"],
                correct: 0
            },
            {
                q: "What does REST stand for in APIs?",
                answers: ["Representational State Transfer", "Remote Service Technology", "Rapid Exchange System Transfer"],
                correct: 0
            }
        ];
        
        // Shuffle questions
        Phaser.Utils.Array.Shuffle(this.quizQuestions);
        this.quizQuestions = this.quizQuestions.slice(0, 5); // Use 5 questions
        
        this.showQuestion();
    }
    
    showQuestion() {
        if (this.currentQuestion >= this.quizQuestions.length) {
            this.endQuiz();
            return;
        }
        
        const q = this.quizQuestions[this.currentQuestion];
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Question number
        if (this.questionNum) this.questionNum.destroy();
        this.questionNum = this.add.text(width/2, height/2 - 130, `Question ${this.currentQuestion + 1}/${this.quizQuestions.length}`, {
            fontSize: '16px',
            color: '#FFD700'
        }).setOrigin(0.5);
        
        // Question text
        if (this.questionText) this.questionText.destroy();
        this.questionText = this.add.text(width/2, height/2 - 80, q.q, {
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);
        
        // Answer buttons
        if (this.answerButtons) {
            this.answerButtons.forEach(btn => {
                btn.rect.destroy();
                btn.text.destroy();
            });
        }
        
        this.answerButtons = [];
        q.answers.forEach((answer, i) => {
            const y = height/2 + 20 + i * 70;
            
            const rect = this.add.rectangle(width/2, y, 600, 60, 0x4A4A4A);
            rect.setStrokeStyle(3, 0xFFD700);
            rect.setInteractive();
            
            const text = this.add.text(width/2, y, answer, {
                fontSize: '16px',
                color: '#FFFFFF'
            }).setOrigin(0.5);
            
            rect.on('pointerover', () => {
                rect.setFillStyle(0x6A6A6A);
                rect.setScale(1.02);
            });
            
            rect.on('pointerout', () => {
                rect.setFillStyle(0x4A4A4A);
                rect.setScale(1);
            });
            
            rect.on('pointerdown', () => {
                const isCorrect = i === q.correct;
                
                if (isCorrect) {
                    this.score++;
                    rect.setFillStyle(0x00FF88);
                    this.cameras.main.flash(150, 0, 255, 0, false, null, 0.2);
                    showNotification('✓ Correct!');
                } else {
                    rect.setFillStyle(0xFF0000);
                    this.cameras.main.shake(150, 0.002);
                    showNotification('✗ Incorrect');
                }
                
                this.time.delayedCall(1000, () => {
                    this.currentQuestion++;
                    this.showQuestion();
                });
            });
            
            this.answerButtons.push({ rect, text });
        });
    }
    
    endQuiz() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Clear
        if (this.questionText) this.questionText.destroy();
        if (this.questionNum) this.questionNum.destroy();
        if (this.answerButtons) {
            this.answerButtons.forEach(btn => {
                btn.rect.destroy();
                btn.text.destroy();
            });
        }
        
        const percentage = (this.score / this.quizQuestions.length) * 100;
        const bonus = this.score * 25;
        
        gameState.data.player.skills += 10 + bonus;
        gameState.data.player.reputation += this.score * 5;
        gameState.data.player.coins += 50 + bonus;
        gameState.gainXP(30 + bonus);
        
        this.add.text(width/2, height/2, `Quiz Complete!\n\nScore: ${this.score}/${this.quizQuestions.length} (${Math.floor(percentage)}%)\n\n+${10 + bonus} Skills\n+${50 + bonus} Coins`, {
            fontSize: '24px',
            color: '#00FF88',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        if (this.score === this.quizQuestions.length) {
            showAchievement('Perfect Score! 🎯');
        }
        
        updateUI();
        
        this.time.delayedCall(4000, () => {
            this.scene.stop();
        });
    }
}

// Hackathon Scene - Build a project
class HackathonScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HackathonScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Tech background
        this.add.rectangle(width/2, height/2, width, height, 0x0D1B2A);
        
        // Matrix effect
        for (let i = 0; i < 30; i++) {
            const x = Phaser.Math.Between(0, width);
            const code = this.add.text(x, -50, '01010101\n10101010\n01110011', {
                fontSize: '12px',
                color: '#00FF00',
                alpha: 0.3,
                fontFamily: 'Courier New'
            });
            
            this.tweens.add({
                targets: code,
                y: height + 50,
                duration: 5000 + Math.random() * 5000,
                repeat: -1,
                delay: Math.random() * 5000
            });
        }
        
        // Title
        this.add.text(width/2, 120, '💻 24-HOUR HACKATHON', {
            fontSize: '36px',
            color: '#00FF00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(width/2, 170, 'Build something amazing in 60 seconds!', {
            fontSize: '18px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        // Project options
        const projects = [
            { name: '🤖 AI Chatbot', difficulty: 'Hard', reward: { xp: 200, coins: 400, skills: 50 } },
            { name: '📱 Mobile App', difficulty: 'Medium', reward: { xp: 150, coins: 300, skills: 35 } },
            { name: '🌐 Website', difficulty: 'Easy', reward: { xp: 100, coins: 200, skills: 25 } }
        ];
        
        projects.forEach((project, i) => {
            const y = height/2 + 50 + i * 100;
            
            const card = this.add.rectangle(width/2, y, 500, 90, 0x1E3A8A);
            card.setStrokeStyle(3, 0x00FF00);
            card.setInteractive();
            
            this.add.text(width/2, y - 20, project.name, {
                fontSize: '22px',
                color: '#00FF00',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            this.add.text(width/2, y + 10, `Difficulty: ${project.difficulty}`, {
                fontSize: '14px',
                color: '#FFD700'
            }).setOrigin(0.5);
            
            const rewardText = `XP: +${project.reward.xp} | Coins: +${project.reward.coins} | Skills: +${project.reward.skills}`;
            this.add.text(width/2, y + 30, rewardText, {
                fontSize: '12px',
                color: '#FFFFFF'
            }).setOrigin(0.5);
            
            card.on('pointerover', () => {
                card.setFillStyle(0x2E5AAA);
                card.setScale(1.02);
            });
            
            card.on('pointerout', () => {
                card.setFillStyle(0x1E3A8A);
                card.setScale(1);
            });
            
            card.on('pointerdown', () => {
                this.startHackathon(project);
            });
        });
        
        // Cancel button
        const cancelBtn = this.add.rectangle(width/2, height - 120, 200, 50, 0xFF6B6B);
        cancelBtn.setStrokeStyle(2, 0xFFFFFF);
        cancelBtn.setInteractive();
        
        this.add.text(width/2, height - 120, 'Leave', {
            fontSize: '18px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        cancelBtn.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('CityScene');
        });
    }
    
    startHackathon(project) {
        if (gameState.useEnergy(40)) {
            const width = this.cameras.main.width;
            const height = this.cameras.main.height;
            
            // Clear scene
            this.children.removeAll();
            
            // Progress bar
            this.add.rectangle(width/2, height/2, width, height, 0x000000);
            
            this.add.text(width/2, height/2 - 100, 'BUILDING PROJECT...', {
                fontSize: '32px',
                color: '#00FF00',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            const progressBg = this.add.rectangle(width/2, height/2, 600, 50, 0x2C2C2C);
            progressBg.setStrokeStyle(3, 0x00FF00);
            
            const progressBar = this.add.rectangle(width/2 - 297, height/2, 0, 44, 0x00FF00);
            progressBar.setOrigin(0, 0.5);
            
            // Simulate building
            this.tweens.add({
                targets: progressBar,
                width: 594,
                duration: 3000,
                ease: 'Linear',
                onComplete: () => {
                    // Complete!
                    gameState.gainXP(project.reward.xp);
                    gameState.data.player.coins += project.reward.coins;
                    gameState.data.player.skills += project.reward.skills;
                    gameState.data.player.reputation += 30;
                    
                    showNotification(`💻 Project complete! Massive rewards!`);
                    showAchievement('Hackathon Winner 🏆');
                    updateUI();
                    
                    // Confetti
                    for (let i = 0; i < 40; i++) {
                        const confetti = this.add.text(
                            width/2 + Phaser.Math.Between(-200, 200),
                            height/2 - 100,
                            Phaser.Math.RND.pick(['🎉', '⭐', '💻', '🚀']),
                            { fontSize: '24px' }
                        );
                        
                        this.tweens.add({
                            targets: confetti,
                            y: height/2 + 200,
                            x: confetti.x + Phaser.Math.Between(-150, 150),
                            alpha: 0,
                            rotation: Phaser.Math.Between(-4, 4),
                            duration: 2500,
                            onComplete: () => confetti.destroy()
                        });
                    }
                    
                    this.time.delayedCall(3000, () => {
                        this.scene.stop();
                        this.scene.start('CityScene');
                    });
                }
            });
        } else {
            showNotification('⚡ Need 40 energy for hackathon!');
        }
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
    scene: [IntroScene, BootScene, TutorialScene, HomeScene, CityScene, GymScene, CoffeeShopScene, ParkScene, RestaurantScene, CoworkingScene, LibraryScene, UniversityScene, ShopScene, JobInterviewScene, MentorScene, DatingScene, ConferenceRoomScene, HackathonScene, PetShopScene, MusicVenueScene, FitnessMinigameScene, CookingScene, NetworkingEventScene, VehicleShopScene, PrestigeScene, StatsDashboardScene, LeaderboardScene, ComputerMenuScene, SkillMinigameScene, MemoryGameScene, ReactionGameScene, QuizGameScene, EmailScene],
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

