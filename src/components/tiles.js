import React from "react";
import { connect } from "react-redux";
import { getLocation } from "../actions/location";

const styles = {
  parent: "grid grid-rows-3 grid-flow-col border-solid border-2 border-white ",
  styleBig:
    "row-span-1 col-span-1 bg-yellow-200 border-solid border-2 border-white",
  styleMedium:
    "row-span-3 col-span-1 bg-blue-200 border-solid border-2 border-white",
  styleSmall: "row-span-2 bg-pink-200 border-solid border-2 border-white",
  clickedStyleBig: "row-span-1 bg-gray-300 border-solid border-2 border-white",
  clickedStyleMedium:
    "row-span-3 col-span-1 bg-gray-300 border-solid border-2 border-white",
  clickedStyleSmall:
    "row-span-2 bg-gray-300 border-solid border-2 border-white",
};

class Tiles extends React.Component {
  constructor(props) {
    super(props);
    this.onTextPress = this.onTextPress.bind(this);
    this.state = {
      clickedIndex: null,
    };
  }

  onTextPress = (e, id) => {
    this.setState(
      {
        clickedIndex: id,
      },
      //We can fetch data from API to get information about the location clicked then update to redux
      () => this.props.getLocation(id)
    );
  };

  renderTable = (start, end) => {
    let res = [];
    for (let i = start; i < end; i++) {
      if (i % 3 === 2) {
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
              Small
            </div>
          </div>
        );
      } else if (i % 3 === 1) {
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
            Big
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
            Medium
          </div>
        );
      }
    }

    return res;
  };

  render() {
    const { info } = this.props;
    return (
      <div class="grid grid-cols-3">
        <div class="col-span-2">
          <div key={"a"} class={styles.parent}>
            {this.renderTable(0, 10)}
          </div>
          <div key={"b"} class={styles.parent}>
            {this.renderTable(10, 20)}
          </div>
        </div>
        <div class="bg-origin-border p-4 border-4 border-dashed ">
          <p class="font-sans text-red-500">Clicked Tile Info</p>
          <p class="font-sans text-red-500">
            Id:{" "}
            {this.state.clickedIndex !== null ? this.state.clickedIndex : "-"}
          </p>
          <p>Title: {info.title ? info.title : "-"}</p>
          <p>Description: {info.body ? info.body : "-"}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLocation: (id) => {
      dispatch(getLocation(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);
