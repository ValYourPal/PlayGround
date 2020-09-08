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
        

        //um.. this is how it stops wraping around.. i dont know any better ideas.. 
        const notWrapHori = [0,9,18,27,36,45,54,63,72,1,10,19,28,37,46,55,64,73,2,11,20,29,38,47,56,65,74];
        let newNotHori = notWrapHori.splice(0,9 * lShipIndex)

        const notWrapVert = [80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45]
        let newNotVert = notWrapVert.splice(0,9*lShipIndex)
        heldshipIndex = parseInt(shipSizeIndex.substr(-1))

        endOfShipID = endOfShipID - heldshipIndex

        //checks so that you cant place onto another ship

        let isTaken = player1Matrix[parseInt(this.dataset.id)].classList.contains('taken')

        if (!isTaken && notRotated && !newNotHori.includes(endOfShipID)) {
            for (let i = 0; i<heldShipLength; i++)
            {
                player1Matrix[parseInt(this.dataset.id) - heldshipIndex + i].classList.add('taken', shipClass);
            }
        } else if (!isTaken && !notRotated && !newNotVert.includes(endOfShipID))
        {
            for (let i = 0; i < heldShipLength; i++)
            {
                player1Matrix[parseInt(this.dataset.id) - heldshipIndex + (dimension * i)].classList.add('taken', shipClass)


            }
        } else return

        theBay.removeChild(heldShip)

    }

    function moveDropEnd() {
        
    }

})