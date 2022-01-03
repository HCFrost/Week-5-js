class Character{
    constructor(name, charClass){
        this.name = name;
        this.charClass = charClass;
    }
    description(){
        return `${this.name} : ${this.charClass}`
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.characters = [];
    }
    
    createCharacter(character){
        if (character instanceof Character){
            this.characters.push(character);
        }   else {
            throw new Error(`Not a valid character:${character}`);
            }
        }
    
        description(){
        return `${this.name} has ${this.characters.length} characters.`
    }
}   
class Menu{
    constructor(){
        this.players = [];
        this.selectedPlayer = null;
    }
    start(){
        let selection = this.showMainMenuOptions();
        while (selection != 0){
            switch (selection){
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.viewPlayer();
                    break;
                case '3':
                    this.deletePlayer();
                    break;
                case '4':
                    this.displayPlayers();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions()
        }
        alert('Goodbye!')
    }
    
    showMainMenuOptions(){
        return prompt(`
            0) Exit
            1) Create Player
            2) View Player
            3) Delete Player
            4) View All Players
        `);
    }

    showPlayerMenuOptions(playerInfo){
        return prompt(`
        0) Back
        1) Create Character
        2) Delete Character
        --------------------
        ${playerInfo}
        `)
    }

    displayPlayers(){
        let playerString = '';
        for (let i = 0; i < this.players.length; i++){
            playerString += i + ') ' + this.players[i].name + '\n'
        }
        alert(playerString);
    }

    createPlayer(){
        let name = prompt('Enter user name: ');
        this.players.push(new Player(name));
    }

    deletePlayer(){
        let index = prompt('Delete player: ');
        if (index > -1 && index < this.players.length){
            this.players.splice(index, 1);
        }
    }
    viewPlayer (){
        
        let index = prompt('Select player:');
        if (index > -1 && index < this.players.length){
            this.selectedPlayer = this.players[index];
            let description = 'Player: ' + this.selectedPlayer.name + '\n';

        for(let i = 0; i < this.selectedPlayer.characters.length; i++){
            description += i + ') ' + this.selectedPlayer.characters[i].name 
                + ' : ' + this.selectedPlayer.characters[i].charClass + '\n';
        }

        let selection = this.showPlayerMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createCharacter(); 
                    break;
                case '2':
                    this.deleteCharacter(); 
             }
        }
    }

    createCharacter(){
        let name = prompt('New character: ');
        let charClass = prompt('Character class: ');
        this.selectedPlayer.characters.push(new Character(name, charClass));
    }

    deleteCharacter(){
        let index = prompt('Delete character: ');
        if (index > -1 && index < this.selectedPlayer.characters.length){
            this.selectedPlayer.characters.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();