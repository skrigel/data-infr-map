import React, { Component } from "react";

class SideBar extends Component {
  render() {
    let sidebarClass = this.props.isOpen ? "sidebar open" : "sidebar";
    return (
      <div className={sidebarClass}>
        <div>I slide into view</div>
        <div>Me too!</div>
        <div>Meee Threeeee!</div>
        <button onClick={this.props.toggleSidebar} className="sidebar-toggle">
          Click me!
        </button>
      </div>
    );
  }
}

export default SideBar;
