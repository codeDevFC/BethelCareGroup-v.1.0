export interface BibleStudy {
id: string;
seriesId: string;
seriesTitle: string;
title: string;
targetAudience: string[];
description: string;
scriptureRef: string[];
desireOfAgesRef?: string;
christObjectLessonsRef?: string;
prophetsKingsRef?: string;
patriarchsProphetsRef?: string;
discussionLeader?: string;
order: number;
keyPoints?: string[];
applicationQuestions?: string[];
}
export interface StudySeries {
id: string;
title: string;
description: string;
targetAudience: string[];
totalLessons: number;
color: string;
icon: string;
suggestedDuration: string;
prerequisites?: string[];
}
// ==============================================================================
// STUDY SERIES
// ==============================================================================
export const studySeries: StudySeries[] = [
{
id: "faith",
title: "The Faith Series",
description: "Through Jesus' ministry, He taught His disciples what faith is all about. Discover the blessings for those who apply these principles.",
targetAudience: ["Seekers", "New Believers"],
totalLessons: 6,
color: "from-blue-600 to-indigo-600",
icon: "Heart",
suggestedDuration: "6 weeks"
},
{
id: "newstart",
title: "NEWSTART - Wholistic Living",
description: "Jesus provides ALL the important elements that sustain life. Physical elements point to spiritual truths.",
targetAudience: ["Seekers", "Members", "Health-Minded"],
totalLessons: 8,
color: "from-green-600 to-emerald-600",
icon: "Activity",
suggestedDuration: "8 weeks"
},
{
id: "mary-bethany",
title: "Mary of Bethany",
description: "A broken woman touched by Christ's love, responding with great love, tenacious loyalty, and perfect devotion.",
targetAudience: ["Seekers", "Members"],
totalLessons: 7,
color: "from-rose-600 to-pink-600",
icon: "Heart",
suggestedDuration: "7 weeks"
},
{
id: "miracles",
title: "Miracles of Jesus",
description: "Each miracle carries a deeper spiritual lesson - healing the blind reveals spiritual blindness, the demon-possessed shows slavery to sin.",
targetAudience: ["General", "Seekers", "Believers"],
totalLessons: 9,
color: "from-amber-600 to-orange-600",
icon: "Sparkles",
suggestedDuration: "9 weeks"
},
{
id: "parables-1",
title: "Parables of Jesus - Part 1",
description: "Stories Jesus told to help us understand who He is and what He teaches. Perfect for seekers and believers alike.",
targetAudience: ["Seekers", "New Believers"],
totalLessons: 11,
color: "from-purple-600 to-violet-600",
icon: "BookOpen",
suggestedDuration: "11 weeks"
},
{
id: "parables-2",
title: "Parables of Jesus - Part 2",
description: "Deeper studies for believers and long-term seekers. Advanced parables for spiritual growth.",
targetAudience: ["Believers", "Long-term Seekers"],
totalLessons: 10,
color: "from-indigo-600 to-purple-600",
icon: "Library",
suggestedDuration: "10 weeks",
prerequisites: ["Parables of Jesus - Part 1"]
},
{
id: "last-week",
title: "The Last Week of Jesus",
description: "Powerful study of Jesus' final week on earth. Excellent lead-up to decision-making events like evangelistic series.",
targetAudience: ["Seekers", "Pre-Decision"],
totalLessons: 8,
color: "from-red-600 to-rose-600",
icon: "Church",
suggestedDuration: "8 weeks"
},
{
id: "come-alive",
title: "Come Alive!",
description: "Seven encouraging lessons in dynamic Christian living. What does it mean to be a Christian?",
targetAudience: ["New Seekers", "New Believers"],
totalLessons: 7,
color: "from-teal-600 to-cyan-600",
icon: "Sparkles",
suggestedDuration: "7 weeks"
},
{
id: "daniel",
title: "The Life of Daniel",
description: "Obedience, faithfulness unto death, humility, and submissive prayers. Characters God's end-time people must possess.",
targetAudience: ["Seekers", "Revival", "Prophecy"],
totalLessons: 6,
color: "from-cyan-600 to-blue-600",
icon: "Shield",
suggestedDuration: "6 weeks"
},
{
id: "david",
title: "The Life of David",
description: "A man after God's own heart. Humility, respect for authority, true repentance, and obedience.",
targetAudience: ["Mixed", "Seekers", "Believers"],
totalLessons: 9,
color: "from-amber-600 to-yellow-600",
icon: "Crown",
suggestedDuration: "9 weeks"
},
{
id: "joseph",
title: "The Life of Joseph",
description: "An anti-type of Jesus - the Saviour and deliverer. Faith in all circumstances, humility, diligence, and forgiveness.",
targetAudience: ["Mixed", "Believers"],
totalLessons: 10,
color: "from-emerald-600 to-green-600",
icon: "Star",
suggestedDuration: "10 weeks"
},
{
id: "icebreakers",
title: "Icebreaker Questions",
description: "100+ questions for group fellowship. Categories include spiritual, interpersonal, self-awareness, and young people.",
targetAudience: ["All Groups"],
totalLessons: 1,
color: "from-gray-600 to-slate-600",
icon: "MessageCircle",
suggestedDuration: "Ongoing"
}
];
// ==============================================================================
// FAITH SERIES LESSONS
// ==============================================================================
export const faithSeriesLessons: BibleStudy[] = [
{
id: "faith-1",
seriesId: "faith",
seriesTitle: "The Faith Series",
title: "Definition of Faith - The Faith of the Centurion",
targetAudience: ["Seekers"],
description: "Understanding what faith is through the centurion's example. Jesus commended his great faith.",
scriptureRef: ["Matthew 8:5-13", "Luke 7:1-10"],
desireOfAgesRef: "Chapter 32",
order: 1,
keyPoints: [
"Faith is trusting Jesus even when you can't see",
"The centurion understood authority and applied it to Jesus",
"Great faith recognizes Jesus' power over distance"
],
applicationQuestions: [
"What does faith mean to you personally?",
"How can you exercise greater faith this week?",
"What barriers keep you from trusting Jesus completely?"
]
},
{
id: "faith-2",
seriesId: "faith",
seriesTitle: "The Faith Series",
title: "What Faith is Not - Little Faith (Calming the Storm & Walking on Water)",
targetAudience: ["Seekers"],
description: "Exploring the difference between little faith, great faith, and no faith through Jesus' interactions with His disciples.",
scriptureRef: ["Matthew 8:23-27", "Mark 4:36-41", "Luke 8:22-25", "Matthew 14:23-33", "Mark 6:45-51", "John 6:15-21"],
desireOfAgesRef: "Chapters 35, 40",
order: 2,
keyPoints: [
"Little faith doubts when circumstances are difficult",
"Jesus is always in control even when we can't see Him",
"Faith grows when we keep our eyes on Jesus, not the waves"
],
applicationQuestions: [
"When have you felt like the disciples in the storm?",
"What 'waves' are causing you to doubt right now?",
"How can you keep your eyes on Jesus this week?"
]
},
{
id: "faith-3",
seriesId: "faith",
seriesTitle: "The Faith Series",
title: "Saved by Faith - Healing of the Woman with Bleeding",
targetAudience: ["Seekers"],
description: "The woman's faith in touching Jesus' garment brought healing. Faith that reaches out to Jesus saves.",
scriptureRef: ["Matthew 9:20-22", "Mark 5:25-34", "Luke 8:43-48"],
desireOfAgesRef: "Chapter 36",
order: 3,
keyPoints: [
"Faith takes action despite obstacles",
"Jesus responds to the touch of faith",
"Your faith has made you whole - not just physical healing"
],
applicationQuestions: [
"What keeps you from reaching out to Jesus?",
"How has your faith brought healing in your life?",
"What 'hem' of Jesus' garment do you need to touch today?"
]
},
{
id: "faith-4",
seriesId: "faith",
seriesTitle: "The Faith Series",
title: "Faith Expressed Through Action - Healing of the Paralytic",
targetAudience: ["Seekers"],
description: "Jesus saw THEIR faith - the friends who brought the paralytic. Faith is demonstrated through action.",
scriptureRef: ["Matthew 9:1-2", "Mark 2:1-5", "Luke 5:17-21"],
desireOfAgesRef: "Chapter 27",
order: 4,
keyPoints: [
"Faith is visible through what we do for others",
"Sometimes we need friends to bring us to Jesus",
"Jesus sees and honors the faith of intercessors"
],
applicationQuestions: [
"Who can you 'bring to Jesus' this week?",
"What obstacles are you willing to overcome to help someone meet Jesus?",
"How can you be a better intercessor for others?"
]
},
{
id: "faith-5",
seriesId: "faith",
seriesTitle: "The Faith Series",
title: "Growing Faith - Healing of the Demon-Possessed Boy",
targetAudience: ["Seekers"],
description: "The father's cry - 'Lord, I believe; help my unbelief!' Faith that grows and matures.",
scriptureRef: ["Matthew 17:14-21", "Mark 9:14-27", "Luke 17:5-6"],
desireOfAgesRef: "Chapter 47",
order: 5,
keyPoints: [
"Honest doubt can coexist with genuine faith",
"Faith as small as a mustard seed can move mountains",
"Prayer and fasting strengthen faith"
],
applicationQuestions: [
"Where do you need to say 'help my unbelief'?",
"What mountain needs moving in your life?",
"How can you strengthen your prayer life?"
]
},
{
id: "faith-6",
seriesId: "faith",
seriesTitle: "The Faith Series",
title: "The Faith of Jesus - The Crucifixion",
targetAudience: ["Seekers"],
description: "Jesus' ultimate act of faith - trusting the Father even unto death.",
scriptureRef: ["Matthew 27:32-54"],
desireOfAgesRef: "Chapter 78",
order: 6,
keyPoints: [
"Jesus trusted the Father even when He felt forsaken",
"The cross is the ultimate demonstration of faith and love",
"Jesus' faith secured our salvation"
],
applicationQuestions: [
"What does the cross mean to you personally?",
"How can you follow Jesus' example of trusting the Father?",
"What sacrifice is God asking you to make?"
]
}
];
// ==============================================================================
// NEWSTART SERIES LESSONS
// ==============================================================================
export const newstartLessons: BibleStudy[] = [
{
id: "ns-1",
seriesId: "newstart",
seriesTitle: "NEWSTART - Wholistic Living",
title: "Food / Bread - Jesus, the Bread of Life",
targetAudience: ["Seekers", "Members"],
description: "Physical food sustains the body; Jesus sustains the soul. As we need daily bread, we need daily Jesus.",
scriptureRef: ["John 6:25-41"],
desireOfAgesRef: "Chapter 41 - The Crisis in Galilee",
order: 1,
keyPoints: [
"Jesus is the essential bread for spiritual life",
"Physical hunger reminds us of spiritual need",
"Come to Jesus daily for nourishment"
],
applicationQuestions: [
"How can you 'eat' Jesus' words daily?",
"What healthy food choices can you make this week?",
"How does your physical diet affect your spiritual life?"
]
},
{
id: "ns-2",
seriesId: "newstart",
seriesTitle: "NEWSTART - Wholistic Living",
title: "Exercise - Lord of the Talents",
targetAudience: ["Seekers", "Members"],
description: "Using our physical, mental, and spiritual gifts for God's glory. Exercise keeps our bodies healthy for service.",
scriptureRef: ["Matthew 25:14-29"],
desireOfAgesRef: "Chapter 25 - Talents",
order: 2,
keyPoints: [
"Our bodies are gifts from God to be used for Him",
"Exercise improves physical and mental health",
"Stewardship includes caring for our physical temple"
],
applicationQuestions: [
"How can you incorporate 20 minutes of exercise daily?",
"What talents has God given you to use?",
"How does exercise affect your spiritual energy?"
]
},
{
id: "ns-3",
seriesId: "newstart",
seriesTitle: "NEWSTART - Wholistic Living",
title: "Water - The Living Water",
targetAudience: ["Seekers", "Members"],
description: "Water cleanses and refreshes the body. Jesus offers living water that satisfies the soul forever.",
scriptureRef: ["John 4:1-14"],
desireOfAgesRef: "Chapter 19 - At Jacob's Well",
order: 3,
keyPoints: [
"Physical water sustains life; spiritual water brings eternal life",
"Jesus offers living water that never runs dry",
"Drink deeply of God's Word daily"
],
applicationQuestions: [
"Are you drinking 6-8 glasses of water daily?",
"What is the 'living water' Jesus offers you today?",
"How can you share this living water with others?"
]
},
{
id: "ns-4",
seriesId: "newstart",
seriesTitle: "NEWSTART - Wholistic Living",
title: "Sunlight / Light - The Light of the World",
targetAudience: ["Seekers", "Members"],
description: "Physical sunlight brings health; Jesus as the Light brings spiritual sight and direction.",
scriptureRef: ["John 9:1-5, 35-41", "John 1:1-9"],
desireOfAgesRef: "Chapter 51 - The Light of Life",
order: 4,
keyPoints: [
"Jesus opens blind eyes physically and spiritually",
"Walk in the light as He is in the light",
"Sunlight is God's natural medicine"
],
applicationQuestions: [
"Get 15-20 minutes of morning sunlight daily",
"What spiritual blindness needs healing?",
"How can you reflect Jesus' light this week?"
]
},
{
id: "ns-5",
seriesId: "newstart",
seriesTitle: "NEWSTART - Wholistic Living",
title: "Temperance - The Overcomer",
targetAudience: ["Seekers", "Members"],
description: "Jesus overcame temptation using God's Word. We can overcome through His example and power.",
scriptureRef: ["Matthew 4:1-11"],
desireOfAgesRef: "Chapter 12 - The Temptation",
order: 5,
keyPoints: [
"Temperance is moderation in all good things",
"Jesus used Scripture to overcome temptation",
"We can overcome through God's Word and Spirit"
],
applicationQuestions: [
"What areas of your life need better temperance?",
"How can you use Scripture to fight temptation?",
"What habits are holding you back spiritually?"
]
},
{
id: "ns-6",
seriesId: "newstart",
seriesTitle: "NEWSTART - Wholistic Living",
title: "Air / Breath - The Breath of Life",
targetAudience: ["Seekers", "Members"],
description: "Physical breath sustains life; the Holy Spirit gives spiritual life. Receive His peace.",
scriptureRef: ["John 20:19-23"],
desireOfAgesRef: "Chapter 84 - Peace be unto You",
order: 6,
keyPoints: [
"Deep breathing brings physical health",
"The Holy Spirit brings spiritual life and peace",
"Jesus breathes peace into anxious hearts"
],
applicationQuestions: [
"Take time for deep breathing and fresh air daily",
"Do you need Jesus' peace today?",
"How can you receive the Holy Spirit's power?"
]
},
{
id: "ns-7",
seriesId: "newstart",
seriesTitle: "NEWSTART - Wholistic Living",
title: "Rest - The Restorer",
targetAudience: ["Seekers", "Members"],
description: "Physical rest restores the body. Jesus offers spiritual rest for the weary soul.",
scriptureRef: ["Matthew 11:28-30"],
desireOfAgesRef: "Chapter 34 - The Invitation",
order: 7,
keyPoints: [
"8 hours of sleep restores the body",
"Jesus offers rest for your soul",
"True rest comes from surrendering to Christ"
],
applicationQuestions: [
"Are you getting 8 hours of sleep?",
"What burdens are you carrying that Jesus wants to take?",
"How can you enter into God's rest this week?"
]
},
{
id: "ns-8",
seriesId: "newstart",
seriesTitle: "NEWSTART - Wholistic Living",
title: "Trust - The Way, the Truth, and the Life",
targetAudience: ["Seekers", "Members"],
description: "Trust in God is the foundation of all NEWSTART principles. Jesus is the way to wholeness.",
scriptureRef: ["John 14:5-14"],
desireOfAgesRef: "Chapter 73 - Let not your heart be troubled",
order: 8,
keyPoints: [
"Trust in God brings peace and direction",
"Jesus is the only way to the Father",
"Complete trust leads to complete healing"
],
applicationQuestions: [
"What areas of your life are hard to trust God with?",
"How can you grow in trust this week?",
"What would change if you fully trusted Jesus?"
]
}
];
// ==============================================================================
// MARY OF BETHANY SERIES
// ==============================================================================
export const maryBethanyLessons: BibleStudy[] = [
{
id: "mary-1",
seriesId: "mary-bethany",
seriesTitle: "Mary of Bethany",
title: "Adultery in the Temple - Judgement & True Repentance",
targetAudience: ["Seekers", "Members"],
description: "The woman caught in adultery experiences Jesus' mercy and is called to repentance.",
scriptureRef: ["John 8:2-11"],
order: 1,
keyPoints: [
"Jesus offers grace and a second chance",
"True repentance leads to transformation",
"We are called to extend mercy as we've received it"
],
applicationQuestions: [
"How has Jesus shown you mercy?",
"Who do you need to extend grace to?",
"What does true repentance look like in your life?"
]
},
{
id: "mary-2",
seriesId: "mary-bethany",
seriesTitle: "Mary of Bethany",
title: "Praying for the Dead - The State of the Dead",
targetAudience: ["Seekers", "Members"],
description: "The death of Lazarus teaches about death as sleep and the hope of resurrection.",
scriptureRef: ["John 11:1-43"],
order: 2,
keyPoints: [
"Death is like a sleep until resurrection",
"Jesus has power over death",
"Our hope is in the resurrection, not in the state of the dead"
],
applicationQuestions: [
"How does understanding death as sleep change your perspective?",
"What comfort does Jesus' resurrection bring?",
"How can you share this hope with others?"
]
},
{
id: "mary-3",
seriesId: "mary-bethany",
seriesTitle: "Mary of Bethany",
title: "Martha's Distractions - Morning Devotion & Service for God",
targetAudience: ["Seekers", "Members"],
description: "Martha was distracted by much serving; Mary chose the better part.",
scriptureRef: ["Luke 10:38-42"],
order: 3,
keyPoints: [
"Being busy for God can distract from being with God",
"Daily devotion is essential",
"Choose the better part - sit at Jesus' feet"
],
applicationQuestions: [
"Are you a Martha or a Mary?",
"How can you prioritize time with Jesus daily?",
"What distractions keep you from sitting at His feet?"
]
},
{
id: "mary-4",
seriesId: "mary-bethany",
seriesTitle: "Mary of Bethany",
title: "Simon's Feast - Total Surrender & Total Sacrifice",
targetAudience: ["Seekers", "Members"],
description: "Mary anoints Jesus with expensive perfume - a demonstration of total devotion.",
scriptureRef: ["Matthew 26:6-13", "Mark 14:3-9", "John 12:1-8"],
order: 4,
keyPoints: [
"True devotion is costly",
"What we give to Jesus is never wasted",
"Total surrender leads to total transformation"
],
applicationQuestions: [
"What 'expensive perfume' are you holding back from Jesus?",
"What would total surrender look like for you?",
"How can you show extravagant love to Jesus this week?"
]
},
{
id: "mary-5",
seriesId: "mary-bethany",
seriesTitle: "Mary of Bethany",
title: "At the Cross - The Power of the Cross",
targetAudience: ["Seekers", "Members"],
description: "Mary stood at the cross when others fled. The cross changes everything.",
scriptureRef: ["Matthew 27:35-56", "Mark 15:25-41", "Luke 23:32-49", "John 19:18-37"],
order: 5,
keyPoints: [
"The cross demonstrates God's love",
"Standing with Jesus may cost everything",
"The cross is the power of salvation"
],
applicationQuestions: [
"What does the cross mean to you?",
"Are you willing to stand with Jesus when it's hard?",
"How does the cross change how you live?"
]
},
{
id: "mary-6",
seriesId: "mary-bethany",
seriesTitle: "Mary of Bethany",
title: "At the Tomb - The Sabbath & Plan of Salvation",
targetAudience: ["Seekers", "Members"],
description: "Jesus rested in the tomb on Sabbath - the ultimate rest.",
scriptureRef: ["Matthew 27:57-61", "Mark 15:42-47", "Luke 24:50-56", "John 19:38-42"],
order: 6,
keyPoints: [
"The Sabbath points to rest in Jesus",
"Dead in sin - we need resurrection",
"The plan of salvation unfolds at the cross and empty tomb"
],
applicationQuestions: [
"How does the Sabbath connect to salvation?",
"What does it mean to 'rest' in Jesus?",
"How can you honor the Sabbath this week?"
]
},
{
id: "mary-7",
seriesId: "mary-bethany",
seriesTitle: "Mary of Bethany",
title: "The Resurrection - Witnessing",
targetAudience: ["Seekers", "Members"],
description: "Mary was the first to see the risen Jesus and the first to share the good news.",
scriptureRef: ["Matthew 28:1-7", "Mark 16:1-8", "Luke 24:1-12", "John 20:1-18"],
order: 7,
keyPoints: [
"Jesus is alive!",
"Witnesses are called to share the good news",
"Mary's devotion led to her being the first messenger"
],
applicationQuestions: [
"Who needs to hear about the risen Jesus from you?",
"How has the resurrection changed your life?",
"What holds you back from sharing your faith?"
]
}
];
// Export all lessons grouped by series
export const allLessonsBySeries: Record<string, BibleStudy[]> = {
faith: faithSeriesLessons,
newstart: newstartLessons,
"mary-bethany": maryBethanyLessons
};
