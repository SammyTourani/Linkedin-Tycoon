# 🎮 LinkedIn Tycoon - Pixel Art Edition

**Build Your Professional Empire in a 2D Pixel World!**

An immersive pixel art RPG where you navigate through a professional world, network with people, create viral posts, attend events, and level up your career. Walk around in a top-down 2D world, interact with objects, and watch your professional empire grow!

---

## 🌟 What Makes This Game Special

This is a **fully polished, top-tier pixel art game** featuring:

✨ **Smooth Phaser 3 Engine** - Professional-grade game framework  
🎨 **Hand-crafted Pixel Art** - Procedurally generated sprites and environments  
🏃 **Fluid Character Movement** - 8-directional walking with WASD/Arrow keys  
🏠 **Multiple Interactive Locations** - Home, City, Coffee Shops, Conference Centers  
💫 **Stunning Visual Effects** - Particles, screen shake, floating text, confetti  
⚡ **Responsive Feedback** - Every action has satisfying visual and audio cues  
💾 **Auto-Save System** - Your progress is saved automatically every 30 seconds  
🎯 **LinkedIn Tycoon Mechanics** - All the career-building features from the original game  

---

## 🎮 How to Play

### Getting Started

1. **Open the game:**
   ```
   Open pixel-game.html in your web browser
   OR
   Visit http://localhost:8888/pixel-game.html if running the server
   ```

2. **Controls:**
   - **WASD** or **Arrow Keys** - Move your character
   - **E Key** - Interact with objects and people
   - **Mouse Click** - Navigate menus and buttons
   - **ESC Key** - Close menus

3. **Watch your stats** in the top UI overlay:
   - Level, Energy, Coins, Network size

---

## 🗺️ Locations & What to Do

### 🏠 Home Office
Your personal workspace where you can:
- **💻 Computer** - Create LinkedIn posts, learn skills, manage your profile
  - Create Post (15 ⚡) - Publish content to gain likes, followers, and coins
  - Learn Skills (50 💰) - Improve your professional skills
  - View Profile - Check your stats and progress
- **🛏️ Bed** - Sleep to restore 50 energy
- **🚪 Door** - Exit to the city

### 🏙️ City
The bustling professional world where opportunities await:
- **👥 Network with Professionals** - Connect with 5 different people walking around
  - Costs 10 ⚡ per attempt
  - 70% success rate
  - Gain connections, networking points, and XP
- **☕ Coffee Shop** - Buy coffee for 20 💰 to restore 30 energy
- **🎯 Conference Center** - Attend events for 20 ⚡
  - Earn 100 coins, 10 reputation, and 50 XP
  - Spectacular confetti celebration!
- **🏠 Home Door** - Return to your home office

---

## 📊 Game Mechanics

### 💪 Energy System
- **Starting Energy:** 100/100
- **Regeneration:** +1 energy every 10 seconds
- **Usage:**
  - Creating posts: -15 ⚡
  - Networking: -10 ⚡
  - Attending events: -20 ⚡
- **Recovery:**
  - Sleep in bed: +50 ⚡
  - Buy coffee: +30 ⚡ (costs 20 💰)

### 📈 Progression System

**Level Up Requirements:**
- Gain XP by networking, posting, and attending events
- Each level requires 1.5x more XP than the previous
- Benefits: +10 max energy, +50 coins, new title

**Career Titles:**
- Level 1-4: Junior Software Engineer
- Level 5-9: Software Engineer
- Level 10-14: Senior Software Engineer
- Level 15-19: Lead Developer
- Level 20-24: Engineering Manager
- Level 25-29: Director of Engineering
- Level 30-39: VP of Engineering
- Level 40-49: CTO
- Level 50+: Tech Industry Leader

**XP Rewards:**
- Networking with someone: +15 XP
- Creating a normal post: +20 XP
- Creating a viral post (80+ likes): +100 XP
- Attending an event: +50 XP
- Learning skills: +25 XP

### 💰 Economy System

**Earning Coins:**
- Post likes: +1 coin per like (10-100 likes per post)
- Attending events: +100 coins
- Leveling up: +50 coins

**Spending Coins:**
- Coffee at coffee shop: -20 coins (+30 energy)
- Learning skills: -50 coins (+10 skills)

### 🤝 Networking System
- **Success Rate:** 70% base chance
- **Benefits per connection:**
  - +1 connection count
  - +5 networking stat
  - +15 XP
- **Visual Feedback:**
  - Camera shake on success
  - Green flash effect
  - Floating "+15 XP" text
  - 🤝 emoji particles

---

## ✨ Visual Effects & Polish

This game features extensive visual polish to make every action feel satisfying:

### 🎊 Particle Effects
- **Sleeping:** ✨💤 sparkles and sleep emojis
- **Networking:** 🤝 handshake particles flying outward
- **Coffee:** ☕ coffee cup particles
- **Events:** 🎉⭐✨🎊 confetti explosion

### 📺 Screen Effects
- **Camera Shake:** Triggered on networking success and events
- **Flash Effects:**
  - Green flash on successful networking
  - Blue flash on creating posts
  - Golden flash on attending events
  - Purple flash on learning skills
