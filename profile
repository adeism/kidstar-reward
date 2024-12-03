function App() {
  const [stars, setStars] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [experience, setExperience] = React.useState(0);
  const [history, setHistory] = React.useState([]);
  const [childName, setChildName] = React.useState('');
  const [avatar, setAvatar] = React.useState(null);
  const [theme, setTheme] = React.useState('default');
  const [showModal, setShowModal] = React.useState(null);
  const [rewards, setRewards] = React.useState([
    { id: 1, name: 'Mainan Baru', cost: 20, icon: '🎮' },
    { id: 2, name: 'Es Krim', cost: 5, icon: '🍦' },
    { id: 3, name: 'Jalan-jalan', cost: 30, icon: '🚗' },
  ]);
  const [achievements, setAchievements] = React.useState([
    { id: 1, name: 'Anak Baik', description: 'Kumpulkan 10 bintang', required: 10, earned: false, icon: '🌟' },
    { id: 2, name: 'Superstar', description: 'Kumpulkan 50 bintang', required: 50, earned: false, icon: '⭐' },
    { id: 3, name: 'Teladan', description: 'Lakukan 5 perilaku baik berturut-turut', required: 5, earned: false, icon: '👑' },
  ]);
  const [stats, setStats] = React.useState({
    weeklyStars: [],
    goodDeeds: 0,
    badDeeds: 0,
  });

  // Level calculation
  React.useEffect(() => {
    const newLevel = Math.floor(stars / 10) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      showLevelUpAnimation();
    }
    setExperience(stars % 10);
    checkAchievements();
  }, [stars]);

  const showLevelUpAnimation = () => {
    // Implementation for level up animation
    console.log("Level Up!");
  };

  const checkAchievements = () => {
    const newAchievements = achievements.map(achievement => {
      if (!achievement.earned) {
        switch (achievement.id) {
          case 1:
            if (stars >= 10) return { ...achievement, earned: true };
            break;
          case 2:
            if (stars >= 50) return { ...achievement, earned: true };
            break;
          case 3:
            if (getConsecutiveGoodDeeds() >= 5) return { ...achievement, earned: true };
            break;
        }
      }
      return achievement;
    });
    setAchievements(newAchievements);
  };

  const getConsecutiveGoodDeeds = () => {
    let count = 0;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].type === 'add') count++;
      else break;
    }
    return count;
  };

  const handleRewardClaim = (reward) => {
    if (stars >= reward.cost) {
      setStars(prev => prev - reward.cost);
