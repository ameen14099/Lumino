import { Book, ConceptConnection } from '@/types';

export const CATEGORIES = [
  'Habits', 'Productivity', 'Effectiveness', 'Psychology', 'Finance',
  'Mental Toughness', 'Mindset', 'Communication', 'Entrepreneurship',
  'Philosophy', 'Leadership', 'Persuasion',
] as const;

export const books: Book[] = [
  {
    id: 'atomic-habits', slug: 'atomic-habits', title: 'Atomic Habits', author: 'James Clear',
    category: 'Habits', description: 'Tiny changes, remarkable results. A proven framework for building good habits and breaking bad ones.',
    coverGradient: ['#00BFA5', '#00897B'], conceptCount: 12, difficulty: 'beginner', estimatedMinutes: 25, userCount: 12847,
    concepts: [
      { id: 'ah-1', name: 'The 1% Rule', description: 'Small improvements compound over time. Getting 1% better every day leads to being 37x better over a year. Habits are the compound interest of self-improvement.', order: 1, dependencies: [] },
      { id: 'ah-2', name: 'Identity-Based Habits', description: 'The most effective way to change habits is to focus on who you wish to become, not what you want to achieve. Every action is a vote for the type of person you want to be.', order: 2, dependencies: ['ah-1'] },
      { id: 'ah-3', name: 'The Four Laws', description: 'The framework for building any habit: Make it Obvious, Make it Attractive, Make it Easy, Make it Satisfying. To break a habit, invert each law.', order: 3, dependencies: ['ah-2'] },
      { id: 'ah-4', name: 'Cue: Make It Obvious', description: 'Design your environment so the cues for good habits are visible and the cues for bad habits are hidden. Use implementation intentions: "I will [behavior] at [time] in [location]."', order: 4, dependencies: ['ah-3'] },
      { id: 'ah-5', name: 'Craving: Make It Attractive', description: 'Pair a habit you need to do with one you want to do (temptation bundling). Join a culture where your desired behavior is normal.', order: 5, dependencies: ['ah-3'] },
      { id: 'ah-6', name: 'Response: Make It Easy', description: 'Reduce friction for good habits and increase friction for bad ones. Use the Two-Minute Rule: scale any habit down to just two minutes to start.', order: 6, dependencies: ['ah-3'] },
      { id: 'ah-7', name: 'Reward: Make It Satisfying', description: 'Add immediate rewards to habits that pay off in the long run. Use a habit tracker to make progress visible and satisfying.', order: 7, dependencies: ['ah-3'] },
      { id: 'ah-8', name: 'Habit Stacking', description: 'Link a new habit to an existing one: "After I [current habit], I will [new habit]." This leverages the momentum of behaviors you already do.', order: 8, dependencies: ['ah-4'] },
      { id: 'ah-9', name: 'Environment Design', description: "You don't rise to the level of your goals, you fall to the level of your systems. Redesign your environment to make the right thing the easiest thing.", order: 9, dependencies: ['ah-4', 'ah-6'] },
      { id: 'ah-10', name: 'The Plateau of Latent Potential', description: "Results are delayed. You don't see linear progress — breakthroughs come after long periods of apparent stagnation. Trust the system.", order: 10, dependencies: ['ah-1'] },
      { id: 'ah-11', name: 'The Goldilocks Rule', description: 'Peak motivation occurs when working on tasks right on the edge of your ability — not too easy, not too hard. About 4% beyond current ability.', order: 11, dependencies: ['ah-7'] },
      { id: 'ah-12', name: 'Never Miss Twice', description: 'Missing once is an accident. Missing twice is the start of a new habit. When you slip, recover quickly.', order: 12, dependencies: ['ah-2', 'ah-7'] },
    ],
  },
  {
    id: 'deep-work', slug: 'deep-work', title: 'Deep Work', author: 'Cal Newport',
    category: 'Productivity', description: 'Rules for focused success in a distracted world. Learn to concentrate without distraction on cognitively demanding tasks.',
    coverGradient: ['#5C6BC0', '#3949AB'], conceptCount: 10, difficulty: 'intermediate', estimatedMinutes: 30, userCount: 8432,
    concepts: [
      { id: 'dw-1', name: 'Deep Work Hypothesis', description: 'The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable. Those who master it will thrive.', order: 1, dependencies: [] },
      { id: 'dw-2', name: 'Shallow vs Deep Work', description: 'Shallow work is non-cognitively demanding, logistical-style tasks. Deep work is focused, uninterrupted, cognitively demanding effort that creates new value.', order: 2, dependencies: ['dw-1'] },
      { id: 'dw-3', name: 'The Four Philosophies', description: 'Monastic (eliminate all shallow), Bimodal (alternate periods), Rhythmic (daily schedule), Journalistic (fit deep work when possible).', order: 3, dependencies: ['dw-2'] },
      { id: 'dw-4', name: 'Attention Residue', description: "When you switch tasks, your attention doesn't fully follow — a residue remains on the previous task. This is why multitasking destroys deep work quality.", order: 4, dependencies: ['dw-2'] },
      { id: 'dw-5', name: 'Ritualize Deep Work', description: 'Build rituals and routines to minimize the willpower needed to start deep work sessions. Decide where, how long, rules, and support structures.', order: 5, dependencies: ['dw-3'] },
      { id: 'dw-6', name: 'Grand Gestures', description: 'Make a significant investment or change of environment to increase the perceived importance of a task.', order: 6, dependencies: ['dw-5'] },
      { id: 'dw-7', name: 'Embrace Boredom', description: 'Train your mind to resist distraction by scheduling internet use. If you never practice concentration, your ability to focus deeply atrophies.', order: 7, dependencies: ['dw-4'] },
      { id: 'dw-8', name: 'Quit Social Media', description: 'Apply the craftsman approach to tool selection: adopt a tool only if its benefits substantially outweigh its costs to your professional goals.', order: 8, dependencies: ['dw-7'] },
      { id: 'dw-9', name: 'Drain the Shallows', description: 'Schedule every minute of your day. Quantify the depth of every activity. Ask: "How long would it take to train a bright grad to do this?"', order: 9, dependencies: ['dw-3'] },
      { id: 'dw-10', name: 'The 4DX Framework', description: 'Focus on the wildly important, act on lead measures, keep a compelling scoreboard, and create a cadence of accountability.', order: 10, dependencies: ['dw-5', 'dw-9'] },
    ],
  },
  {
    id: 'the-7-habits', slug: 'the-7-habits', title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey',
    category: 'Effectiveness', description: 'A principle-centered approach for solving personal and professional problems.',
    coverGradient: ['#FF7043', '#E64A19'], conceptCount: 9, difficulty: 'intermediate', estimatedMinutes: 35, userCount: 9213,
    concepts: [
      { id: 'sh-1', name: 'Paradigm Shifts', description: 'The way we see the problem IS the problem. Our perceptions shape our reality.', order: 1, dependencies: [] },
      { id: 'sh-2', name: 'Be Proactive', description: 'Focus on your Circle of Influence rather than your Circle of Concern. Between stimulus and response lies your freedom to choose.', order: 2, dependencies: ['sh-1'] },
      { id: 'sh-3', name: 'Begin With the End in Mind', description: 'Start with a clear destination. Write a personal mission statement. All things are created twice — first mentally, then physically.', order: 3, dependencies: ['sh-2'] },
      { id: 'sh-4', name: 'Put First Things First', description: 'Prioritize important-but-not-urgent activities (Quadrant II). True effectiveness lives in Quadrant II.', order: 4, dependencies: ['sh-3'] },
      { id: 'sh-5', name: 'Think Win-Win', description: "Seek mutual benefit in all interactions. It's not your way or my way — it's a better way.", order: 5, dependencies: ['sh-4'] },
      { id: 'sh-6', name: 'Seek First to Understand', description: 'Empathic listening. Most people listen with the intent to reply, not to understand.', order: 6, dependencies: ['sh-5'] },
      { id: 'sh-7', name: 'Synergize', description: 'Creative cooperation. The whole is greater than the sum of its parts.', order: 7, dependencies: ['sh-5', 'sh-6'] },
      { id: 'sh-8', name: 'Sharpen the Saw', description: 'Preserve and enhance yourself. Renew in four dimensions — physical, spiritual, mental, and social/emotional.', order: 8, dependencies: ['sh-7'] },
      { id: 'sh-9', name: 'The Maturity Continuum', description: 'Dependence to Independence to Interdependence. Habits 1-3 are Private Victory, 4-6 are Public Victory, 7 is renewal.', order: 9, dependencies: ['sh-1'] },
    ],
  },
  {
    id: 'thinking-fast-and-slow', slug: 'thinking-fast-and-slow', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman',
    category: 'Psychology', description: 'A groundbreaking exploration of the two systems that drive the way we think.',
    coverGradient: ['#AB47BC', '#7B1FA2'], conceptCount: 8, difficulty: 'advanced', estimatedMinutes: 40, userCount: 6521,
    concepts: [
      { id: 'tfs-1', name: 'System 1 & System 2', description: 'System 1 operates automatically and quickly with little effort. System 2 allocates attention to effortful mental activities.', order: 1, dependencies: [] },
      { id: 'tfs-2', name: 'Cognitive Biases', description: 'Systematic patterns of deviation from rationality. Anchoring, availability heuristic, and representativeness are the most common.', order: 2, dependencies: ['tfs-1'] },
      { id: 'tfs-3', name: 'Anchoring Effect', description: 'Our estimates are heavily influenced by initial values, even random ones.', order: 3, dependencies: ['tfs-2'] },
      { id: 'tfs-4', name: 'Loss Aversion', description: 'Losses loom larger than gains — roughly twice as large. This drives risk aversion and the endowment effect.', order: 4, dependencies: ['tfs-2'] },
      { id: 'tfs-5', name: 'The Planning Fallacy', description: 'We systematically underestimate time, costs, and risks while overestimating benefits.', order: 5, dependencies: ['tfs-2'] },
      { id: 'tfs-6', name: 'Prospect Theory', description: 'People evaluate outcomes relative to a reference point, not in absolute terms.', order: 6, dependencies: ['tfs-4'] },
      { id: 'tfs-7', name: 'Two Selves', description: 'The experiencing self lives in the present. The remembering self maintains the story. We make decisions based on memories, not experiences.', order: 7, dependencies: ['tfs-1'] },
      { id: 'tfs-8', name: 'WYSIATI', description: '"What You See Is All There Is." System 1 constructs the best story from available info. We rarely consider what we don\'t know.', order: 8, dependencies: ['tfs-1', 'tfs-2'] },
    ],
  },
  {
    id: 'psychology-of-money', slug: 'psychology-of-money', title: 'The Psychology of Money', author: 'Morgan Housel',
    category: 'Finance', description: 'Timeless lessons on wealth, greed, and happiness.',
    coverGradient: ['#FFB300', '#F57F17'], conceptCount: 8, difficulty: 'beginner', estimatedMinutes: 20, userCount: 7832,
    concepts: [
      { id: 'pm-1', name: "No One's Crazy", description: 'Your personal experience with money makes up maybe 0.00000001% of what has happened in the world, but maybe 80% of how you think the world works.', order: 1, dependencies: [] },
      { id: 'pm-2', name: 'Luck & Risk', description: 'They are siblings. Every outcome in life is guided by forces other than individual effort.', order: 2, dependencies: ['pm-1'] },
      { id: 'pm-3', name: 'Never Enough', description: 'The hardest financial skill is getting the goalpost to stop moving. Social comparison is the thief of financial joy.', order: 3, dependencies: ['pm-1'] },
      { id: 'pm-4', name: 'Compounding', description: "Warren Buffett's skill is investing, but his secret is time. The key is consistency over decades.", order: 4, dependencies: ['pm-2'] },
      { id: 'pm-5', name: 'Tails Drive Everything', description: 'A tiny minority of events account for the majority of outcomes.', order: 5, dependencies: ['pm-4'] },
      { id: 'pm-6', name: 'Freedom', description: 'The highest form of wealth is the ability to wake up every morning and say "I can do whatever I want today."', order: 6, dependencies: ['pm-3'] },
      { id: 'pm-7', name: 'Wealth vs Rich', description: "Rich is current income. Wealth is hidden — it's income not spent.", order: 7, dependencies: ['pm-3', 'pm-6'] },
      { id: 'pm-8', name: 'Room for Error', description: 'The most important part of every plan is planning on your plan not going according to plan.', order: 8, dependencies: ['pm-5'] },
    ],
  },
  {
    id: 'cant-hurt-me', slug: 'cant-hurt-me', title: "Can't Hurt Me", author: 'David Goggins',
    category: 'Mental Toughness', description: 'Master your mind and defy the odds.',
    coverGradient: ['#E53935', '#B71C1C'], conceptCount: 8, difficulty: 'intermediate', estimatedMinutes: 25, userCount: 11204,
    concepts: [
      { id: 'chm-1', name: 'The Accountability Mirror', description: 'Face your insecurities and flaws head-on. Write your goals on sticky notes and put them on your mirror.', order: 1, dependencies: [] },
      { id: 'chm-2', name: 'The 40% Rule', description: "When your mind tells you you're done, you're really only 40% done. Push past the mental governor.", order: 2, dependencies: ['chm-1'] },
      { id: 'chm-3', name: 'Callousing Your Mind', description: 'Embrace suffering as a tool for growth. Each time you push through pain, your mental calluses thicken.', order: 3, dependencies: ['chm-2'] },
      { id: 'chm-4', name: 'Taking Souls', description: 'When someone underestimates you, use their doubt as fuel. Outwork everyone around you.', order: 4, dependencies: ['chm-2'] },
      { id: 'chm-5', name: 'The Cookie Jar', description: 'Build a mental archive of past victories. Reach into this jar during tough times.', order: 5, dependencies: ['chm-3'] },
      { id: 'chm-6', name: 'Armored Mind', description: 'Schedule suffering. Do the thing you dread most first thing in the morning.', order: 6, dependencies: ['chm-3', 'chm-5'] },
      { id: 'chm-7', name: 'Uncommon Among Uncommon', description: "Don't settle for being among the uncommon. Push further. The path of least resistance is a slow death.", order: 7, dependencies: ['chm-4', 'chm-6'] },
      { id: 'chm-8', name: 'The After Action Report', description: 'After every failure, document what happened, what went wrong, and what you can fix.', order: 8, dependencies: ['chm-1', 'chm-5'] },
    ],
  },
  // ============ 14 NEW BOOKS ============
  {
    id: 'think-and-grow-rich', slug: 'think-and-grow-rich', title: 'Think and Grow Rich', author: 'Napoleon Hill',
    category: 'Mindset', description: 'The classic blueprint for achieving wealth through the power of thought, desire, and persistence.',
    coverGradient: ['#C6A700', '#8D7600'], conceptCount: 8, difficulty: 'intermediate', estimatedMinutes: 30, userCount: 9870,
    concepts: [
      { id: 'tgr-1', name: 'Burning Desire', description: 'The starting point of all achievement is a definite, burning desire. Wishing is not enough — you must have an obsessive, all-consuming purpose.', order: 1, dependencies: [] },
      { id: 'tgr-2', name: 'Faith & Visualization', description: 'Faith is the head chemist of the mind. Repeated visualization and affirmation of your goals programs the subconscious to work toward them.', order: 2, dependencies: ['tgr-1'] },
      { id: 'tgr-3', name: 'Autosuggestion', description: 'You can influence your subconscious mind through repeated, emotionalized statements of purpose. What you tell yourself repeatedly becomes belief.', order: 3, dependencies: ['tgr-2'] },
      { id: 'tgr-4', name: 'Specialized Knowledge', description: 'General knowledge is useless for wealth creation. You need specialized knowledge organized toward a definite purpose, or access to those who have it.', order: 4, dependencies: ['tgr-1'] },
      { id: 'tgr-5', name: 'Imagination', description: 'Synthetic imagination rearranges existing ideas into new combinations. Creative imagination receives flashes of inspiration from infinite intelligence.', order: 5, dependencies: ['tgr-3'] },
      { id: 'tgr-6', name: 'Organized Planning', description: 'Desire is not enough — you need a practical plan and an alliance of capable people to execute it. When one plan fails, replace it immediately.', order: 6, dependencies: ['tgr-4', 'tgr-5'] },
      { id: 'tgr-7', name: 'The Master Mind', description: 'Coordination of knowledge and effort between two or more people who work toward a definite purpose creates a third, invisible force.', order: 7, dependencies: ['tgr-6'] },
      { id: 'tgr-8', name: 'Persistence', description: 'The sustained effort necessary to induce faith. Most people quit at the first sign of defeat. Persistence is the direct result of habit.', order: 8, dependencies: ['tgr-1', 'tgr-6'] },
    ],
  },
  {
    id: 'the-subtle-art', slug: 'the-subtle-art', title: "The Subtle Art of Not Giving a F*ck", author: 'Mark Manson',
    category: 'Mindset', description: 'A counterintuitive approach to living a good life by choosing what matters.',
    coverGradient: ['#FF6B35', '#D4440F'], conceptCount: 8, difficulty: 'beginner', estimatedMinutes: 20, userCount: 10540,
    concepts: [
      { id: 'sa-1', name: 'The Feedback Loop from Hell', description: "Feeling bad about feeling bad creates a vicious cycle. The desire for more positive experience is itself a negative experience. Accepting negative experiences is a positive experience.", order: 1, dependencies: [] },
      { id: 'sa-2', name: 'Choose Your Struggles', description: "Happiness is not about solving problems — it's about finding problems you enjoy solving. What pain are you willing to sustain?", order: 2, dependencies: ['sa-1'] },
      { id: 'sa-3', name: "You're Not Special", description: "Entitlement is the belief that you deserve special treatment. True self-worth comes from accepting you're average at most things — and that's okay.", order: 3, dependencies: ['sa-1'] },
      { id: 'sa-4', name: 'The Value of Suffering', description: "Suffering is biologically useful. It's nature's preferred teacher. The question isn't how to stop suffering but rather why you are suffering and whether it's for a good reason.", order: 4, dependencies: ['sa-2'] },
      { id: 'sa-5', name: 'Responsibility vs Fault', description: "We don't always control what happens to us, but we always control how we respond. Responsibility is not the same as fault.", order: 5, dependencies: ['sa-3'] },
      { id: 'sa-6', name: 'The Certainty Trap', description: "Being wrong opens us to growth. The more you embrace uncertainty, the more comfortable you become with not knowing — and the more you learn.", order: 6, dependencies: ['sa-4'] },
      { id: 'sa-7', name: 'Failure Is the Way Forward', description: "Improvement at anything requires failure. If you're unwilling to fail, you're unwilling to succeed.", order: 7, dependencies: ['sa-5', 'sa-6'] },
      { id: 'sa-8', name: 'The Importance of Saying No', description: "Commitment to one thing means rejecting alternatives. Freedom comes through constraints, not through unlimited options.", order: 8, dependencies: ['sa-2', 'sa-7'] },
    ],
  },
  {
    id: 'sapiens', slug: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari',
    category: 'Philosophy', description: 'A brief history of humankind — from the cognitive revolution to the modern age.',
    coverGradient: ['#795548', '#4E342E'], conceptCount: 8, difficulty: 'advanced', estimatedMinutes: 40, userCount: 7650,
    concepts: [
      { id: 'sap-1', name: 'The Cognitive Revolution', description: 'Around 70,000 years ago, Homo sapiens developed the ability to think about and communicate things that do not exist — myths, gods, nations, money.', order: 1, dependencies: [] },
      { id: 'sap-2', name: 'Imagined Realities', description: 'Humans cooperate in large numbers because we can create and believe in shared fictions — religions, nations, corporations, human rights.', order: 2, dependencies: ['sap-1'] },
      { id: 'sap-3', name: 'The Agricultural Revolution', description: "History's biggest fraud. Wheat domesticated humans, not the other way around. We traded quality of life for quantity of offspring.", order: 3, dependencies: ['sap-1'] },
      { id: 'sap-4', name: 'The Unification of Humankind', description: 'Three universal orders — money, empires, and religion — gradually unified all people into the single global world we live in today.', order: 4, dependencies: ['sap-2', 'sap-3'] },
      { id: 'sap-5', name: 'Money as a Story', description: 'Money is the most universal and efficient system of mutual trust ever devised. It works because everyone believes in it, not because it has inherent value.', order: 5, dependencies: ['sap-2'] },
      { id: 'sap-6', name: 'The Scientific Revolution', description: 'The discovery of ignorance. For the first time, humans admitted they did not know everything and began systematically building knowledge.', order: 6, dependencies: ['sap-4'] },
      { id: 'sap-7', name: 'Capitalism and Empire', description: 'Science, empire, and capitalism formed a feedback loop. Discoveries funded expeditions, expeditions brought resources, resources funded science.', order: 7, dependencies: ['sap-5', 'sap-6'] },
      { id: 'sap-8', name: 'The Happiness Question', description: 'Despite all progress, are we happier than our ancestors? The gap between expectations and reality may mean we are no happier at all.', order: 8, dependencies: ['sap-7'] },
    ],
  },
  {
    id: 'start-with-why', slug: 'start-with-why', title: 'Start with Why', author: 'Simon Sinek',
    category: 'Leadership', description: 'How great leaders inspire everyone to take action by starting with purpose.',
    coverGradient: ['#1976D2', '#0D47A1'], conceptCount: 7, difficulty: 'beginner', estimatedMinutes: 20, userCount: 8120,
    concepts: [
      { id: 'sww-1', name: 'The Golden Circle', description: 'Every organization knows WHAT they do. Some know HOW. Very few know WHY. The most inspiring leaders start from the inside out.', order: 1, dependencies: [] },
      { id: 'sww-2', name: 'The Biology of Decision-Making', description: "The Golden Circle maps to the brain. WHY corresponds to the limbic brain (feelings, trust, loyalty). WHAT corresponds to the neocortex (rational thought).", order: 2, dependencies: ['sww-1'] },
      { id: 'sww-3', name: 'The Celery Test', description: "If your WHY is clear, you can filter every decision through it. Only pursue things consistent with your purpose — it's obvious when they don't fit.", order: 3, dependencies: ['sww-1'] },
      { id: 'sww-4', name: 'The Law of Diffusion', description: "Innovators (2.5%) and early adopters (13.5%) buy based on WHY. You need to reach the tipping point of 15-18% before mass market adoption.", order: 4, dependencies: ['sww-2'] },
      { id: 'sww-5', name: 'The Split', description: "As organizations grow, the WHY can get fuzzy. The founder's vision dilutes. Success becomes measured by WHAT instead of WHY.", order: 5, dependencies: ['sww-3'] },
      { id: 'sww-6', name: 'Finding Your WHY', description: "Your WHY comes from your past — the sum of your experiences and values. It's discovered, not invented. Look backward to go forward.", order: 6, dependencies: ['sww-1'] },
      { id: 'sww-7', name: 'The WHY-HOW Partnership', description: "WHY people are visionaries. HOW people build the systems. The best organizations pair both — Gates and Allen, Jobs and Wozniak.", order: 7, dependencies: ['sww-5', 'sww-6'] },
    ],
  },
  {
    id: 'four-hour-workweek', slug: 'four-hour-workweek', title: 'The 4-Hour Workweek', author: 'Tim Ferriss',
    category: 'Productivity', description: 'Escape the 9-5, live anywhere, and join the new rich.',
    coverGradient: ['#26A69A', '#00796B'], conceptCount: 8, difficulty: 'intermediate', estimatedMinutes: 30, userCount: 7450,
    concepts: [
      { id: 'fhw-1', name: 'The New Rich', description: "The goal isn't retirement — it's designing a life of freedom now. Mini-retirements throughout life beat saving everything for the end.", order: 1, dependencies: [] },
      { id: 'fhw-2', name: 'Definition', description: "Fear-setting over goal-setting. Define your worst case scenario. Often what we fear doing most is what we most need to do.", order: 2, dependencies: ['fhw-1'] },
      { id: 'fhw-3', name: 'Elimination', description: "Being busy is not the same as being productive. Apply the 80/20 rule ruthlessly. Do less, but make what you do count.", order: 3, dependencies: ['fhw-2'] },
      { id: 'fhw-4', name: "Parkinson's Law", description: "A task will swell in complexity to fill the time allotted. Shorten deadlines to force efficiency. Two hours with a hard cutoff beats an open-ended day.", order: 4, dependencies: ['fhw-3'] },
      { id: 'fhw-5', name: 'Automation', description: "Build systems that generate income without your direct involvement. Outsource everything that can be outsourced for less than your time is worth.", order: 5, dependencies: ['fhw-3'] },
      { id: 'fhw-6', name: 'The Muse', description: "Create an automated business (a 'muse') that generates cash flow. Test before you invest. Pick a niche, create a product, automate fulfillment.", order: 6, dependencies: ['fhw-5'] },
      { id: 'fhw-7', name: 'Liberation', description: "Negotiate remote work or design location-independent income. The goal: separating time from money to gain mobility.", order: 7, dependencies: ['fhw-6'] },
      { id: 'fhw-8', name: 'Filling the Void', description: "Freedom without purpose leads to emptiness. Pursue learning, service, and experiences. The goal isn't to do nothing — it's to do what matters.", order: 8, dependencies: ['fhw-7'] },
    ],
  },
  {
    id: 'rich-dad-poor-dad', slug: 'rich-dad-poor-dad', title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki',
    category: 'Finance', description: 'What the rich teach their kids about money that the poor and middle class do not.',
    coverGradient: ['#43A047', '#2E7D32'], conceptCount: 7, difficulty: 'beginner', estimatedMinutes: 20, userCount: 9560,
    concepts: [
      { id: 'rd-1', name: 'Assets vs Liabilities', description: 'An asset puts money in your pocket. A liability takes money out. The rich acquire assets; the poor and middle class acquire liabilities they think are assets.', order: 1, dependencies: [] },
      { id: 'rd-2', name: 'The Rat Race', description: "Most people work for money, pay taxes, then spend what's left. They never escape because expenses rise with income. The cycle never ends.", order: 2, dependencies: ['rd-1'] },
      { id: 'rd-3', name: 'Mind Your Own Business', description: "Your profession is how you earn. Your business is your asset column. Keep your day job, but start building assets on the side.", order: 3, dependencies: ['rd-1'] },
      { id: 'rd-4', name: 'Financial Literacy', description: "The single most important skill. If you can read numbers and understand accounting, you can spot opportunities others miss.", order: 4, dependencies: ['rd-1'] },
      { id: 'rd-5', name: 'Work to Learn, Not to Earn', description: "Seek jobs that teach you skills — sales, communication, management. A little knowledge in many areas beats deep knowledge in one.", order: 5, dependencies: ['rd-2'] },
      { id: 'rd-6', name: 'The Power of Corporations', description: "The rich use corporations to protect assets and reduce taxes. Understanding legal structures is a form of financial intelligence.", order: 6, dependencies: ['rd-4'] },
      { id: 'rd-7', name: 'Overcoming Obstacles', description: "Fear, cynicism, laziness, bad habits, and arrogance are the five main obstacles to financial success. Most people let fear of losing money keep them poor.", order: 7, dependencies: ['rd-5', 'rd-6'] },
    ],
  },
  {
    id: 'how-to-win-friends', slug: 'how-to-win-friends', title: 'How to Win Friends and Influence People', author: 'Dale Carnegie',
    category: 'Communication', description: 'The timeless classic on building genuine relationships and persuasion.',
    coverGradient: ['#EC407A', '#C2185B'], conceptCount: 8, difficulty: 'beginner', estimatedMinutes: 25, userCount: 8890,
    concepts: [
      { id: 'hwf-1', name: "Don't Criticize or Condemn", description: "Criticism puts people on the defensive. Instead of condemning, try to understand why they do what they do. You'll breed sympathy, tolerance, and kindness.", order: 1, dependencies: [] },
      { id: 'hwf-2', name: 'Give Honest Appreciation', description: "The deepest craving in human nature is the desire to be important. Sincere appreciation — not flattery — is the key to influencing others.", order: 2, dependencies: ['hwf-1'] },
      { id: 'hwf-3', name: 'Become Genuinely Interested', description: "You can make more friends in two months by being interested in others than in two years of trying to get others interested in you.", order: 3, dependencies: ['hwf-2'] },
      { id: 'hwf-4', name: 'Be a Good Listener', description: "Encourage others to talk about themselves. Ask questions. Be genuinely curious. The person who talks only about themselves thinks only of themselves.", order: 4, dependencies: ['hwf-3'] },
      { id: 'hwf-5', name: "Talk in Terms of Others' Interests", description: "Before meeting someone, find out what they're passionate about. The royal road to a person's heart is to talk about what they treasure most.", order: 5, dependencies: ['hwf-3'] },
      { id: 'hwf-6', name: 'Make Others Feel Important', description: "Do it sincerely. Use their name. Remember details. The most powerful principle: make others feel important and do it genuinely.", order: 6, dependencies: ['hwf-2', 'hwf-4'] },
      { id: 'hwf-7', name: 'Avoid Arguments', description: "The only way to win an argument is to avoid it. You can't win — even if you're right, you've made the other person feel inferior.", order: 7, dependencies: ['hwf-1'] },
      { id: 'hwf-8', name: 'Begin in a Friendly Way', description: "A drop of honey catches more flies than a gallon of gall. Approach disagreements with warmth, and people become allies instead of adversaries.", order: 8, dependencies: ['hwf-6', 'hwf-7'] },
    ],
  },
  {
    id: 'lean-startup', slug: 'lean-startup', title: 'The Lean Startup', author: 'Eric Ries',
    category: 'Entrepreneurship', description: 'How constant innovation creates radically successful businesses.',
    coverGradient: ['#42A5F5', '#1565C0'], conceptCount: 8, difficulty: 'intermediate', estimatedMinutes: 30, userCount: 6780,
    concepts: [
      { id: 'ls-1', name: 'Validated Learning', description: "Startups exist to learn what creates a sustainable business. Every feature, marketing effort, and engineering activity should be evaluated by how much validated learning it produces.", order: 1, dependencies: [] },
      { id: 'ls-2', name: 'Build-Measure-Learn', description: "The fundamental feedback loop. Build a minimum viable product, measure how customers respond, learn whether to pivot or persevere. Speed through this loop determines success.", order: 2, dependencies: ['ls-1'] },
      { id: 'ls-3', name: 'Minimum Viable Product', description: "The version of a product that enables a full turn of the Build-Measure-Learn loop with minimum effort. It's not the smallest product — it's the fastest way to learn.", order: 3, dependencies: ['ls-2'] },
      { id: 'ls-4', name: 'Innovation Accounting', description: "Measure progress with actionable metrics, not vanity metrics. Cohort analysis, split testing, and funnel metrics show real progress.", order: 4, dependencies: ['ls-2'] },
      { id: 'ls-5', name: 'Pivot or Persevere', description: "A pivot is a structured course correction. When metrics show your hypothesis is wrong, change direction while staying grounded in what you've learned.", order: 5, dependencies: ['ls-4'] },
      { id: 'ls-6', name: 'Small Batches', description: "Working in small batches reduces waste, catches defects earlier, and provides faster feedback. The envelope-stuffing analogy: one-at-a-time beats batch-and-queue.", order: 6, dependencies: ['ls-3'] },
      { id: 'ls-7', name: 'The Five Whys', description: "For every problem, ask 'why' five times to find the root cause. Make proportional investments: small problems get small solutions.", order: 7, dependencies: ['ls-6'] },
      { id: 'ls-8', name: 'Continuous Deployment', description: "Deploy code the moment it's ready. Continuous deployment reduces batch size to the minimum and maximizes feedback speed.", order: 8, dependencies: ['ls-6', 'ls-7'] },
    ],
  },
  {
    id: 'zero-to-one', slug: 'zero-to-one', title: 'Zero to One', author: 'Peter Thiel',
    category: 'Entrepreneurship', description: 'Notes on startups — how to build the future by creating something entirely new.',
    coverGradient: ['#263238', '#37474F'], conceptCount: 7, difficulty: 'intermediate', estimatedMinutes: 25, userCount: 7230,
    concepts: [
      { id: 'zto-1', name: 'Zero to One vs One to N', description: "Horizontal progress (1 to n) copies things that work — globalization. Vertical progress (0 to 1) creates new things — technology. The best startups create entirely new categories.", order: 1, dependencies: [] },
      { id: 'zto-2', name: 'The Contrarian Question', description: "What important truth do very few people agree with you on? Your answer is where you'll find 0-to-1 opportunities that others are missing.", order: 2, dependencies: ['zto-1'] },
      { id: 'zto-3', name: 'Monopoly vs Competition', description: "Capitalism and competition are opposites. In perfect competition, no one makes money. Monopolies drive innovation. Build a creative monopoly.", order: 3, dependencies: ['zto-2'] },
      { id: 'zto-4', name: 'Last Mover Advantage', description: "Being first doesn't matter. Being the LAST to make a great product in a specific market is what counts. Durability matters more than growth.", order: 4, dependencies: ['zto-3'] },
      { id: 'zto-5', name: 'The Power Law', description: "A small handful of companies vastly outperform all others. One investment in your portfolio will outperform all of the rest combined.", order: 5, dependencies: ['zto-1'] },
      { id: 'zto-6', name: 'Secrets', description: "Every great company is built around a secret — something important and unknown that others don't see. There are still many secrets left to find.", order: 6, dependencies: ['zto-2'] },
      { id: 'zto-7', name: 'Definite Optimism', description: "The future will be better, and I can plan for it. Definite optimists build specific plans. Indefinite optimists just hope for the best.", order: 7, dependencies: ['zto-5', 'zto-6'] },
    ],
  },
  {
    id: 'meditations', slug: 'meditations', title: 'Meditations', author: 'Marcus Aurelius',
    category: 'Philosophy', description: 'The private journal of the Roman Emperor — timeless Stoic wisdom on living well.',
    coverGradient: ['#78909C', '#455A64'], conceptCount: 8, difficulty: 'intermediate', estimatedMinutes: 30, userCount: 6890,
    concepts: [
      { id: 'med-1', name: 'The Inner Citadel', description: "You have power over your mind, not outside events. Realize this, and you will find strength. Your mind is an impregnable fortress if you choose to make it so.", order: 1, dependencies: [] },
      { id: 'med-2', name: 'Memento Mori', description: "Remember you will die. This isn't morbid — it's clarifying. Awareness of death focuses you on what actually matters and removes trivial concerns.", order: 2, dependencies: ['med-1'] },
      { id: 'med-3', name: 'The Obstacle Is the Way', description: "What stands in the way becomes the way. Every impediment to action advances action. Every obstacle contains an opportunity for growth.", order: 3, dependencies: ['med-1'] },
      { id: 'med-4', name: 'Amor Fati', description: "Love your fate. Accept everything that happens, not with resignation, but with gratitude. Not merely bearing what is necessary but loving it.", order: 4, dependencies: ['med-3'] },
      { id: 'med-5', name: 'The View from Above', description: "Zoom out. See your problems from the perspective of the cosmos. Most of what troubles you is temporary and insignificant in the grand scheme.", order: 5, dependencies: ['med-2'] },
      { id: 'med-6', name: 'Control What You Can', description: "The dichotomy of control: some things are in our power, others are not. Focus entirely on what you can control — your actions, judgments, and responses.", order: 6, dependencies: ['med-1'] },
      { id: 'med-7', name: 'Serve the Common Good', description: "We are made for cooperation. Your purpose is to serve others and contribute to the whole. Private virtue has social consequences.", order: 7, dependencies: ['med-4', 'med-6'] },
      { id: 'med-8', name: 'Present Moment Awareness', description: "Never let the future disturb you. You will meet it with the same weapons of reason. The present is all you ever truly possess.", order: 8, dependencies: ['med-5'] },
    ],
  },
  {
    id: 'power-of-habit', slug: 'power-of-habit', title: 'The Power of Habit', author: 'Charles Duhigg',
    category: 'Habits', description: 'Why we do what we do in life and business — the science of habit formation.',
    coverGradient: ['#00ACC1', '#00838F'], conceptCount: 7, difficulty: 'beginner', estimatedMinutes: 25, userCount: 8340,
    concepts: [
      { id: 'poh-1', name: 'The Habit Loop', description: "Every habit follows a neurological loop: Cue → Routine → Reward. Understanding this loop is the key to changing any behavior.", order: 1, dependencies: [] },
      { id: 'poh-2', name: 'The Craving Brain', description: "Habits create neurological cravings. The cue triggers a craving for the reward, which drives the routine. No craving, no habit.", order: 2, dependencies: ['poh-1'] },
      { id: 'poh-3', name: 'The Golden Rule of Habit Change', description: "You can't extinguish a bad habit — you can only change it. Keep the same cue and reward, but insert a new routine.", order: 3, dependencies: ['poh-1', 'poh-2'] },
      { id: 'poh-4', name: 'Keystone Habits', description: "Some habits matter more than others. Exercise, for example, triggers chain reactions that lead to better eating, productivity, and mood.", order: 4, dependencies: ['poh-3'] },
      { id: 'poh-5', name: 'Small Wins', description: "The power of keystone habits comes from small wins — minor advantages that compound. They fuel transformative changes by leveraging tiny advantages.", order: 5, dependencies: ['poh-4'] },
      { id: 'poh-6', name: 'Willpower as a Habit', description: "Willpower is like a muscle — it can be strengthened. But it also fatigues with use. The key is building habits that make willpower unnecessary.", order: 6, dependencies: ['poh-3'] },
      { id: 'poh-7', name: 'Organizational Habits', description: "Companies have habits too — routines and truces that determine how work gets done. Changing organizational habits requires a crisis or deliberate leadership.", order: 7, dependencies: ['poh-4', 'poh-6'] },
    ],
  },
  {
    id: 'influence', slug: 'influence', title: 'Influence', author: 'Robert Cialdini',
    category: 'Persuasion', description: 'The psychology of persuasion — six universal principles that drive human compliance.',
    coverGradient: ['#8E24AA', '#6A1B9A'], conceptCount: 7, difficulty: 'intermediate', estimatedMinutes: 30, userCount: 7120,
    concepts: [
      { id: 'inf-1', name: 'Reciprocity', description: "We feel obligated to return favors. Give first, and people feel compelled to give back — often more than what was initially received.", order: 1, dependencies: [] },
      { id: 'inf-2', name: 'Commitment & Consistency', description: "Once we make a choice or take a stand, we encounter personal and interpersonal pressures to behave consistently with that commitment.", order: 2, dependencies: [] },
      { id: 'inf-3', name: 'Social Proof', description: "We determine what is correct by finding out what other people think is correct. In uncertain situations, we look to others for cues on how to behave.", order: 3, dependencies: [] },
      { id: 'inf-4', name: 'Authority', description: "We have a deep-seated duty to obey authority figures. Titles, clothing, and trappings of expertise automatically trigger compliance.", order: 4, dependencies: [] },
      { id: 'inf-5', name: 'Liking', description: "We say yes to people we like. Physical attractiveness, similarity, compliments, familiarity, and association all increase liking.", order: 5, dependencies: [] },
      { id: 'inf-6', name: 'Scarcity', description: "Opportunities seem more valuable when their availability is limited. Loss language is more persuasive than gain language.", order: 6, dependencies: [] },
      { id: 'inf-7', name: 'Defending Against Influence', description: "Awareness is the first defense. When you feel a compliance trigger activating, pause and ask: am I responding to the merits or to the principle?", order: 7, dependencies: ['inf-1', 'inf-2', 'inf-3', 'inf-4', 'inf-5', 'inf-6'] },
    ],
  },
  {
    id: 'essentialism', slug: 'essentialism', title: 'Essentialism', author: 'Greg McKeown',
    category: 'Productivity', description: 'The disciplined pursuit of less — do fewer things better.',
    coverGradient: ['#EF5350', '#C62828'], conceptCount: 7, difficulty: 'beginner', estimatedMinutes: 20, userCount: 7560,
    concepts: [
      { id: 'ess-1', name: 'Less But Better', description: "The way of the Essentialist: instead of making a millimeter of progress in a million directions, make massive progress in the few things that really matter.", order: 1, dependencies: [] },
      { id: 'ess-2', name: 'The Paradox of Success', description: "Success breeds options. Options breed distraction. Distraction undermines the focus that led to success. The more successful you become, the more disciplined you must be.", order: 2, dependencies: ['ess-1'] },
      { id: 'ess-3', name: 'The 90% Rule', description: "When evaluating an opportunity, if it isn't a clear 90% yes, it's a no. This eliminates the merely good to make room for the truly great.", order: 3, dependencies: ['ess-1'] },
      { id: 'ess-4', name: 'Trade-offs Are Real', description: "Saying yes to one thing means saying no to another. Essentialists don't ask 'How can I do both?' They ask 'Which problem do I want to solve?'", order: 4, dependencies: ['ess-2'] },
      { id: 'ess-5', name: 'The Power of No', description: "A graceful no is better than a resentful yes. Separate the decision from the relationship. Say no to the request, not the person.", order: 5, dependencies: ['ess-3', 'ess-4'] },
      { id: 'ess-6', name: 'Protect the Asset', description: "The asset is YOU. Sleep, exercise, play, and reflection aren't optional — they're the foundation that makes contribution possible.", order: 6, dependencies: ['ess-1'] },
      { id: 'ess-7', name: 'Routine as Freedom', description: "Routine is not the enemy of creativity — it is its enabler. When the essential is automatic, your energy goes to what matters most.", order: 7, dependencies: ['ess-5', 'ess-6'] },
    ],
  },
  {
    id: 'mans-search-for-meaning', slug: 'mans-search-for-meaning', title: "Man's Search for Meaning", author: 'Viktor Frankl',
    category: 'Philosophy', description: 'Finding purpose in suffering — lessons from the Holocaust on the human capacity for meaning.',
    coverGradient: ['#546E7A', '#37474F'], conceptCount: 7, difficulty: 'intermediate', estimatedMinutes: 25, userCount: 8900,
    concepts: [
      { id: 'msm-1', name: 'The Last Human Freedom', description: "Everything can be taken from a person but one thing: the freedom to choose your attitude in any given set of circumstances.", order: 1, dependencies: [] },
      { id: 'msm-2', name: 'Meaning Through Suffering', description: "Suffering ceases to be suffering the moment it finds a meaning. Those who have a why to live can bear with almost any how.", order: 2, dependencies: ['msm-1'] },
      { id: 'msm-3', name: 'Three Sources of Meaning', description: "Meaning comes from: (1) creating a work or doing a deed, (2) experiencing something or encountering someone, (3) the attitude we take toward unavoidable suffering.", order: 3, dependencies: ['msm-2'] },
      { id: 'msm-4', name: 'The Existential Vacuum', description: "Modern life creates a void of meaning. People fill it with the will to pleasure, the will to power, or conformism. None of these satisfy.", order: 4, dependencies: ['msm-1'] },
      { id: 'msm-5', name: 'Logotherapy', description: "The therapy of meaning. Rather than looking backward at causes of neurosis, look forward to the meanings waiting to be fulfilled by the patient.", order: 5, dependencies: ['msm-3'] },
      { id: 'msm-6', name: 'Paradoxical Intention', description: "Fear brings about what one fears. The cure: intend the very thing you fear, with humor. This breaks the anticipatory anxiety cycle.", order: 6, dependencies: ['msm-5'] },
      { id: 'msm-7', name: 'Self-Transcendence', description: "Human existence points beyond itself. True fulfillment comes not from self-actualization directly, but from forgetting yourself in service to a cause or love for another.", order: 7, dependencies: ['msm-3', 'msm-4'] },
    ],
  },
];

