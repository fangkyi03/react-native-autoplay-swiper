/* @flow */

/*
 @title 轮播图组件
 @name  fangkyi02
 @time  17.6.17
 @chang 17.6.17
 */

import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';

// 获取宽高
const {width} = Dimensions.get('window')
import {IMG_URL} from '../../Common/NetAPI'

export default class Swiper extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            scrollPos: 0
        }
    }

    componentWillUnmount() {
        console.log('轮播图被销毁');
    }

    _onScroll = (e) => {
        let contentSize = e.nativeEvent.contentSize.width
        let contentOffset = e.nativeEvent.contentOffset.x
        let num = contentSize / e.nativeEvent.layoutMeasurement.width

        let pos = Math.round(contentOffset / contentSize * num)
        this.setState({scrollPos: pos})
    }

    render() {
        const count = React.Children.count(this.props.children)
        return (
            <View >
                <ScrollView
                    onLayout={(e) => typeof this.props.onLayout !== 'undefined' && this.props.onLayout(e)}
                    onScroll={this._onScroll}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    removeClippedSubviews={true}>
                    {this.props.children}
                </ScrollView>
                {/* 下面的小圆点*/}
                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 30,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {new Array(count).fill('').map((el, i) => {
                        return (
                            <View key={i} style={{
                                marginRight: 10,
                                borderRadius: 10,
                                width: 10,
                                height: 10,
                                backgroundColor: this.state.scrollPos === i ? '#E43F47' : 'gray'
                            }}>
                            </View>
                        )
                    })}
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({});
