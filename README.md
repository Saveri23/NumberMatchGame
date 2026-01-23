# Number Match Puzzle – Deterministic React Native Game

## Purpose
This project replaces RNG-based gameplay with deterministic logic to ensure
fair, solvable, and controlled difficulty levels.

## Key Features
- Deterministic board generation
- Sawtooth difficulty curve
- Intelligent Add Row logic
- Rescue mechanic to prevent deadlocks
- Straggler cleanup for board clarity

## Why Deterministic?
Random generation caused impossible or inconsistent levels.
This system guarantees 95% level completion probability.

## Technology
- React Native
- JavaScript
- Logic-first architecture
- Minimal UI

## How to Run
npm install  
npx react-native run-android
