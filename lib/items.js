import React, { Component } from 'react';
import PropTypes from 'prop-types'
const ReactNative = require('react-native');

const {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Platform
} = ReactNative;

const window = Dimensions.get('window');


const styles = StyleSheet.create({
  scrollView: {
    height: 120,
    width: 198, //TODO: this needs to be dynamic
  },
  container: {
    borderColor: '#BDBDC1',
    borderWidth: 0,
    borderTopColor: 'transparent',
    position: 'absolute'
  }
})

class Items extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, positionX, positionY, show, onPress, width, height } = this.props;

    if (!show) {
      return null;
    }

    const renderedItems = React.Children.map(items, (item) => {

      return (
        <TouchableWithoutFeedback onPress={() => onPress(item.props.children, item.props.value) }>
          <View>
            {item}
          </View>
        </TouchableWithoutFeedback>
      );
    });

    let viewHeight = Math.min(items.length, 4) * height * 1.10;

    let platformContainerStyle = {
      top: positionY,
      left: positionX
    };
    let platformScrollViewStyle = {
      width: width - 2,
      height: viewHeight
    };

    if (Platform.OS === 'android') {
      platformContainerStyle = {
        top: viewHeight * -0.75,
        left: window.width / 4
      };
      platformScrollViewStyle = {
        width: window.width / 2,
        height: viewHeight
      }
    }

    return (
      <View style={[styles.container, platformContainerStyle]} collapsable={false}>
        <ScrollView
          style={platformScrollViewStyle}
          automaticallyAdjustContentInsets={false}
          bounces={false}>
          {renderedItems}
        </ScrollView>
      </View>
    );
  }
}

Items.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  show: PropTypes.bool,
  onPress: PropTypes.func
};

Items.defaultProps = {
  width: 200,
  height: 120,
  positionX: 0,
  positionY: 0,
  show: false,
  onPress: () => {}
};

module.exports = Items;
