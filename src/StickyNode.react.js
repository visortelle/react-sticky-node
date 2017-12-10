import React, { Component, PropTypes } from 'react';

export default
class StickyNode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { restrictorNode } = this.props;
    if (restrictorNode) {
      this.adjustPosition(restrictorNode);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { restrictorNode } = nextProps;
    this.cancelAdjustPosition();
    if (restrictorNode) {
      this.adjustPosition(restrictorNode);
    }
  }

  componentWillUnmount() {
    this.cancelAdjustPosition();
  }

  adjustPosition(restrictorNode) {
    let rect = restrictorNode.getBoundingClientRect() || {};
    if (rect.width !== this.state.rectWidth) {
      this.setState({ rectWidth: rect.width });
    }
    if (rect.height !== this.state.rectHeight) {
      this.setState({ rectHeight: rect.height });
    }
    if (rect.left !== this.state.rectLeft) {
      this.setState({ rectLeft: rect.left });
    }
    if (rect.right !== this.state.rectRight) {
      this.setState({ rectRight: rect.right });
    }
    if (rect.top !== this.state.rectTop) {
      this.setState({ rectTop: rect.top });
    }
    if (rect.bottom !== this.state.rectBottom) {
      this.setState({ rectBottom: rect.bottom });
    }

    let ref = this._ref.getBoundingClientRect() || {};
    if (ref.width !== this.state.refWidth) {
      this.setState({ refWidth: ref.width });
    }
    if (ref.height !== this.state.refHeight) {
      this.setState({ refHeight: ref.height });
    }
    if (ref.left !== this.state.refLeft) {
      this.setState({ refLeft: ref.left });
    }
    if (ref.right !== this.state.refRight) {
      this.setState({ refRight: ref.right });
    }
    if (ref.top !== this.state.refTop) {
      this.setState({ refTop: ref.top });
    }
    if (ref.bottom !== this.state.refBottom) {
      this.setState({ refBottom: ref.bottom });
    }

    this._animationFrame = window.requestAnimationFrame(() => this.adjustPosition(restrictorNode));
  }

  cancelAdjustPosition() {
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }
  }

  render() {
    let {
      className,
      style,
      restrictorNode // eslint-disable-line
    } = this.props;

    let {
      rectWidth,
      rectHeight,
      rectLeft,
      rectRight,
      rectTop,
      rectBottom,

      refWidth,
      refHeight,
      refLeft,
      refRight,
      refTop,
      refBottom
    } = this.state;

    let rightOverflow = refRight - rectRight;
    let leftOverflow = rectLeft - refLeft;
    let topOverflow = rectTop - refTop;
    let bottomOverflow = refBottom - rectBottom;

    let maxWidth = (refWidth >= rectWidth) ? rectWidth + 'px' : 'none';
    let maxHeight = (refHeight >= rectHeight) ? rectHeight + 'px' : 'none';

    let styles = {
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      position: 'absolute'
    };

    let left = 0;
    if (leftOverflow > 0) {
      left = leftOverflow + 'px'
    }
    if (rightOverflow > 0) {
      left = -rightOverflow + 'px';
    }

    let top = 0;
    if (topOverflow > 0) {
      top = topOverflow + 'px';
    }
    if (bottomOverflow > 0) {
      top = -bottomOverflow + 'px';
    }

    return (
      <div
        ref={ ref => (this._ref = ref)}
        className={className}
        style={{ ...styles, ...style }}
      >
        <div style={{
          position: 'relative',
          left: left,
          top: top
        }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

StickyNode.propTypes = {
  className: PropTypes.string,
  restrictorNode: PropTypes.object,
  style: PropTypes.object
};

StickyNode.defaultProps = {
  restrictorNode: document.body,
  style: {}
};
