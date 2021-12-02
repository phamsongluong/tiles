import React from "react";

const styles = {
  parent: "grid grid-rows-3 grid-flow-col border-solid border-4 border-white ",
  styleBig: "row-span-3 bg-yellow-200 border-solid border-4 border-white",
  styleMedium:
    "row-span-2 col-span-1 bg-blue-200 border-solid border-4 border-white",
  styleSmall: "col-span-1 bg-pink-200 border-solid border-4 border-white",
  clickedStyleBig: "row-span-3 bg-gray-300 border-solid border-4 border-white",
  clickedStyleMedium:
    "row-span-2 col-span-1 bg-gray-300 border-solid border-4 border-white",
  clickedStyleSmall:
    "col-span-1 bg-gray-300 border-solid border-4 border-white",
};

class Tiles extends React.Component {
  constructor(props) {
    super(props);
    this.onTextPress = this.onTextPress.bind(this);
    this.state = {
      clickedIndex: null,
    };
  }

  onTextPress = (e, i) => {
    this.setState({
      clickedIndex: i,
    });
  };

  renderTable = (start, end) => {
    let res = [];
    for (let i = start; i < end; i++) {
      if (i % 3 === 1) {
        res.push(
          <div>
            <div
              key={i}
              onClick={(e) => this.onTextPress(e, i)}
              class={
                i === this.state.clickedIndex
                  ? styles.clickedStyleBig
                  : styles.styleBig
              }
            >
              Big
            </div>
          </div>
        );
      } else if (i % 3 === 2) {
        res.push(
          <div
            key={i}
            onClick={(e) => this.onTextPress(e, i)}
            class={
              i === this.state.clickedIndex
                ? styles.clickedStyleMedium
                : styles.styleMedium
            }
          >
            Medium
          </div>
        );
      } else {
        res.push(
          <div
            key={i}
            onClick={(e) => this.onTextPress(e, i)}
            class={
              i === this.state.clickedIndex
                ? styles.clickedStyleSmall
                : styles.styleSmall
            }
          >
            Small
          </div>
        );
      }
    }

    return res;
  };

  render() {
    return (
      <div>
        <div class={styles.parent}>{this.renderTable(0, 9)}</div>
        <div class={styles.parent}>{this.renderTable(9, 18)}</div>
      </div>
    );
  }
}

export default Tiles;
