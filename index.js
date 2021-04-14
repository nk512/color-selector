const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const sliderText = document.getElementById('sliderText')
const slider = document.getElementById('slider')
const alteredColor = document.getElementById('alteredColor')
const alteredColorText = document.getElementById('alteredColorText')
const lightenText = document.getElementById('lightenText')
const darkenText = document.getElementById('darkenText')
const toggleBtn = document.getElementById('toggleBtn')



hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;
    const strippedHex = hex.replace('#', '');
    inputColor.style.backgroundColor = "#" + strippedHex;
    reset()
})

slider.addEventListener("input", () => {
    const hex = hexInput.value
    if(!isValidHex(hex)) {
        return
    }
    sliderText.textContent = `${slider.value}%`
    const value = toggleBtn.classList.contains("toggled") ? -slider.value : slider.value
    const alteredHex = alterColor(hex, value)
    alteredColor.style.backgroundColor = alteredHex
    alteredColorText.innerText = `Altered Color ${alteredHex}`
})

toggleBtn.addEventListener("click", () => {
    if(toggleBtn.classList.contains("toggled")) {
        toggleBtn.classList.remove("toggled")
        lightenText.classList.remove("unselected")
        darkenText.classList.add("unselected")
    }else {
        toggleBtn.classList.add("toggled")
        lightenText.classList.add("unselected")
        darkenText.classList.remove("unselected") 
    }
    reset()
})

const isValidHex = (hex) => {
    if(!hex){
        return false
    }
    const strippedHex = hex.replace("#","")
    const re = /[0-9A-Fa-f]/g
    const lengthCheck = strippedHex.length === 6 || strippedHex.length === 3
    if(re.test(strippedHex) && lengthCheck) {
        return true
    }else {
        return false
    }

}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null
    let strippedHex = hex.replace('#','')
    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0] + strippedHex[1] + strippedHex[1] + strippedHex[2] + strippedHex[2]
    }
    const r = parseInt(strippedHex.substring(0,2),16)
    const g = parseInt(strippedHex.substring(2,4),16)
    const b = parseInt(strippedHex.substring(4,6),16)

    return{r,g,b}
}

const convertRGBToHex = (r,g,b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2)
    const secondPair = ("0" + g.toString(16)).slice(-2)
    const thirdPair = ("0" + b.toString(16)).slice(-2)
    const hex = "#" + firstPair + secondPair + thirdPair
    return hex
}

const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex)
    const amount = Math.floor((percentage/100) * 255)
    const newR = alterWithinRange(r, amount)
    const newG = alterWithinRange(g, amount)
    const newB = alterWithinRange(b, amount)
        return convertRGBToHex(newR,newG,newB)
}

const alterWithinRange = (color , amount) => {
    const newColor = color + amount
    if(newColor > 255) {
        return 255
    }else if(newColor < 0) {
        return 0
    }else{
        return newColor
    }
    // return Math.min(255, Math.max(0,newColor))
}

const reset = () => {
    slider.value = 0
    sliderText.innerText = `0%`
    alteredColor.style.backgroundColor = hexInput.value
    alteredColorText.innerText = `Altered Color ${hexInput.value}`
}