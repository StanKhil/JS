class Marker {
  constructor(color, ink) {
    this.color = color;
    this.ink = ink;
  }

  print(text) {
    let output = "";
    for (let char of text) {
      if (this.ink <= 0) break;
      if (char !== " ") this.ink -= 0.5;
      output += char;
    }
    const span = `<span style="color:${this.color}">${output}</span><br/>`;
    document.getElementById("output1").innerHTML += span;
  }
}

class RefillableMarker extends Marker {
  refill(amount = 100) {
    this.ink = Math.min(100, this.ink + amount);
  }
}

const marker = new RefillableMarker("blue", 10);
marker.print("Це демонстрація кольорового маркера!");
marker.refill();
marker.print(" Після заправки!");
