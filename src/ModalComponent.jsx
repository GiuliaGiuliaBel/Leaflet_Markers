import React from 'react';
import { Alert, Col, Button, Input, FormGroup, Label, Modal, ModalBody, ModalFooter} from 'reactstrap';

class ModalComponent extends React.Component {
  constructor() {
   super();
    this.state = {
      showModal:false,
      showingValidation: false
    };
 this.submit = this.submit.bind(this);
 this.showValidation = this.showValidation.bind(this); 
 this.dismissValidation = this.dismissValidation.bind(this); 
 }
  
  submit(e) {
      const location = this.props.location;
          e.preventDefault();
          const form = document.forms.form;
          if((form.popup.value).match(/^[A-Za-z]+$/)){
          this.props.createMarker({
            content: form.popup.value,
            location
          });
         form.popup.value = "";
        }else{
          this.showValidation();
      }
  }

  showValidation() {
    this.setState({showingValidation: true});
  }

  dismissValidation() {              
    this.setState({showingValidation: false });              
  }   

  render() {
    let validationMessage = null;
    if(this.state.showingValidation){
      validationMessage = (          
      <Alert color="warning" toggle={this.dismissValidation}>
        Please provide a descripton before submitting. Do not use digits and special characters.
      </Alert>
      )           
  }
    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.props.toggle} className={this.props.className}>
          <ModalBody>
              Please add a popup for a location.
                <form name="form">
                   <Label for="Popup">Popup</Label>
                      <Input type="text" name="popup" id="popup" placeholder="Popup" />
                        <FormGroup>
                          <Col md={12}>{validationMessage}</Col>          
                        </FormGroup>    
                </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submit}>Add description</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;