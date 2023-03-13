# matrix-world

Open protocol MMORPG

A little P2P MMORPG players and mosters connected via /TCP

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
