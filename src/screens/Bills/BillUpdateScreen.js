import React, {Component} from 'react';
import axios from 'axios';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  // Picker,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import styles from './Styles/BillUpdateScrenStyles';
import {AuthContainer} from '../../components/AuthContainer';
import {FilledButton} from '../../components/FilledButton';
import {BASE_URL} from '../../config';
import SecureStorage from 'react-native-secure-storage';
import {UserContext} from '../../contexts/UserContext';
export const Label = props => (
  <Text style={styles.labelText}>{props.value}</Text>
);
export const InputBox = props => (
  <TextInput
    style={{
      // ...styles.input(props.multiline),
      ...(props.style ? props.style : {}),
    }}
    // placeholderTextColor="grey"
    {...props}
  />
);

class UpdateBillScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {user: ''};
  updateUser = user => {
    this.setState({user: user});
  };

  static contextType = UserContext;
  componentDidMount() {
    const initState = this.props.getState();
    console.log('componentDidMount', initState, this.props.navigation);
    const state = {
      floor_plan: initState.floor_plan || '',
      middle_name: initState.middle_name || '',
      last_name: initState.last_name || '',
      email: initState.email || '',
      phone_number: initState.phone_number || '',
      errors: {},
    };
    this.setState(state);
  }

  validate = () => {
    const {next, saveState} = this.props;
    const {state} = this;
    const {floor_plan} = state;
    let errors = {};
    if (!floor_plan) {
      errors.floor_plan = 'Please enter First Name';
    }
    // if (!last_name) {
    //   errors.last_name = 'Please enter Last Name';
    // }
    // if (!phone_number) {
    //   errors.phone_number = 'Please enter Phone Number';
    // }

    console.log('validate', state, errors);
    if (Object.keys(errors).length) {
      this.setState({errors});
      return;
    }
    //saveState(this.state);
    //next();
    this.submit();
  };

  submit = () => {
    const state = this.props.getState() || {};
    const {token} = this.context;

    // return;
    this.setState({loading: true});
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        const isEdit = this.state.isEdit;

        const formData = new FormData();

        formData.append('id', state.id);
        formData.append('company_id', userDetails.details.company_id);
        formData.append('user_id', userDetails.details.id);
        formData.append('unit_id', userDetails.details.unit_id);
        formData.append('floor_plan', this.state.floor_plan);
        formData.append('middle_name', this.state.middle_name);
        formData.append('last_name', this.state.last_name);
        formData.append('phone_number', this.state.phone_number);
        formData.append('email', this.state.email);

        console.log('onSubmit state', {
          thisState: this.state,
          token,
          state,
          formData,
        });
        // return;
        axios
          .post(
            `${BASE_URL}/${
              isEdit ? 'about-apartments-update' : 'about-apartments-update'
            }`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(this.onSuccess)
          .catch(this.onFail);
      }
    });
  };

  onSuccess = response => {
    this.setState({loading: false});
    const propsState = this.props.getState() || {};
    const {backScreen} = propsState;
    console.log({response, props: this.props});
    alert(
      this.state.isEdit
        ? 'User Details Update Successfully'
        : 'User Details Update Successfully',
    );

    const state = this.props.getState() || {};

    // setTimeout(() => {
    //   this.props.navigation('ProfileScreen');
    // }, 1000);
  };

  onFail = error => {
    this.setState({loading: false});
    console.log(error.response);
    alert(`Failed: ${error.data ? error.data.message : 'Add Failed'}`);
  };

  setChecked = value => {
    this.setState({checked: value});
  };

  handleChange = (text, name) => {
    const errors = {...this.state.errors};
    errors[name] = undefined;
    this.setState({[name]: text, errors});
  };

  render() {
    const {errors = {}} = this.state;

    return (
      <AuthContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.mainView}>
            <View style={styles.container}>
              <Text style={styles.lableInput}>Floor Plan</Text>
              <View style={styles.SectionStyle}>
                <InputBox
                  onChangeText={text => this.handleChange(text, 'floor_plan')}
                  value={this.state.floor_plan}
                  placeholder={'Floor Plan'}
                  style={styles.textInput}
                />
                <Text style={{color: 'red'}}>{errors.floor_plan}</Text>
              </View>

              {/* <Text style={styles.lableInput}>Middle Name</Text>
              <View style={styles.SectionStyle}>
                <InputBox
                  onChangeText={(text) => this.handleChange(text, 'middle_name')}
                  value={this.state.middle_name}
                  placeholder={'Middle Name'}
                  style={styles.textInput}
                />
                <Text style={{ color: 'red' }}>{errors.middle_name}</Text>
              </View>

              <Text style={styles.lableInput}>Last Name</Text>
              <View style={styles.SectionStyle}>
                <InputBox
                  onChangeText={(text) => this.handleChange(text, 'last_name')}
                  value={this.state.last_name}
                  placeholder={'Last Name'}
                  style={styles.textInput}
                />
                <Text style={{ color: 'red' }}>{errors.last_name}</Text>
              </View>

              <Text style={styles.lableInput}>Email Address</Text>
              <View style={styles.SectionStyle}>
                <InputBox
                  onChangeText={(text) => this.handleChange(text, 'email')}
                  value={this.state.email}
                  placeholder={'Email Address'}
                  style={styles.textInput}
                />
                <Text style={{ color: 'red' }}>{errors.email}</Text>
              </View>

              <Text style={styles.lableInput}>Phone Number</Text>
              <View style={styles.SectionStyle}>
                <InputBox
                  onChangeText={(text) => this.handleChange(text, 'phone_number')}
                  value={this.state.phone_number}
                  placeholder={'Phone Number'}
                  style={styles.textInput}
                />
                <Text style={{ color: 'red' }}>{errors.phone_number}</Text>
              </View>

              <Text style={styles.lableInput}>Member Image</Text>
              <View style={styles.SectionStyle}>
                <Text style={styles.selectImg}>Select Image</Text>
                <Text style={{ color: 'red' }}>{errors.phone_number}</Text>
              </View> */}

              {/* <Button onPress={this.nextStep} style={styles.loginButton}/> */}
              <FilledButton
                title={'Update'}
                onPress={this.validate}
                style={styles.loginButton}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </AuthContainer>
    );
  }
}

export default UpdateBillScreen;
