import React, { Component, createRef } from 'react';
import './VisibilityFilter.css';

const Button = ({
  children,
  val,
  active,
  passRef,
  changeActive,
  getVisibility,
}) => (
  <button
    onClick={e => {
      changeActive(e);
      getVisibility(e);
    }}
    ref={passRef}
    className={`${active || ''} btn btn-secondary`}
    value={val}
  >
    {children}
  </button>
);

export default class VisibilityFilter extends Component {
  constructor() {
    super();
    this.active = createRef();
    this.state = {
      active: null,
    };
  }

  componentDidMount() {
    const active = this.active.current;
    this.setState({ active });
  }

  changeActive = e => {
    const prevActive = this.state.active;
    const active = e.target;
    if (prevActive !== active) {
      prevActive.classList.remove('active');
      active.classList.add('active');
      this.setState({ active });
    }
  };

  render() {
    const { getVisibility } = this.props;
    return (
      <div className="VisibilityFilter-buttons btn-group">
        <Button
          changeActive={this.changeActive}
          getVisibility={getVisibility}
          passRef={this.active}
          active="active"
          val="All"
        >
          All
        </Button>
        <Button
          changeActive={this.changeActive}
          getVisibility={getVisibility}
          val="Completed"
        >
          Completed
        </Button>
        <Button
          changeActive={this.changeActive}
          getVisibility={getVisibility}
          val="Incompleted"
        >
          Incompleted
        </Button>
      </div>
    );
  }
}
