
const isHex = str => {
    return /^#[A-F0-9]{6}$/i.test(str)
}

module.exports = isHex;