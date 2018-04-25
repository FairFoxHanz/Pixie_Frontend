import { Component } from "react";

class HoverableComponent extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      isHovering: false,
      isOpen: false
    };
  }

  handleMouseEnter() {
    this.setState({ isHovering: true });
  }

  handleMouseLeave() {
    this.setState({ isHovering: false });
  }

  toggleModal = () => {
    this.setState({
      isHovering: false,
      isOpen: !this.state.isOpen
    });
  };
}

export default HoverableComponent;
