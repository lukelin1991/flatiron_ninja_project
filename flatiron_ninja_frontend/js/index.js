// DOM Selectors/grabbers
const url = "http://localhost:3000/ninjas"
const container = document.querySelector("#container")
const score = document.querySelector("#score")
const world = document.querySelector("#world")
const flatironNinja = document.querySelector("#flatironNinja")
const newNinjaForm = document.querySelector("#new-ninja-form") // start of the game, for name input
const finishedStory = document.querySelector("#finishing-ninja-story") // end of the game, for deleting and opening newNinjaForm.
const modal = document.querySelector("#modal")
const modal2 = document.querySelector("#modal2")
// Functions out the WahZoo!

//render ninja and files upon get request.
const renderData = (data) => {
    // ----------------------------------------- WORLD LAYOUT -------------------------------------------//
    let worldLayout = [ // 33x19 grid
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,10,0,0,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,0,1,0,1,0,1,8,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,1,0,1,0,1,0,1,1,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1],
        [1,1,0,1,1,1,1,1,1,1,0,1,0,0,0,1,0,5,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1],
        [1,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1],
        [12,0,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1,0,1,0,1], // start line?
        [1,0,0,1,0,1,0,0,0,1,7,1,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
        [1,1,0,1,0,1,9,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,0,0,1,0,1,0,1,0,1,0,1],
        [1,0,0,1,0,1,1,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,1,4,1,0,1,0,1,0,1,0,1],
        [1,0,1,1,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,3,0,1],
        [1,0,0,1,1,1,1,1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,0,1,1,1,1,1],
        [1,1,0,1,0,0,0,1,1,1,0,1,1,0,0,1,0,1,0,1,1,1,1,1,0,0,1,0,0,0,1,11,13], // finish line?
        [1,0,0,1,0,1,0,0,0,1,0,0,1,1,0,1,0,1,0,1,0,0,0,1,1,1,1,1,1,0,1,0,1],
        [1,0,1,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1,0,0,0,1,6,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,0,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,1,1,0,0,0,0,2,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]

    // dictionary for finding object. etc. (utilize w/ fetch)
    const worldDict = { // dictionary of classes utilized within the drawWorld function. 
        0: 'blank',
        1: 'wall',
        2: 'html',
        3: 'css',
        4: 'js',
        5: 'sql',
        6: 'mp4',
        7: 'rb',
        8: 'docx',
        9: 'svg',
        10: 'gif',
        11: 'git', // render this by giving an img src to this class.
        12: 'start', // not useful.
        13: 'finish'
    }

    let ninjaFolder = data.folder
    // displaying the world
    const drawWorld = () => {
        let output = ""

        for (let row = 0; row < worldLayout.length; row++){// iterates through the ROW (horizontal)
            output += "<div class='row'>"
            for (let x = 0; x < worldLayout[row].length; x++){ // iterates through each array of x, creates elements within each row.
                output += "<div class='" + worldDict[worldLayout[row][x]] + "'></div>" // <div class='finish'></div> example.
            }
            output += "</div>"
        }

        world.innerHTML = output // displaying the grid onto the id: world

        score.innerHTML = `<h3>${data.name}, Your folder: ${ninjaFolder}0%</h3>`

        // -----------------------------------FILES MANIPULATION -----------------------------------------//
        let imgArray = [] // lets me not have to worry about getting by ID.
        // always gets last element of the data list (when creating new ninja)
        let dataFiles = data.project_files // instead of getting data[0], im getting the LAST ninja.
        // connect fetched data to worldDict based on the class name.
        const html_file = document.querySelector(".html") // these are all DIVS that are made w/ said class name.
        const css_file = document.querySelector(".css")
        const js_file = document.querySelector(".js")
        const sql_file = document.querySelector(".sql")
        const mp4_file = document.querySelector(".mp4")
        const docx_file = document.querySelector(".docx")
        const rb_file = document.querySelector(".rb")
        const svg_file = document.querySelector(".svg")
        const gif_file = document.querySelector(".gif")
        const git_file = document.querySelector(".git")

        // goes through each element. 
        dataFiles.forEach(element => {
            imgArray.push(element.image_url)
        })
        
        // connecting the images from API to the class number keys. based on new array from input.
        if(html_file){
            html_file.style.backgroundImage = `url(./img/${imgArray[0]})`
        }
        if(css_file){
            css_file.style.backgroundImage = `url(./img/${imgArray[1]})`
        }
        if(js_file){
            js_file.style.backgroundImage = `url(./img/${imgArray[2]})`
        }
        if(git_file){
            git_file.style.backgroundImage = `url(./img/${imgArray[3]})`
        }
        if(gif_file){
            gif_file.style.backgroundImage = `url(./img/${imgArray[4]})`
        }
        if(docx_file){
            docx_file.style.backgroundImage = `url(./img/${imgArray[5]})`
        }
        if(sql_file){
            sql_file.style.backgroundImage = `url(./img/${imgArray[6]})`
        }
        if(rb_file){
            rb_file.style.backgroundImage = `url(./img/${imgArray[7]})`
        }
        if(svg_file){
            svg_file.style.backgroundImage = `url(./img/${imgArray[8]})`
        }
        if(mp4_file){
            mp4_file.style.backgroundImage = `url(./img/${imgArray[9]})`
        }
    }
    drawWorld()
    

    // ----------------------------NINJA MOVEMENT/CREATION/IMAGE CHANGING ---------------------------------//
    //create ninja onto the grid.
    let ninjaman = { // ninja starting point.
        x: 0, // starting element IN GRID
        y: 7 // starting IN GRID
        // EACH BOX GRID IS 30x30px.
    }

    // place flatironNinja onto the starting point.
    let step = 1 // changes image of ninja. because FETCH TAKES TOO LONG FOR MOVEMENTS.
    let direction = "right" // changes direction of moving ninja.

    let drawNinja = () => { // draws image
        if (step == 1){
            step = 2;
        } else {
            step = 1;
        }

        flatironNinja.style.backgroundImage = "url('img/" + direction + step + ".png')";
        flatironNinja.style.top = ninjaman.y * 30.0 + "px"
        flatironNinja.style.left = ninjaman.x * 30.0 + "px"
    }
    drawNinja() // initially draws out the ninja.

    // ninja movement - UPDATES image as well. 
    // --------------------------MOVEMENT ------------------
    document.onkeydown = (e) => { //left
        if(e.keyCode == 37){
            if(worldLayout[ninjaman.y][ninjaman.x-1] != 1){
                if (ninjaman.x > 0){
                    ninjaman.x -= 1;
                    direction = "left";
                }
            }

        }
        if (e.keyCode == 39){ //right 
            if(worldLayout[ninjaman.y][ninjaman.x+1] != 1){
                if(ninjaman.x < 32){
                    ninjaman.x += 1;
                    direction = "right";
                }
            }
        }
        if (e.keyCode == 38){ // up
            if(worldLayout[ninjaman.y-1][ninjaman.x] != 1){
                if (worldLayout[ninjaman.y-1][ninjaman.x] == 11 && ninjaFolder < 9){ //if the upcoming grid is going to be the "git" & you didnt get ALL the other files yet..
                    alert("You should probably get ALL the files before you git commit your project"); // makes it to where you CANT get Git.
                }
                else {
                    ninjaman.y -= 1;
                    direction = "up";
                }
            }
        }
        if (e.keyCode == 40){ // down
            if(worldLayout[ninjaman.y+1][ninjaman.x] != 1){
                ninjaman.y += 1;
                direction = "down";
            }
        }
        let coordinate = worldLayout[ninjaman.y][ninjaman.x]
        if(coordinate > 1 && coordinate < 12){ // if greater than block #1 to #11, if it interacts with it.. 
            // need to PATCH the folder to +1 and redisplay the world.
            worldLayout[ninjaman.y][ninjaman.x] = 0
            ninjaFolder += 1
            drawWorld()
        }

        if (coordinate == 13 && ninjaFolder > 9){
            modal2.style.display = "block"
            // after this.. when i click 'play again'.. 
            //should FETCH DELETE by the ninja.ID && modal.style.display = "block" && modal2.style.display = "none"
        }
        drawNinja()
    }




        // TESTING MOVEMENTS ----------------------------
        // if(e.keyCode == 37){
        //     ninjaman.x -= 1;
        //     direction = "left";
        // }
        // if (e.keyCode == 39){ //right 
        //     ninjaman.x += 1;
        //     direction = "right";
        // }
        // if (e.keyCode == 38){ // up
        //     if (worldLayout[ninjaman.y-1][ninjaman.x] == 11 && ninjaFolder < 9){ //if the upcoming grid is going to be the "git" & you didnt get ALL the other files yet..
        //         alert("You should probably get ALL the files before you git commit your project"); // makes it to where you CANT get Git.
        //     }
        //     else {
        //         ninjaman.y -= 1;
        //         direction = "up";
        //     }
        // }
        // if (e.keyCode == 40){ // down
        //     ninjaman.y += 1;
        //     direction = "down";
        // }

    //finished eventListener form.
    finishedStory.addEventListener("submit", e => {
        e.preventDefault()
        fetch(url + `/${data.id}`, {method: "DELETE"})
        .then(() => {
            modal2.style.display = "none"
            location.reload(); // refresh's the page. so the problem I was facing goes away... modal form was messing up, and going back to previous modal2 form.
        })
    })
}

//addEventListener to Form.
newNinjaForm.addEventListener("submit", event => {
    event.preventDefault()

    const nameValue = newNinjaForm.name.value

    // fetch NewNinja
    const newNinjaObj = {
    name: nameValue
    }
    const fetchNewPostNinja = () => {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newNinjaObj)
        })
        .then(r => r.json())
        .then(json => {
            renderData(json)
        })
    }
    fetchNewPostNinja()
    newNinjaForm.reset()
    modal.style.display = "none"
})
