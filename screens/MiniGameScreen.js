import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const GAME_TIME = 15;

const items = [
  { label: '📚 Boek', isSchoolItem: true },
  { label: '🎒 Rugzak', isSchoolItem: true },
  { label: '✏️ Potlood', isSchoolItem: true },
  { label: '💻 Laptop', isSchoolItem: true },
  { label: '📐 Lat', isSchoolItem: true },
  { label: '📝 Schrift', isSchoolItem: true },
  { label: '🍕 Pizza', isSchoolItem: false },
  { label: '🎮 Controller', isSchoolItem: false },
  { label: '⚽ Voetbal', isSchoolItem: false },
  { label: '🍦 IJsje', isSchoolItem: false },
  { label: '🎧 Koptelefoon', isSchoolItem: false },
  { label: '🐱 Kat', isSchoolItem: false },
];

function getRandomItem(previousLabel = null) {
  const filteredItems = items.filter((item) => item.label !== previousLabel);
  return filteredItems[Math.floor(Math.random() * filteredItems.length)];
}

export default function MiniGameScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState(getRandomItem());
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let timer;

    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (gameStarted && timeLeft === 0) {
      setGameStarted(false);
      setGameOver(true);
    }

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    const firstItem = getRandomItem();
    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(GAME_TIME);
    setScore(0);
    setFeedback('');
    setCurrentItem(firstItem);
  };

  const goToNextItem = () => {
    setCurrentItem((prevItem) => getRandomItem(prevItem?.label));
  };

  const handleAnswer = (answer) => {
    if (!gameStarted) return;

    const isCorrect = answer === currentItem.isSchoolItem;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback('Juist! 🎉');
    } else {
      setFeedback('Oeps, fout! 😅');
    }

    goToNextItem();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schoolitem of niet?</Text>
      <Text style={styles.subtitle}>
        Duid aan of het item iets met school te maken heeft
      </Text>

      <View style={styles.topRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Score</Text>
          <Text style={styles.infoValue}>{score}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Tijd</Text>
          <Text style={styles.infoValue}>{timeLeft}</Text>
        </View>
      </View>

      <View style={styles.gameCard}>
        <Text style={styles.question}>Is dit een schoolitem?</Text>
        <Text style={styles.itemText}>{currentItem.label}</Text>

        {!!feedback && <Text style={styles.feedback}>{feedback}</Text>}
      </View>

      {!gameStarted && !gameOver && (
        <Pressable style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start game</Text>
        </Pressable>
      )}

      {gameStarted && (
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.answerButton, styles.goodButton]}
            onPress={() => handleAnswer(true)}
          >
            <Text style={styles.answerButtonText}>Goed</Text>
          </Pressable>

          <Pressable
            style={[styles.answerButton, styles.wrongButton]}
            onPress={() => handleAnswer(false)}
          >
            <Text style={styles.answerButtonText}>Fout</Text>
          </Pressable>
        </View>
      )}

      {gameOver && (
        <>
          <Text style={styles.resultText}>
            Tijd voorbij! Je eindscore is {score}.
          </Text>

          <Pressable style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Opnieuw spelen</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f5',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#86bc25',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
  },
  gameCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    minHeight: 240,
    justifyContent: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: 20,
  },
  feedback: {
    fontSize: 18,
    fontWeight: '700',
    color: '#86bc25',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  goodButton: {
    backgroundColor: '#86bc25',
  },
  wrongButton: {
    backgroundColor: '#111111',
  },
  answerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  startButton: {
    backgroundColor: '#111111',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  resultText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 16,
  },
});