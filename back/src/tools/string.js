const sanatizeFilename = (filename) => {
  return filename.trim().replaceAll(' ', '_')
}

module.exports = {
  sanatizeFilename
}
