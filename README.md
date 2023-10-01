# GuessIt 

## Description
With this Simple Discord.js V14 Bot, you can create games where you have to guess a number between your specified range.

## Features
- **Multiple Rounds**: Create and multiple rounds on a server.
- **Hints**: The bot provides various types of hints to assist players in guessing the correct number.
    - **Higher-Lower**: Indicates whether the number to be guessed is higher or lower than the player's previous guess.
    - **Parity**: Determines whether the given number is even or odd.
    - **Digit in Number**: Indicates whether a specific digit is present in the given number.
    - **Digit Sum**: Provides the digit sum of the number.
    - **Prime Number**: Displays whether the number is prime or not.

## Prerequisites
- Node.js v18.17.1 or newer is recommended. Older versions might work. You can download it [here](https://nodejs.org/en/download/).
- Typescript v5.2.2 or newer is recommended. Older versions might work. You can download it [here](https://www.typescriptlang.org/download).

## Installation
1. Clone the repository
2. Install the requirements with `npm install`
3. Fill out the `config.ts.TEMPLATE` located in the `src/data` folder.
4. Rename the `config.ts.TEMPLATE` to `config.ts`
5. Build the bot with the following command: `npm run build`
6. Run the bot with the following command: `npm start` or `node .`
7. Enjoy!

## Command Handler
This bot uses this [Command Handler](https://github.com/MastiDev/Discord.js-Advanced-Command-Handler), and you can find all the information on how it works in this repository.

## Contributing
Just make a pull request and I will review it.

## License
This project is licensed under the MIT License