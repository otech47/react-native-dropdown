import React, { Component, } from 'react';
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
    width: 198 //TODO: this needs to be dynamic
  },
  container: (Platform.OS === 'ios') ?
    {
      position: 'absolute',
      borderColor: '#BDBDC1',
      borderWidth: 0,
      borderTopColor: 'transparent',
    }
    :
    {
      marginLeft: (window.width - 194) / 2,
      marginTop: window.height / 2,
      borderColor: '#BDBDC1',
      borderWidth: 0,
      borderTopColor: 'transparent',
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

    let viewHeight = Math.min(items.length, 4) * height;

    let platformStyle = {};
    if (Platform.OS === 'ios') {
      platformStyle = {
        top: positionY,
        left: positionX
      };
    }

    return (
      <View style={[styles.container, platformStyle]}>
        <ScrollView
          style={{ width: width - 2, height: viewHeight }}
          automaticallyAdjustContentInsets={false}
          bounces={false}>
          {renderedItems}
        </ScrollView>
      </View>
    );
  }
}

Items.propTypes = {
  positionX: React.PropTypes.number,
  positionY: React.PropTypes.number,
  show: React.PropTypes.bool,
  onPress: React.PropTypes.func
};

Items.defaultProps = {
  width: 0,
  height: 0,
  positionX: 0,
  positionY: 0,
  show: false,
  onPress: () => {}
};

module.exports = Items;