- **Fade Transitions:** Smooth scene changes between home and city

### 📝 Floating Text
- **XP Gains:** Golden "+XP" text floating upward
- **Coin Gains:** Yellow "+💰" text
- **Energy Gains:** Green "+⚡" text
- All text scales, rotates, and fades out smoothly

### 📹 Camera Work
- **Smooth Follow:** Camera follows player with slight delay for cinematic feel
- **2x Zoom:** Perfect pixel art viewing distance
- **Shake & Flash:** Dynamic camera effects for impactful moments

---

## 🎯 Tips for Success

1. **Manage Your Energy Wisely**
   - Don't spam all your energy at once
   - Sleep when low on energy
   - Buy coffee in emergencies

2. **Prioritize Networking in the City**
   - More connections = higher networking stat
   - Higher networking stat = better success rates
   - Connections lead to more opportunities

3. **Create Posts Regularly**
   - Posts give you coins, followers, and reputation
   - Aim for viral posts (80+ likes) for massive XP bonuses
   - Build reputation to increase post performance

4. **Attend Events When Possible**
   - Best XP and coin rewards
   - Great for quick leveling
   - Worth the 20 energy cost

5. **Invest in Skills**
   - Skills improve your overall performance
   - Opens up higher-level opportunities
   - Essential for late-game progression

6. **Explore Everything**
   - Talk to all 5 people in the city
   - Visit both locations (Coffee Shop & Conference Center)
   - Use your home computer for multiple activities

---

## 🎨 Technical Details

### Built With
- **Phaser 3.70.0** - Industry-standard HTML5 game framework
- **Vanilla JavaScript** - No additional dependencies
- **Canvas API** - Procedural pixel art generation
- **LocalStorage API** - Automatic save/load system

### Features
- **Pixel-Perfect Rendering** - True pixel art aesthetic
- **Arcade Physics** - Smooth collision detection
- **Scene Management** - Multiple interconnected game scenes
- **State Management** - Persistent game state across sessions
- **Animation System** - 4-directional character animations
- **Particle System** - Dynamic emoji-based particles
- **Tween System** - Smooth animations and transitions

### Performance
- **60 FPS** - Silky smooth gameplay
- **Optimized Rendering** - Efficient sprite management
- **Automatic Cleanup** - No memory leaks
- **Responsive Design** - Fits any screen size

---

## 💾 Save System

The game features a **robust auto-save system**:

- **Auto-Save:** Every 30 seconds automatically
- **Save on Action:** After every major action (post, network, event)
- **Browser Storage:** Uses localStorage for persistence
- **Cross-Session:** Your progress carries over between play sessions

**What Gets Saved:**
- Player stats (level, energy, coins, networking, skills, reputation)
- Connections count and followers
- Posts created
- Achievements unlocked
- Current location
- All progress

**To Reset Your Save:**
Open browser console (F12) and run:
```javascript
localStorage.removeItem('linkedinTycoonPixelSave');
location.reload();
```

---

## 🐛 Troubleshooting

### Game Won't Load?
- Make sure JavaScript is enabled in your browser
- Check browser console (F12) for errors
- Try a different browser (Chrome recommended)
- Ensure you're opening `pixel-game.html` not `index.html`

### Character Won't Move?
- Click on the game canvas to give it focus
- Try clicking the game area and then using WASD/Arrows
- Refresh the page

### Energy Not Regenerating?
- Energy regenerates +1 every 10 seconds automatically
- Check if the game is focused
- Wait 10 seconds and check the UI

### Lost Your Save?
- Don't use private/incognito mode
- Check if localStorage is enabled
- Don't clear browser data

---

## 🎯 Future Enhancements (Ideas)

Want to extend the game? Here are some ideas:

- **More Locations:** Gym, Library, Restaurant, Co-working Space
- **Mini-Games:** Typing challenges, networking puzzles, coding challenges
- **Character Customization:** Choose appearance, outfits, accessories
- **Weather System:** Rain, snow, sunny days affecting gameplay
- **Day/Night Cycle:** Different people and opportunities at different times
- **Achievements:** Badges for milestones with visual celebrations
- **Multiplayer:** See other players walking around the city
- **Pet System:** Companion animals that follow you
- **Housing Upgrades:** Improve your home office
- **Sound Effects:** Background music and action sounds
- **Mobile Support:** Touch controls for phones/tablets

---

## 📝 Credits

**Game Design & Development:** LinkedIn Tycoon Team  
**Game Engine:** Phaser 3 (https://phaser.io)  
**Inspiration:** Stardew Valley, Pokémon, Habbo Hotel  
**Art Style:** 16-bit pixel art aesthetic  

---

## 🎉 Have Fun!

Enjoy building your professional empire! Remember:
- **Be social** - Network with everyone
- **Be consistent** - Post regularly
- **Be strategic** - Manage your energy wisely
- **Be ambitious** - Attend events and level up

**Ready to become a LinkedIn Tycoon? Start playing now!** 🚀

---

*Version 2.0 - Pixel Art Edition*  
*Complete 2D RPG Experience with Full LinkedIn Tycoon Mechanics*

