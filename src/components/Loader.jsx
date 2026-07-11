import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const TOTAL_BLOCKS = 12;
const LOADING_TEXTS = ['initializing', 'brewing', 'loading'];

const Loader = ({ isLoading }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [filledBlocks, setFilledBlocks] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fullText, setFullText] = useState('');

  // Select random text on mount
  useEffect(() => {
    const randomText = LOADING_TEXTS[Math.floor(Math.random() * LOADING_TEXTS.length)];
    setFullText(`> ${randomText}`);
    setCurrentTextIndex(LOADING_TEXTS.indexOf(randomText));
  }, []);

  // Text typing effect
  useEffect(() => {
    if (!isLoading || !fullText) return;

    let currentIndex = 0;
    let timeout;

    const typeText = () => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
          // Variable typing speed for more organic feel
          const typingSpeed = currentIndex === 1 ? 200 : Math.random() * 100 + 50;
          timeout = setTimeout(typeText, typingSpeed);
        } else {
          // Pause before deleting
          timeout = setTimeout(() => {
            setIsDeleting(true);
            currentIndex = fullText.length;
            typeText();
          }, 1500);
        }
      } else {
        // Deleting phase
        if (currentIndex >= 0) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex--;
          // Faster deletion speed
          timeout = setTimeout(typeText, 30);
        } else {
          // Pause before retyping with new text
          timeout = setTimeout(() => {
            // Switch to next text
            const nextIndex = (currentTextIndex + 1) % LOADING_TEXTS.length;
            setCurrentTextIndex(nextIndex);
            setFullText(`> ${LOADING_TEXTS[nextIndex]}`);
            setIsDeleting(false);
            currentIndex = 0;
            typeText();
          }, 500);
        }
      }
    };

    typeText();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading, isDeleting, fullText, currentTextIndex]);

  // Brick-by-brick progress bar effect
  useEffect(() => {
    if (!isLoading) return;

    let currentBlock = 0;
    const interval = setInterval(() => {
      currentBlock++;
      if (currentBlock > TOTAL_BLOCKS) {
        currentBlock = 0;
        setFilledBlocks(0); // Reset to 0 before starting again
        setTimeout(() => {
          setFilledBlocks(1); // Start filling again
        }, 100);
        return;
      }
      setFilledBlocks(currentBlock);
    }, 250); // Each brick fills every 250ms (3 seconds total for full bar)

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.98,
            transition: { 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
        >
          <div className="loader-content">
            {/* Terminal-style Typed Text */}
            <div className="terminal-text-container">
              <span className="terminal-text">
                {displayedText}
                <span className={`cursor ${isDeleting ? 'deleting' : ''}`}>|</span>
              </span>
            </div>

            {/* Brick-by-Brick Progress Bar */}
            <div className="segmented-progress-container">
              {Array.from({ length: TOTAL_BLOCKS }).map((_, index) => (
                <div
                  key={index}
                  className={`progress-block ${index < filledBlocks ? 'filled' : ''}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
