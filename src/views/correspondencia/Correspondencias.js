import React from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
    SafeAreaView,
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from 'react-native-redux-alert';
import Styles from '../../asset/styles/styles';
import { ButtonSubmitRoundedOutlineLayout } from '../layouts/Inputs';
import { Creators as userCreators } from '../../state/duck/user/user';
import * as userSelectors from '../../state/duck/user/selector';
import Loader from '../layouts/loader';
import TabCorrespondencias from './tabs/TabCorrespondencias';

class Correspondencias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            indexView: 1,
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    _navegar(screen) {

    }

    render() {
        const tabs = ['Servicios públicos', 'Aclaraciones', 'Paqueteria'];
        var renderTabs = tabs.map((item, key) => {
            return (
                <TouchableOpacity style={{
                    borderColor: '#107ACC', paddingBottom: 10, width: '33.3%',
                    borderBottomWidth: this.state.indexView == key + 1 ? 5 : 0
                }} key={key} onPress={() => this.setState({ indexView: key + 1 })}>
                    <Text style={[Styles.fontBold, {
                        color: '#4D4D4D', textAlign: 'center', fontSize: 12
                    }]}>{item}</Text>
                </TouchableOpacity>
            );
        });

        var renderView = null;
        switch (this.state.indexView) {
            case 1:
                renderView = <View>
                    <TabCorrespondencias></TabCorrespondencias>
                </View>;
                break;

            case 2:
                renderView = <View></View>;
                break;

            case 3:
                renderView = <View></View>;
                break;
        }

        if (this.props.isAuthenticated) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={[Styles.container, Styles.fondoWhiteColor]}>
                        <Loader color="#fff" animating={this.state.isLoading}></Loader>

                        <View style={Styles.content}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                                <Image source={require('../../asset/images/icon_correspondencia.png')} style={{
                                    width: 25, height: 25, marginRight: 10
                                }}></Image>

                                <Text style={[Styles.fontBold, { color: '#343a40', fontSize: 16 }]}>Correspondencias</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            borderTopLeftRadius: 10, borderTopRightRadius: 10,
                            paddingTop: 14, paddingBottom: 3,
                        }}>
                            {renderTabs}
                        </View>

                        <View style={Styles.content}>
                            <View style={{ marginTop: 10 }}>
                                {renderView}
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
        else {
            return <View></View>
        }
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    return {
        isAuthenticated: userSelectors.getIsAuthenticatedSelector(state),
        status: userSelectors.getStatusSelector(state),
        message: userSelectors.getMessageSelector(state),
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(userCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Correspondencias);