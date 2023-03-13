# matrix-world

Open MMORPG protocol via TCP/IP

The open protocol is intended to make the game more complete by allowing mobs to be added with more attacks and more complex patterns, increasing gameplay.

Players and mobs will use the protocol to connect to the game and will only have access to the information provided by the server to make their decisions, thus allowing a fairer game.

Both players and mobs will be equal before the server allowing them to evolve as they defeat an enemy by accumulating EXP (experience)

The game will also feature accumulation of proficiency, in short, the more the player uses a skill, the more that skill will evolve.

Because it is an open protocol it also gives room for bots and players to use AI and other resources without overloading the main server, allowing more complex attacks and patterns to be added.

### Client comands

Messages client sends to server for control your character

- **LOGIN**: Connect to your character or create a new

  - name: string;
  - race: string; (optional)

  ```
  LOGIN name race
  ```

- **MOVE** (deprecated)

  - x: number
  - y: number
  - z: number

  ```
  MOVE x y z
  ```

- **RUN**/WALK: Walk or run based on force you use

  - force: number;
  - direction: Quartenion;

  ```
  RUN force direction
  ```

- **JUMP**

  - force: number;
  - direction: Quartenion; (optional)

  ```
  JUMP force direction
  ```

- **ATTACK**: Use a simple attack

  - skill: string; (optional)
  - force: number;
  - direction: Quartenion;

  ```
  ATTACK force direction
  ATTACK skill? force direction
  ```

- **DEFEND**: Guard up

  - force: number; (optional)
  - direction: Quartenion; (optional)

  ```
  GUARD force? direction?
  ```

- **ROTATE**/CHANGE DIRECTION: Change your char aiming

  - force: number; (optional)
  - direction: Quartenion; (optional)

  ```
  ROTATE direction
  ```

- **COLLECT ITEM** Collect an item on the ground

  - direction: Quartenion;

  ```
  COLLECT ITEM direction
  ```

- **USE ITEM**: Use an item from your inventory

  - code: string;

  ```
  USE ITEM code
  ```

- **USE SKILL**: Use a skill from your char

  - name: string;
  - direction: Quartenion; (optional)

  ```
  USE SKILL name direction?
  ```

### Server messages

Messages server sends for clients

- **EXP**: Experience acquired

  - value: number

  ```
  EXP +100
  ```

- **DAMAGE**: HP decresed

  - value: number

  ```
  DAMAGE +100
  ```

- **HEAL**: HP incresed

  - value: number

  ```
  HEAL +100
  ```

- **BUFF**/DEBUFF: Player stats buffs

  - stat: string (ex: SPEED, HP, MP)
  - value: number
  - duration: string (ex: 5s, 250ms)

  ```
  BUFF SPEED +250 5s
  ```

- **DEAD**: Player is dead

  ```
  DEAD
  ```
