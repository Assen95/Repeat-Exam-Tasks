function solve(input){
    const horses = input.shift().split('|')
    
    const commandParse = {
        'Retake': retakeHorse,
        'Trouble': troubleHorse,
        'Rage': horseRage,
        'Miracle': miracleHorse,
    }

    
    for (const commandLine of input) {
        if(commandLine == 'Finish'){
            break
        }
        const commands = commandLine.split(" ")
        const parsingCommand = commands[0]
        commandParse[parsingCommand](...commands.splice(1))
    }

    console.log(horses.join("->"))
    console.log(`The winner is: ${horses.pop()}`)

    function retakeHorse(overtakingHorse, overtakenHorse){
        const indexOvertaking = horses.indexOf(overtakingHorse)
        const indexOvertaken = horses.indexOf(overtakenHorse)
        if(indexOvertaken > indexOvertaking){
            console.log(`${overtakingHorse} retakes ${overtakenHorse}.`)
            horses.splice(indexOvertaking, 1, overtakenHorse)
            horses.splice(indexOvertaken, 1, overtakingHorse)
        }
    }

    function troubleHorse(horse){
        const horseIndex = horses.indexOf(horse)
        if(horseIndex > 0){
            console.log(`Trouble for ${horse} - drops one position.`)
            horses.splice(horseIndex, 1)
            horses.splice(horseIndex - 1, 0, horse)
        }
    }

    function horseRage(horse){
        const horseIndex = horses.indexOf(horse)
        console.log(`${horse} rages 2 positions ahead.`)
        horses.splice(horseIndex, 1)
        horses.splice(horseIndex + 2, 0, horse)
    }
    
    function miracleHorse(){
        const horse = horses.shift()
        horses.push(horse)
        console.log(`What a miracle - ${horse} becomes first.`)
    }
}

// solve(['Alex|Ben|Steve',
// 'Retake Ben Steve',
// 'Retake Alex Ben',
// 'Trouble Alex',
// 'Trouble Alex',
// 'Rage Alex',
// 'Rage Alex',
// 'Finish'])

solve((['Bella|Alexia|Sugar',
'Retake Alexia Sugar',
'Rage Bella',
'Trouble Bella',
'Finish'])
)

solve((['Onyx|Domino|Sugar|Fiona',
'Trouble Onyx',
'Retake Onyx Sugar',
'Rage Domino',
'Miracle',
'Finish'])
)

solve((['Fancy|Lilly',
'Retake Lilly Fancy',
'Trouble Lilly',
'Trouble Lilly',
'Finish',
'Rage Lilly'])
)