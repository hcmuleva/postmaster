function formatBytes(bytesString) {
  let bytes = parseFloat(bytesString);
  if (isNaN(bytes)) {
    return "Invalid input";
  }

  if (bytes >= 1000) {
    let kb = bytes / 1000;
    if (kb >= 1000) {
      let mb = kb / 1000;
      if (mb >= 1000) {
        let gb = mb / 1000;
        return gb.toFixed(2) + " GB";
      } else {
        return mb.toFixed(2) + " MB";
      }
    } else {
      return kb.toFixed(2) + " KB";
    }
  } else {
    return bytes.toFixed(2) + " bytes";
  }
}

export default formatBytes;
