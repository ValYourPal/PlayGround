document.addEventListener('DOMContentLoaded', () => {


//defining all the variables that will be used so i dont have to type alot
    const player1Board = document.querySelector('.playerUno')

    const player2Board = document.querySelector('.playerDos')

    const theBay = document.querySelector('.theBay')

    const ships = document.querySelectorAll('.ship')

    const onextwo = document.querySelector('.onextwoSlot')

    const onexthree = document.querySelector('.onexthreeSlot')

    const onexfour = document.querySelector('.onexfourSlot')

    const onexfive = document.querySelector('.onexfiveSlot')

    const initiateclick = document.querySelector('#start')

    const rotateClick = document.querySelector('#rotate')

    const turn = document.querySelector('#turn')

    const message = document.querySelector('#placeholder')

    const player1Matrix = []
    const player2Matrix = []
    let notRotated = true
   

    const dimension = 9

//create the divs for the battleground aka ocean? idk
    function setOcean(matrix, blanks) {
        for (let i = 0; i < dimension * dimension; i++)
        {
            const blank = document.createElement('div')
            blank.dataset.id = i
            matrix.appendChild(blank)
            blanks.push(blank)
            
        }
    }

    setOcean(player1Board, player1Matrix)
    setOcean(player2Board, player2Matrix)



//rotation of ships
    function rotate() {
        if(notRotated)
        {
            onextwo.classList.toggle('onextwoSlot-vert')
            onexthree.classList.toggle('onexthreeSlot-vert')
            onexfour.classList.toggle('onexfourSlot-vert')
            onexfive.classList.toggle('onexfiveSlot-vert')
            notRotated = false
            console.log(notRotated)
            return
        }
        if(!notRotated)
        {
            onextwo.classList.toggle('onextwoSlot-vert')
            onexthree.classList.toggle('onexthreeSlot-vert')
            onexfour.classList.toggle('onexfourSlot-vert')
            onexfive.classList.toggle('onexfiveSlot-vert')
            notRotated = true
            console.log(notRotated)
            return
        }
        
    }

    rotateClick.addEventListener('click', rotate)

 //drag and drops
    ships.forEach(ship => ship.addEventListener('dragstart', moveStart)) 
    
    player1Matrix.forEach(blank => blank.addEventListener('dragstart', moveStart))

    player1Matrix.forEach(blank => blank.addEventListener('dragover', moveOver))

    player1Matrix.forEach(blank => blank.addEventListener('dragenter', moveEnter))

    player1Matrix.forEach(blank => blank.addEventListener('dragleave', moveLeave))

    player1Matrix.forEach(blank => blank.addEventListener('drop', moveDrop))

    player1Matrix.forEach(blank => blank.addEventListener('dropend', moveDropEnd))

    let shipSizeIndex

    let heldShip

    let heldShipLength

    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
        shipSizeIndex = e.target.id
    }))

    function moveStart() {
        heldShip = this;
        heldShipLength = this.childNodes.length;

    }

    function moveOver(z) {
        z.preventDefault()
    }

    function moveEnter(z) {
        z.preventDefault()
    }

    function moveLeave() {
 
        //why did i write this?.. im not using this anywhere....
    }

    function moveDrop() {
        let shipLastNode = heldShip.lastChild.id;
        let shipClass = shipLastNode.slice(0,-2);
        console.log(shipClass);
        let lShipIndex = parseInt(shipLastNode.substr(-1));
        let endOfShipID = lShipIndex + parseInt(this.dataset.id);
        
        
        heldshipIndex = parseInt(shipSizeIndex.substr(-1))

        endOfShipID = endOfShipID - heldshipIndex

        if (notRotated) {
            for (let i = 0; i<heldShipLength; i++)
            {
                player1Matrix[parseInt(this.dataset.id) + i].classList.add('taken', shipClass);
            }
        }


    }

    function moveDropEnd() {
        
    }

})