export const bookConnections: Record<string, ConceptConnection[]> = {
  'atomic-habits': [
    { from: 'ah-1', to: 'ah-2', label: 'leads to' }, { from: 'ah-2', to: 'ah-3', label: 'framework' },
    { from: 'ah-3', to: 'ah-4', label: 'Law 1' }, { from: 'ah-3', to: 'ah-5', label: 'Law 2' },
    { from: 'ah-3', to: 'ah-6', label: 'Law 3' }, { from: 'ah-3', to: 'ah-7', label: 'Law 4' },
    { from: 'ah-4', to: 'ah-8', label: 'technique' }, { from: 'ah-4', to: 'ah-9', label: 'technique' },
    { from: 'ah-6', to: 'ah-9', label: 'supports' }, { from: 'ah-1', to: 'ah-10', label: 'patience' },
    { from: 'ah-7', to: 'ah-11', label: 'flow state' }, { from: 'ah-2', to: 'ah-12', label: 'resilience' },
  ],
  'deep-work': [
    { from: 'dw-1', to: 'dw-2', label: 'defines' }, { from: 'dw-2', to: 'dw-3', label: 'choose approach' },
    { from: 'dw-2', to: 'dw-4', label: 'explains why' }, { from: 'dw-3', to: 'dw-5', label: 'implement' },
    { from: 'dw-5', to: 'dw-6', label: 'amplify' }, { from: 'dw-4', to: 'dw-7', label: 'solution' },
    { from: 'dw-7', to: 'dw-8', label: 'extreme' }, { from: 'dw-3', to: 'dw-9', label: 'schedule' },
    { from: 'dw-5', to: 'dw-10', label: 'execute' },
  ],
  'think-and-grow-rich': [
    { from: 'tgr-1', to: 'tgr-2', label: 'fuel' }, { from: 'tgr-2', to: 'tgr-3', label: 'tool' },
    { from: 'tgr-1', to: 'tgr-4', label: 'acquire' }, { from: 'tgr-3', to: 'tgr-5', label: 'unlocks' },
    { from: 'tgr-4', to: 'tgr-6', label: 'apply' }, { from: 'tgr-5', to: 'tgr-6', label: 'create' },
    { from: 'tgr-6', to: 'tgr-7', label: 'leverage' }, { from: 'tgr-1', to: 'tgr-8', label: 'sustain' },
  ],
  'the-subtle-art': [
    { from: 'sa-1', to: 'sa-2', label: 'reframe' }, { from: 'sa-1', to: 'sa-3', label: 'accept' },
    { from: 'sa-2', to: 'sa-4', label: 'understand' }, { from: 'sa-3', to: 'sa-5', label: 'own it' },
    { from: 'sa-4', to: 'sa-6', label: 'embrace' }, { from: 'sa-5', to: 'sa-7', label: 'act' },
    { from: 'sa-2', to: 'sa-8', label: 'commit' },
  ],
  'lean-startup': [
    { from: 'ls-1', to: 'ls-2', label: 'loop' }, { from: 'ls-2', to: 'ls-3', label: 'build' },
    { from: 'ls-2', to: 'ls-4', label: 'measure' }, { from: 'ls-4', to: 'ls-5', label: 'decide' },
    { from: 'ls-3', to: 'ls-6', label: 'optimize' }, { from: 'ls-6', to: 'ls-7', label: 'debug' },
    { from: 'ls-6', to: 'ls-8', label: 'ship' },
  ],
  'zero-to-one': [
    { from: 'zto-1', to: 'zto-2', label: 'find' }, { from: 'zto-2', to: 'zto-3', label: 'build' },
    { from: 'zto-3', to: 'zto-4', label: 'sustain' }, { from: 'zto-1', to: 'zto-5', label: 'law' },
    { from: 'zto-2', to: 'zto-6', label: 'discover' }, { from: 'zto-5', to: 'zto-7', label: 'believe' },
  ],
  'influence': [
    { from: 'inf-1', to: 'inf-7', label: 'defend' }, { from: 'inf-2', to: 'inf-7', label: 'defend' },
    { from: 'inf-3', to: 'inf-7', label: 'defend' }, { from: 'inf-4', to: 'inf-7', label: 'defend' },
    { from: 'inf-5', to: 'inf-7', label: 'defend' }, { from: 'inf-6', to: 'inf-7', label: 'defend' },
  ],
};

export function getBookBySlug(slug: string): Book | undefined {
  return books.find(b => b.slug === slug);
}

export function getFeaturedBook(): Book {
  return books[0];
}

export function getBooksByCategory(category: string): Book[] {
  return books.filter(b => b.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(books.map(b => b.category))];
}
