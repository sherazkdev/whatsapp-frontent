import React from "react";

const RandomColorGenrater = (content) => {
    const PALETTE = [
        "#1abc9c","#16a085","#2ecc71","#27ae60","#3498db",
        "#2980b9","#9b59b6","#8e44ad","#e67e22","#d35400",
        "#e74c3c","#c0392b","#f1c40f","#f39c12","#7f8c8d",
        "#95a5a6","#34495e","#2c3e50","#ff6b6b","#ffd166"
    ];
      
    function stringToColorIndex(str, paletteLength = PALETTE.length) {
        if (!str) return 0;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
        }
        return hash % paletteLength;
    }

    return PALETTE[stringToColorIndex(content)];
}

export default RandomColorGenrater;